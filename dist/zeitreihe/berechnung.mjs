/** Preisverhältnisse mit fester Zusammensetzung, ohne Auffüllen fehlender Werte. */
export function berechneJahresrunde(reihen, jahre, referenz, erwarteteIds=[
  'porsche-cayenne','salem','saxonia-thin','lanserhof-sylt','rm-charger5',
  'bayreuth-parsifal','liegeplatz-ycl','skiurlaub-arlberg','schwarzwaldstube-menue-ii'
]) {
  // Neue Auswahlversionen übergeben ausdrücklich ihre Rezept-IDs. Ohne vierten
  // Parameter gilt ausschließlich die historische Neuner-Zusammensetzung.
  if(!Array.isArray(reihen)||!Array.isArray(jahre)||jahre.length<2||jahre.some((y,i)=>!Number.isInteger(y)||(i&&y!==jahre[i-1]+1))||!Array.isArray(referenz?.beobachtungen)) throw new Error('Ungültige feste Jahresrunde.');
  if(!Array.isArray(erwarteteIds)||!erwarteteIds.length||erwarteteIds.some(id=>typeof id!=='string'||!id.trim())||new Set(erwarteteIds).size!==erwarteteIds.length) throw new Error('Ungültige erwartete Rezept-IDs.');
  const n=erwarteteIds.length,sollIds=new Set(erwarteteIds);
  if(reihen.length!==n||reihen.some(r=>!r||!sollIds.has(r.id)||!Array.isArray(r.punkte))||new Set(reihen.map(r=>r.id)).size!==n) throw new Error('Zusammensetzung stimmt nicht mit den erwarteten Rezept-IDs überein.');
  const preise=reihen.map(r=>{
    if(new Set(r.punkte.map(p=>p.jahr)).size!==r.punkte.length)throw new Error('Doppelte Preisbeobachtung.');
    return jahre.map(j=>{const p=r.punkte.find(p=>p.jahr===j);if(!p||!Number.isFinite(p.betrag)||p.betrag<=0||JSON.stringify(p.referenzmonate)!==JSON.stringify([`${j}-09`,`${j}-10`]))throw new Error(`Preis oder Jahresfenster fehlt: ${r.id}/${j}.`);return p.betrag;});
  });
  const original=jahre.map(j=>{
    const werte=[9,10].map(m=>{
      const found=referenz.beobachtungen.filter(o=>o.monat===`${j}-${m===9?'09':'10'}`);
      if(found.length>1||found.some(o=>!Number.isFinite(o.wert)||o.wert<=0))throw new Error('Ungültige VPI-Referenz.');
      return found[0]?.wert??null;
    });
    return werte.some(v=>v===null)?null:(werte[0]+werte[1])/2;
  });
  const werte=jahre.map((jahr,i)=>({jahr,label:`Herbst ${jahr}`,zeitachse:`${jahr}-10-15`,referenzmonate:[`${jahr}-09`,`${jahr}-10`],index:100*preise.reduce((sum,p)=>sum+p[i]/p[0],0)/n,vpi:original[0]===null||original[i]===null?null:100*original[i]/original[0],vpi_original:original[i]}));
  const beitraege=reihen.map((r,i)=>({id:r.id,name:r.kurzname,veraenderung:100*(preise[i].at(-1)/preise[i][0]-1),prozentpunkte:100*(preise[i].at(-1)/preise[i][0]-1)/n,gewicht:1/n}));
  const ende=werte.at(-1),vpiAnstieg=ende.vpi===null?null:ende.vpi-100;
  return {basisjahr:jahre[0],endjahr:jahre.at(-1),anzahl:n,werte,beitraege,anstieg:ende.index-100,vpiAnstieg,abstand:vpiAnstieg===null?null:ende.index-ende.vpi,vergleichshinweis:'Feste Jahres-/Saisonregeln und Herbst-Angebotsfenster; VPI-Mittel September/Oktober zur Einordnung. Kein gleichzeitiges Preisniveau oder repräsentatives Haushaltsbudget.'};
}

export function berechneEinzelreihe(reihe, start, referenz) {
  const alle=reihe.punkte;
  if(!alle.length || new Set(alle.map(p=>p.jahr)).size!==alle.length || alle.some((p,i)=>!Number.isInteger(p.jahr)||(i&&p.jahr<=alle[i-1].jahr))) throw new Error('Ungültige Einzelreihe.');
  if(!alle.some(p=>p.jahr===start)) throw new Error('Ungültiger Beginn.');
  const punkte=alle.filter(p=>p.jahr>=start);
  if(punkte.length<2) throw new Error('Mindestens zwei belegte Preise erforderlich.');
  if(punkte.some(p=>!Number.isFinite(p.betrag)||p.betrag<=0||!/^\d{4}-(0[1-9]|1[0-2])$/.test(p.referenzmonat)||!Number.isFinite(Date.parse(p.zeitachse)))) throw new Error('Ungültiger Preis oder Zeitbezug.');
  const original=punkte.map(p=>{
    const found=referenz.beobachtungen.filter(o=>o.monat===p.referenzmonat);
    if(found.length>1 || found.some(o=>!Number.isFinite(o.wert)||o.wert<=0)) throw new Error('Ungültiger VPI.');
    return found[0]?.wert??null;
  });
  const basis=original[0];
  const werte=punkte.map((p,i)=>({...p,index:100*p.betrag/punkte[0].betrag,vpi:basis!==null&&original[i]!==null?100*original[i]/basis:null,vpi_original:original[i]}));
  const ende=werte.at(-1), anstieg=ende.index-100, vpiAnstieg=ende.vpi===null?null:ende.vpi-100;
  return {basisjahr:werte[0].jahr,endjahr:ende.jahr,anzahl:1,werte,anstieg,vpiAnstieg,abstand:vpiAnstieg===null?null:anstieg-vpiAnstieg,beitraege:[{id:reihe.id,name:reihe.kurzname,veraenderung:anstieg,prozentpunkte:anstieg,gewicht:1}]};
}

export function berechne(reihen, jahre, referenz) {
  if (!reihen.length || !jahre.length || new Set(jahre).size !== jahre.length || jahre.some((y,i)=>!Number.isInteger(y)||(i&&y!==jahre[i-1]+1))) throw new Error('Leere Auswahl oder ungültiger Zeitraum.');
  if (new Set(reihen.map(r=>r.id)).size!==reihen.length) throw new Error('Doppelte Position.');
  const preise=reihen.map(r=>{
    if(new Set(r.punkte.map(p=>p.jahr)).size!==r.punkte.length) throw new Error('Doppelte Preisbeobachtung.');
    return jahre.map(j=>{
      const p=r.punkte.find(p=>p.jahr===j);
      if(!p || !Number.isFinite(p.betrag) || p.betrag<=0) throw new Error(`Kein vergleichbarer Preis für ${r.id}, ${j}.`);
      return p.betrag;
    });
  });
  const vpi=jahre.map(j=>{
    const found=referenz.beobachtungen.filter(o=>o.monat===`${j}-08`);
    if(found.length!==1 || !Number.isFinite(found[0].wert) || found[0].wert<=0) throw new Error(`VPI fehlt oder ungültig: ${j}.`);
    return found[0].wert;
  });
  const werte=jahre.map((jahr,k)=>({jahr,index:100*preise.reduce((sum,p)=>sum+p[k]/p[0],0)/preise.length,vpi:100*vpi[k]/vpi[0],vpi_original:vpi[k]}));
  const ende=werte.at(-1);
  const beitraege=reihen.map((r,i)=>({id:r.id,name:r.kurzname,veraenderung:100*(preise[i].at(-1)/preise[i][0]-1),prozentpunkte:100*(preise[i].at(-1)/preise[i][0]-1)/reihen.length,gewicht:1/reihen.length}));
  return {basisjahr:jahre[0],endjahr:jahre.at(-1),anzahl:reihen.length,werte,beitraege,anstieg:ende.index-100,vpiAnstieg:ende.vpi-100,abstand:ende.index-ende.vpi};
}
