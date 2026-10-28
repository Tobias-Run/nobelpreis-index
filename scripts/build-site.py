#!/usr/bin/env python3
"""Eine HTML-Vorlage für Hauptseite und bestehende /zeitreihe/-Links."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
x=json.loads((ROOT/'data/release.json').read_text())
raw=json.loads((ROOT/x['recherche']).read_text());choice=json.loads((ROOT/x['jahresvergleich']).read_text())
active_count=len(choice['positionen']);archive_count=len(raw['produkte'])-active_count
template=(ROOT/'site/index.html').read_text()
for output,assets,home,demo,korrekturen in [
 ('index.html','zeitreihe/','./','design-demo/','korrekturen.html'),
 ('zeitreihe/index.html','','../','../design-demo/','../korrekturen.html')]:
    content=template
    for key,value in {'ASSETS':assets,'HOME':home,'DEMO':demo,'KORREKTUREN':korrekturen,'STAND':'.'.join(reversed(x['ansicht_stand'].split('-'))),'ACTIVE_COUNT':str(active_count),'ARCHIVE_COUNT':str(archive_count),'DOCUMENTED_COUNT':str(len(raw['produkte']))}.items():
        content=content.replace('{{'+key+'}}',value)
    (ROOT/'dist'/output).write_text(content)

chosen={p['produkt_id']:p for p in choice['positionen']}
review=json.loads((ROOT/x['fachpruefung']).read_text());checks={p['produkt_id']:p for p in review['positionen']}
register={'schema_version':'1.1-aktive-und-archivierte-positionen','stand':raw['stand'],'hinweis':f'{active_count} aktive Referenzen, {archive_count} ersetzte Kandidaten als Archiv. Historische Gewichtungsszenarien bleiben eingefroren.','produkte':[]}
for p in raw['produkte']:
    register['produkte'].append({'id':p['id'],'name':p['name'],'auswahlstatus':p['auswahlstatus'],'dossier':p['dossier'],'datendatei':x['recherche'],'anzahl_beobachtungen':len(p['beobachtungen'])+len(p['zusätzliche_historische_beobachtungen']),'indexfreigabe':p['indexfreigabe'],'rechercheentscheidung':checks[p['id']]['belegstatus'],**({'ersetzt_durch':p['ersetzt_durch']} if p.get('ersetzt_durch') else {}),**({'ersetzt':p['ersetzt']} if p.get('ersetzt') else {})})
(ROOT/'data/research/produktregister.json').write_text(json.dumps(register,ensure_ascii=False,indent=2)+'\n')
lines=['# Produktstatus · aktueller Forschungsstand','',f"Datenstand: {raw['stand']}. {active_count} aktive Referenzen mit Vergleichspaaren, {archive_count} ersetzte Rechercheideen im Archiv. Gleiche Gewichte von je 1/{active_count}; keine produktive redaktionelle Gesamtindexfreigabe. [Ersatzentscheidung, Preispaare und neue Zusammensetzung](belegte-alternativen-2026-10-27.md).",'','| Position | Rohbeobachtungen | Jahresrunde / Zeitregel | Ergebnis / Abgrenzung |','|---|---:|---|---|']
for p in sorted(raw['produkte'],key=lambda p:p['auswahlstatus']=='archiviert_ersetzt'):
 c=chosen.get(p['id']);count=len(p['beobachtungen'])+len(p['zusätzliche_historische_beobachtungen'])
 note=checks[p['id']]['belegstatus']+'. '+checks[p['id']]['naechste_aktion']
 status=f"Je 1/{active_count} · "+c['zeitregel'] if c else 'Archiviert · ersetzt durch '+p['ersetzt_durch']
 lines.append(f"| [{p['name']}](../{p['dossier']}) | {count} | {status} | {note.replace('|','/')} |")
lines+=['','Rohbeobachtungen enthalten Komponenten und Zukunftstarife. Hotelbeträge werden mit festen Erwachsenen-/Nächtefaktoren aus den veröffentlichten Tarifen berechnet; keine Mischung alter und neuer Produkte. Herbst-VPI nur bei vollständigem September/Oktober-Fenster.','']
(ROOT/'docs/produktstatus.md').write_text('\n'.join(lines))
