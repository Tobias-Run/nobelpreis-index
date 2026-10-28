import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {berechneJahresrunde} from '../dist/zeitreihe/berechnung.mjs';

const read=path=>JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const data=read('dist/zeitreihe/daten.json');
const old=read('data/research/herbstfenster-und-restbelege-2026-10-26.json');
const analysis=read('data/analysen/jahresrunde-2026-10-27.json');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} ≠ ${b}`);
const observations=products=>products.flatMap(p=>[...p.beobachtungen,...p.zusätzliche_historische_beobachtungen]);
const pairs=data.jahresvergleich.reihen;
const current=new Map(observations(data.produkte).map(o=>[o.id,o]));

test('Vier neue Identitäten, 13 aktive Positionen: alte Quellen und Preisfakten bleiben unverändert',()=>{
  assert.equal(data.produkte.length,17);
  assert.equal(observations(data.produkte).length,86);
  assert.equal(data.produkte.filter(p=>p.auswahlstatus==='aktiv').length,13);
  assert.equal(data.produkte.filter(p=>p.auswahlstatus==='archiviert_ersetzt').length,4);
  for(const o of observations(old.produkte))assert.deepEqual(current.get(o.id),o);
  const sources=new Map(data.quellen.map(q=>[q.id,q]));
  for(const q of old.quellen)assert.deepEqual(sources.get(q.id),q);
  for(const {alt,neu} of data.ersetzungen){
    assert.notEqual(alt,neu);
    assert.equal(data.produkte.find(p=>p.id===alt).ersetzt_durch,neu);
    assert.equal(data.produkte.find(p=>p.id===neu).ersetzt,alt);
    assert.ok(!pairs.some(r=>r.id===alt));
    assert.ok(pairs.some(r=>r.id===neu));
  }
});

test('Hotelrechnung verwendet zwei Wochenpreise und 14 Ortstaxen mit Originaleinheiten',()=>{
  const hotel=pairs.find(r=>r.id==='hotel-dolomitengolf-penthouse');
  for(const p of hotel.punkte){
    const [week,tax]=p.komponenten;
    assert.equal(current.get(week.beobachtung_id).betrag,2982);
    assert.equal(current.get(tax.beobachtung_id).betrag,2.6);
    assert.equal(week.menge,2);assert.equal(tax.menge,14);
    assert.equal(week.einheit,current.get(week.beobachtung_id).einheit);
    assert.equal(tax.einheit,current.get(tax.beobachtung_id).einheit);
    close(p.betrag,2*2982+2*7*2.6);
    assert.notEqual(p.betrag,2982+2.6);
    assert.equal(p.gueltigkeit.von.slice(0,4),String(p.jahr));
  }
});

test('Neue Preispaare stammen aus verschiedenen Originalständen, nicht aus fortgeschriebenen Lücken',()=>{
  for(const [id,amounts] of [
    ['gfw-alarm-premium',[29.99,29.99]],['lady-dior-gross',[6200,6200]],
    ['budersand-premiumrunde',[185,190]],['hotel-dolomitengolf-penthouse',[6000.4,6000.4]]
  ]){
    const r=pairs.find(r=>r.id===id);assert.deepEqual(r.punkte.map(p=>p.betrag),amounts);
    assert.ok(r.punkte.every(p=>p.beobachtung_ids.every(id=>current.has(id))));
    assert.equal(r.punkte[0].beobachtung_ids.filter(id=>r.punkte[1].beobachtung_ids.includes(id)).length,0);
    assert.equal(r.punkte[0].quelle_ids.filter(id=>r.punkte[1].quelle_ids.includes(id)).length,0);
  }
  const golf=pairs.find(r=>r.id==='budersand-premiumrunde');
  assert.equal(current.get('budersand-cart-2026').betrag,60);
  assert.equal(current.get('budersand-cart-2026').preisdatum,'2026-07-11');
  assert.ok(golf.punkte.every(p=>p.zeitregel==='jahresbroschuere'));
});

test('13er-Ergebnis stimmt mit eigener Rohpreisrechnung und Python überein; alter Neuner bleibt erhalten',()=>{
  const rawAmount=p=>p.komponenten.reduce((sum,c)=>sum+current.get(c.beobachtung_id).betrag*c.menge,0);
  const independent=pairs.reduce((sum,r)=>sum+(rawAmount(r.punkte[1])/rawAmount(r.punkte[0])-1)*100,0)/13;
  const result=berechneJahresrunde(pairs,[2025,2026],data.einzel_referenz,data.jahresvergleich.rezept.soll_produkt_ids);
  close(result.anstieg,independent);close(independent,analysis.nominale_aenderung_prozent);
  const previous=berechneJahresrunde(data.herbstvergleich.reihen,[2025,2026],data.einzel_referenz);
  close(previous.anstieg,4.60268385287643);
  close(independent,(previous.anstieg*9+100*(190/185-1))/13);
  assert.equal(result.vpiAnstieg,null);assert.equal(analysis.vpi_aenderung_prozent,null);
  for(const r of pairs.slice(-4)){
    const single=data.einzel_reihen.find(s=>s.id===r.id);
    assert.equal(single.vergleichsart,'herbstfenster');assert.deepEqual(single.punkte,r.punkte);
    const calculated=berechneJahresrunde([single],[2025,2026],data.einzel_referenz,[r.id]);
    close(calculated.anstieg,100*(rawAmount(r.punkte[1])/rawAmount(r.punkte[0])-1));
    assert.equal(calculated.vpiAnstieg,null);
  }
});
