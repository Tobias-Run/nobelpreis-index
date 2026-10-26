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
try{
 for(const width of [320,390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:844}});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/');await page.waitForSelector('#metrics strong');
  assert.equal(await page.locator('#auswahl').inputValue(),'salem-grundtarif');
  assert.ok((await page.locator('#metrics').boundingBox()).y+(await page.locator('#metrics').boundingBox()).height<844,`Kennzahlen bei ${width} unter dem ersten Bildschirm`);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  for(const option of await page.locator('#auswahl option').evaluateAll(xs=>xs.map(x=>x.value))){
   await page.selectOption('#auswahl',option);assert.equal(await page.locator('#fehler').isVisible(),false,option);
   assert.ok(await page.locator('#chart svg').count(),option);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,option);
  }
  await page.selectOption('#auswahl','praxis9');assert.match(await page.locator('#metrics').innerText(),/4,60/);
  assert.equal(await page.locator('#metrics strong').nth(2).innerText(),'—');
  await page.locator('#treiber a').first().click();assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),'');
  assert.match(page.url(),/produkt=schwarzwaldstube-menue-ii/);
  assert.equal(new URL(await page.locator('#schwarzwaldstube-menue-ii [data-product-link]').getAttribute('href')).searchParams.get('auswahl'),'praxis9');
  await page.goBack();assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),null);
  await page.goForward();assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),'');
  await page.reload();await page.waitForSelector('#metrics strong');assert.equal(await page.locator('#schwarzwaldstube-menue-ii').getAttribute('open'),'');
  assert.match(await page.locator('#schwarzwaldstube-menue-ii').innerText(),/2025-12-01/);
  const downloadPromise=page.waitForEvent('download');await page.click('#vergleichscsv');const d=await downloadPromise;const rows=csv(await readFile(await d.path(),'utf8'));assert.equal(rows.length,19);
  const keys=rows[0];const records=rows.slice(1).map(r=>Object.fromEntries(keys.map((k,i)=>[k,r[i]])));
  const final=records.filter(r=>r.Jahr==='2026');assert.equal(final.length,9);
  const contribution=final.reduce((sum,r)=>sum+(n(r['Preis EUR'])/n(r['Basispreis EUR'])-1)*n(r.Gewicht)*100,0);
  assert.ok(Math.abs(contribution-4.60268385287643)<1e-10);
  assert.ok(records.every(r=>r['Beobachtung-IDs']&&r['Quellen-URLs']&&r['Version']==='poc-0.6.0'));
  await page.goto(base+'/zeitreihe/?auswahl=schwarzwaldstube-menue-ii&von=2025#rm-charger5');await page.waitForSelector('#metrics strong');assert.equal(await page.locator('#rm-charger5').getAttribute('open'),'');assert.match(await page.locator('#metrics').innerText(),/18,46/);assert.match(await page.locator('#metrics').innerText(),/fehlt/);
  await page.locator('#rm-charger5 summary').click();assert.equal(await page.locator('#rm-charger5').getAttribute('open'),null);
  await page.goto(base+'/design-demo/');await page.waitForSelector('#premium');assert.match(await page.locator('body').innerText(),/DEMODATEN/);
  await page.close();
 }
 assert.deepEqual(errors,[]);
 console.log('Browser: vier Breiten, alle zwölf Ansichten, erste Kennzahlen, Verlauf/Direktlinks, Nachrechnung des CSV und Designarchiv bestanden.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
