# Offizielle VPI-Referenz über die Bundesbank

## Auswahl

Verwendet wird die Bundesbank-Zeitreihe **BBDP1.A.DE.N.VPI.C.A00000.I20.A**:

- Deutschland, Verbraucherpreisindex insgesamt.
- Jährliche Ursprungswerte, nicht saisonbereinigt.
- Jahresdurchschnitte, Basis 2020 = 100.
- Quelle: Deutsche Bundesbank; Ursprungsquelle laut Export: Statistisches Bundesamt, Wiesbaden.

[Zeitreihe und Metadaten](https://statistiken.bundesbank.de/statistiken-de/zeitreihen/BBDP1/A.DE.N.VPI.C.A00000.I20.A)

Es handelt sich weder um einen eigenen Verbraucherpreisindex der Bundesbank noch um den harmonisierten HVPI, eine Prognose oder die monatliche Inflationsrate. Für den vorliegenden Jahresvergleich wird bewusst kein unvollständiges Jahr 2026 ergänzt.

## Verwendete Beobachtungen

| Jahr | Jahresdurchschnitt, 2020 = 100 |
| --- | --- |
| 2020 | 100,0 |
| 2021 | 103,1 |
| 2022 | 110,2 |
| 2023 | 116,7 |
| 2024 | 119,3 |
| 2025 | 121,9 |

Abrufdatum: **16.10.2026**. Stand laut Metadatenexport: **13.10.2026, 08:17:55 Uhr** (Zeitzone im Export nicht angegeben).

## Quellenbelege und Reproduktion

- `data/sources/bundesbank-vpi-2020-2025-2026-10-16.csv`: unveränderte API-Antwort für 2020–2025, semikolongetrennt, englische Dezimalpunkte. Abruf über [Daten-Endpunkt](https://api.statistiken.bundesbank.de/rest/data/BBDP1/A.DE.N.VPI.C.A00000.I20.A?startPeriod=2020&endPeriod=2025) mit HTTP-Header `Accept: text/csv`.
- `data/sources/bundesbank-vpi-metadaten-2026-10-16.csv`: unveränderter deutscher Export mit Metadaten und vollständiger Historie. Der [Download-Endpunkt](https://api.statistiken.bundesbank.de/rest/download/BBDP1/A.DE.N.VPI.C.A00000.I20.A?format=csv&lang=de&startPeriod=2020&endPeriod=2025) lieferte trotz Zeitraumparametern die vollständige Reihe; verwendet wird nur 2020–2025.
- `scripts/import-bundesbank-vpi.py`: prüft Zeitreihenschlüssel, Basis, Frequenz, Bereinigung, eindeutige vollständige Jahre und Übereinstimmung beider Exporte; erzeugt `dist/data/bundesbank-vpi.js` inklusive Quellenmetadaten und SHA-256 des Datenbelegs.
- `tests/reference.test.cjs`: prüft importierte Werte gegen den CSV-Beleg sowie Basisnormierung und kumulierte Veränderungen für alle angebotenen Vergleichszeiträume.

Die Browseranwendung lädt den versionierten Datenstand lokal. Ein Ausfall der Bundesbank-API verändert oder ersetzt keine Werte. Neue Abrufe werden mit Abrufdatum und Belegen gesondert versioniert; es gibt keine automatische stille Aktualisierung.

## Berechnung und Einordnung

```text
VPI-Vergleichsindex(t, b) = 100 × VPI(t) / VPI(b)
Kumulierte Veränderung (%) = [VPI(Ende) / VPI(Basis) − 1] × 100
Hypothetischer Produktpreis = Demo-Ausgangspreis × VPI(Ende) / VPI(Basis)
```

2020–2025: **+21,9 %**. Das ist der Vergleich von Jahresdurchschnitten, nicht Dezember 2020 bis Dezember 2025. Die jährlichen Inflationsraten werden nicht addiert. Die auf eine Nachkommastelle veröffentlichten Indexstände bestimmen die Genauigkeit der Rechnung; gerundet wird für die Anzeige.

Der Premium-Warenkorb ist weiterhin vollständig synthetisch. Seine Modelljahre sind keine beobachteten Jahresdurchschnittspreise. Der Abstand zum offiziellen VPI und hypothetische Produktpreise sind Demonstrationsrechnungen, keine gemessene Luxus-Inflation. Diese Grenzen sind auf der Website ausgewiesen.

## Quellenangabe und Korrektur

Die Oberfläche und der Export nennen „Quelle: Deutsche Bundesbank“ und die Destatis-Ursprungsquelle. Umbasierung und Veränderungsraten sind eigene Berechnungen. [Nutzungsbedingungen](https://www.bundesbank.de/de/startseite/benutzerhinweise) sind verlinkt; es wird kein Bundesbank-Logo oder fremdes Bildmaterial verwendet.

**Version 0.2, 16.10.2026:** Die synthetische VPI-Beispielreihe aus Version 0.1 wurde ersetzt. VPI-Vergleich, Abstand und hypothetische Produktpreise ändern sich; die synthetischen Produktpreise bleiben identisch. Die früheren Stände und der vorangegangene UX-Audit bleiben über die Git-Historie nachvollziehbar.
