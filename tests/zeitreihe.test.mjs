import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {berechne} from '../dist/zeitreihe/berechnung.mjs';
const data=JSON.parse(readFileSync(new URL('../dist/zeitreihe/daten.json',import.meta.url),'utf8'));
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} ≠ ${b}`);
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
