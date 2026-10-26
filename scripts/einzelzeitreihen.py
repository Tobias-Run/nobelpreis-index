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
    neu = [
        ('cayenne-modellpreis', 'porsche-cayenne', 'Cayenne · nominaler Modell-Grundpreis',
         [(2023,'cayenne-2023'),(2024,'cayenne-2024'),(2025,'cayenne-archiv-2025'),(2026,'cayenne-2026')],
         'Basis-Benziner SUV 260 kW/353 PS, deutscher Modell-Grundpreis ohne Extras.',
         'Nominaler Modellpreis. Serienausstattung und Pflichtnebenkosten nicht qualitätsbereinigt; kein Wechsel zu Turbo/Hybrid.'),
        ('charger5-modellpreis', 'rm-charger5', 'Charger5 vario · nominaler Modellpreis',
         [(2025,'rm-archiv-2025-basis'),(2026,'rm-2026')],
         'Charger5 vario Modell-Ab-Preis, keine erfundene vollständige pine/L-Konfiguration.',
         'Gabel und Nabe ändern sich: SR Suntour/Heavy Duty zu Fox/Utility V1. Modellpreisgeschichte, keine reine Inflation gleicher Ausstattung.'),
        ('lanserhof-classic-plus', 'lanserhof-sylt', 'Lanserhof · Classic Plus, ohne Zimmer',
         [(2025,'lanserhof-2025-plus'),(2026,'lanserhof-2026-classic-plus')],
         'Höhere Grundprogramm-Variante Classic Plus, eine Person, 7–8 Nächte, ohne Unterkunft.',
         'Gleiche Premium-Programmstufe; Anwendungsgleichheit für Classic Plus nicht vollständig geprüft. Nominaler Paketpreis; keine vollständige Kur oder Qualitätsbereinigung. Keine Auffüllung für 2024.'),
        ('schwarzwaldstube-menue-ii', 'schwarzwaldstube-menue-ii', 'Schwarzwaldstube · nominaler Menü-II-Preis',
         [(2024,'schwarzwald-original-archiv-2024'),(2025,'schwarzwald-original-archiv-2025-10'),(2026,'schwarzwald-2026-menue')],
         'Menü II mit sieben Positionen ohne Getränke; 2024 und Oktober 2025 archivierte Originalkarten, Oktober 2026 aktuelle Originalkarte.',
         '325 EUR im Oktober-2025-Archiv, bereits 385 EUR im Dezember-2025-Original. Kein erst 2026 erfolgter Preissprung. Gerichte und Steuerbedingungen ändern sich; nominale Premium-Menüstufe, keine Qualitätsbereinigung. Großes Menü 2021 wird nicht angehängt.'),
    ]
    for sid,pid,name,auswahl,definition,grenze in neu:
        punkte=[]
        for y,oid in auswahl:
            o=beobachtungen[oid];datum=o.get('preisdatum')
            # Programmbroschüren sind jahresbezogen, ohne einzelnen Preisstichtag.
            monat=datum[:7] if datum else f'{y}-08'
            zeitachse=datum if datum else f'{y}-08-01'
            beschriftung=datum[8:10]+'.'+datum[5:7]+'.'+datum[:4] if datum else f'Broschüre {y}'
            punkte.append(punkt(oid,y,beschriftung,monat,zeitachse))
        reihen.append({'id':sid,'produkt_id':pid,'kurzname':name,'einheit':'EUR · '+beobachtungen[auswahl[0][1]]['einheit'],'punkte':punkte,'definition':definition,'grenze':grenze,
                       'zeitbezug':'VPI: tatsächlicher Beobachtungsmonat; bei jahresbezogenen Lanserhof-Broschüren August als ausdrücklich gewählter Jahresanker, kein behaupteter Preisstichtag. Fehlende VPI-Monate bleiben leer.'})
    assert len({s['id'] for s in reihen}) == len(reihen)
    for s in reihen:
        s['indexfreigabe'] = False
        assert all(p['betrag'] > 0 for p in s['punkte'])
    return reihen
