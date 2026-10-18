"""Redaktionelle Szenarien; keine Schätzung deutscher Haushaltsausgaben."""
from fractions import Fraction as F


def erstellen(register, original, pilot):
    produkte = register['produkte']
    ids = [p['id'] for p in produkte]
    gruppen = {
        'Mobilität': ['porsche-cayenne', 'rm-charger5'],
        'Persönlicher Luxus': ['saxonia-thin', 'hermes-kelly'],
        'Reisen und Freizeit': ['lanserhof-sylt', 'skiurlaub-arlberg', 'liegeplatz-ycl', 'hotel-adlon-deluxe'],
        'Genuss und Kultur': ['schwarzwaldstube-menue-ii', 'bayreuth-parsifal'],
        'Bildung': ['salem'],
        'Wohnen und Service': ['alarmaufschaltung', 'hausbetreuung-sylt'],
    }
    assert sorted(i for g in gruppen.values() for i in g) == sorted(ids)
    zuordnung = {
        'bicycle': ('rm-charger5', 'kategorisch'),
        'car': ('porsche-cayenne', 'kategorisch'),
        'watch': ('saxonia-thin', 'kategorisch'),
        'womens_handbag': ('hermes-kelly', 'kategorisch'),
        'fine_dining': ('schwarzwaldstube-menue-ii', 'kategorisch'),
        'private_school': ('salem', 'kategorisch'),
        'hotel_suite': ('hotel-adlon-deluxe', 'bedingt'),
        'spa': ('lanserhof-sylt', 'bedingt'),
    }
    abgleich = []
    for c in original['julius_baer']['komponenten']:
        pid, status = zuordnung.get(c['id'], (None, 'bewusst_ausgeschlossen' if c['id'] == 'residential_property' else 'nicht_abgedeckt'))
        abgleich.append({'komponente_id': c['id'], 'komponente': c['komponente'], 'produkt_id': pid, 'status': status})
    # Originales Verhältnis Auto : sonstige Position = (1/10) : (7/180).
    originalgewichte = {c['id']: F(c['anteil_bruch']['zaehler'], c['anteil_bruch']['nenner']) for c in original['julius_baer']['komponenten']}
    andere = {w for i, w in originalgewichte.items() if i not in ('car', 'residential_property')}
    assert len(originalgewichte) == 20 and sum(originalgewichte.values()) == 1
    assert len(andere) == 1, 'Keine einheitlichen sonstigen Originalgewichte; neue Szenarioversion erforderlich'
    sonstig = andere.pop()
    roh = {i: originalgewichte['car'] if i == 'porsche-cayenne' else sonstig for i in ids}
    nenner = sum(roh.values())
    modelle = [
        ('gleich', 'Gleiche Produktgewichte', {i: F(1, len(ids)) for i in ids}),
        ('jb-relativ', 'Julius-Bär-relativ', {i: w / nenner for i, w in roh.items()}),
        ('kategorien', 'Gleiche Kategoriegewichte', {i: F(1, len(gruppen) * len(g)) for g in gruppen.values() for i in g}),
    ]
    pilot_ids = {s['id'] for s in pilot}
    assert pilot_ids <= set(ids)
    # Nur vorhandene Pilotpreise 2025/26; keine Schätzung der übrigen elf Reihen.
    aenderungen = {}
    for s in pilot:
        preise = {p['jahr']: F(str(p['betrag'])) for p in s['punkte']}
        aenderungen[s['id']] = preise[2026] / preise[2025] - 1
    szenarien = []
    for sid, name, gewichte in modelle:
        assert set(gewichte) == set(ids) and sum(gewichte.values()) == 1
        abdeckung = sum(gewichte[i] for i in pilot_ids)
        bedingt = sum(gewichte[i] * aenderungen[i] for i in pilot_ids) / abdeckung
        szenarien.append({
            'id': sid, 'name': name,
            'gewichte': [{'produkt_id': i, 'anteil_bruch': {'zaehler': w.numerator, 'nenner': w.denominator}, 'gewicht_prozent': float(100*w)} for i, w in gewichte.items()],
            'pilot_abdeckung_prozent': float(100*abdeckung),
            'fehlendes_gewicht_prozent': float(100*(1-abdeckung)),
            'gesamtindex': None,
            'zweier_test_2025_2026_prozent': float(100*bedingt),
            'synthetischer_autoimpuls_prozentpunkte': float(10*gewichte['porsche-cayenne']),
        })
    return {
        'schema_version': '1.0-szenarien', 'stand': '2026-10-18',
        'status': 'Experimentelle redaktionelle Gewichte, keine Indexfreigabe oder gemessenen Ausgabenanteile',
        'universum': 'Alle 13 Recherchepositionen einschließlich zweier zusätzlicher Vorschläge; keine beschlossene MVP-Auswahl',
        'formel': 'I(t) = 100 × Σ[w_i × p_i(t)/p_i(b)], Σw_i = 1; feste Zusammensetzung und Gewichte',
        'basis': 'gewichtung-2026-10-17.json; Produktregister und Recherche vom 2026-10-17',
        'gruppen': gruppen, 'abgleich_julius_baer': abgleich,
        'zusaetzliche_positionen': [i for i in ids if i not in {v[0] for v in zuordnung.values()}],
        'pilot_positionen': sorted(pilot_ids), 'szenarien': szenarien,
        'testhinweis': 'Zweier-Test: Gewichte ausschließlich für Bayreuth/YCL bedingt neu normiert. Kein Ergebnis des vollständigen Warenkorbs. Der bestehende Pilot bleibt 50/50.',
        'impulshinweis': 'Rein synthetisch: Cayenne +10 %, alle anderen Preise unverändert. Keine historische Beobachtung oder Prognose.',
        'lueckenhinweis': 'Pilotabdeckung bezeichnet geplantes Gewicht der zwei vorhandenen Teilreihen, keine redaktionelle Freigabe oder Vollpreisabdeckung. Fehlende Gewichte werden im Gesamtindex nicht umverteilt.',
    }
