#!/usr/bin/env python3
"""Versionierte Recherche und unveränderten Bundesbank-Beleg für den PoC bereitstellen."""
import csv
import hashlib
import json
import math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'data/sources/bundesbank-vpi-monatlich-2024-2026-2026-10-16.csv'
RESEARCH=ROOT/'data/research/historische-preise-2026-10-17.json'
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
 assert all(o['zeitstatus']!='angekündigt' for o in os)
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
payload={**x,'version':'poc-0.1.1','recherche_sha256':hashlib.sha256(RESEARCH.read_bytes()).hexdigest(),'indexfreigabe':False,'pilot_reihen':series,'referenz':ref,'methodik':{'formel':'I(t) = 100 / n × Σ[p_i(t) / p_i(b)]','gewichtung':'Gleiche Gewichte für Preisverhältnisse; kein Ausgabenindex','zusammensetzung':'Fest über den ganzen Zeitraum; nur Bayreuth und YCL-Tarifeinheit im Zweier-Pilot','zeitbezug':'Saison-/Festspieltarife; August-VPI desselben Jahres als saisonaler Anker. Keine Jahresdurchschnitte oder exakten Transaktionszeitpunkte.','fehlende_daten':'Keine Interpolation, Fortschreibung, Rückdatierung oder wechselnde Zusammensetzung','status':'Recherche-PoC, keine redaktionelle Indexfreigabe, keine Repräsentativität für das reichste Prozent'}}
(ROOT/'dist/zeitreihe/daten.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
print(f'{len(x["produkte"])} Positionen, {len(allobs)} Einzelbeobachtungen, {len(series)} Pilot-Teilreihen, {len(rows)} VPI-Monate validiert.')
