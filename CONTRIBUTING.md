# Mitwirken bei Nobelpreis

Vielen Dank für dein Interesse! Die Projektsprache ist Deutsch. Bitte verfasse Issues, Pull Requests und Dokumentation auf Deutsch. Etablierte technische Bezeichner müssen nicht übersetzt werden.

## Änderungen am Code

1. Beschreibe bei größeren Änderungen zuerst das Problem in einem Issue.
2. Arbeite in einem eigenen Branch und öffne einen Pull Request gegen `main`.
3. Erkläre die Änderung und die durchgeführten Prüfungen kurz und konkret.
4. Prüfe JavaScript mit `node --check dist/zeitreihe/app.mjs` und den Build `python3 scripts/build-release.py`. Bei Änderungen an der Oberfläche prüfe Desktop und Smartphone sowie die betroffenen Interaktionen.

Behalte die sichtbare Kennzeichnung synthetischer Daten bei. Ersetze Beispiele erst durch echte Daten, wenn Quelle, Variante, Marktbezug und Vergleichbarkeit dokumentiert und redaktionell geprüft sind. Zugangsdaten und lokale Hosting-Konfiguration gehören nicht ins Repository.

## Preisrecherchen

Nutze die Vorlage „Preisrecherche“ und erfasse pro Beobachtung:

- Eindeutiges Produkt oder Leistung einschließlich Variante und Leistungsumfang.
- Deutschen Marktbezug, Eurobetrag und Umsatzsteuerbehandlung.
- Preisart: etwa Listenpreis, Angebotspreis oder tatsächlich beobachteter Transaktionspreis.
- Gültigkeits- oder Beobachtungsdatum sowie Quelle und Abrufdatum.
- Beleg, soweit dessen Speicherung und Weitergabe zulässig sind.
- Hinweise auf Datenlücken, Modellwechsel und Qualitäts- oder Leistungsänderungen.
- Quellenrechte und vorgeschlagenen Prüfstatus.

Priorisiere offizielle deutsche Preislisten und Gebührenverzeichnisse, anschließend historische Kataloge und belastbare Sekundärquellen. Fehlende Angaben bleiben ausdrücklich offen. Listenpreise und Transaktionspreise dürfen nicht vermischt werden.

## Premiumreferenzen bei Modell- und Leistungswechseln

Es gilt die [Auswahlregel vom 23.10.2026](docs/premiumvergleich.md): **Wir verwenden das vergleichbarste belegte Premiummodell beziehungsweise Premiumpaket.** Verwendungszweck, Premiumsegment, Kernausstattung, Leistungsumfang, Dauer, Personenzahl und Einheit bestimmen die Vergleichbarkeit. Bei gleich geeigneten Alternativen bevorzugen wir die höhere Premiumausführung.

Dokumentiere bisherige/neue Referenz, relevante Änderungen und die geprüften Alternativen. Normale Weiterentwicklungen verhindern die nominale Fortführung nicht automatisch; sie werden sichtbar ausgewiesen. Keine Auswahl nach stärkstem Preisanstieg und keine erfundenen Qualitätskorrekturen. Ohne belegten hinreichend vergleichbaren Nachfolger bleibt der Wert offen.

## Jährliche Zeitfenster

Für die feste Jahresrunde gilt [das versionierte Jahresfenster-Rezept](data/methodik/jahresfenster-2026-10-26.json). Freie Preise werden im September/Oktober-Fenster möglichst nah am 15. Oktober ausgewählt; Tarifjahre, Schuljahre und Winter-Endjahre folgen ausdrücklichen Regeln. Ein späterer Beleg ist kein automatischer Ersatz für einen näher am Zieltag liegenden. Der VPI-Herbstanker erfordert beide Monatswerte; fehlende Monate bleiben leer. Änderungen erhalten ein neues begründetes Rezept. [Ergebnisse und Grenzen](docs/jahresfenster-und-restbelege-2026-10-26.md).

## Methodische Änderungen und Korrekturen

Änderungen an Auswahl, Basisjahr, Gewichtung oder Berechnung müssen begründet und reproduzierbar sein. Dokumentiere bei Korrekturen betroffene Werte, bisherigen und neuen Stand, Grund und Datum. Behaupte keine Repräsentativität ohne belastbare Grundlage.

## Veröffentlichung

HTML-Einstieg in `site/index.html` bearbeiten; der Build erzeugt Hauptseite und `/zeitreihe/` aus derselben Vorlage. Aktive Eingänge stehen in `data/release.json`. PRs müssen Daten-, Rechen- und Browserprüfungen bestehen. Pages veröffentlicht anschließend das geprüfte Artefakt von `main`. [Betriebsablauf und Rollback](docs/betrieb.md).
