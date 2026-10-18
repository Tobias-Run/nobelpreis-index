import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {berechne} from '../dist/zeitreihe/berechnung.mjs';
const data=JSON.parse(readFileSync(new URL('../dist/zeitreihe/daten.json',import.meta.url),'utf8'));
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} ≠ ${b}`);
test('Gewichtungsszenarien: vollständige feste Gewichte, richtige 13er-Adaption und keine Auffüllung',()=>{
 const x=data.gewichtungsszenarien;
 assert.equal(x.stand,'2026-10-18');assert.equal(x.szenarien.length,3);
 const ids=data.produkte.map(p=>p.id).sort();
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
 assert.deepEqual(Object.values(x.gruppen).flat().sort(),data.produkte.map(p=>p.id).sort());
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
test('Alle 13 recherchiert; Quellen auflösbar und Zukunft bleibt außerhalb des Piloten',()=>{
 assert.equal(data.produkte.length,13);assert.equal(data.indexfreigabe,false);
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
 assert.equal(data.stand,'2026-10-17');assert.equal(data.referenz.abgerufen_am,'2026-10-16');
 const obs=data.produkte.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
 const ycl=obs.find(o=>o.id==='ycl-archiv-fläche-2022');
 assert.equal(ycl.gültigkeit.von,'2022-05-14');assert.equal(ycl.betrag,74.5);assert.equal(ycl.preisdatum,null);
 const src=data.quellen.find(s=>s.id===ycl.quelle_id);assert.ok(src.archiv_timestamp.startsWith('2023'));
 const salem=obs.find(o=>o.id==='salem-archiv-2025');assert.equal(salem.betrag,50400);
 assert.ok(data.quellen.find(s=>s.id===salem.quelle_id).archiv_timestamp.startsWith('2024'));
 const kelly=obs.find(o=>o.id==='kelly-saclab-archiv-2024');assert.equal(kelly.betrag,21800);assert.match(kelly.preisart,/Sekundärmarkt/);assert.equal(kelly.indexfreigabe,false);
 assert.equal(data.produkte.reduce((n,p)=>n+p.beobachtungen.length+p.zusätzliche_historische_beobachtungen.length,0),54);
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
