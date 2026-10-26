"""Gemeinsame Eingangsprüfung für Forschungsarchive und Vergleichsauswahl."""
import datetime as dt
import math
import re
from urllib.parse import urlsplit

class Datenfehler(ValueError):
    pass

def verlangen(ok, ort, grund):
    if not ok:
        raise Datenfehler(f'{ort}: {grund}')

def datum(wert, ort):
    verlangen(isinstance(wert, str) and re.fullmatch(r'\d{4}-\d{2}-\d{2}', wert), ort, 'Datum im Format JJJJ-MM-TT erforderlich')
    try:
        return dt.date.fromisoformat(wert)
    except ValueError as error:
        raise Datenfehler(f'{ort}: ungültiges Kalenderdatum {wert}') from error

def text(wert, ort):
    verlangen(isinstance(wert, str) and bool(wert.strip()), ort, 'nicht leeres Textfeld erforderlich')

def zukunft(o, stand):
    gueltig = o.get('gültigkeit') or {}
    return (bool(re.search(r'zukunft|zukünftig|künftig|angek', o['zeitstatus'], re.I))
            or bool(o.get('preisdatum') and o['preisdatum'] > stand)
            or bool(gueltig.get('von') and gueltig['von'] > stand))

def pruefen(roh, auswahl):
    """Zukunftspreise im Archiv sind erlaubt; ausgewählte Preise dürfen nicht zukünftig sein."""
    datum(roh['stand'], 'Recherche.stand')
    datum(auswahl['stand'], 'Auswahl.stand')
    verlangen(auswahl['stand'] <= roh['stand'], 'Auswahl', 'Stand liegt nach dem Recherche-Stichtag')
    quellen = {}
    for q in roh['quellen']:
        ort = 'Quelle ' + str(q.get('id'))
        text(q.get('id'), ort)
        verlangen(q['id'] not in quellen, ort, 'doppelte Quellen-ID')
        for k in ['titel', 'url', 'weiterverwendungsrechte']:
            text(q.get(k), f'{ort}.{k}')
        u = urlsplit(q['url'])
        verlangen(u.scheme in ['http', 'https'] and u.netloc, ort, 'ungültige Quellen-URL')
        datum(q.get('abgerufen_am'), f'{ort}.abgerufen_am')
        if q.get('sha256'):
            verlangen(bool(re.fullmatch('[a-f0-9]{64}', q['sha256'])), ort, 'ungültige SHA-256-Prüfsumme')
        quellen[q['id']] = q
    produkte, beobachtungen, eigentuemer = {}, {}, {}
    for p in roh['produkte']:
        ort = 'Produkt ' + str(p.get('id'))
        text(p.get('id'), ort)
        verlangen(p['id'] not in produkte, ort, 'doppelte Produkt-ID')
        for k in ['name', 'definition', 'kategorie', 'markt', 'währung', 'dossier']:
            text(p.get(k), f'{ort}.{k}')
        verlangen(p['währung'] == 'EUR', ort, 'nur Europreise im deutschen Vergleich')
        verlangen(isinstance(p.get('indexfreigabe'), bool), ort, 'expliziter Freigabestatus erforderlich')
        produkte[p['id']] = p
        for o in p['beobachtungen'] + p['zusätzliche_historische_beobachtungen']:
            oid = o.get('id'); ort = 'Beobachtung ' + str(oid)
            text(oid, ort)
            verlangen(oid not in beobachtungen, ort, 'doppelte Beobachtungs-ID')
            betrag = o.get('betrag')
            verlangen(isinstance(betrag, (int, float)) and not isinstance(betrag, bool) and math.isfinite(betrag) and betrag > 0, ort, 'positiver endlicher Preis erforderlich')
            for k in ['einheit', 'preisart', 'umsatzsteuer', 'zeitstatus', 'prüfstatus']:
                text(o.get(k), f'{ort}.{k}')
            verlangen(o.get('quelle_id') in quellen, ort, 'unbekannte Quelle')
            verlangen(all(q in quellen for q in o.get('zusatz_quelle_ids', [])), ort, 'unbekannte Zusatzquelle')
            abruf = datum(o.get('abgerufen_am'), f'{ort}.abgerufen_am')
            verlangen(abruf <= datum(roh['stand'], 'Recherche.stand'), ort, 'Abruf liegt nach dem Recherche-Stichtag')
            verlangen('preisdatum' in o and 'gültigkeit' in o, ort, 'Preisdatum und Gültigkeit explizit erfassen, gegebenenfalls null')
            if o['preisdatum'] is not None:
                datum(o['preisdatum'], f'{ort}.preisdatum')
            g = o['gültigkeit']
            verlangen(g is None or isinstance(g, dict), ort, 'Gültigkeit muss Objekt oder null sein')
            if g:
                for k in ['von', 'bis']:
                    if g.get(k): datum(g[k], f'{ort}.gültigkeit.{k}')
                if g.get('von') and g.get('bis'):
                    verlangen(g['von'] <= g['bis'], ort, 'Gültigkeitsende liegt vor Beginn')
            verlangen(isinstance(o.get('indexfreigabe'), bool), ort, 'expliziter Freigabestatus erforderlich')
            beobachtungen[oid] = o; eigentuemer[oid] = p['id']
    gewaehlt = set()
    gewichte = []
    for p in auswahl['positionen']:
        pid = p['produkt_id']; ort = 'Auswahl ' + pid
        verlangen(pid in produkte and pid not in gewaehlt, ort, 'unbekanntes oder doppeltes Produkt')
        gewaehlt.add(pid)
        g=p.get('gewicht_bruch',{})
        verlangen(isinstance(g.get('zaehler'),int) and not isinstance(g.get('zaehler'),bool) and isinstance(g.get('nenner'),int) and not isinstance(g.get('nenner'),bool) and g['zaehler']>0 and g['nenner']>0, ort, 'positiver Gewichtsbruch erforderlich')
        gewichte.append(g['zaehler']/g['nenner'])
        for k in ['referenzentscheidung', 'grenze']:
            text(p.get(k), f'{ort}.{k}')
        verlangen(set(p['beobachtung_ids']) == {str(y) for y in auswahl['jahre']}, ort, 'Belege für alle gewählten Jahre erforderlich')
        for jahr, ids in p['beobachtung_ids'].items():
            verlangen(bool(ids) and len(ids) == len(set(ids)), ort, f'leere oder doppelte Belegauswahl {jahr}')
            for oid in ids:
                verlangen(oid in beobachtungen and eigentuemer[oid] == pid, ort, f'{oid}: Beleg gehört nicht zum gewählten Produkt')
                verlangen(not zukunft(beobachtungen[oid], roh['stand']), oid, 'Zukunftspreis darf nicht im laufenden Vergleich verwendet werden')
    verlangen(bool(gewichte) and all(math.isclose(g,1/len(gewichte)) for g in gewichte), 'Auswahl', 'Berechnung unterstützt feste gleiche Gewichte; andere Gewichtung benötigt eigene Methodik')
    ausgeschlossen = [p['produkt_id'] for p in auswahl['nicht_im_vergleich']]
    verlangen(len(ausgeschlossen) == len(set(ausgeschlossen)) and not gewaehlt.intersection(ausgeschlossen), 'Auswahl', 'doppelte oder widersprüchliche Ausschlüsse')
    verlangen(gewaehlt.union(ausgeschlossen) == set(produkte), 'Auswahl', 'alle Rechercheprodukte zuordnen')
    return beobachtungen
