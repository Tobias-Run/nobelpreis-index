# Historische Preisbelege aus dem Internet Archive

**Recherche- und Abrufdatum: 17.10.2026.** Ergänzung zum [ersten Zeitreihen-PoC](historische-preise-und-poc-2026-10-16.md). [Aktuelle Forschungsansicht](https://tobias-run.github.io/nobelpreis-index/zeitreihe/).

## Ergebnis

Die gezielte Nachrecherche schließt mehrere der bisher dokumentierten Beleglücken: **19 zusätzliche Preisbeobachtungen für sieben Positionen**. Der Recherchebestand umfasst jetzt **53 Einzelbeobachtungen** einschließlich Tarifkomponenten, verschiedener Preisarten und gekennzeichneter Zukunftstarife. Es sind keine 53 freigegebenen Indexwerte.

| Position | Neue Belege | Bedeutung und verbleibende Grenze |
|---|---|---|
| Salem | Fünf Gebührenblätter 2021/22–2025/26 | Zusammen mit 2026/27 geschlossene Folge für das unveränderte Klassenprofil 8; Leistungsabgleich bleibt nötig. |
| Saxonia Thin | Sieben deutsche Händler-Neupreise 2019–2025 | Lange Preisgeschichte gefunden; Referenz-/Artikelzusatz wechselt ab 2024, deshalb keine ungeprüfte Verkettung. |
| Cayenne | 29.07.2025: 101.500 EUR inkl. MwSt. | Die 2025-Lücke ist durch archivierte deutsche Herstellerdaten geschlossen. Ausstattung und Pflichtnebenkosten weiter prüfen. |
| Charger5 vario | 09.08.2025: ab 6.199 EUR | Basisvariante mit 800 Wh und Kiox 500 belegt; exakter Endpreis pine/L noch nicht. |
| YCL | Ab 2021: 89 EUR/m²; ab 14.05.2022: 74,50 EUR/m² | 2021 allgemeiner Wassertarif, 2022 Segelboottarif. Strukturwechsel beachten; 2023 und 2024 nicht auffüllen. |
| Ski Arlberg | 2023/24: 401 EUR; 2024/25: 423 EUR | Sechs Tage Erwachsene Hauptsaison. Archiviertes Tarifblatt und separat erhaltenes Original-PDF; keine bloßen Schätzungen. |
| Kelly | 06.08.2024: 21.800 EUR | Verfügbares Sekundärmarktangebot, ungetragen, schwarz/Togo/goldfarbene Hardware. Kein Boutique-Preis oder realisierter Verkauf. |

**Keine Erweiterung des berechneten Zweier-Piloten.** Die neuen historischen Fakten werden zunächst im Recherchearchiv veröffentlicht. Es gibt weder eine automatische Indexfreigabe noch eine neue Mischreihe aus uneinheitlichen Preisarten. Die bisherige Pilotberechnung bleibt reproduzierbar und unverändert. Der Bundesbank-Rohbeleg wurde nicht neu abgerufen; sein Abrufdatum bleibt **16.10.2026**.

## Vorgehen und Archivnachweis

Verwendet wurden die **Wayback Availability API**, die **CDX-Suche** und anschließend die archivierten Rohfassungen mit `id_`. Die vollständigen Dokumente wurden heruntergeladen und gelesen. Preise aus statisch gespeicherten Produktdaten wurden mit der sichtbaren Produktbeschreibung abgeglichen. Für das gescannte YCL-Blatt 2022 wurde OCR genutzt und der Betrag danach am Seitenbild visuell überprüft.

Für jeden aufgenommenen Archivbeleg werden Original-URL, Capture-Zeitpunkt in UTC, lesbarer Archivlink, Rohbeleg-URL, tatsächlicher `Memento-Datetime`-Header und SHA-256 des gelesenen Dokuments gespeichert. Wo der CDX-Eintrag vorlag, wurde zusätzlich der SHA-1/Base32-Inhaltsdigest mit dem CDX-Digest verglichen. Damit wird geprüft, dass der gelesene Inhalt zum gesuchten Capture gehört. Bei komprimiert ausgeliefertem HTML bezieht sich die Dokument-Prüfsumme auf den dekomprimierten Inhalt.

**Drei Daten bleiben getrennt:** Archivierung, im Dokument genannte Preisgültigkeit und heutiger Rechercheabruf. Insbesondere darf eine im Jahr 2023 gespeicherte Gebührenordnung „ab 2022“ nicht zu einem unabhängigen Preiswert für 2023 umetikettiert werden. Früher veröffentlichte Salem-Gebühren für ein späteres Schuljahr werden dem ausdrücklich genannten Schuljahr zugeordnet.

[Abfrage- und Belegprotokoll](../data/research/internetarchive-protokoll-2026-10-17.json) · [Neuer Preisbestand](../data/research/historische-preise-2026-10-17.json) · [Unveränderter vorheriger Bestand](../data/research/historische-preise-2026-10-16.json).

Leere Availability-Antworten bedeuten nur, dass diese konkrete Abfrage keinen Capture lieferte. Sie beweisen keine vollständige Archivlücke. Die konkrete Wempe-URL lieferte über Availability zunächst keinen Treffer; die CDX-Suche fand dennoch zahlreiche gespeicherte Fassungen. Vorübergehende HTTP-503-Fehler und nicht mehr erreichbare Original-URLs sind im Protokoll festgehalten. Die konkreten Negativbefunde gelten für die geprüften URLs und Zeitbereiche, nicht pauschal für alle historischen Quellen im Internet.

## Salem: reguläres Klassenprofil 8

| Schuljahr | Monatsrate | Jahresbetrag, zwölf Raten | Archivbeleg |
|---|---:|---:|---|
| 2021/22 | 3.625 EUR | 43.500 EUR | [Capture 01.12.2020](https://web.archive.org/web/20201201052722/https://www.schule-schloss-salem.de/fileadmin/02_Aufnahme_und_Stipendien/Aufnahme/Salem_Schul_und_Internatsgeld_2021_2022_final.pdf) |
| 2022/23 | 3.735 EUR | 44.820 EUR | [Capture 20.04.2022](https://web.archive.org/web/20220420045042/https://www.schule-schloss-salem.de/fileadmin/02_Aufnahme_und_Stipendien/Aufnahme/Salem_Schul_und_Internatsgeld_2022_2023.pdf) |
| 2023/24 | 3.850 EUR | 46.200 EUR | [Capture 04.10.2022](https://web.archive.org/web/20221004140943/https://www.schule-schloss-salem.de/fileadmin/02_Aufnahme_und_Stipendien/Aufnahme/Salem-Schul-und-Internatsgeld-2023-2024.pdf) |
| 2024/25 | 4.080 EUR | 48.960 EUR | [Capture 23.09.2023](https://web.archive.org/web/20230923171122/https://www.schule-schloss-salem.de/fileadmin/02_Aufnahme_und_Stipendien/Aufnahme/Salem_Schul_und_Internatsgeld_2024_2025.pdf) |
| 2025/26 | 4.200 EUR | 50.400 EUR | [Capture 12.09.2024](https://web.archive.org/web/20240912170039/https://www.schule-schloss-salem.de/fileadmin/02_Aufnahme_und_Stipendien/Aufnahme/Salem-Aufnahme.pdf) |
| 2026/27 | 4.450 EUR | 53.400 EUR | [Bereits dokumentierter aktueller Beleg](produkte/schloss-salem.md) |

Verwendet wird jeweils die Tabelle für reguläre Klassen 5–10 beziehungsweise 10PLUS, nicht die abweichende internationale Klasse 8–10. Aufnahmegebühren, Sicherheitsdeposit, Administrationszuschlag, Geschwister-/Altschülerrabatte und Skonto sind ausgeschlossen. Steuerbehandlung nicht gesondert ausgewiesen. Das ist ein festes Klassenprofil; es beschreibt nicht die Ausgaben einer mit den Jahren älter werdenden Schülerin. Eine reine Preissteigerungsrechnung setzt weiterhin den Abgleich der enthaltenen Leistungen voraus.

## Saxonia Thin: deutsche Wempe-Angebote

Alle folgenden Beträge sind **Händler-Neupreise in EUR inklusive MwSt.**, keine belegten Hersteller-UVP und keine Transaktionspreise. Die Beschreibung nennt 37 mm Weißgold, schwarzes Alligatorband, Handaufzug L093.1 und Stiftschließe.

| Historischer Angebotsstand, UTC | Preis | Herstellerreferenz / Händlerartikel | Archiv |
|---|---:|---|---|
| 10.12.2019 | 15.500 EUR | 201.027 / LA100063 | [Capture](https://web.archive.org/web/20191210115212/https://www.wempe.com/de-de/uhren/a-lange-soehne/saxonia/saxonia-thin-201-027) |
| 27.10.2020 | 15.100 EUR | 201.027 / LA100063 | [Capture](https://web.archive.org/web/20201027041238/https://www.wempe.com/de-de/uhren/a-lange-soehne/saxonia/saxonia-thin-201-027) |
| 27.07.2021 | 17.300 EUR | 201.027 / LA100063 | [Capture](https://web.archive.org/web/20210727160854/https://www.wempe.com/de-de/uhren/a-lange-soehne/saxonia/saxonia-thin-201-027) |
| 19.05.2022 | 21.000 EUR | 201.027 / LA100063 | [Capture](https://web.archive.org/web/20220519130233/https://www.wempe.com/de-de/uhren/a-lange-soehne/saxonia/saxonia-thin-201-027) |
| 26.09.2023 | 24.500 EUR | 201.027 / LA100063 | [Capture](https://web.archive.org/web/20230926101435/https://www.wempe.com/de-de/uhren/a-lange-soehne/saxonia/saxonia-thin-201-027) |
| 19.07.2024 | 24.500 EUR | 201.027-LB / LB100063 | [Capture](https://web.archive.org/web/20240719191137/https://www.wempe.com/de-de/uhren/a-lange-soehne/saxonia/saxonia-thin-201-027) |
| 27.10.2025 | 25.600 EUR | 201.027-LB / LB100063 | [Capture](https://web.archive.org/web/20251027072022/https://www.wempe.com/de-de/uhren/a-lange-soehne/saxonia/saxonia-thin-201-027) |

Die Angaben schließen die bisherige historische Beleglücke. Der Referenz- und Artikelwechsel ab dem belegten Stand 2024 erfordert dennoch eine Klärung vor einer unveränderten Verkettung. Die Beobachtung Oktober 2020 fällt in die temporäre deutsche Mehrwertsteuersenkung; aus dem niedrigeren Bruttopreis darf keine reine Netto-Preissenkung abgeleitet werden. Die Stichtage sind unterschiedlich und keine Jahresdurchschnitte. Verfügbarkeitsangaben wechselten ebenfalls; eine veröffentlichte Zahl garantiert keinen erfolgreichen Kauf.

## Weitere neue Preisbeobachtungen

- **Cayenne:** [Archiv 29.07.2025, 05:03:23 UTC](https://web.archive.org/web/20250729050323/https://www.porsche.com/germany/models/cayenne/cayenne-models/cayenne/), deutsches Basismodell Benzin, 260 kW/353 PS, **101.500 EUR inklusive MwSt.** Der Betrag ist in den gespeicherten Produktdaten enthalten; es wurde keine heutige Konfiguratorantwort verwendet. Der zuvor falsch auf 2025 deutende ADAC-Suchtreffer bleibt verworfen.
- **Charger5 vario:** [Archiv 09.08.2025](https://web.archive.org/web/20250809091213/https://www.r-m.de/de/bikes/charger5/), **ab 6.199 EUR**, 800 Wh, Kiox 500. Der Modellblock ist vom günstigeren CORE und vom HS getrennt. Pine wird als Option genannt; der exakt konfigurierte Preis pine/L ist nicht separat gesichert. Ein zweiter Capture vom 16.10.2025 bestätigt den Basisbetrag, wird aber nicht als zusätzliches Jahresdatum gezählt. Gegenüber 6.499 EUR wird deshalb noch keine vergleichbare Inflationsrate veröffentlicht.
- **YCL 2021:** [Archiv 27.11.2021](https://web.archive.org/web/20211127023602/https://www.ycla.de/fileadmin/redakteure/Antraege__Statuten/2021_Gebuehrenordnung-Vereinsbeitraege_u._Liegeplaetze.pdf): Sommer-Wasserliegeplatz **89 EUR/m²**, Verwaltung 26 EUR separat, gültig ab 27.03.2021. Noch keine Trennung nach Segel-/Motorboot und keine ausdrückliche Steuerangabe.
- **YCL 2022:** [Archiv 06.05.2023](https://web.archive.org/web/20230506113321/https://www.ycla.de/fileadmin/redakteure/Bilder_und_PDF_2022/PDF_2022/2022_Gebuehrenordnung_Verein_und_Liegeplaetze.pdf): ausdrücklich **ab 14.05.2022**, Segelboot Sommer **74,50 EUR/m² brutto inklusive 7 % MwSt.**, Verwaltung 26 EUR separat. Gescanntes Blatt visuell geprüft. Nicht als eigenständiger Tarif 2023 oder fortgeschriebener Wert 2024 übernommen. Die geänderte Tarif-/Mitgliedsstruktur gegenüber 2021 verhindert eine ungeprüfte Inflationsaussage zum Rückgang.
- **Ski Arlberg 2023/24:** [Archiviertes Original-Tarifblatt, Capture 28.11.2023](https://web.archive.org/web/20231128234730/https://www.vorarlberg-alpenregion.at/media/ktal/Tarifblatt-Ski-Arlberg-Winter-202324.pdf): sechs Tage Erwachsene Hauptsaison 23.12.2023–01.04.2024, **401 EUR inklusive USt.**, 5 EUR rückzahlbares Kartendepot separat. Vorläufiger Kalkulationsstand 21.06.2023.
- **Ski Arlberg 2024/25:** [Original-Ticketguide auf dem Hotelserver Albona Nova](https://www.albonanova.at/files/bilder/downloads/ticketguide-ski-arlberg.pdf): Hauptsaison 21.12.2024–04.04.2025, sechs Tage Erwachsene **423 EUR inklusive USt.**, Depot separat. Vollständiges PDF geladen und gelesen; Stand September 2024. Dieser Nachweis ersetzt die bisher unzureichende Schätzung als Grundlage für den Preisfakt. Es handelt sich um einen veröffentlichten vorläufigen Tarif, keinen nachgewiesenen tatsächlich bezahlten Preis.
- **Kelly:** [SACLÀB-Archiv 06.08.2024](https://web.archive.org/web/20240806042500/https://saclab.com/de/bags/hermes-kelly-28-togo-black-8/), Produktcode 4768: **21.800 EUR**, Kelly 28 Togo Schwarz, vergoldete Hardware, ungetragen Grade 1, umfangreiches Zubehör einschließlich Rechnung; **„Jetzt kaufen / 1 vorrätig“** im Capture. Keine Verwechslung mit Herstellungsjahr 2024. Die Retourné-Bezeichnung wird im gespeicherten Text nicht ausdrücklich bestätigt; ein konkretes deutsches Steuer-/Versandszenario ist nicht vollständig erhalten. Sekundärmarkt-Angebotspreis, keine Boutique-UVP und keine bestätigte Transaktion. Ohne passenden Boutique-Beleg lässt sich kein Markup berechnen.

## Funde, die keine weitere vergleichbare Preisreihe ergeben

| Position | Archivfund | Entscheidung |
|---|---|---|
| Alarm | [Securando/Securitas, 24.05.2022](https://web.archive.org/web/20220524153608/https://www.securando.de/wp-content/uploads/Securando_Monitoring-Preisliste_Gu%CC%88ltigkeit-3-0062022.pdf), privat 20 EUR/Monat brutto, gültig bis 30.06.2022 | Zeitgenössischer Beleg stützt den bestehenden Betrag, kein neues Preisjahr. Abweichende Gültigkeitsenden im anderen gespeicherten PDF bleiben ein dokumentierter Versionskonflikt. |
| Adlon | [GHORFA Rates 2024, Capture 07.10.2024](https://web.archive.org/web/20241007204523/https://www.ghorfa.de/wp-content/uploads/GhorfaRates_adlon.pdf), Deluxe 250 EUR | Jetzt datierter historischer **Sondertarif**. Öffentliche flexible Standardrate und Stornierung nicht belegt. Deshalb nicht in die Zielreihe aufgenommen. |
| Adlon | [Capture 04.08.2025](https://web.archive.org/web/20250804191450/https://www.ghorfa.de/wp-content/uploads/GhorfaRates_adlon.pdf), Deluxe 265 EUR inklusive City Tax, Dokument ohne Tarifjahr | Keine abgesicherte Preisgültigkeit 2025 und abweichende Steuerangabe gegenüber 2024. Keine 250→265-Inflationsreihe. |
| Kelly | [Capture 02.02.2023](https://web.archive.org/web/20230202210503/https://saclab.com/de/bags/hermes-kelly-28-togo-black-2/), 14.120 EUR, Grade 1, ausverkauft | Hardware nicht ausreichend gesichert; ausverkauftes Angebot ist keine beobachtete verfügbare Alternative oder bestätigte Transaktion. |
| Kelly | [Capture 05.06.2023](https://web.archive.org/web/20230605223530/https://saclab.com/de/bags/hermes-kelly-28-togo-black-6/), 15.230 EUR, Grade 2, Palladium, ausverkauft | Abweichende Beschläge und gebrauchter Zustand; kein Vergleich zur definierten Variante. |
| Sylt | [Enkelmann-Preisseite, 15.03.2023](https://web.archive.org/web/20230315185056/https://www.hausbetreuung-enkelmann.de/preise) | Verweist auf individuelle Wünsche/Besichtigung; kein standardisierter Betrag. |
| Sylt | [D&A, 14.11.2024](https://web.archive.org/web/20241114110621/https://www.dua-objektservice.de/hausbetreuung/) | Im gespeicherten Seiteninhalt kein belegbarer Preis für das festgelegte Kontrollpaket. |

## Offene Datenarbeit

- **Salem:** Leistungsumfang und Zuschläge über die Jahre abgleichen; die historische Preistabelle ist jetzt vorhanden.
- **Saxonia:** Bedeutung von `-LB` und dem Händlerartikelwechsel sowie Verfügbarkeits-/Steuereffekte klären.
- **Cayenne:** Vergleichbare Serienausstattung und Pflichtnebenkosten prüfen; Belegfolge jetzt 2023–2026 vorhanden.
- **Charger5:** Historische Endkonfiguration pine/L einschließlich Steuer- und Pflichtkosten sichern.
- **YCL:** Originaltarife 2023/2024, Flächenregel und Strukturänderung 2021/2022 prüfen.
- **Skiurlaub:** Betreiberdokument 2025/26 und konstanten Gebietsumfang sichern; vollständiger Urlaub weiterhin ohne Hotelpreis.
- **Kelly:** Deutsche Boutique-Preisbelege und weitere vergleichbare, verfügbare Sekundärmarktangebote fehlen.
- **Alarm:** Aktuellen identischen Securando/Securitas-Privattarif finden, nicht durch einen anderen Anbieter ersetzen.
- **Sylt und Adlon:** Vergleichbare datierte Angebote zum definierten Leistungsumfang fehlen weiterhin.

Lanserhof, Bayreuth und Schwarzwaldstube behalten in dieser Nachrecherche ihre bereits dokumentierten Historien und Vergleichbarkeitsgrenzen. Fremde Dokumente und Bilder werden nicht als Volltext kopiert; nur eigene Auswertung, Preisfakten, Archivlinks und Prüfsummen werden veröffentlicht. Es wurden keine Anbieter angeschrieben und keine Buchungen ausgelöst.

## Reproduktion und Prüfung

```bash
python3 scripts/build-zeitreihe.py
node --test tests/reference.test.cjs tests/zeitreihe.test.mjs
node --check dist/zeitreihe/app.mjs
```

Der Build liest den neuen Preisbestand vom 17.10.2026 und weiterhin den unveränderten Bundesbank-Rohbeleg vom 16.10.2026. Die Preisfakten sind ohne Live-Abhängigkeit im Export nachvollziehbar; die konkrete Archivsuche lässt sich über die im Protokoll gespeicherten Abfrage-URLs wiederholen. Redaktionelle Zweitprüfung und Indexfreigabe bleiben getrennte Schritte.

Prüfung des veröffentlichten Datenpakets vor dem Deployment: 10 automatisierte Tests bestanden; identische Neuerzeugung aus den gespeicherten Eingaben; Produktregister zählt konsistent 53 Beobachtungen. Chromium-Prüfung bei 320, 390, 768 und 1440 Pixeln: neue historische Preise und Archivlinks vorhanden, Suche und JSON-/CSV-Export funktionieren, 53 CSV-Datensätze vollständig, keine JavaScript-Fehler oder seitlicher Seitenüberlauf. Die Pilotkennzahlen bleiben unverändert.
