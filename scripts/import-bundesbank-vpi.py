#!/usr/bin/env python3
"""Lokalen Bundesbank-CSV-Beleg validieren und die Browser-Referenz erzeugen.

Nutzung: python3 scripts/import-bundesbank-vpi.py
Kein Netzwerkzugriff; neue Abrufe werden als neue Quelldateien versioniert.
"""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'data/sources/bundesbank-vpi-2020-2025-2026-10-16.csv'
METADATA = ROOT / 'data/sources/bundesbank-vpi-metadaten-2026-10-16.csv'
SERIES = 'BBDP1.A.DE.N.VPI.C.A00000.I20.A'
rows = list(csv.DictReader(SOURCE.read_text(encoding='utf-8-sig').splitlines(), delimiter=';'))
expected = list(range(2020, 2026))
observations = []
for row in rows:
    assert row['BBK_ID'] == SERIES, 'Falsche Zeitreihe'
    assert row['BBK_STD_FREQ'] == 'A' and row['BBK_STD_ADJUSTMENT'] == 'N', 'Falsche Frequenz oder Bereinigung'
    assert row['BBK_UNIT'] == '2020=100', 'Falsche Basis'
    value = float(row['OBS_VALUE'])
    assert value > 0, 'Ungültiger Indexwert'
    observations.append({'year': int(row['TIME_PERIOD']), 'value': value})
observations.sort(key=lambda item: item['year'])
assert [item['year'] for item in observations] == expected, 'Fehlende oder doppelte Jahre'
metadata_rows = list(csv.reader(METADATA.read_text(encoding='utf-8-sig').splitlines(), delimiter=';'))
meta = {row[0]: row[1] for row in metadata_rows if len(row) >= 2}
# Zweiter offizieller Export muss dieselben Beobachtungen liefern.
for item in observations:
    assert float(meta[str(item['year'])].replace(',', '.')) == item['value'], 'Widersprüchliche Exporte'
reference = {
    'version': '2026-10-16',
    'title': 'Verbraucherpreisindex Deutschland – Gesamtindex',
    'provider': 'Deutsche Bundesbank',
    'originalSource': rows[0]['BBK_COMM_SRC'],
    'seriesId': SERIES,
    'sourceUrl': 'https://statistiken.bundesbank.de/statistiken-de/zeitreihen/BBDP1/A.DE.N.VPI.C.A00000.I20.A',
    'downloadUrl': 'https://api.statistiken.bundesbank.de/rest/data/BBDP1/A.DE.N.VPI.C.A00000.I20.A?startPeriod=2020&endPeriod=2025',
    'retrievedAt': '2026-10-16',
    'providerUpdatedAt': meta['Stand vom'],
    'frequency': 'Jahresdurchschnitt',
    'adjustment': 'Ursprungswerte, nicht saisonbereinigt',
    'baseYear': 2020,
    'unit': '2020=100',
    'attribution': 'Quelle: Deutsche Bundesbank; Ursprungsquelle: Statistisches Bundesamt, Wiesbaden.',
    'transformation': 'Für Vergleiche eigene Umbasierung: 100 × VPI(Jahr) / VPI(Startjahr). Kumulierte Veränderung: [VPI(Endjahr) / VPI(Startjahr) − 1] × 100.',
    'termsUrl': 'https://www.bundesbank.de/de/startseite/benutzerhinweise',
    'sourceFile': str(SOURCE.relative_to(ROOT)),
    'sourceSha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    'observations': observations,
}
(ROOT / 'dist/data/bundesbank-vpi.js').write_text(
    '// Erzeugt durch scripts/import-bundesbank-vpi.py. Nicht von Hand bearbeiten.\n'
    'const bundesbankVpi = Object.freeze(' + json.dumps(reference, ensure_ascii=False, indent=2) + ');\n', encoding='utf-8')
print(f'{len(observations)} Bundesbank-Jahreswerte validiert und bereitgestellt.')
