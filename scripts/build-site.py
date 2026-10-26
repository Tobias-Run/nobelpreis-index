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

raw=json.loads((ROOT/x['recherche']).read_text());choice=json.loads((ROOT/x['herbstvergleich']).read_text())
chosen={p['produkt_id']:p for p in choice['positionen']}
review=json.loads((ROOT/x['fachpruefung']).read_text());checks={p['produkt_id']:p for p in review['positionen']}
register=json.loads((ROOT/'data/research/produktregister.json').read_text())
for item in register['produkte']:
    p=next(p for p in raw['produkte'] if p['id']==item['id'])
    item.update(datendatei=x['recherche'],anzahl_beobachtungen=len(p['beobachtungen'])+len(p['zusätzliche_historische_beobachtungen']),rechercheentscheidung=checks[p['id']]['belegstatus'])
(ROOT/'data/research/produktregister.json').write_text(json.dumps(register,ensure_ascii=False,indent=2)+'\n')
lines=['# Produktstatus · aktueller Forschungsstand','',f"Datenstand: {raw['stand']}. Erzeugt aus dem aktiven Release. Alle neun jährlichen Zeitzuordnungen sind geprüft; keine produktive Gesamtindexfreigabe. Die vier Backlog-Positionen bleiben außerhalb der festen Zusammensetzung. [Zeitregeln und vollständige Belegprüfung](jahresfenster-und-restbelege-2026-10-26.md).",'','| Position | Rohbeobachtungen | Jahresrunde / Zeitregel | Ergebnis / nächste Aufgabe |','|---|---:|---|---|']
for p in raw['produkte']:
 c=chosen.get(p['id']);count=len(p['beobachtungen'])+len(p['zusätzliche_historische_beobachtungen'])
 note=checks[p['id']]['belegstatus']+'. '+checks[p['id']]['naechste_aktion']
 status='Je 1/9 · '+c['zeitregel'] if c else 'Backlog · externen Preisbeleg benötigen'
 lines.append(f"| [{p['name']}](../{p['dossier']}) | {count} | {status} | {note.replace('|','/')} |")
lines+=['','Rohbeobachtungen enthalten Komponenten, Varianten und Zukunftstarife. Keine Auffüllung. Jahres-/Saisontarife und Herbst-Angebotsstände sind keine gleichzeitig beobachteten Haushaltsausgaben. Der Bundesbank-Herbstanker erfordert beide Monatswerte; Oktober 2026 bleibt bis zum Originalbeleg leer.','']
(ROOT/'docs/produktstatus.md').write_text('\n'.join(lines))
