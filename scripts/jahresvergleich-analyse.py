#!/usr/bin/env python3
"""Jahresrunden unabhängig von der Browserrechnung aus Eingabebelegen nachrechnen."""
import csv
import datetime as dt
import hashlib
import json
from pathlib import Path
from jahresfenster import erstellen

ROOT = Path(__file__).resolve().parents[1]
release = json.loads((ROOT/'data/release.json').read_text())
paths = [release[k] for k in ['recherche', 'herbstvergleich', 'vpi_einzelreihen']]
raw, recipe = [json.loads((ROOT/p).read_text()) for p in paths[:2]]
data = erstellen(raw, recipe)
reference = {r['TIME_PERIOD']: float(r['OBS_VALUE']) for r in csv.DictReader((ROOT/paths[2]).read_text(encoding='utf-8-sig').splitlines(), delimiter=';')}
prices = []
for r in data['reihen']:
    a, b = r['punkte']
    change = (b['betrag']/a['betrag']-1)*100
    prices.append({'produkt_id': r['id'], 'basis': a, 'ende': b, 'aenderung_prozent': change,
                   'gewicht': 1/9, 'beitrag_prozentpunkte': change/9,
                   'belegabstand_tage': (dt.date.fromisoformat(b['preisdatum'])-dt.date.fromisoformat(a['preisdatum'])).days if a['preisdatum'] and b['preisdatum'] else None})
mean = sum(p['aenderung_prozent'] for p in prices)/9
vpi = []
for y in recipe['jahre']:
    months = [f'{y}-09', f'{y}-10']
    values = [reference.get(m) for m in months]
    vpi.append({'jahr': y, 'monate': months, 'werte': values, 'mittel': None if None in values else sum(values)/2})
vpi_change = None if any(p['mittel'] is None for p in vpi) else (vpi[-1]['mittel']/vpi[0]['mittel']-1)*100
result = {'stand': release['ansicht_stand'], 'version': release['version'], 'eingaben': {p: hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in paths},
          'zeitregeln_geprueft': data['zeitregeln_geprueft'], 'produktive_indexfreigabe': False,
          'nominale_aenderung_prozent': mean, 'vpi_herbstmittel': vpi, 'vpi_aenderung_prozent': vpi_change,
          'abstand_prozentpunkte': None if vpi_change is None else mean-vpi_change,
          'positionen': prices,
          'diagnostik': {'hinweis': 'Weglassproben sind Sensitivitätsdiagnosen mit neu normierten Gewichten, keine weiteren veröffentlichten Indizes oder Auswahlgründe.',
                        'weglassproben': [{'ohne': p['produkt_id'], 'mittel_der_anderen_prozent': sum(q['aenderung_prozent'] for q in prices if q is not p)/8} for p in prices]},
          'grenzen': data['hinweis']}
output = ROOT/release['jahresanalyse']
output.write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(f'Jahresrunde: {len(prices)} Positionen, {mean:.8f} %, Herbst-VPI: {vpi_change}')
