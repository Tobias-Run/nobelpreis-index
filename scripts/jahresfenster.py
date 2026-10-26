"""Feste Jahresrunden mit belegten Herbstständen und ausdrücklichen Saisonregeln."""
import datetime as dt
import re
from datenpruefung import datum, verlangen, pruefen


def erstellen(roh, rezept):
    beobachtungen = pruefen(roh, rezept)
    verlangen(rezept['jahre'] == sorted(set(rezept['jahre'])) and len(rezept['jahre']) >= 2,
              'Jahresfenster', 'mindestens zwei geordnete Jahre erforderlich')
    verlangen(len(rezept['positionen']) == 9, 'Jahresfenster', 'feste Neuner-Zusammensetzung erforderlich')
    verlangen(rezept['referenz']['monate'] == [9, 10], 'Jahresfenster', 'Referenz ist das vollständige September/Oktober-Mittel')
    verlangen({k: rezept['erhebungsfenster'][k] for k in ['von_mm_tt', 'bis_mm_tt', 'ziel_mm_tt']} ==
              {'von_mm_tt': '09-01', 'bis_mm_tt': '10-31', 'ziel_mm_tt': '10-15'},
              'Jahresfenster', 'Erhebungsfenster nicht stillschweigend verschieben')
    eigentuemer = {o['id']: p['id'] for p in roh['produkte'] for o in p['beobachtungen']+p['zusätzliche_historische_beobachtungen']}
    regeln = {'herbst', 'schuljahr', 'jahresbroschuere', 'festspieljahr', 'sommersaison', 'winterendjahr'}
    reihen = []
    protokoll = []
    for p in rezept['positionen']:
        pid, regel = p['produkt_id'], p['zeitregel']
        verlangen(regel in regeln, pid, 'unbekannte Zeitregel')
        verlangen(set(p['zeitzuordnung']) == {str(y) for y in rezept['jahre']}, pid, 'Zeitzuordnung für jedes Jahr erforderlich')
        punkte = []
        for jahr in rezept['jahre']:
            zuordnung = p['zeitzuordnung'][str(jahr)]
            ids = p['beobachtung_ids'][str(jahr)]
            os = [beobachtungen[i] for i in ids]
            verlangen(zuordnung['jahr'] == jahr, pid, 'abweichendes Tarifjahr')
            verlangen(bool(zuordnung.get('begruendung')), pid, 'belegte Zeitbegründung erforderlich')
            for o in os:
                g = o.get('gültigkeit') or {}
                label = g.get('bezeichnung', '')
                ort = f'{pid}/{jahr}/{o["id"]}'
                if regel == 'herbst':
                    tag = datum(o.get('preisdatum'), ort)
                    verlangen(dt.date(jahr, 9, 1) <= tag <= dt.date(jahr, 10, 31), ort, 'Preis liegt außerhalb des Herbstfensters')
                    # Nur innerhalb derselben, vorab festgelegten Preisdefinition auswählen.
                    kandidaten = [beobachtungen[i] for i in p['kandidaten'][str(jahr)]]
                    verlangen(all(eigentuemer[k['id']] == pid and k['einheit'] == o['einheit'] for k in kandidaten),
                              ort, 'Kandidaten müssen zu Produkt und Tarifeinheit gehören')
                    erlaubte = [k for k in kandidaten if k.get('preisdatum') and f'{jahr}-09-01' <= k['preisdatum'] <= f'{jahr}-10-31']
                    ziel = dt.date(jahr, 10, 15)
                    verlangen(bool(erlaubte), ort, 'kein Herbstbeleg')
                    bester = min(erlaubte, key=lambda k: (abs((dt.date.fromisoformat(k['preisdatum'])-ziel).days), k['preisdatum'], k['id']))
                    verlangen(len(ids) == 1 and o['id'] == bester['id'], ort, 'belegten Stand am nächsten zum 15. Oktober verwenden')
                elif regel == 'schuljahr':
                    verlangen(bool(re.search(rf'{jahr}\D+{jahr+1}', label)), ort, 'Schuljahr muss im Indexjahr beginnen')
                    if g.get('von'): verlangen(g['von'] == f'{jahr}-09-01', ort, 'abweichender Schuljahresbeginn')
                elif regel == 'jahresbroschuere':
                    verlangen(str(jahr) in label, ort, 'Broschürenjahr nicht belegt')
                    if g.get('von'): verlangen(g['von'][:4] == str(jahr), ort, 'abweichendes Tarifjahr')
                elif regel == 'festspieljahr':
                    verlangen(bool(re.search(rf'Festspielsaison\s+{jahr}\b', label)), ort, 'abweichende Festspielsaison')
                elif regel == 'sommersaison':
                    verlangen(str(jahr) in label and bool(g.get('von')) and g['von'][:4] == str(jahr), ort, 'Sommergebühr des Indexjahres erforderlich')
                else:
                    verlangen(bool(g.get('von')) and bool(g.get('bis')) and g['von'][:4] == str(jahr-1) and g['bis'][:4] == str(jahr), ort, 'Wintersaison muss im Indexjahr enden')
                verlangen(o.get('preisdatum', roh['stand']) is None or o.get('preisdatum', roh['stand']) <= roh['stand'], ort, 'Beobachtung liegt nach dem Datenstand')
            punkt = {'jahr': jahr, 'betrag': sum(o['betrag'] for o in os), 'beobachtung_ids': ids,
                     'quelle_ids': list(dict.fromkeys(o['quelle_id'] for o in os)),
                     'label': zuordnung['label'], 'zeitregel': regel,
                     'zeitbegruendung': zuordnung['begruendung'],
                     'preisdatum': os[0].get('preisdatum'),
                     'gueltigkeit': os[0].get('gültigkeit'),
                     'referenzmonate': [f'{jahr}-09', f'{jahr}-10']}
            punkte.append(punkt)
            protokoll.append({'produkt_id': pid, **punkt, 'zeitpruefung': 'bestanden'})
        reihen.append({'id': pid, 'kurzname': p['name'], 'einheit': p['einheit'],
                       'definition': p['referenzentscheidung'], 'grenze': p['grenze'], 'zeitregel': regel, 'punkte': punkte})
    return {'rezept': rezept, 'reihen': reihen, 'zeitpruefung': protokoll,
            'zeitregeln_geprueft': True, 'indexfreigabe': False,
            'hinweis': 'Feste jährliche Angebots-/Tarifrunde, kein gleichzeitiges Preisniveau und kein Kalenderjahresbudget. Herbst-VPI dient der Einordnung.'}
