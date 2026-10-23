#!/usr/bin/env python3
"""Diagnose zum Gesamtreview vom 23.10.2026; keine neue Indexversion."""

import csv
import hashlib
import json
import statistics
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REZEPT = ROOT / 'data/methodik/pragmatische-auswahl-2026-10-21.json'
rezept = json.loads(REZEPT.read_text())
ROHDATEN = ROOT / rezept['quelle_daten']
VPI = ROOT / 'data/sources/bundesbank-vpi-monatlich-2019-2026-2026-10-20.csv'
roh = json.loads(ROHDATEN.read_text())
beobachtungen = {
    o['id']: o for p in roh['produkte']
    for o in p['beobachtungen'] + p['zusätzliche_historische_beobachtungen']
}
anderungen = {}
for position in rezept['positionen']:
    anfang, ende = [
        sum(beobachtungen[i]['betrag'] for i in position['beobachtung_ids'][str(j)])
        for j in rezept['jahre']
    ]
    anderungen[position['produkt_id']] = 100 * (ende / anfang - 1)

vpi = {
    r['TIME_PERIOD']: float(r['OBS_VALUE'])
    for r in csv.DictReader(VPI.read_text(encoding='utf-8-sig').splitlines(), delimiter=';')
}
mittel = statistics.mean(anderungen.values())
referenz = 100 * (vpi['2026-08'] / vpi['2025-08'] - 1)
n = len(anderungen)
ergebnis = {
    'stand': '2026-10-23',
    'hinweis': 'Diagnostische Weglassproben mit Neunormierung, kein Ersatzindex und kein Grund, eine Position wegen ihres Ergebnisses zu entfernen. Zeit- und Leistungsprobleme bleiben bestehen.',
    'eingaben': [
        {'datei': str(p.relative_to(ROOT)), 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()}
        for p in [REZEPT, ROHDATEN, VPI]
    ],
    'nominaler_anstieg_prozent': mittel,
    'vpi_august_prozent': referenz,
    'abstand_prozentpunkte': mittel - referenz,
    'menu_beitrag_prozentpunkte': anderungen['schwarzwaldstube-menue-ii'] / n,
    'menu_anteil_am_nettoanstieg_prozent': 100 * anderungen['schwarzwaldstube-menue-ii'] / sum(anderungen.values()),
    'weglassproben': [
        {'weggelassen': produkt, 'mittel_der_ubrigen_prozent': statistics.mean(v for k, v in anderungen.items() if k != produkt)}
        for produkt in anderungen
    ],
    'referenzfenster_beispiele': [
        {'von': a, 'bis': b, 'vpi_anstieg_prozent': 100 * (vpi[b] / vpi[a] - 1)}
        for a, b in [('2024-12', '2025-12'), ('2025-09', '2026-09')]
    ],
}
print(json.dumps(ergebnis, ensure_ascii=False, indent=2))
