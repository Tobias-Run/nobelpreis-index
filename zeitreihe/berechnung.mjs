/** Preisverhältnisse mit fester Zusammensetzung, ohne Auffüllen fehlender Werte. */
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
