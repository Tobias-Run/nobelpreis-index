# Erweiterung der Zeitreihen · 20. Oktober 2026

Vier zusätzliche **Einzelreihen mit 17 vorhandenen Preisbelegen** sind in der [Forschungsansicht](https://tobias-run.github.io/nobelpreis-index/zeitreihe/) auswählbar. Sie erschließen drei weitere Positionen: Salem, Arlberg-Skipass und Saxonia Thin. Die Uhrenreferenzen bleiben getrennt. Zusammen mit Bayreuth und YCL sind damit fünf der 13 recherchierten Positionen grafisch untersuchbar.

Der gemeinsame Zweier-Pilot bleibt unverändert. Neue Einzelreihen werden nicht in dessen Gewichtung oder die Abdeckungsberechnung der Szenarien aufgenommen. Sie haben unterschiedliche Zeitbezüge und sind kein freigegebener gemeinsamer Warenkorb. Alle Ergebnisse bleiben Recherche-PoC, keine repräsentative Inflation für wohlhabende Haushalte.

## Zusätzliche Reihen und Ergebnis

| Einzelreihe | Belegter Zeitraum | Ausgangs- und Endpreis | Kumulierte Änderung | Passender deutscher VPI |
|---|---|---|---:|---:|
| Salem, regulärer Schul-/Internatstarif Klasse 8 | Schuljahre 2021/22–2026/27 | 43.500 → 53.400 € je Schuljahr | +22,76 % | +21,97 %, September 2021 → September 2026 |
| Arlberg, Sechstage-Skipass für Erwachsene in der Hauptsaison | Saisons 2023/24–2025/26 | 401 → 450 € | +12,22 % | +4,51 %, Dezember 2023 → Dezember 2025 |
| Saxonia Thin, 201.027 / LA100063 | 10.12.2019–26.09.2023 | 15.500 → 24.500 € | +58,06 % | +17,80 %, Dezember 2019 → September 2023 |
| Saxonia Thin, 201.027-LB / LB100063 | 19.07.2024–16.10.2026 | 24.500 → 27.000 € | +10,20 % | Oktober 2026 fehlt; kein vollständiger Vergleich |

Das sind kumulierte Veränderungen der beschriebenen Tarif- beziehungsweise Angebotsstände, keine jährlichen Inflationsraten oder qualitätsbereinigten Veränderungen. Der größte Aufschlag gegenüber dem VPI liegt im alten Saxonia-Segment bei 40,26 Prozentpunkten; Salem liegt 0,79 und der Skipass 7,70 Prozentpunkte darüber. Diese Abstände gelten ausschließlich für die jeweils genannten Zeiträume und Preisdefinitionen.

## Zeitbezug und Abgrenzung

**Salem:** Sechs durchgehende Schuljahrestarife aus zwölf regulären Monatsraten. Vergleichsmonat ist September im Beginnjahr. Der Achsenanker 1. September ist eine Darstellungsregel für den Schuljahresbeginn, kein behaupteter Preisabruf oder einzelner Transaktionstag. Beim Beleg 2025/26 ergibt sich das Jahr aus der Tarifüberschrift, nicht aus dem früheren Archivierungsdatum. Ohne Kaution, Aufnahmegebühr, Ermäßigungen und Extras; keine Messung der Unterrichtsqualität oder sämtlicher Ausgaben. Die [Prüfung des unveränderten vertraglichen Tarifrahmens](rechercheabschluss-und-gewichtung-2026-10-17.md) bleibt die fachliche Grundlage. 2027/28 ist angekündigt und ausgeschlossen.

**Skipass:** Drei veröffentlichte Hauptsaisontarife für sechs aufeinanderfolgende Tage, Erwachsene, inklusive USt. Ohne rückzahlbares Kartendepot. Die Achse verwendet den dokumentierten Hauptsaisonbeginn, der VPI den dazugehörigen Dezember. Die Reihe endet mit Saison 2025/26; das Kalenderjahr 2026 wird nicht als Beginnjahr dieser Saison beschriftet. Keine Annahme gleicher Pistenkilometer/Liftzahl, keine Transaktionspreise und insbesondere **kein Gesamtpreis eines Skiurlaubs**. Saison 2026/27 ist angekündigt und ausgeschlossen.

**Saxonia:** Datierte Wempe-Neupreisangebote einschließlich MwSt. mit ihrem jeweiligen Monats-VPI, keine bestätigte Hersteller-UVP oder erzielte Transaktionspreise. Fünf Beobachtungen für die alte und drei für die neue Referenz. Keine Verkettung über den ungeklärten Zusatz `-LB`. Die 2020er Beobachtung fällt in die temporäre deutsche Mehrwertsteuersenkung; Bruttoveränderung ist keine reine Netto-Preisänderung. Aus dem unregelmäßigen Beobachtungsabstand folgt keine Aussage über den genauen Zeitpunkt einer Preisänderung.

**Fehlender VPI:** Für Oktober 2026 liegt im neuen offiziellen Abruf noch kein Wert vor. Der belegte Uhrenpreis bleibt mit 27.000 € in der Tabelle und Preislinie sichtbar. Die VPI-Linie endet beim letzten belegten zugeordneten Monat. Endvergleich und Abstand werden als nicht verfügbar ausgewiesen; weder Septemberersatz noch Interpolation. VPI-Monate sind Monatsdurchschnitte, keine taggenauen Vergleichswerte.

## Neue Bundesbank-Referenz

- Offizielle Reihe: `BBDP1.M.DE.N.VPI.C.A00000.I20.A`, Deutschland, Gesamt-VPI, Ursprungswerte, 2020 = 100. Ursprungsquelle: Statistisches Bundesamt, Wiesbaden.
- [Offizieller Export](https://api.statistiken.bundesbank.de/rest/data/BBDP1/M.DE.N.VPI.C.A00000.I20.A?startPeriod=2019-01&endPeriod=2026-10), abgerufen am **20.10.2026**: 93 Monatswerte von Januar 2019 bis September 2026. Die Abfrage schließt Oktober 2026 ausdrücklich ein; die Bundesbank liefert dafür am Abrufdatum noch keinen Wert.
- [Unveränderter CSV-Rohbeleg](../data/sources/bundesbank-vpi-monatlich-2019-2026-2026-10-20.csv) und [Abrufmetadaten einschließlich SHA-256](../data/sources/bundesbank-vpi-monatlich-2019-2026-2026-10-20.json).
- Die 33 überlappenden Monatswerte stimmen mit dem alten Abruf vom 16.10.2026 überein. Dieser ältere Beleg und dessen Abrufdatum bleiben für den Zweier-Pilot unverändert.
- Der Anbieterhinweis, dass der jeweils letzte Datenpunkt zeitweise auf eigenen Schätzungen der Bundesbank beruhen kann, ist im Export enthalten und wird in den Referenzmetadaten bewahrt. Ein späterer Abruf kann revidierte Werte ergeben; neue Abrufe werden als neue Belege versioniert.

## Berechnung und Oberfläche

Einzelpreisindex: `100 × Preis(Beobachtung) / Preis(Startbeobachtung)`. Vergleichsindex: `100 × VPI(zugeordneter Monat) / VPI(Startmonat)`, sofern beide Werte vorhanden sind. Der Abstand ist die Differenz der kumulierten Änderungen in Prozentpunkten. Ein fehlender Basismonat verhindert die VPI-Normierung der ganzen gewählten Reihe. Fehlende Zwischenwerte bleiben leer.

Die Zeitraumwahl folgt der jeweiligen Reihe statt eines festen Endjahrs 2026. Schuljahr, Saison und konkretes Angebotsdatum erscheinen in der Tabelle und auf den antippbaren Beobachtungsknöpfen. Die horizontale Diagrammachse berücksichtigt die tatsächlichen Abstände der hinterlegten Daten beziehungsweise der ausdrücklich benannten Zeitanker. Linien verbinden ausschließlich Belegpunkte; sie sind keine erfundene Monatsreihe.

Zeitraum, Reihe und gewählter Punkt bleiben im Vergleichslink gespeichert und reagieren auf Browser-Zurück. Der vollständige JSON-Export enthält neue Reihen und beide Referenzstände. Der Preis-CSV bleibt bei den unveränderten 54 recherchierten Einzelbeobachtungen; es werden keine zusätzlichen Preise erfunden oder doppelt gezählt.

## Reproduktion und offene Arbeit

```bash
python3 scripts/build-zeitreihe.py
node --test tests/reference.test.cjs tests/zeitreihe.test.mjs
```

Der Builder prüft Rohdatenhash, Monatsfolge, Reihenkennung, Basis und Preisquellen. Die Ableitung aus dem [Recherchebestand vom 17.10.2026](../data/research/produktpruefung-2026-10-17.json) steht in [einzelzeitreihen.py](../scripts/einzelzeitreihen.py); die Indexformeln in [berechnung.mjs](../dist/zeitreihe/berechnung.mjs). Historische Forschungsdateien, Originalbeobachtungen und Gewichtungsszenarien werden nicht umgeschrieben.

Offen bleiben die bereits [dokumentierten Anbieterbelege](anbieteranfragen-2026-10-17.md), insbesondere Ausstattungs-/Leistungsbrücken, vollständige Urlaubs-/Liegeplatzpreise und fehlende standardisierte Servicepreise. Vor einem größeren gemeinsamen Index müssen Zeitbezug, genaue Preisdefinitionen, Zusammensetzung und Gewichte zusammen freigegeben werden. Mehr Einzelkurven allein schließen diese Lücke nicht.
