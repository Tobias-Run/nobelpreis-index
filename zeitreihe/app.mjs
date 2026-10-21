import {berechne,berechneEinzelreihe} from './berechnung.mjs';
const $=id=>document.getElementById(id);
const fmt=(n,d=2)=>n.toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d});
const signed=(n,d=2)=>(n>0?'+':n<0?'−':'')+fmt(Math.abs(n),d);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let data,result,selected,pointYear,sourceMap;
const extra=()=>data.einzel_reihen.find(r=>r.id===$('auswahl').value);
const label=p=>p.label||String(p.jahr);
const month=m=>m.slice(5)+'.'+m.slice(0,4);
function writeURL(push=true){
 const u=new URL(location.href);u.search='';
 u.searchParams.set('auswahl',$('auswahl').value);u.searchParams.set('von',$('zeitraum').value);u.searchParams.set('punkt',String(pointYear));
 if($('suche').value)u.searchParams.set('suche',$('suche').value);
 history[push?'pushState':'replaceState'](null,'',u);
}
function restore(){
 const p=new URLSearchParams(location.search);const mode=p.get('auswahl');
 $('auswahl').value=['pilot',...data.pilot_reihen.map(r=>r.id),...data.einzel_reihen.map(r=>r.id)].includes(mode)?mode:'pilot';
 fillPeriods(p.get('von'));pointYear=Number(p.get('punkt'))||2026;$('suche').value=p.get('suche')||'';render();renderResearch();
}
function fillPeriods(wanted){
 const s=extra(),starts=s?s.punkte.slice(0,-1).map(p=>p.jahr):$('auswahl').value==='bayreuth-parsifal'?[2024,2025]:[2025];
 $('zeitraum').innerHTML=starts.map(y=>`<option value="${y}">${s?esc(label(s.punkte.find(p=>p.jahr===y))+' → '+label(s.punkte.at(-1))):y+'–2026'}</option>`).join('');
 $('zeitraum').value=starts.includes(Number(wanted))?String(wanted):String(starts[0]);
}
function sourceLink(id,label){const s=sourceMap.get(id);return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(label||s.titel)} ↗</a>`:'Quelle fehlt';}
function render(){
 try{
  const s=extra();selected=s?[s]:$('auswahl').value==='pilot'?data.pilot_reihen:data.pilot_reihen.filter(r=>r.id===$('auswahl').value);
  const start=Number($('zeitraum').value);
  result=s?berechneEinzelreihe(s,start,data.einzel_referenz):berechne(selected,Array.from({length:2026-start+1},(_,i)=>start+i),data.referenz);$('fehler').hidden=true;
  const years=result.werte.map(p=>p.jahr),first=result.werte[0],last=result.werte.at(-1);
  if(!years.includes(pointYear))pointYear=last.jahr;
  $('umfang').textContent=selected.length===2?'2 von 13 Positionen · feste Zusammensetzung · je 50 % Gewicht · ein Ticketpreis und ein Teilpreis je m².':'Einzelreihe · '+selected[0].definition;
  const refPeriod=s?month(first.referenzmonat)+' → '+month(last.referenzmonat):'August '+start+' → August 2026';
  $('metrics').innerHTML=[['Preisvergleich',result.anstieg,'Kumuliert · '+(s?label(first)+' → '+label(last):start+'–2026')],['Deutscher VPI',result.vpiAnstieg,result.vpiAnstieg===null?'Vergleichsmonat '+month(last.referenzmonat)+' fehlt':refPeriod],['Abstand zum VPI',result.abstand,result.abstand===null?'Kein Abstand ohne passenden VPI':'Prozentpunkte · Preise minus VPI']].map(([t,v,sub],i)=>`<article class="metric"><small>${t}</small><strong>${v===null?'—':signed(v)+(i<2?' %':'')}</strong><p>${esc(sub)}</p></article>`).join('');
  $('basis').textContent=`Beide Reihen: ${start} = 100 · ${selected.length===2?'Zweier-Pilot':selected[0].kurzname}`;
  $('wertetabelle').innerHTML=result.werte.map(v=>`<tr><th scope="row">${esc(label(v))}${v.referenzmonat?`<small>VPI ${month(v.referenzmonat)}</small>`:''}</th><td>${fmt(v.index,3)}</td><td>${v.vpi===null?'Nicht verfügbar':fmt(v.vpi,3)}</td><td>${v.vpi_original===null?'Nicht verfügbar':fmt(v.vpi_original,1)}</td></tr>`).join('');
  $('treiber').innerHTML=[...result.beitraege].sort((a,b)=>b.prozentpunkte-a.prozentpunkte).map(b=>`<div class="driver"><span>${esc(b.name)}<small>${fmt(b.gewicht*100,0)} % Gewicht · Tarifänderung ${signed(b.veraenderung)} %</small></span><strong>${signed(b.prozentpunkte,3)} Pp.</strong></div>`).join('');
  $('pilotquellen').innerHTML=selected.map(s=>`<article class="pilot-source"><h4>${esc(s.kurzname)}</h4><p>${esc(s.definition)}</p><ul>${s.punkte.filter(p=>p.jahr>=start).map(p=>`<li><strong>${esc(label(p))}: ${fmt(p.betrag)} ${esc(s.einheit)}</strong><br>${p.quelle_ids.map(id=>sourceLink(id)).join(' · ')}</li>`).join('')}</ul><p>${esc(s.grenze)}</p></article>`).join('');
  $('punktwahl').innerHTML=result.werte.map(p=>`<button type="button" data-year="${p.jahr}" aria-pressed="${p.jahr===pointYear}">${esc(label(p))}</button>`).join('');
  $('zeitbezug').textContent=s?s.zeitbezug+' Linien verbinden ausschließlich belegte Punkte; der Zwischenverlauf ist unbekannt.':'Linien verbinden belegte Saisonwerte. Sie zeigen keinen Preisverlauf innerhalb eines Jahres. VPI: August-Monatswerte, keine Jahresdurchschnitte.';
  $('vpilegende').textContent=s?'VPI · zugeordneter Monat':'VPI · August';
  const ref=s?data.einzel_referenz:data.referenz;
  $('referenzhinweis').textContent=`Ursprungsquelle: ${ref.ursprungsquelle} Ursprungswerte, 2020 = 100. Abruf: ${ref.abgerufen_am}. ${s?'Referenzmonate stehen in der Tabelle; Monatsdurchschnitte sind keine Tageswerte.':'Saisonaler Vergleichsanker: August; keine taggenaue Entsprechung zu den Tarifbeschlüssen.'}`;
  drawChart();showPoint(pointYear);
 }catch(e){$('fehler').textContent=e.message;$('fehler').hidden=false;$('metrics').innerHTML='';$('chart').innerHTML='';result=null;}
}
function showPoint(year){
 const p=result?.werte.find(p=>p.jahr===year);if(!p)return;pointYear=year;
 const vpi=p.vpi===null?`VPI ${month(p.referenzmonat)} noch nicht verfügbar`:`VPI ${p.referenzmonat?month(p.referenzmonat):'August'} ${fmt(p.vpi,3)} (Original: ${fmt(p.vpi_original,1)})`;
 $('punktwert').textContent=`${label(p)}: Preisvergleich ${fmt(p.index,3)} · ${vpi}. Basis ${result.basisjahr} = 100.`;
 $('punktwahl').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.year)===year)));
}
function drawChart(){
 if(!result)return;
 const width=Math.max(230,Math.floor($('chart').clientWidth)),height=250,left=43,right=20,top=20,bottom=35;
 const all=result.werte.flatMap(v=>[v.index,v.vpi]).filter(Number.isFinite);const lo=Math.floor(Math.min(...all)-.5),hi=Math.ceil(Math.max(...all)+.5);
 const times=result.werte.map(p=>p.zeitachse?Date.parse(p.zeitachse):p.jahr),span=times.at(-1)-times[0];
 const x=i=>left+(times[i]-times[0])*(width-left-right)/Math.max(1,span);const y=v=>top+(hi-v)*(height-top-bottom)/(hi-lo);
 let svg=`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">Preisvergleich und deutscher VPI, ${result.basisjahr} bis ${result.endjahr}</title><desc id="chart-desc">Basis ${result.basisjahr} = 100. Exakte Werte stehen in der Datentabelle und über die Beobachtungsknöpfe unter dem Diagramm bereit. Fehlende VPI-Werte bleiben leer.</desc>`;
 for(let i=0;i<=4;i++){const v=lo+(hi-lo)*i/4;svg+=`<line x1="${left}" y1="${y(v)}" x2="${width-right}" y2="${y(v)}" stroke="#e3e5dc"/><text x="${left-9}" y="${y(v)+4}" text-anchor="end" font-size="12">${fmt(v,1)}</text>`;}
 for(const [key,color,dash] of [['vpi','#717972','5 5'],['index','#193e34','']]){
  let segment=[];const flush=()=>{if(segment.length)svg+=`<polyline points="${segment.join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="${dash}"/>`;segment=[];};
  result.werte.forEach((p,i)=>{if(Number.isFinite(p[key]))segment.push(`${x(i)},${y(p[key])}`);else flush();});flush();
  svg+=result.werte.map((p,i)=>Number.isFinite(p[key])?`<circle cx="${x(i)}" cy="${y(p[key])}" r="5" fill="${color}"><title>${esc(label(p))}: ${key==='index'?'Preise':'VPI'} ${fmt(p[key],3)}</title></circle>`:'').join('');
 }
 svg+=result.werte.map((p,i)=>`<text x="${x(i)}" y="${height-10}" text-anchor="middle" font-size="12">${p.jahr}</text>`).join('');$('chart').innerHTML=svg+'</svg>';
}
function renderResearch(){
 const q=$('suche').value.toLocaleLowerCase('de-DE');const products=data.produkte.filter(p=>(p.name+' '+p.kategorie+' '+p.historienprüfung.status).toLocaleLowerCase('de-DE').includes(q));
 $('treffer').textContent=`${products.length} von 13 Positionen · alle ohne redaktionelle Indexfreigabe`;
 $('positionen').innerHTML=products.map(p=>{
  const dateKey=o=>o.preisdatum||o.gültigkeit?.von||o.gültigkeit?.bezeichnung?.match(/20\d{2}/)?.[0]||o.id.match(/20\d{2}/)?.[0]||'';
  const h=p.historienprüfung,obs=[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen].sort((a,b)=>dateKey(a).localeCompare(dateKey(b)));
  const rows=obs.map(o=>{
   const future=/zukunft|angek|künftig/i.test(o.zeitstatus)||String(o.gültigkeit?.von||'')>data.stand;
   const date=o.gültigkeit?.bezeichnung||o.preisdatum||'Datierung offen';
   return `<tr><td>${esc(date)}<small>${o.preisdatum?'Datumsbezug: '+esc(o.preisdatum):'Kein einzelner Preisstichtag belegt'}</small><small class="tag ${future?'future':''}">${future?'ZUKUNFTSTARIF':esc(o.zeitstatus)}</small></td><td><strong>${fmt(o.betrag)} €</strong><small>${esc(o.einheit)}${o.variante?' · '+esc(o.variante):''}</small></td><td>${esc(o.preisart)}<small>${esc(o.umsatzsteuer)}</small></td><td>${sourceLink(o.quelle_id)}<small>Abruf: ${esc(o.abgerufen_am||data.stand)}</small></td></tr>`;
  }).join('');
  return `<details class="research-card" id="${esc(p.id)}"><summary><div><h3>${esc(p.name)}</h3><p>${esc(p.kategorie)} · ${esc(h.status)}</p></div><span aria-hidden="true">+</span></summary><p class="definition">${esc(p.definition)}</p><p class="finding">${esc(h.ergebnis)}</p><p class="gap">${esc(h.grenze)}</p>${obs.length?`<div class="tablewrap"><table><caption>Einzelbeobachtungen und Komponenten · keine Jahresdurchschnitte · nicht für den Gesamtindex freigegeben</caption><thead><tr><th>Datierung</th><th>Preis / Einheit</th><th>Preisart / Steuer</th><th>Beleg</th></tr></thead><tbody>${rows}</tbody></table></div>`:'<p class="no-data">Keine zulässige Preisbeobachtung vorhanden. Es wird kein Preis geschätzt.</p>'}<p class="fine">Zugang: ${esc(p.zugang)}</p><p class="dossier">${sourceLink(h.quelle_id,'Beleg zur Historienprüfung')} · <a href="https://github.com/Tobias-Run/nobelpreis-index/blob/main/${esc(p.dossier)}">Vollständiges Produktdossier ↗</a></p></details>`;
 }).join('');
}
function download(name,text,type){const url=URL.createObjectURL(new Blob([type.startsWith('text/csv')?'\ufeff'+text:text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function renderWeights(){
 const x=data.gewichtungsszenarien, models=x.szenarien;
 $('szenariotabelle').innerHTML=models.map(s=>{
  const car=s.gewichte.find(w=>w.produkt_id==='porsche-cayenne').gewicht_prozent;
  return `<tr><th scope="row">${esc(s.name)}</th><td>${fmt(car)} %</td><td>${fmt(s.pilot_abdeckung_prozent)} %</td><td>${fmt(s.fehlendes_gewicht_prozent)} %</td><td>${fmt(s.synthetischer_autoimpuls_prozentpunkte)} Pp.</td></tr>`;
 }).join('');
 $('gewichtmodell').innerHTML=models.map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('');
 const update=()=>{
  const s=models.find(s=>s.id===$('gewichtmodell').value);
  $('produktgewichte').innerHTML=s.gewichte.map(w=>`<tr><th scope="row">${esc(data.produkte.find(p=>p.id===w.produkt_id).name)}</th><td>${fmt(w.gewicht_prozent,4)} %</td></tr>`).join('');
  $('zweiertest').textContent=`Bedingter Zweier-Test 2025–2026: +${fmt(s.zweier_test_2025_2026_prozent,4)} %. Dafür werden nur die Gewichte von Bayreuth und YCL neu normiert. ${fmt(s.fehlendes_gewicht_prozent)} % des geplanten Warenkorbs fehlen; daraus entsteht kein Gesamtindex. Der bestehende 50/50-Pilot oben bleibt unverändert.`;
 };
 $('gewichtmodell').addEventListener('change',update);update();
 const labels={kategorisch:'Kategorie vorhanden',bedingt:'Nur bedingt vergleichbar',bewusst_ausgeschlossen:'Bewusst ausgeschlossen',nicht_abgedeckt:'Nicht abgedeckt'};
 $('abgleich').innerHTML=x.abgleich_julius_baer.map(c=>`<tr><th scope="row">${esc(c.komponente)}</th><td>${esc(labels[c.status])}</td><td>${c.produkt_id?esc(data.produkte.find(p=>p.id===c.produkt_id).name):'—'}</td></tr>`).join('');
}
function exportCSV(){
 const head=['Produkt-ID','Produkt','Beobachtung-ID','Betrag EUR','Einheit','Preisdatum','Gültigkeit','Zeitstatus','Preisart','Umsatzsteuer','Quelle','Abruf','Indexfreigabe'];
 const rows=data.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen].map(o=>[p.id,p.name,o.id,String(o.betrag).replace('.',','),o.einheit,o.preisdatum||'',o.gültigkeit?.bezeichnung||'',o.zeitstatus,o.preisart,o.umsatzsteuer,sourceMap.get(o.quelle_id)?.url||'',o.abgerufen_am||data.stand,'nein']));
 download(`nobelpreis-preisbeobachtungen-${data.stand}.csv`,[head,...rows].map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(';')).join('\r\n'),'text/csv;charset=utf-8');
}
try{
 const response=await fetch('./daten.json');if(!response.ok)throw new Error('Daten nicht verfügbar.');data=await response.json();sourceMap=new Map(data.quellen.map(s=>[s.id,s]));
 $('auswahl').insertAdjacentHTML('beforeend',`<optgroup label="Zusätzliche Einzelreihen · nicht im Pilot">${data.einzel_reihen.map(s=>`<option value="${esc(s.id)}">${esc(s.kurzname)}</option>`).join('')}</optgroup>`);
 restore();renderWeights();
 $('auswahl').addEventListener('change',()=>{fillPeriods($('zeitraum').value);render();writeURL();});
 $('zeitraum').addEventListener('change',()=>{render();writeURL();});
 $('suche').addEventListener('input',()=>{renderResearch();writeURL(false);});
 $('punktwahl').addEventListener('click',e=>{const y=e.target.closest('[data-year]')?.dataset.year;if(y){showPoint(Number(y));writeURL();}});
 $('json').addEventListener('click',()=>download(`nobelpreis-forschung-${data.stand}.json`,JSON.stringify({...data,aktuelle_auswertung:result,auswahl:selected.map(s=>s.id)},null,2),'application/json;charset=utf-8'));
 $('csv').addEventListener('click',exportCSV);
 $('link').addEventListener('click',async()=>{writeURL(false);try{await navigator.clipboard.writeText(location.href);$('status').textContent='Vergleichslink kopiert.';}catch{$('status').textContent='Der Vergleich ist in der Adresszeile gespeichert.';}});
 window.addEventListener('popstate',restore);new ResizeObserver(drawChart).observe($('chart'));
}catch(e){$('fehler').hidden=false;$('fehler').textContent='Die Forschungsdaten konnten nicht geladen werden. Bitte erneut laden oder die JSON-Datei direkt öffnen.';console.error(e);}
