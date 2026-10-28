import test from 'node:test';
import assert from 'node:assert/strict';
import {berechneJahresrunde} from '../dist/zeitreihe/berechnung.mjs';

const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} ≠ ${b}`);
const years=[2025,2026];
const ids=Array.from({length:13},(_,i)=>`produkt-${i+1}`);
const series=(selection=ids)=>selection.map((id,i)=>({
  id,kurzname:id,punkte:[
    {jahr:2025,betrag:100*(i+1),referenzmonate:['2025-09','2025-10']},
    {jahr:2026,betrag:100*(i+1)*(1+(-10+2*i)/100),referenzmonate:['2026-09','2026-10']}
  ]
}));
// September steigt um 30 %, Oktober fällt um 5 %; das Mittel der Indexstände
// steigt um 6 2/3 %, nicht um das Mittel der beiden Änderungsraten (12,5 %).
const reference={beobachtungen:[
  {monat:'2025-09',wert:100},{monat:'2025-10',wert:200},
  {monat:'2026-09',wert:130},{monat:'2026-10',wert:190}
]};

test('Expliziter 13er-Korb mittelt Preisverhältnisse und Beiträge mit je 1/13',()=>{
  const result=berechneJahresrunde(series(),years,reference,ids);
  assert.equal(result.anzahl,13);
  close(result.werte[0].index,100);
  // Änderungen −10, −8, …, +14 % ergeben ungewichtet genau +2 %.
  // Eine Addition der Europreise ergäbe stattdessen +6 %.
  close(result.anstieg,2);close(result.werte[1].index,102);
  close(result.beitraege.reduce((sum,p)=>sum+p.gewicht,0),1);
  close(result.beitraege.reduce((sum,p)=>sum+p.prozentpunkte,0),2);
  for(const p of result.beitraege)close(p.gewicht,1/13);
  close(result.beitraege[0].prozentpunkte,-10/13);
  close(result.beitraege.at(-1).prozentpunkte,14/13);
  close(result.werte[0].vpi_original,150);
  close(result.werte[1].vpi_original,160);
  close(result.vpiAnstieg,100/15);
  close(result.abstand,2-100/15);
});

test('Reihenfolge ändert den expliziten Korb nicht',()=>{
  const original=berechneJahresrunde(series(),years,reference,ids);
  const reversed=berechneJahresrunde(series().reverse(),years,reference,[...ids].reverse());
  close(reversed.anstieg,original.anstieg);
  close(reversed.abstand,original.abstand);
  for(const [i,p] of reversed.werte.entries()){
    close(p.index,original.werte[i].index);
    assert.deepEqual({...p,index:0},{...original.werte[i],index:0});
  }
});

test('Ein gekürzter 12er-Korb wird niemals stillschweigend neu normiert',()=>{
  assert.throws(()=>berechneJahresrunde(series().slice(0,-1),years,reference,ids),/Rezept-IDs/);
  const extra=series();extra.push({...extra[0],id:'unbeauftragte-position'});
  assert.throws(()=>berechneJahresrunde(extra,years,reference,ids),/Rezept-IDs/);
  const foreign=series();foreign[12].id='archivierter-vorgaenger';
  assert.throws(()=>berechneJahresrunde(foreign,years,reference,ids),/Rezept-IDs/);
});

test('Doppelte oder ungültige Rezept- und Reihen-IDs sperren die Rechnung',()=>{
  const duplicate=series();duplicate[12].id=duplicate[0].id;
  assert.throws(()=>berechneJahresrunde(duplicate,years,reference,ids),/Rezept-IDs/);
  const duplicateRecipe=[...ids];duplicateRecipe[12]=duplicateRecipe[0];
  assert.throws(()=>berechneJahresrunde(series(),years,reference,duplicateRecipe),/Rezept-IDs/);
  for(const invalid of [[],null,[...ids,''],[...ids,null]]){
    assert.throws(()=>berechneJahresrunde(series(),years,reference,invalid),/Rezept-IDs/);
  }
});

test('Fehlende Jahrespreise und doppelte Beobachtungen sind keine Nulländerung',()=>{
  const missing=series();missing[12].punkte.pop();
  assert.throws(()=>berechneJahresrunde(missing,years,reference,ids),/Preis oder Jahresfenster fehlt/);
  const duplicate=series();duplicate[0].punkte.push({...duplicate[0].punkte[0]});
  assert.throws(()=>berechneJahresrunde(duplicate,years,reference,ids),/Doppelte Preisbeobachtung/);
  for(const invalid of [0,-1,NaN,Infinity]){
    const bad=series();bad[0].punkte[1].betrag=invalid;
    assert.throws(()=>berechneJahresrunde(bad,years,reference,ids),/Preis oder Jahresfenster fehlt/);
  }
});

test('Fehlender Oktober bleibt leer, auch wenn September und August vorhanden sind',()=>{
  const partial={beobachtungen:[
    ...reference.beobachtungen.filter(p=>p.monat!=='2026-10'),
    {monat:'2026-08',wert:999}
  ]};
  const result=berechneJahresrunde(series(),years,partial,ids);
  close(result.anstieg,2);close(result.werte[0].vpi,100);
  assert.equal(result.werte[1].vpi_original,null);
  assert.equal(result.werte[1].vpi,null);
  assert.equal(result.vpiAnstieg,null);assert.equal(result.abstand,null);
});

test('Fehlende Basisreferenz sperrt sämtliche normierten VPI-Werte',()=>{
  const partial={beobachtungen:reference.beobachtungen.filter(p=>p.monat!=='2025-09')};
  const result=berechneJahresrunde(series(),years,partial,ids);
  assert.ok(result.werte.every(p=>p.vpi===null));
  close(result.werte[1].vpi_original,160);
  assert.equal(result.vpiAnstieg,null);assert.equal(result.abstand,null);
});

test('Doppelte/ungültige VPI-Monate und falsche Preisfenster werden zurückgewiesen',()=>{
  assert.throws(()=>berechneJahresrunde(series(),years,{beobachtungen:[...reference.beobachtungen,reference.beobachtungen[0]]},ids),/VPI-Referenz/);
  for(const invalid of [0,-1,NaN,Infinity]){
    const bad=structuredClone(reference);bad.beobachtungen[0].wert=invalid;
    assert.throws(()=>berechneJahresrunde(series(),years,bad,ids),/VPI-Referenz/);
  }
  const badWindow=series();badWindow[0].punkte[0].referenzmonate=['2025-08','2025-09'];
  assert.throws(()=>berechneJahresrunde(badWindow,years,reference,ids),/Preis oder Jahresfenster fehlt/);
});

test('Drei Parameter sind ausschließlich mit dem historischen Neuner-Korb kompatibel',()=>{
  const historical=['porsche-cayenne','salem','saxonia-thin','lanserhof-sylt','rm-charger5','bayreuth-parsifal','liegeplatz-ycl','skiurlaub-arlberg','schwarzwaldstube-menue-ii'];
  const old=berechneJahresrunde(series(historical),years,reference);
  assert.equal(old.anzahl,9);close(old.anstieg,-2);
  const explicit=berechneJahresrunde(series(historical),years,reference,historical);
  assert.deepEqual(old,explicit);
  assert.throws(()=>berechneJahresrunde(series(),years,reference),/Rezept-IDs/);
  assert.throws(()=>berechneJahresrunde(series().slice(0,9),years,reference),/Rezept-IDs/);
});
