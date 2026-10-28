import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {berechne,berechneEinzelreihe,berechneJahresrunde} from '../dist/zeitreihe/berechnung.mjs';
const data=JSON.parse(readFileSync(new URL('../dist/zeitreihe/daten.json',import.meta.url),'utf8'));
const historisch=JSON.parse(readFileSync(new URL('../data/research/herbstfenster-und-restbelege-2026-10-26.json',import.meta.url),'utf8'));
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} ≠ ${b}`);
test('Pragmatischer Neuner-Vergleich: feste Auswahl, höhere Grundvarianten, nur echte Belege',()=>{
 const choice=data.pragmatische_auswahl;
 assert.equal(choice.positionen.length,9);assert.equal(data.praxis_reihen.length,9);
 const chosen=new Set(choice.positionen.map(p=>p.produkt_id));
 const outside=new Set(choice.nicht_im_vergleich.map(p=>p.produkt_id));
 assert.equal(chosen.size,9);assert.equal(outside.size,8);
 assert.equal([...chosen].filter(id=>outside.has(id)).length,0);
 assert.deepEqual([...chosen,...outside].sort(),data.produkte.map(p=>p.id).sort());
 const all=new Map(data.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]).map(o=>[o.id,o]));
 for(const r of data.praxis_reihen){
  assert.ok(chosen.has(r.id));assert.deepEqual(r.punkte.map(p=>p.jahr),[2025,2026]);
  for(const p of r.punkte){
   close(p.betrag,p.beobachtung_ids.reduce((n,id)=>n+all.get(id).betrag,0));
   for(const id of p.beobachtung_ids)assert.ok(!/angek|zukünftig/.test(all.get(id).zeitstatus));
  }
 }
 const r=berechne(data.praxis_reihen,[2025,2026],data.referenz);
 close(r.anstieg,4.6026838528764324);close(r.vpiAnstieg,100*(125.8/122.3-1));
 close(r.beitraege.reduce((n,b)=>n+b.prozentpunkte,0),r.anstieg);
 for(const b of r.beitraege)close(b.gewicht,1/9);
 const lan=data.praxis_reihen.find(r=>r.id==='lanserhof-sylt');assert.deepEqual(lan.punkte.map(p=>p.betrag),[4046,3990]);
 assert.ok(lan.punkte.every(p=>p.beobachtung_ids.every(id=>/plus/.test(id))));
 assert.deepEqual(data.praxis_reihen.find(r=>r.id==='skiurlaub-arlberg').punkte.map(p=>p.betrag),[423,450]);
 assert.deepEqual(data.praxis_reihen.find(r=>r.id==='bayreuth-parsifal').punkte.map(p=>p.betrag),[358,358]);
 assert.ok(!chosen.has('alarmaufschaltung'));assert.ok(!chosen.has('hermes-kelly'));
});
test('Weitere Archive: Originalkarten korrekt datiert, ältere Beobachtungen erhalten und kein erfundener 2022er Wert',()=>{
 const before=JSON.parse(readFileSync(new URL('../data/research/archivnachrecherche-2026-10-21.json',import.meta.url),'utf8'));
 const flatten=d=>d.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
 const current=new Map(flatten(data).map(o=>[o.id,o]));
 for(const o of flatten(before))assert.deepEqual(current.get(o.id),o);
 const damaligerStand=JSON.parse(readFileSync(new URL('../data/research/schwarzwaldstube-vertiefung-2026-10-26.json',import.meta.url),'utf8'));
 assert.equal(flatten(damaligerStand).length-flatten(before).length,6);
 for(const [year,amount,date] of [[2021,265,'2021-10-24'],[2024,325,'2024-11-21']]){
  const o=current.get(`schwarzwald-original-archiv-${year}`);
  assert.equal(o.betrag,amount);assert.equal(o.preisdatum,date);assert.match(o.datumstyp,/Archivierter Angebotsstand/);
  assert.match(o.umsatzsteuer,/Inklusive MwSt/);assert.equal(o.indexfreigabe,false);
  const s=data.quellen.find(s=>s.id===o.quelle_id);assert.equal(s.archiv_timestamp.slice(0,8),date.replaceAll('-',''));
 }
 assert.equal(current.get('schwarzwald-2024-menue').preisdatum,'2024-11-11');
 const s=data.produkte.find(p=>p.id==='schwarzwaldstube-menue-ii');
 assert.ok(![...s.beobachtungen,...s.zusätzliche_historische_beobachtungen].some(o=>o.preisdatum?.startsWith('2022')));
 assert.equal(data.weitere_archive.gesamt_beobachtungen,63);
});
test('Schwarzwaldstube: vier Primärbelege erhalten den Preiswechsel 2025 und verbessern den Oktobervergleich',()=>{
 const previous=JSON.parse(readFileSync(new URL('../data/research/archiverweiterung-2026-10-21.json',import.meta.url),'utf8'));
 const flatten=x=>x.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
 const obs=new Map(flatten(data).map(o=>[o.id,o]));
 for(const o of flatten(previous))assert.deepEqual(obs.get(o.id),o);
 const damaligerStand=JSON.parse(readFileSync(new URL('../data/research/schwarzwaldstube-vertiefung-2026-10-26.json',import.meta.url),'utf8'));
 assert.equal(flatten(damaligerStand).length-flatten(previous).length,4);
 for(const [suffix,date,price] of [['2025-06','2025-06-14',325],['2025-10','2025-10-14',325],['2025-12','2025-12-01',385],['2026-04','2026-04-08',385]]){
  const o=obs.get('schwarzwald-original-archiv-'+suffix),s=data.quellen.find(s=>s.id===o.quelle_id);
  assert.equal(o.preisdatum,date);assert.equal(o.betrag,price);assert.equal(o.gültigkeit,null);
  assert.equal(new Date(s.memento_datetime).toISOString().slice(0,10),date);
  assert.ok(s.archiv_timestamp.startsWith(date.replaceAll('-','')));assert.match(s.sha256,/^[a-f0-9]{64}$/);
 }
 const row=data.praxis_reihen.find(r=>r.id==='schwarzwaldstube-menue-ii');
 assert.deepEqual(row.punkte.map(p=>p.beobachtung_ids),[['schwarzwald-original-archiv-2025-10'],['schwarzwald-2026-menue']]);
 assert.deepEqual(row.punkte.map(p=>p.betrag),[325,385]);
 const single=data.einzel_reihen.find(r=>r.id==='schwarzwaldstube-menue-ii');
 assert.equal(single.punkte[1].preisdatum,'2025-10-14');assert.equal(single.punkte[1].referenzmonat,'2025-10');
 assert.equal(berechneEinzelreihe(single,2025,data.einzel_referenz).abstand,null);
 const analysis=JSON.parse(readFileSync(new URL('../data/analysen/schwarzwaldstube-2026-10-26.json',import.meta.url),'utf8'));
 assert.equal(analysis.paare[1].tage,367);assert.equal(analysis.paare[2].brutto_aenderung_prozent,0);
 close(analysis.nettoaenderung_modell_385_zu385_prozent,100*(1.19/1.07-1));
 close(analysis.neuner_experiment.anstieg_prozent,berechne(data.praxis_reihen,[2025,2026],data.referenz).anstieg);
});
test('Archivrecherchen: alte Beobachtungen und Quellen unverändert, neue Primärbelege hinzugefügt',()=>{
 const previous=JSON.parse(readFileSync(new URL('../data/research/produktpruefung-2026-10-17.json',import.meta.url),'utf8'));
 const flatten=d=>d.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
 const obs=new Map(flatten(data).map(o=>[o.id,o]));
 for(const o of flatten(previous))assert.deepEqual(obs.get(o.id),o);
 for(const s of previous.quellen)assert.deepEqual(data.quellen.find(q=>q.id===s.id),s);
 assert.equal(data.archivnachrecherche.neue_beobachtungen,7);
 assert.equal(data.archivnachrecherche.neue_beobachtung_ids.length,7);
 const damaligerStand=JSON.parse(readFileSync(new URL('../data/research/schwarzwaldstube-vertiefung-2026-10-26.json',import.meta.url),'utf8'));
 assert.equal(flatten(damaligerStand).length-flatten(previous).length,13);
 const tariff=obs.get('alarm-securando-archiv-20220524');
 assert.equal(tariff.betrag,20);assert.equal(tariff.gültigkeit.bis,'2022-06-30');assert.match(tariff.umsatzsteuer,/19/);
 for(const year of [2023,2024,2025,2026]){
  const o=obs.get(`alarm-securando-ab-archiv-${year}`);assert.equal(o.betrag,20);
  assert.match(o.preisart,/Ab-Preis/);assert.equal(o.gültigkeit,null);assert.equal(o.indexfreigabe,false);
 }
 for(const year of [2024,2025]){
  const o=obs.get(`lanserhof-zimmer-village-${year}`);assert.equal(o.betrag,649);
  assert.match(o.einheit,/nicht ausdrücklich/);assert.equal(o.preisdatum,null);assert.equal(o.indexfreigabe,false);
  assert.ok(o.gültigkeit.bezeichnung.includes(String(year)));
  const s=data.quellen.find(s=>s.id===o.quelle_id);assert.ok(s.archiv_timestamp.startsWith('2025'));assert.match(s.sha256,/^[a-f0-9]{64}$/);
 }
 const allowed=new Set(data.archivnachrecherche.neue_beobachtung_ids);
 assert.ok([...data.pilot_reihen,...data.einzel_reihen].flatMap(s=>s.punkte).every(p=>p.beobachtung_ids.every(id=>!allowed.has(id))));
 const registry=JSON.parse(readFileSync(new URL('../data/research/produktregister.json',import.meta.url),'utf8'));
 assert.equal(registry.produkte.reduce((n,p)=>n+p.anzahl_beobachtungen,0),86);
});
test('Zusätzliche Zeitreihen: 28 Originalbelege, keine Zukunftstarife oder Referenzverkettung',()=>{
 const urspruenglicheReihen=data.einzel_reihen.filter(r=>r.vergleichsart!=='herbstfenster');
 assert.equal(urspruenglicheReihen.length,8);
 const obs=new Map(data.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]).map(o=>[o.id,o]));
 assert.equal(urspruenglicheReihen.flatMap(s=>s.punkte).length,28);
 for(const s of urspruenglicheReihen){
  assert.equal(s.indexfreigabe,false);
  for(const p of s.punkte){
   const o=obs.get(p.beobachtung_ids[0]);assert.ok(o);assert.equal(p.betrag,o.betrag);
   assert.deepEqual(p.quelle_ids,[o.quelle_id]);assert.ok(!/angek|zukünftig/.test(o.zeitstatus));
  }
 }
 const salem=data.einzel_reihen.find(s=>s.id==='salem-grundtarif');
 assert.deepEqual(salem.punkte.map(p=>p.betrag),[43500,44820,46200,48960,50400,53400]);
 assert.deepEqual(salem.punkte.map(p=>p.referenzmonat),[2021,2022,2023,2024,2025,2026].map(y=>`${y}-09`));
 close(berechneEinzelreihe(salem,2021,data.einzel_referenz).anstieg,100*(53400/43500-1));
 const ski=data.einzel_reihen.find(s=>s.id==='arlberg-skipass');
 assert.deepEqual(ski.punkte.map(p=>p.betrag),[401,423,450]);
 assert.deepEqual(ski.punkte.map(p=>p.referenzmonat),['2023-12','2024-12','2025-12']);
 close(berechneEinzelreihe(ski,2024,data.einzel_referenz).anstieg,100*(450/401-1));
 const alt=data.einzel_reihen.find(s=>s.id==='saxonia-2019-2023');
 const neu=data.einzel_reihen.find(s=>s.id==='saxonia-2024-2026');
 assert.deepEqual(alt.punkte.map(p=>p.jahr),[2019,2020,2021,2022,2023]);
 assert.deepEqual(neu.punkte.map(p=>p.jahr),[2024,2025,2026]);
 for(const s of [alt,neu])for(const p of s.punkte)assert.equal(p.referenzmonat,p.preisdatum.slice(0,7));
});
test('Fehlender Oktober-VPI bleibt leer; letzte Preisbeobachtung wird weder gelöscht noch mit September verglichen',()=>{
 const s=data.einzel_reihen.find(s=>s.id==='saxonia-2024-2026');
 const r=berechneEinzelreihe(s,2024,data.einzel_referenz);
 close(r.anstieg,100*(27000/24500-1));
 assert.equal(r.werte.at(-1).betrag,27000);
 assert.equal(r.werte.at(-1).referenzmonat,'2026-10');
 assert.equal(r.werte.at(-1).vpi,null);assert.equal(r.werte.at(-1).vpi_original,null);
 assert.equal(r.vpiAnstieg,null);assert.equal(r.abstand,null);
 assert.ok(r.werte[1].vpi>100);
 const rebased=berechneEinzelreihe(s,2025,data.einzel_referenz);
 close(rebased.werte[0].index,100);close(rebased.werte[0].vpi,100);
 close(rebased.anstieg,100*(27000/25600-1));
});
test('Einzelzeitreihen weisen unzulässige Preise, Perioden und doppelte VPI-Werte ab',()=>{
 const s=data.einzel_reihen[0], ref=data.einzel_referenz;
 assert.throws(()=>berechneEinzelreihe(s,2020,ref));
 assert.throws(()=>berechneEinzelreihe(s,2026,ref));
 assert.throws(()=>berechneEinzelreihe({...s,punkte:[...s.punkte,s.punkte[0]]},2021,ref));
 for(const bad of [0,-1,NaN,Infinity])assert.throws(()=>berechneEinzelreihe({...s,punkte:s.punkte.map((p,i)=>i? p:{...p,betrag:bad})},2021,ref));
 assert.throws(()=>berechneEinzelreihe({...s,punkte:s.punkte.map((p,i)=>i?p:{...p,referenzmonat:'2021-13'})},2021,ref));
 assert.throws(()=>berechneEinzelreihe(s,2021,{beobachtungen:[...ref.beobachtungen,ref.beobachtungen.find(p=>p.monat==='2021-09')]}));
 const missingBase=berechneEinzelreihe(s,2021,{beobachtungen:ref.beobachtungen.filter(p=>p.monat!=='2021-09')});
 assert.ok(missingBase.werte.every(p=>p.vpi===null));assert.equal(missingBase.abstand,null);
});
test('Erweiterter VPI-Beleg: 93 Monatswerte ab 2019, alter Pilot-Beleg unverändert',()=>{
 assert.equal(data.einzel_referenz.beobachtungen.length,93);
 assert.equal(data.einzel_referenz.abgerufen_am,'2026-10-20');
 assert.equal(data.einzel_referenz.beobachtungen[0].monat,'2019-01');
 assert.equal(data.einzel_referenz.beobachtungen.at(-1).monat,'2026-09');
 const all=new Map(data.einzel_referenz.beobachtungen.map(p=>[p.monat,p.wert]));
 assert.equal(all.size,93);
 for(const p of data.referenz.beobachtungen)assert.equal(all.get(p.monat),p.wert);
 assert.equal(data.referenz.abgerufen_am,'2026-10-16');assert.equal(data.referenz.beobachtungen.length,33);
});
test('Gewichtungsszenarien: vollständige feste Gewichte, richtige 13er-Adaption und keine Auffüllung',()=>{
 const x=data.gewichtungsszenarien;
 assert.equal(x.stand,'2026-10-18');assert.equal(x.szenarien.length,3);
 const ids=historisch.produkte.map(p=>p.id).sort();
 for(const s of x.szenarien){
  assert.deepEqual(s.gewichte.map(w=>w.produkt_id).sort(),ids);
  const exact=w=>w.anteil_bruch.zaehler/w.anteil_bruch.nenner;
  close(s.gewichte.reduce((n,w)=>n+exact(w),0),1);
  for(const w of s.gewichte){assert.ok(exact(w)>0);close(w.gewicht_prozent,100*exact(w));}
  close(s.pilot_abdeckung_prozent+s.fehlendes_gewicht_prozent,100);
  close(s.pilot_abdeckung_prozent,s.gewichte.filter(w=>x.pilot_positionen.includes(w.produkt_id)).reduce((n,w)=>n+w.gewicht_prozent,0));
  assert.equal(s.gesamtindex,null);
  const car=s.gewichte.find(w=>w.produkt_id==='porsche-cayenne');
  close(s.synthetischer_autoimpuls_prozentpunkte,10*exact(car));
 }
 const [eq,jb,cat]=x.szenarien;
 close(eq.pilot_abdeckung_prozent,200/13);close(jb.pilot_abdeckung_prozent,700/51);close(cat.pilot_abdeckung_prozent,12.5);
 for(const w of jb.gewichte)close(w.gewicht_prozent,w.produkt_id==='porsche-cayenne'?300/17:700/102);
 close(eq.zweier_test_2025_2026_prozent,100*(96.5/96-1)/2);
 close(jb.zweier_test_2025_2026_prozent,eq.zweier_test_2025_2026_prozent);
 close(cat.zweier_test_2025_2026_prozent,100*(96.5/96-1)/3);
 assert.equal(berechne(data.pilot_reihen,[2025,2026],data.referenz).beitraege[0].gewicht,.5);
});
test('Komponentenabgleich: 6 Kategorien, 2 bedingt, 11 Lücken, 1 bewusster Ausschluss, 5 eigene Themen',()=>{
 const x=data.gewichtungsszenarien;
 assert.equal(x.abgleich_julius_baer.length,20);
 assert.equal(new Set(x.abgleich_julius_baer.map(c=>c.komponente_id)).size,20);
 for(const [status,n] of Object.entries({kategorisch:6,bedingt:2,nicht_abgedeckt:11,bewusst_ausgeschlossen:1}))assert.equal(x.abgleich_julius_baer.filter(c=>c.status===status).length,n);
 assert.equal(x.abgleich_julius_baer.find(c=>c.status==='bewusst_ausgeschlossen').komponente_id,'residential_property');
 assert.equal(x.zusaetzliche_positionen.length,5);
 assert.deepEqual(Object.values(x.gruppen).flat().sort(),historisch.produkte.map(p=>p.id).sort());
 assert.deepEqual(JSON.parse(readFileSync(new URL('../data/methodik/gewichtungsszenarien-2026-10-18.json',import.meta.url),'utf8')),x);
});
test('Pilot: Preisverhältnisse statt Addition ungleicher Euro-Einheiten',()=>{
 const r=berechne(data.pilot_reihen,[2025,2026],data.referenz);
 close(r.anstieg,100*((358/358+96.5/96)/2-1));
 close(r.vpiAnstieg,100*(125.8/122.3-1));
 close(r.abstand,r.anstieg-r.vpiAnstieg);
 close(r.beitraege.reduce((s,b)=>s+b.prozentpunkte,0),r.anstieg);
 close(r.werte[0].index,100);close(r.werte[0].vpi,100);
});
test('Keine wechselnde Besetzung, Interpolation oder Fortschreibung bei Lücken',()=>{
 assert.throws(()=>berechne(data.pilot_reihen,[2024,2025,2026],data.referenz),/2024/);
 assert.throws(()=>berechne([{id:'lücke',punkte:[{jahr:2024,betrag:10},{jahr:2026,betrag:12}]}],[2024,2025,2026],data.referenz),/2025/);
});
test('Bayreuth ab 2024 konstant; Pflichtgebühr berücksichtigt',()=>{
 const s=data.pilot_reihen.find(s=>s.id==='bayreuth-parsifal');
 assert.deepEqual(s.punkte.map(p=>p.betrag),[358,358,358]);
 close(berechne([s],[2024,2025,2026],data.referenz).anstieg,0);
});
test('Negative Änderung und Basiswechsel korrekt',()=>{
 const s={id:'test',kurzname:'Test',punkte:[{jahr:2024,betrag:200},{jahr:2025,betrag:100},{jahr:2026,betrag:80}]};
 close(berechne([s],[2024,2025,2026],data.referenz).anstieg,-60);
 close(berechne([s],[2025,2026],data.referenz).anstieg,-20);
});
test('Ungültige Werte, Duplikate und fehlende Referenzen werden abgewiesen',()=>{
 const s=data.pilot_reihen[0];
 assert.throws(()=>berechne([],[2025],data.referenz));
 assert.throws(()=>berechne([s],[2026,2025],data.referenz));
 assert.throws(()=>berechne([s],[2024,2026],data.referenz));
 assert.throws(()=>berechne([s,s],[2025,2026],data.referenz));
 assert.throws(()=>berechne([{...s,punkte:[...s.punkte,s.punkte[0]]}],[2025,2026],data.referenz));
 for(const bad of [0,-10,NaN,Infinity])assert.throws(()=>berechne([{id:'test',punkte:[{jahr:2025,betrag:bad}]}],[2025],data.referenz));
 assert.throws(()=>berechne([s],[2025,2026],{beobachtungen:[]}));
});
test('Alle 17 dokumentiert; Quellen auflösbar und Zukunft bleibt außerhalb des Piloten',()=>{
 assert.equal(data.produkte.length,17);assert.equal(data.indexfreigabe,false);
 const sources=new Set(data.quellen.map(s=>s.id));
 const obs=data.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
 assert.equal(new Set(obs.map(o=>o.id)).size,obs.length);
 for(const p of data.produkte){assert.ok(p.historienprüfung.ergebnis);assert.equal(p.indexfreigabe,false);}
 for(const o of obs){assert.ok(sources.has(o.quelle_id));assert.ok(o.betrag>0);}
 for(const s of data.pilot_reihen)for(const p of s.punkte)for(const id of p.beobachtung_ids){
  const o=obs.find(o=>o.id===id);assert.ok(o);assert.ok(!o.gültigkeit?.von||o.gültigkeit.von<=data.stand);assert.ok(!/zukunft|angek/i.test(o.zeitstatus));
 }
 assert.equal(data.referenz.reihe,'BBDP1.M.DE.N.VPI.C.A00000.I20.A');
 assert.equal(data.referenz.beobachtungen.length,33);
});

test('Archivstand ersetzt keine Tarifgültigkeit und kein neuerliches VPI-Abrufdatum',()=>{
 assert.equal(data.stand,'2026-10-27');assert.equal(data.referenz.abgerufen_am,'2026-10-16');
 const obs=data.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
 const ycl=obs.find(o=>o.id==='ycl-archiv-fläche-2022');
 assert.equal(ycl.gültigkeit.von,'2022-05-14');assert.equal(ycl.betrag,74.5);assert.equal(ycl.preisdatum,null);
 const src=data.quellen.find(s=>s.id===ycl.quelle_id);assert.ok(src.archiv_timestamp.startsWith('2023'));
 const salem=obs.find(o=>o.id==='salem-archiv-2025');assert.equal(salem.betrag,50400);
 assert.ok(data.quellen.find(s=>s.id===salem.quelle_id).archiv_timestamp.startsWith('2024'));
 const kelly=obs.find(o=>o.id==='kelly-saclab-archiv-2024');assert.equal(kelly.betrag,21800);assert.match(kelly.preisart,/Sekundärmarkt/);assert.equal(kelly.indexfreigabe,false);
 assert.equal(data.produkte.reduce((n,p)=>n+p.beobachtungen.length+p.zusätzliche_historische_beobachtungen.length,0),86);
});

test('Julius-Bär-Schema: 20 Komponenten und exakte 20/10/70-Verteilung',()=>{
 const g=data.gewichtungspruefung;assert.equal(g.julius_baer.komponenten.length,20);
 let sum=0;for(const k of g.julius_baer.komponenten){const f=k.anteil_bruch;sum+=180*f.zaehler/f.nenner;}
 assert.equal(sum,180);
 close(g.julius_baer.komponenten.find(k=>k.id==='car').gewicht_prozent,10);
 close(g.julius_baer.komponenten.find(k=>k.id==='residential_property').gewicht_prozent,20);
 const others=g.julius_baer.komponenten.filter(k=>!['car','residential_property'].includes(k.id));assert.equal(others.length,18);for(const k of others)close(k.gewicht_prozent,70/18);
 assert.deepEqual(g.julius_baer.preisveraenderung_2026_ausgenommen,['healthcare','sports_equipment']);
 close(g.rechenbeispiel_nur_methodik.auto_prozent+18*g.rechenbeispiel_nur_methodik.jede_der_18_anderen_prozent,100);
 assert.equal(g.nobelpreis.produktiver_gesamtindex_freigegeben,false);
 assert.deepEqual(g.nobelpreis.pilot_gewichte.map(w=>w.anteil),[0.5,0.5]);
});
test('Alle Produktfragen entschieden; bessere Quellen erzeugen keine doppelten Saisonpreise',()=>{
 assert.equal(data.abschlusspruefung.positionen.length,13);
 assert.equal(new Set(data.abschlusspruefung.positionen.map(p=>p.produkt_id)).size,13);
 for(const p of data.abschlusspruefung.positionen){assert.ok(p.erledigt);assert.ok(p.restnachweis);assert.equal(p.indexfreigabe,false);}
 const ski=data.produkte.find(p=>p.id==='skiurlaub-arlberg').beobachtungen.find(o=>o.id==='ski-2025');assert.equal(ski.betrag,450);assert.equal(ski.vorherige_quelle_id,'ski-bergfex');assert.match(ski.quelle_id,/ski2025-original/);assert.match(ski.umsatzsteuer,/inklusive USt/);
 const alarm=data.produkte.find(p=>p.id==='alarmaufschaltung').beobachtungen.find(o=>o.id==='alarm-securando-ab-2026');assert.match(alarm.preisart,/Ab-Preis/);assert.equal(alarm.indexfreigabe,false);
 assert.deepEqual(data.pilot_reihen.map(r=>r.id),['bayreuth-parsifal','liegeplatz-ycl']);
});


test('Herbst-Jahresrunde: alle neun Reihen, dieselben Preise, bessere Quellen und keine August-Ersatzreferenz',()=>{
 const h=data.herbstvergleich;assert.equal(h.zeitregeln_geprueft,true);assert.equal(h.zeitpruefung.length,18);
 const r=berechneJahresrunde(h.reihen,[2025,2026],data.einzel_referenz);
 close(r.anstieg,4.60268385287643);close(r.beitraege.reduce((s,b)=>s+b.prozentpunkte,0),r.anstieg);
 assert.equal(r.werte[0].vpi_original,122.8);assert.equal(r.werte.at(-1).vpi_original,null);
 assert.equal(r.vpiAnstieg,null);assert.equal(r.abstand,null);
 for(const p of r.werte)assert.deepEqual(p.referenzmonate,[`${p.jahr}-09`,`${p.jahr}-10`]);
 assert.equal(h.reihen.find(s=>s.id==='porsche-cayenne').punkte[0].preisdatum,'2025-09-12');
 assert.equal(h.reihen.find(s=>s.id==='rm-charger5').punkte[0].preisdatum,'2025-10-16');
 const a=JSON.parse(readFileSync(new URL('../data/analysen/herbstvergleich-2026-10-26.json',import.meta.url),'utf8'));
 close(a.nominale_aenderung_prozent,r.anstieg);assert.equal(a.vpi_aenderung_prozent,null);
 for(const b of r.beitraege)close(b.prozentpunkte,a.positionen.find(p=>p.produkt_id===b.id).beitrag_prozentpunkte);
 const ski=data.einzel_reihen.find(s=>s.id==='arlberg-skipass');assert.deepEqual(ski.punkte.map(p=>p.jahr),[2024,2025,2026]);
});
test('Herbst-VPI: vollständige Monatsindizes mitteln, keine fehlenden Monate auffüllen',()=>{
 const rows=data.herbstvergleich.reihen;
 const ref={beobachtungen:[{monat:'2025-09',wert:100},{monat:'2025-10',wert:120},{monat:'2026-09',wert:120},{monat:'2026-10',wert:144}]};
 const r=berechneJahresrunde(rows,[2025,2026],ref);close(r.vpiAnstieg,20);close(r.werte[0].vpi_original,110);close(r.werte[1].vpi_original,132);
 close(r.abstand,r.anstieg-20);
 const missing=berechneJahresrunde(rows,[2025,2026],{beobachtungen:ref.beobachtungen.filter(p=>p.monat!=='2025-10')});
 assert.ok(missing.werte.every(p=>p.vpi===null));assert.equal(missing.abstand,null);
 assert.throws(()=>berechneJahresrunde(rows,[2025,2026],{beobachtungen:[...ref.beobachtungen,ref.beobachtungen[0]]}));
 assert.throws(()=>berechneJahresrunde(rows.slice(1),[2025,2026],ref));
 const wrong=structuredClone(rows);wrong[0].punkte[0].referenzmonate=['2025-08'];
 assert.throws(()=>berechneJahresrunde(wrong,[2025,2026],ref));
});
test('Früherer Rechercheabschluss bleibt reproduzierbar; seine sechs Ergänzungen und damaligen Lücken bleiben erhalten',()=>{
 const previous=JSON.parse(readFileSync(new URL('../data/research/schwarzwaldstube-vertiefung-2026-10-26.json',import.meta.url),'utf8'));
 const flatten=x=>x.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
 const obs=new Map(flatten(data).map(o=>[o.id,o]));for(const o of flatten(previous))assert.deepEqual(obs.get(o.id),o);
 for(const q of previous.quellen)assert.deepEqual(data.quellen.find(s=>s.id===q.id),q);
 assert.equal(flatten(historisch).length-flatten(previous).length,6);
 assert.equal(obs.get('alarm-securando-pro-2022').betrag,30);
 assert.equal(data.produkte.find(p=>p.id==='hausbetreuung-sylt').beobachtungen.length,0);
 assert.equal(data.produkte.find(p=>p.id==='hotel-adlon-deluxe').beobachtungen.length,0);
 assert.equal(data.fachpruefung.positionen.length,17);assert.equal(data.fachpruefung.nachrichten_versandt,false);
 const altePruefung=JSON.parse(readFileSync(new URL('../data/reviews/fachpruefung-2026-10-26.json',import.meta.url),'utf8'));
 assert.deepEqual(altePruefung.offene_externe_kernbelege,['hermes-kelly','alarmaufschaltung','hausbetreuung-sylt','hotel-adlon-deluxe']);
 assert.deepEqual(data.fachpruefung.offene_externe_kernbelege,[]);
 const prot=JSON.parse(readFileSync(new URL('../data/research/restbelege-protokoll-2026-10-26.json',import.meta.url),'utf8'));
 const moved=prot.abrufe.find(a=>a.id==='adlon-herbst25-archiv');assert.match(moved.end_url,/20251216/);assert.match(moved.memento_datetime,/16 Dec 2025/);
 for(const p of altePruefung.positionen)for(const id of p.beleg_ids)assert.ok(prot.abrufe.some(a=>a.id===id),id);
});
