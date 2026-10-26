#!/usr/bin/env python3
"""Eine HTML-Vorlage für Hauptseite und bestehende /zeitreihe/-Links."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
x=json.loads((ROOT/'data/release.json').read_text())
template=(ROOT/'site/index.html').read_text()
for output,assets,home,demo,korrekturen in [
 ('index.html','zeitreihe/','./','design-demo/','korrekturen.html'),
 ('zeitreihe/index.html','','../','../design-demo/','../korrekturen.html')]:
    content=template
    for key,value in {'ASSETS':assets,'HOME':home,'DEMO':demo,'KORREKTUREN':korrekturen,'STAND':'.'.join(reversed(x['ansicht_stand'].split('-')))}.items():
        content=content.replace('{{'+key+'}}',value)
    (ROOT/'dist'/output).write_text(content)

raw=json.loads((ROOT/x['recherche']).read_text());choice=json.loads((ROOT/x['auswahl']).read_text())
chosen={p['produkt_id']:p for p in choice['positionen']}
lines=['# Produktstatus · aktueller Forschungsstand','',f"Datenstand: {raw['stand']}. Erzeugt aus dem aktiven Release. Nominale Auswahl ist keine produktive Indexfreigabe. Die Premium-Auswahlregel gilt; fehlende Belege bleiben offen.",'','| Position | Rohbeobachtungen | Nominale Auswahl | Abgrenzung / nächste Aufgabe |','|---|---:|---|---|']
for p in raw['produkte']:
 c=chosen.get(p['id']);count=len(p['beobachtungen'])+len(p['zusätzliche_historische_beobachtungen'])
 note=c['grenze'] if c else next(q['rest'] for q in choice['nicht_im_vergleich'] if q['produkt_id']==p['id'])
 if p['id']=='schwarzwaldstube-menue-ii':note='Recherche abgeschlossen: gleicher Premiumtarif, Oktobervergleich. Passenden Oktober-VPI abwarten; unbekannte betriebliche Ursachen blockieren die Preisgeschichte nicht.'
 lines.append(f"| [{p['name']}](../{p['dossier']}) | {count} | {'Ja · je 1/9' if c else 'Backlog'} | {note.replace('|','/')} |")
lines+=['','Rohbeobachtungen enthalten Komponenten, Varianten und Zukunftstarife. Keine Auffüllung. Weitergehende Änderungen an Zeitkonventionen oder Ausgabengewichten benötigen eine eigene begründete Entscheidung.','']
(ROOT/'docs/produktstatus.md').write_text('\n'.join(lines))
