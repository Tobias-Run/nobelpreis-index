#!/usr/bin/env python3
"""Versionierte Recherche und unveränderten Bundesbank-Beleg für den PoC bereitstellen."""
import csv
import hashlib
import json
import math
from pathlib import Path
from gewichtungsszenarien import erstellen
from einzelzeitreihen import erstellen as einzelreihen_erstellen
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'data/sources/bundesbank-vpi-monatlich-2024-2026-2026-10-16.csv'
RESEARCH=ROOT/'data/research/schwarzwaldstube-vertiefung-2026-10-26.json'
WEIGHTS=ROOT/'data/methodik/gewichtung-2026-10-17.json'
REFERENCE_RETRIEVED_AT='2026-10-16' # Rohbeleg nicht erneut abgerufen; unabhängig vom Recherchestand.
x=json.loads(RESEARCH.read_text())
rows=list(csv.DictReader(SRC.read_text(encoding='utf-8-sig').splitlines(),delimiter=';'))
expected=[f'{y}-{m:02}' for y in range(2024,2027) for m in range(1,13) if y<2026 or m<=9]
assert [r['TIME_PERIOD'] for r in rows]==expected, 'Monate fehlen oder sind doppelt'
for r in rows:
 assert r['BBK_ID']=='BBDP1.M.DE.N.VPI.C.A00000.I20.A'
 assert r['BBK_STD_FREQ']=='M' and r['BBK_STD_ADJUSTMENT']=='N' and r['BBK_UNIT']=='2020=100'
 assert math.isfinite(float(r['OBS_VALUE'])) and float(r['OBS_VALUE'])>0
observations=[o for p in x['produkte'] for o in p['beobachtungen']+p['zusätzliche_historische_beobachtungen']]
allobs={o['id']:o for o in observations}
assert len(allobs)==len(observations), 'Doppelte Beobachtungs-ID'
def point(year,ids):
 os=[allobs[i] for i in ids]
 assert all(not any(k in o['zeitstatus'] for k in ('angek','zukünftig')) for o in os)
 return {'jahr':year,'betrag':sum(o['betrag'] for o in os),'beobachtung_ids':ids,'quelle_ids':list(dict.fromkeys(o['quelle_id'] for o in os))}
series=[
 {'id':'bayreuth-parsifal','kurzname':'Bayreuth · Parsifal','einheit':'EUR je Ticket inklusive Pflichtgebühr','definition':'A1 Parkett Mitte, Parsifal ohne AR, online und digital; 352 EUR + 6 EUR je Platz.','punkte':[point(y,[f'bayreuth-ticket-{y}',f'bayreuth-gebühr-{y}']) for y in [2024,2025,2026]],'grenze':'Nur Festspieltarif, keine garantierte Verfügbarkeit. 2024 archiviertes Original; Steuer-Zweitprüfung offen.'},
 {'id':'liegeplatz-ycl','kurzname':'Bodensee · Flächentarif','einheit':'EUR je m² und Sommersaison','definition':'Yacht-Club Langenargen, veröffentlichte Sommer-Flächengebühr inklusive 7 % MwSt.; unveränderte Tarifeinheit.','punkte':[point(y,[f'ycl-fläche-{y}']) for y in [2025,2026]],'grenze':'Teilpreis. Ohne Verwaltung, Mitgliedschaft, Aufnahme und Arbeitsdienst; Flächenregel und tatsächlicher Gesamtpreis offen. Zugang über Warteliste.'}
]
ids=[s['id'] for s in x['quellen']];assert len(ids)==len(set(ids))
for o in allobs.values():
 assert o['quelle_id'] in ids and math.isfinite(o['betrag']) and o['betrag']>0
for p in x['produkte']:assert not p['indexfreigabe']
ref={'titel':'Deutscher Gesamt-VPI · Monatswerte · Ursprungswerte','anbieter':'Deutsche Bundesbank','ursprungsquelle':rows[0]['BBK_COMM_SRC'],'reihe':rows[0]['BBK_ID'],'einheit':'2020=100','download_url':'https://api.statistiken.bundesbank.de/rest/data/BBDP1/M.DE.N.VPI.C.A00000.I20.A?startPeriod=2024-01&endPeriod=2026-09','url':'https://statistiken.bundesbank.de/statistiken-de/zeitreihen/BBDP1/M.DE.N.VPI.C.A00000.I20.A','abgerufen_am':REFERENCE_RETRIEVED_AT,'sha256':hashlib.sha256(SRC.read_bytes()).hexdigest(),'methodenhinweis':rows[0]['BBK_COMM_METH'],'vergleichsmonat':'August','beobachtungen':[{'monat':r['TIME_PERIOD'],'wert':float(r['OBS_VALUE'])} for r in rows]}
weights=json.loads(WEIGHTS.read_text())
scenarios=erstellen(json.loads((ROOT/'data/research/produktregister.json').read_text()),weights,series)
(ROOT/'data/methodik/gewichtungsszenarien-2026-10-18.json').write_text(json.dumps(scenarios,ensure_ascii=False,indent=2)+'\n')
payload={**x,'gewichtungspruefung':weights,'gewichtungsszenarien':scenarios,'version':'poc-0.2.0','recherche_sha256':hashlib.sha256(RESEARCH.read_bytes()).hexdigest(),'indexfreigabe':False,'pilot_reihen':series,'referenz':ref,'methodik':{'formel':'I(t) = 100 / n × Σ[p_i(t) / p_i(b)]','gewichtung':'Gleiche Gewichte für Preisverhältnisse; kein Ausgabenindex','zusammensetzung':'Fest über den ganzen Zeitraum; nur Bayreuth und YCL-Tarifeinheit im Zweier-Pilot','zeitbezug':'Saison-/Festspieltarife; August-VPI desselben Jahres als saisonaler Anker. Keine Jahresdurchschnitte oder exakten Transaktionszeitpunkte.','fehlende_daten':'Keine Interpolation, Fortschreibung, Rückdatierung oder wechselnde Zusammensetzung','status':'Recherche-PoC, keine redaktionelle Indexfreigabe, keine Repräsentativität für das reichste Prozent'}}
NEW_SRC=ROOT/'data/sources/bundesbank-vpi-monatlich-2019-2026-2026-10-20.csv'
meta=json.loads(NEW_SRC.with_suffix('.json').read_text())
new_rows=list(csv.DictReader(NEW_SRC.read_text(encoding='utf-8-sig').splitlines(),delimiter=';'))
assert meta['sha256']==hashlib.sha256(NEW_SRC.read_bytes()).hexdigest()
assert [r['TIME_PERIOD'] for r in new_rows]==[f'{y}-{m:02}' for y in range(2019,2027) for m in range(1,13) if y<2026 or m<=9]
for r in new_rows:
 assert r['BBK_ID']==ref['reihe'] and r['BBK_STD_FREQ']=='M' and r['BBK_STD_ADJUSTMENT']=='N' and r['BBK_UNIT']=='2020=100'
 assert math.isfinite(float(r['OBS_VALUE'])) and float(r['OBS_VALUE'])>0
new_ref={**ref,'abgerufen_am':meta['abgerufen_am'],'download_url':meta['url'],'sha256':meta['sha256'],'vergleichsmonat':'Je Reihe: September, Dezember oder tatsächlicher Beobachtungsmonat','methodenhinweis':meta['hinweis'],'quelldatei':str(NEW_SRC.relative_to(ROOT)),'beobachtungen':[{'monat':r['TIME_PERIOD'],'wert':float(r['OBS_VALUE'])} for r in new_rows]}
extra=einzelreihen_erstellen(allobs)
praxis=json.loads((ROOT/'data/methodik/pragmatische-auswahl-2026-10-26.json').read_text())
premium=json.loads((ROOT/'data/methodik/premiumvergleich-2026-10-23.json').read_text())
praxis_reihen=[]
assert len(praxis['positionen'])==9 and len({p['produkt_id'] for p in praxis['positionen']})==9
assert {p['produkt_id'] for p in praxis['positionen']} | {p['produkt_id'] for p in praxis['nicht_im_vergleich']} == {p['id'] for p in x['produkte']}
for p in praxis['positionen']:
 assert p['gewicht_bruch']=={'zaehler':1,'nenner':9}
 produkt=next(q for q in x['produkte'] if q['id']==p['produkt_id'])
 produkt_ids={o['id'] for o in produkt['beobachtungen']+produkt['zusätzliche_historische_beobachtungen']}
 assert all(oid in produkt_ids for gruppe in p['beobachtung_ids'].values() for oid in gruppe)
 os=[allobs[p['beobachtung_ids']['2025'][0]]]
 praxis_reihen.append({'id':p['produkt_id'],'kurzname':p['name'],'einheit':'EUR · '+os[0]['einheit'],'definition':p['referenzentscheidung'],'grenze':p['grenze'],'punkte':[point(y,p['beobachtung_ids'][str(y)]) for y in praxis['jahre']]})
 for q in praxis_reihen[-1]['punkte']:
  o=allobs[q['beobachtung_ids'][0]]
  datum=o.get('preisdatum')
  text=datum[8:10]+'.'+datum[5:7]+'.'+datum[:4] if datum else (o.get('gültigkeit') or {}).get('bezeichnung','Jahresbeleg')
  q['label']=str(q['jahr'])+' · '+text
for entscheidung in premium['entscheidungen']:
 reihe=next(r for r in praxis_reihen if r['id']==entscheidung['produkt_id'])
 assert entscheidung['beobachtung_ids']==[oid for punkt in reihe['punkte'] for oid in punkt['beobachtung_ids']]
 reihe['premiumauswahl']=entscheidung
 if reihe['id']=='lanserhof-sylt':
  reihe['grenze']='Programmpreis ohne Unterkunft. Gleiche Premium-Programmstufe; Anwendungsgleichheit für Classic Plus nicht vollständig geprüft. Keine qualitätsbereinigte Kurinflation, kein Gesamtaufenthalt.'
payload.update({'version':'poc-0.5.0','ansicht_stand':'2026-10-26','einzel_reihen':extra,'einzel_referenz':new_ref,'pragmatische_auswahl':praxis,'premiumvergleich':premium,'praxis_reihen':praxis_reihen})
payload['methodik']['geltungsbereich']='Dieser Block beschreibt den historischen Zweier-Pilot. Der neue nominale Neuner-Vergleich ist in pragmatische_auswahl mit eigenen Auswahlregeln und Grenzen dokumentiert.'
(ROOT/'dist/zeitreihe/daten.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
print(f'{len(x["produkte"])} Positionen, {len(allobs)} Einzelbeobachtungen, {len(series)} Pilot-Teilreihen, {len(rows)} VPI-Monate validiert.')
print(f'Erweiterung: {len(extra)} Einzelreihen, {sum(len(s["punkte"]) for s in extra)} belegte Punkte, {len(new_rows)} zusätzliche Referenzmonate.')
