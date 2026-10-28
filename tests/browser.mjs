import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve('dist');
const types={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.json':'application/json','.css':'text/css'};
const server=http.createServer(async(req,res)=>{
 try{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!f.startsWith(root+path.sep)&&f!==root)throw new Error();if((await stat(f)).isDirectory())f=path.join(f,'index.html');res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(await readFile(f));}catch{res.writeHead(404);res.end('Nicht gefunden');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
const errors=[];
const csv=text=>text.trim().replace(/^\uFEFF/,'').split(/\r?\n/).map(line=>line.slice(1,-1).split('";"').map(x=>x.replaceAll('""','"')));
const n=s=>Number(s.replace(',','.'));
const data=JSON.parse(await readFile(path.join(root,'zeitreihe/daten.json'),'utf8'));
const observations=new Map(data.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]).map(o=>[o.id,o]));
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} ≠ ${b}`);
const amount=p=>p.beobachtung_ids.reduce((sum,id)=>sum+observations.get(id).betrag*(p.komponenten?.find(c=>c.beobachtung_id===id)?.menge??1),0);
const change=rs=>rs.reduce((sum,r)=>{
  const first=amount(r.punkte.find(p=>p.jahr===2025)),last=amount(r.punkte.find(p=>p.jahr===2026));
  return sum+(last/first-1)*100;
},0)/rs.length;
const formatChange=x=>(x>0?'+':x<0?'−':'')+Math.abs(x).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' %';
const expectedCurrent=change(data.jahresvergleich.reihen);
const replacementIds=['gfw-alarm-premium','lady-dior-gross','budersand-premiumrunde','hotel-dolomitengolf-penthouse'];
const recordMap=rows=>rows.slice(1).map(r=>Object.fromEntries(rows[0].map((k,i)=>[k,r[i]])));
const components=cell=>new Map(cell.split('|').map(item=>{const split=item.lastIndexOf('=');return [item.slice(0,split),n(item.slice(split+1))];}));
const csvAmount=r=>{const prices=components(r['Belegpreise EUR']),quantities=components(r.Belegmengen);return [...prices].reduce((sum,[id,price])=>sum+price*quantities.get(id),0);};
async function comparisonCSV(page){const promise=page.waitForEvent('download');await page.click('#vergleichscsv');return csv(await readFile(await (await promise).path(),'utf8'));}
assert.equal(data.version,'poc-0.8.0');assert.equal(data.jahresvergleich.reihen.length,13);
close(expectedCurrent,3.39437364450676);
try{
 for(const width of [320,390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:844}});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/');await page.waitForSelector('#metrics strong');
  assert.equal(await page.locator('#auswahl').inputValue(),'jahresrunde');
  assert.equal(await page.locator('#metrics strong').first().innerText(),formatChange(expectedCurrent));
  assert.ok((await page.locator('#metrics').boundingBox()).y+(await page.locator('#metrics').boundingBox()).height<844,`Kennzahlen bei ${width} unter dem ersten Bildschirm`);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Seitenüberlauf beim Einstieg mit ${width}px`);
  assert.equal(await page.locator('#positionen > .research-card').count(),13);
  assert.equal(await page.locator('#archivpositionen > .research-card').count(),4);
  assert.equal(await page.locator('#positionen #hermes-kelly').count(),0);
  const options=await page.locator('#auswahl option').evaluateAll(xs=>xs.map(x=>x.value));assert.equal(options.length,18);
  for(const option of options){
   await page.selectOption('#auswahl',option);assert.equal(await page.locator('#fehler').isVisible(),false,option);
   assert.ok(await page.locator('#chart svg').count(),option);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,option);
   if(replacementIds.includes(option)){
    const row=data.jahresvergleich.reihen.find(r=>r.id===option);
    assert.equal(await page.locator('#metrics strong').first().innerText(),formatChange(change([row])),option);
    assert.equal(await page.locator('#metrics strong').nth(1).innerText(),'—',option);
    assert.equal(await page.locator('#metrics strong').nth(2).innerText(),'—',option);
    assert.equal(await page.locator('#zeitfenstertabelle tr').count(),1,option);
    assert.equal(await page.locator('#wertetabelle tr').count(),2,option);
   }
  }
  await page.selectOption('#auswahl','jahresrunde');
  assert.equal(await page.locator('#metrics strong').first().innerText(),formatChange(expectedCurrent));
  assert.equal(await page.locator('#metrics strong').nth(1).innerText(),'—');
  assert.equal(await page.locator('#metrics strong').nth(2).innerText(),'—');
  await page.locator('#zeitfensterfach summary').click();
  assert.equal(await page.locator('#zeitfenstertabelle tr').count(),13);
  assert.match(await page.locator('#zeitfensterstatus').innerText(),/13 von 13/);
  const current=recordMap(await comparisonCSV(page));assert.equal(current.length,26);
  assert.equal(new Set(current.map(r=>r['Produkt-ID'])).size,13);
  for(const r of current){
   close(csvAmount(r),n(r['Preis EUR']));close(n(r.Gewicht),1/13);
   assert.ok(r.Zeitregel&&r.Zeitbegründung&&r['VPI-Quelle']&&r['VPI-Beleg SHA256']&&r.Auswahlversion);
   assert.equal(r['VPI-Monat'],r.Jahr+'-09|'+r.Jahr+'-10');
   assert.equal(r.Version,'poc-0.8.0');
  }
  const currentEnd=current.filter(r=>r.Jahr==='2026');assert.equal(currentEnd.length,13);
  const fromCSV=currentEnd.reduce((sum,r)=>{
   const base=current.find(b=>b['Produkt-ID']===r['Produkt-ID']&&b.Jahr==='2025');
   close(csvAmount(base),n(r['Basispreis EUR']));
   return sum+(csvAmount(r)/csvAmount(base)-1)*n(r.Gewicht)*100;
  },0);
  close(fromCSV,expectedCurrent);
  assert.ok(currentEnd.every(r=>r['VPI Referenzwert (2020=100)']===''&&r['VPI-Rohwerte'].includes('2026-10=fehlt')));
  const hotel=current.filter(r=>r['Produkt-ID']==='hotel-dolomitengolf-penthouse');assert.equal(hotel.length,2);
  for(const r of hotel){
   const prices=components(r['Belegpreise EUR']),quantities=components(r.Belegmengen);
   const weekly=[...prices].find(([,price])=>price===2982),tax=[...prices].find(([,price])=>price===2.6);
   assert.ok(weekly&&tax);assert.equal(quantities.get(weekly[0]),2);assert.equal(quantities.get(tax[0]),14);
   close(csvAmount(r),6000.4);close(n(r['Preis EUR']),2*2982+14*2.6);
  }
  if([390,1440].includes(width)){await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`/tmp/nobelpreis-jahresrunde-${width}.png`,fullPage:false});}
  await page.selectOption('#auswahl','herbst9');
  assert.match(await page.locator('#metrics').innerText(),/4,60/);
  assert.equal(await page.locator('#metrics strong').nth(1).innerText(),'—');
  assert.equal(await page.locator('#metrics strong').nth(2).innerText(),'—');
  assert.equal(await page.locator('#zeitfenstertabelle tr').count(),9);
  assert.match(await page.locator('#zeitfenstertabelle').innerText(),/2025-09-12/);
  assert.match(await page.locator('#zeitfensterstatus').innerText(),/9 von 9/);
  const annual=recordMap(await comparisonCSV(page));
  assert.equal(annual.length,18);assert.ok(annual.every(r=>r['VPI-Monat']===r.Jahr+'-09|'+r.Jahr+'-10'));
  assert.ok(annual.every(r=>r.Zeitregel&&r.Zeitbegründung&&r['VPI-Quelle']&&r['VPI-Beleg SHA256']));
  assert.ok(annual.filter(r=>r.Jahr==='2026').every(r=>r['VPI Referenzwert (2020=100)']===''&&r['VPI-Rohwerte'].includes('2026-10=fehlt')));
  assert.ok(Math.abs(annual.filter(r=>r.Jahr==='2026').reduce((sum,r)=>sum+(n(r['Preis EUR'])/n(r['Basispreis EUR'])-1)*n(r.Gewicht)*100,0)-4.60268385287643)<1e-10);
  await page.selectOption('#auswahl','praxis9');assert.match(await page.locator('#metrics').innerText(),/4,60/);
  assert.equal(await page.locator('#metrics strong').nth(2).innerText(),'—');
  await page.locator('#treiber a').first().click();assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),'');
  assert.match(page.url(),/produkt=schwarzwaldstube-menue-ii/);
  assert.equal(new URL(await page.locator('#schwarzwaldstube-menue-ii [data-product-link]').getAttribute('href')).searchParams.get('auswahl'),'praxis9');
  await page.goBack();assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),null);
  assert.equal(await page.locator('#schwarzwaldstube-menue-ii summary').evaluate(e=>e===document.activeElement),true);
  await page.goForward();assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),'');
  await page.reload();await page.waitForSelector('#metrics strong');assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),'');
  assert.match(await page.locator('#schwarzwaldstube-menue-ii').innerText(),/2025-12-01/);
  const downloadPromise=page.waitForEvent('download');await page.click('#vergleichscsv');const d=await downloadPromise;const rows=csv(await readFile(await d.path(),'utf8'));assert.equal(rows.length,19);
  const keys=rows[0];const records=rows.slice(1).map(r=>Object.fromEntries(keys.map((k,i)=>[k,r[i]])));
  const final=records.filter(r=>r.Jahr==='2026');assert.equal(final.length,9);
  const contribution=final.reduce((sum,r)=>sum+(n(r['Preis EUR'])/n(r['Basispreis EUR'])-1)*n(r.Gewicht)*100,0);
  assert.ok(Math.abs(contribution-4.60268385287643)<1e-10);
  assert.ok(records.every(r=>r['Beobachtung-IDs']&&r['Quellen-URLs']&&r['Version']==='poc-0.8.0'));
  await page.goto(base+'/zeitreihe/?auswahl=schwarzwaldstube-menue-ii&von=2025#rm-charger5');await page.waitForSelector('#metrics strong');assert.equal(await page.locator('#rm-charger5').getAttribute('open'),'');assert.match(await page.locator('#metrics').innerText(),/18,46/);assert.match(await page.locator('#metrics').innerText(),/fehlt/);
  await page.locator('#rm-charger5 summary').click();assert.equal(await page.locator('#rm-charger5').getAttribute('open'),null);
  assert.equal(await page.locator('#rm-charger5 summary').evaluate(e=>e===document.activeElement),true);
  await page.goto(base+'/?produkt=hermes-kelly');await page.waitForSelector('#metrics strong');
  assert.equal(await page.locator('#auswahl').inputValue(),'jahresrunde');
  assert.equal(await page.locator('#archivfach').getAttribute('open'),'');
  assert.equal(await page.locator('#archivpositionen #hermes-kelly').getAttribute('open'),'');
  const successor=page.locator('#hermes-kelly [data-product="lady-dior-gross"]');assert.equal(await successor.count(),1);
  await successor.click();assert.equal(await page.locator('#lady-dior-gross').getAttribute('open'),'');
  assert.equal(await page.locator('#hermes-kelly').getAttribute('open'),null);assert.match(page.url(),/produkt=lady-dior-gross/);
  await page.goBack();assert.equal(await page.locator('#archivfach').getAttribute('open'),'');assert.equal(await page.locator('#hermes-kelly').getAttribute('open'),'');
  await page.goForward();assert.equal(await page.locator('#lady-dior-gross').getAttribute('open'),'');
  await page.reload();await page.waitForSelector('#metrics strong');assert.equal(await page.locator('#lady-dior-gross').getAttribute('open'),'');
  await page.goto(base+'/design-demo/');await page.waitForSelector('#premium');assert.match(await page.locator('body').innerText(),/DEMODATEN/);
  await page.close();
 }
 assert.deepEqual(errors,[]);
 console.log('Browser: vier Breiten, alle 18 Ansichten, 13 aktive und vier archivierte Positionen, neue Einzelkurven, Jahresfenster, fehlender Herbst-VPI, Archiv-Direktlinks/Nachfolger, Verlauf, unabhängige 13er-/Hotel-CSV-Nachrechnung, beide Neuner-Archive und Designarchiv bestanden.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
