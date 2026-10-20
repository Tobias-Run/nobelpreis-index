"""Geprüft abgegrenzte Teilreihen aus unveränderten Recherchebelegen ableiten."""


def erstellen(beobachtungen):
    def punkt(oid, jahr, label, monat, zeitachse):
        o = beobachtungen[oid]
        assert not any(s in o['zeitstatus'] for s in ('angek', 'zukünftig'))
        return {'jahr': jahr, 'label': label, 'betrag': o['betrag'],
                'referenzmonat': monat, 'zeitachse': zeitachse,
                'preisdatum': o.get('preisdatum'), 'gueltigkeit': o.get('gültigkeit'),
                'beobachtung_ids': [oid], 'quelle_ids': [o['quelle_id']]}

    salem = [punkt(f'salem-archiv-{y}' if y < 2026 else 'salem-2026', y,
                   f'Schuljahr {y}/{str(y+1)[2:]}', f'{y}-09', f'{y}-09-01')
             for y in range(2021, 2027)]
    ski = [punkt(oid, y, f'Saison {y}/{str(y+1)[2:]}', f'{y}-12',
                 beobachtungen[oid]['gültigkeit']['von'])
           for y, oid in [(2023, 'ski-archiv-2023'), (2024, 'ski-beleg-2024'), (2025, 'ski-2025')]]
    reihen = [
        {'id': 'salem-grundtarif', 'produkt_id': 'salem', 'kurzname': 'Salem · Schul- und Internatsgeld',
         'einheit': 'EUR je Schuljahr (zwölf Monatsraten)', 'punkte': salem,
         'definition': 'Klasse 8, regulärer Schul- und Internatstarif ohne Rabatte, Kaution, Aufnahmegebühr und zusätzliche Leistungen.',
         'zeitbezug': 'VPI: September im Beginnjahr des Schuljahres. Jahresmarken bezeichnen Schuljahre, keine Kalenderjahreskosten. Die Datumsachse verwendet den Schuljahresanker 1. September, keinen behaupteten Abruf- oder Transaktionstag.',
         'grenze': 'Tarifrahmen anhand der Vertragsbedingungen geprüft. Keine Messung der tatsächlichen Bildungsqualität oder sämtlicher Haushaltsausgaben. 2027/28 ist angekündigt und ausgeschlossen.'},
        {'id': 'arlberg-skipass', 'produkt_id': 'skiurlaub-arlberg', 'kurzname': 'Arlberg · Sechstage-Skipass',
         'einheit': 'EUR je erwachsener Person und Sechstagepass', 'punkte': ski,
         'definition': 'Sechs unmittelbar aufeinanderfolgende Tage, Erwachsener, Hauptsaison, inklusive USt.; rückzahlbares Kartendepot separat.',
         'zeitbezug': 'VPI: Dezember im Beginnjahr der Wintersaison, entsprechend dem dokumentierten Beginn der Hauptsaison. Jahresmarken bezeichnen die Saison, keine vollständigen Kalenderjahre.',
         'grenze': 'Nur Skipass, kein Skiurlaub: ohne Hotel, Anreise, Verpflegung und Ausrüstung. Keine Annahme unveränderter Pistenkilometer oder Liftzahl. Veröffentlichte teils vorläufige Tarife, keine Transaktionen. 2026/27 ist angekündigt und ausgeschlossen.'},
    ]
    for start, end, suffix, ref in [(2019, 2023, '2019-2023', '201.027 / LA100063'), (2024, 2026, '2024-2026', '201.027-LB / LB100063')]:
        punkte = []
        for y in range(start, end+1):
            oid = f'saxonia-wempe-archiv-{y}' if y < 2026 else 'saxonia-wempe-2026'
            datum = beobachtungen[oid]['preisdatum']
            punkte.append(punkt(oid, y, datum[8:10]+'.'+datum[5:7]+'.'+datum[:4], datum[:7], datum))
        reihen.append({'id': 'saxonia-'+suffix, 'produkt_id': 'saxonia-thin',
                       'kurzname': 'Saxonia Thin · '+ref, 'einheit': 'EUR je neuer Uhr inklusive MwSt.',
                       'punkte': punkte, 'definition': 'Wempe-Händlerangebot, Weißgold 37 mm, schwarzes Alligatorband, Stiftschließe. Referenz '+ref+'. Keine bestätigte Hersteller-UVP oder Transaktion.',
                       'zeitbezug': 'VPI: tatsächlicher Monat des datierten Angebotsstands. Ungleiche Beobachtungsabstände, keine Jahresdurchschnitte. Ein noch nicht veröffentlichter VPI-Monat bleibt leer; kein Ersatz durch den Vormonat.',
                       'grenze': 'Die Referenzen 201.027 und 201.027-LB werden nicht verkettet. Bedeutung des LB-Zusatzes bleibt offen. 2020 enthält den Zeitraum der deutschen Mehrwertsteuersenkung; keine reine Netto-Preisänderung. Zwischen den Belegen ist der tatsächliche Preisverlauf unbekannt.'})
    assert len({s['id'] for s in reihen}) == len(reihen)
    for s in reihen:
        s['indexfreigabe'] = False
        assert all(p['betrag'] > 0 for p in s['punkte'])
    return reihen
