#!/usr/bin/env python3
"""Preis- und Steuermodell der Fallstudie; keine gemessene Kosten-/Gewinnreihe."""
import csv
import datetime as dt
import hashlib
import json
from decimal import Decimal as D
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'data/research/schwarzwaldstube-vertiefung-2026-10-26.json'
RECIPE = ROOT / 'data/methodik/pragmatische-auswahl-2026-10-26.json'
VPI = ROOT / 'data/sources/bundesbank-vpi-monatlich-2019-2026-2026-10-20.csv'
raw = json.loads(RAW.read_text())
recipe = json.loads(RECIPE.read_text())
obs = {o['id']: o for p in raw['produkte'] for o in p['beobachtungen'] + p['zusätzliche_historische_beobachtungen']}
old, current, late = [obs[i] for i in ['schwarzwald-original-archiv-2025-10', 'schwarzwald-2026-menue', 'schwarzwald-original-archiv-2025-12']]
price = lambda o: D(str(o['betrag']))
a, b, c = map(price, [old, current, late])
change = lambda start, end: 100 * (end / start - 1)
vpi = {r['TIME_PERIOD']: D(r['OBS_VALUE']) for r in csv.DictReader(VPI.read_text(encoding='utf-8-sig').splitlines(), delimiter=';')}
pairs = []
for start in [obs['schwarzwald-2025-menue'], old, late]:
    days = (dt.date.fromisoformat(current['preisdatum']) - dt.date.fromisoformat(start['preisdatum'])).days
    pairs.append({'von_id': start['id'], 'bis_id': current['id'], 'von': start['preisdatum'], 'bis': current['preisdatum'],
                  'tage': days, 'brutto_aenderung_prozent': change(price(start), b),
                  'annualisiert_prozent': 100 * ((float(b) / start['betrag']) ** (365.2425 / days) - 1)})
changes = []
for row in recipe['positionen']:
    start, end = [sum(price(obs[i]) for i in row['beobachtung_ids'][str(y)]) for y in recipe['jahre']]
    changes.append(change(start, end))
mean = sum(changes) / len(changes)
result = {
    'stand': '2026-10-26',
    'annahme': 'Steuermodell für Speisen ohne Getränke: 19 Prozent im Jahr 2025, 7 Prozent ab Januar 2026. Keine Restaurantrechnung oder Buchhaltung geprüft. Nettoangaben sind eigene Ableitungen, keine beobachteten Nettoangebote.',
    'paare': pairs,
    'annualisierung_hinweis': 'Geometrische Zeitnormalisierung mit 365,2425 Tagen pro Jahr, keine gemessene Kalenderjahresinflation und kein unterstellter Verlauf zwischen Belegen.',
    'steuerstufen': [
        {'beobachtung_id': o['id'], 'brutto_eur': price(o), 'ust_prozent_modell': tax, 'ohne_ust_eur_modell': price(o) / (1 + D(tax) / 100)}
        for o, tax in [(old, 19), (late, 19), (current, 7)]
    ],
    'nettoaenderung_modell_325_zu385_prozent': change(a / D('1.19'), b / D('1.07')),
    'nettoaenderung_modell_385_zu385_prozent': change(c / D('1.19'), b / D('1.07')),
    'gegenfaktisch_konstantes_netto': {
        'brutto_bei_7_prozent_aus_325_eur_2025': a / D('1.19') * D('1.07'),
        'brutto_bei_7_prozent_aus_385_eur_ende2025': c / D('1.19') * D('1.07'),
        'hinweis': 'Reine Rechenfälle. Kein Beleg einer zugesagten oder unterlassenen Preisweitergabe, keine Erklärung von Kosten oder Gewinnmarge.'
    },
    'vpi': {'passender_zeitraum': '2025-10 bis 2026-10', 'startwert': vpi['2025-10'], 'endwert': vpi.get('2026-10'),
            'hinweis': 'Oktober 2026 im verwendeten Bundesbank-Beleg nicht vorhanden; kein Ersatz durch September und kein zeitgleicher Inflationsabstand.'},
    'neuner_experiment': {'anstieg_prozent': mean, 'menuegewicht': D(1) / 9, 'menuebeitrag_prozentpunkte': change(a, b) / 9,
                          'menueanteil_am_nettoanstieg_prozent': change(a, b) / sum(changes) * 100,
                          'andere_basis_nur_als_diagnose': {'menuepaar': 'Dezember 2025 385 EUR gegen Oktober 2026 385 EUR',
                              'anstieg_neuner_prozent': mean - change(a, b) / 9,
                              'hinweis': 'Alle anderen Preisverhältnisse unverändert. Anderes Beobachtungsfenster, kein Ersatzindex und keine neue Auswahlentscheidung.'}},
    'eingaben': [{'datei': str(p.relative_to(ROOT)), 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in [RAW, RECIPE, VPI]]
}
print(json.dumps(result, ensure_ascii=False, indent=2, default=float))
