# Weitere Archive und historische Dokumentablagen

Recherche vom **21.10.2026**, als Ergänzung zur [vorherigen Wayback-Suche](archivluecken-2026-10-21.md). Zwei weitere datierte **Originalkarten der Schwarzwaldstube** wurden gefunden. Der Forschungsbestand wächst von 61 auf 63 Beobachtungen. Neue Indexreihen oder Gewichte werden daraus nicht automatisch abgeleitet.

## Konkrete Funde

| Originalbeleg | Beobachteter Preis | Was damit belegt ist |
|---|---:|---|
| [Karte vom archivierten Angebotsstand 24.10.2021](https://web.archive.org/web/20211024192526/https://www.traube-tonbach.de/site/assets/files/4874/speisekarte_deutsch.pdf) | **265 €** | Großes Degustationsmenü, sieben getrennte Positionen, inklusive MwSt. |
| [Karte vom archivierten Angebotsstand 21.11.2024](https://web.archive.org/web/20241121050023/https://www.traube-tonbach.de/site/assets/files/22043/schwarzwaldstube_web_d.pdf) | **325 €** | Degustationsmenü II, sieben getrennte Positionen, inklusive MwSt. |

Beide einseitigen PDFs wurden als Text gelesen und visuell geprüft: Menügesamtpreis statt einzelner À-la-carte-Preise, richtige Menüspalte, sieben Positionen und Steuerfußzeile. Die Archivdaten belegen einen gespeicherten Angebotsstand, keinen exakten Beginn der Preisgültigkeit und keine Transaktion.

**Warum das hilft:** Für November 2024 hatten wir bisher einen Portal-Bearbeitungsstand. Jetzt ist die Originalkarte des Restaurants verfügbar und bestätigt 325 € inklusive MwSt. Der Portalstand vom 11.11.2024 bleibt mit eigener Datierung erhalten; die neue Originalbeobachtung vom 21.11.2024 wird nicht auf den früheren Tag rückdatiert. Zwei Stände im selben Jahr sind keine zwei unabhängigen Jahresraten.

Der 2021er Beleg verlängert die dokumentierte Preisgeschichte. Er nennt jedoch „Großes Degustationsmenü“, nicht „Menü II“. Speisen, Restaurantumfeld und Leistungsumfang müssen vor einer Verkettung geprüft werden. Gleiche Zahl von Positionen bedeutet keine gleiche Qualität. **2022 bleibt leer**; es wird weder interpoliert noch eine qualitätsbereinigte Steigerung 2021–2026 behauptet.

## Welche Archive tatsächlich geprüft wurden

| Archiv / Ablage | Prüfung und Ergebnis | Grenze |
|---|---|---|
| **Arquivo.pt** | Fünf genaue URL-Historien; zusätzliche CDX- und Volltextabfragen. Volltextsuche nach Schwarzwaldstube liefert 35 Einträge bei geschätzten 85 Ergebnissen. Zwei Restaurantseiten von 2021 und 2024 tatsächlich gelesen. | Die fünf zuerst geprüften konkreten URLs ohne Treffer sagen nichts über die gesamte Domain aus. Ergebnisse sind nicht vollständig abgearbeitet. Einige CDX-Antworten liefern unscharfe `is_fuzzy`-Root-Treffer beziehungsweise HTML trotz PDF-Filter; diese wurden nicht als PDF-Funde gewertet. |
| **Common Crawl** | Indexkatalog geprüft; YCL-Abfragen in Dezember-2023-, Dezember-2024- und November-2025-Indizes. 2024 liefert 69 Einträge. Ein Hafenmeister-Datensatz vom 12.12.2024 wurde aus dem WARC tatsächlich gelesen. | Unter den 69 Treffern keine gesuchten Gebühren-PDFs. Die Abfragen für 2023/2025 scheiterten mit 503/504; keine Aussage über alle Crawls. |
| **Archive.today / archive.ph** | Öffentliche URL-Suche nach dem fehlenden YCL-2023-Dokument versucht. | HTTP 503; kein gelesener Beleg, keine neue Archivierung angefordert. |
| **Gour-Med-Heftarchiv** | Ausgabe **3/4–2024**, 43. Jahrgang, archiviert 28.11.2025, vollständig als PDF abrufbar. Auf gedruckter S. 9 sind die damaligen Menüs dargestellt. | Der Menüabschnitt enthält **keinen Preis**. Daher keine zusätzliche Euro-Beobachtung. Heftjahr 2024 wird nicht durch Capture-Jahr 2025 ersetzt. |
| **Scribd-Dokumentablage** | Öffentlich lesbarer Upload mit Titel „Schwarzwaldstube D 03-2023 Web-Menu“: großes Menü 295 €, Euro/MwSt.-Hinweis vorhanden. | Uploader-Titel und Dateiname allein sichern weder Originalherkunft noch Gültigkeitsdatum. Nur Recherchehinweis, keine zusätzliche 2023-Beobachtung und keine Umgehung von Download-/Zugangsbeschränkungen. |
| **Wayback, gezielte neue Dateipfade** | Die alternativen Archive und Dokumentverweise erschließen alte Pfade unter `/site/assets/files/…`, die in der bisherigen Suche nach der heutigen Karten-URL nicht erfasst waren. Dort wurden die beiden Original-PDFs gefunden. | Ein funktionierender Link zur heutigen Startseite ist kein historischer PDF-Beleg. Beide alten Live-PDF-URLs leiten inzwischen auf HTML-Seiten um. |

### Die erfolgreiche Suchkette

Eine [Arquivo.pt-Restaurantseite vom 16.09.2021](https://arquivo.pt/wayback/20210916192005/https://traube-tonbach.de/restaurants-bar/schwarzwaldstube/) enthält den relativen Kartenpfad `/site/assets/files/4874/speisekarte_deutsch.pdf`. Die genaue PDF-Historienabfrage bei Arquivo.pt lieferte keinen Treffer; die anschließende Wayback-Abfrage dieses Pfades führte zur lesbaren Originalkarte vom 24.10.2021.

Die [Arquivo.pt-Seite vom 12.08.2024](https://arquivo.pt/wayback/20240812145855/https://traube-tonbach.de/restaurants-bar/schwarzwaldstube/) verlinkt einen anderen Kartenpfad unter `/site/assets/files/20960/…`, für den bislang kein PDF-Beleg gefunden wurde. Ein zusätzlicher alter Kartenverweis unter `/site/assets/files/22043/…` führte dagegen zur Originalkarte vom 21.11.2024. Das zeigt den Nutzen alter Verzeichnisse und Links; eine archivierte HTML-Seite beweist nicht automatisch, dass auch sämtliche verlinkten Dateien gespeichert sind.

Das [Gour-Med-PDF](https://web.archive.org/web/20251128001233/https://gour-med.de/files/folder.165/gour-med-3-4-2024.pdf) bestätigt Menübezeichnungen und damalige Zusammenstellung, liefert aber keinen zusätzlichen Preis. Der aktuelle Live-Link führt inzwischen auf das allgemeine Heftarchiv. Ein alter Suchindexauszug wurde deshalb nicht als gelesene PDF ausgegeben.

### Common Crawl: Inhalt statt bloßer Indexeintrag

Der gelesene YCL-Hafenmeister-Datensatz gehört zu `CC-MAIN-2024-51`, Capture `20241212160815`. Aus dem dokumentierten WARC wurden nur die Bytes **952304040–952308489** angefordert. Der Server antwortete mit HTTP 206. Der SHA-1 des extrahierten HTML stimmt mit dem Index-Digest `E2MW6YUHOR3NTYJRPQ2ZF6Z4EAW4MD6T` überein. Die Seite enthält Hafen-/Kontaktinformationen, aber keinen gesuchten Tarif. WARC-Datei, Range, Zeitstempel und Hashes stehen im Protokoll; private Kontaktangaben werden hier nicht erneut abgedruckt.

## Was weiter offen bleibt

- **YCL 2023/24:** Keine Gebühren-PDFs gefunden; insbesondere aus Kontaktseiten, Satzung oder Vergabekriterien werden keine Preise abgeleitet. Weitere Common-Crawl-Indizes sind nicht erschöpfend geprüft.
- **Adlon:** Die konkrete Zimmer-URL liefert bei Arquivo.pt keine Historie; eine öffentliche flexible, datierte historische Rate bleibt unbelegt. Dies ist keine Aussage über alle Hotel-URLs oder Kataloge.
- **Sylt-Service:** Die genaue Enkelmann-Preisseite ohne Treffer bei Arquivo.pt. Kein neuer standardisierter Hausbetreuungspreis gefunden.
- **Menüvergleichbarkeit:** Zwei neue Originalpreise beseitigen keine Leistungs-/Qualitätsunterschiede. Deshalb weiterhin keine automatische Indexaufnahme.

## Dokumentation und Daten

[Such- und Abrufprotokoll](../data/research/weitere-archive-protokoll-2026-10-21.json): 25 Such-/Katalogabfragen und zehn Inhaltsabrufe einschließlich Redirects und des gescheiterten Archive.today-Versuchs. Erfolgreicher HTTP-Status allein bedeutet keinen Preisfund. Angaben zu Treffern gelten nur für die jeweils dokumentierte Antwort, einschließlich gesetzter Limits und unscharfer Treffer.

[Neuer konsolidierter Datenstand](../data/research/archiverweiterung-2026-10-21.json): Alle bisherigen 61 Beobachtungen bleiben unverändert, zwei historische Originalkarten-Beobachtungen kommen hinzu. Quellen enthalten Capture-URL, Datumstyp, Fundstelle, SHA-256 und Prüfstatus. Vollständige PDFs, Seiten und Bilder werden nicht weiterveröffentlicht. Keine Anbieter kontaktiert und keine Archivierung neu ausgelöst.

Die bestehenden sechs Einzelreihen (einschließlich der zwei Pilot-Tarife), ihre Berechnung, die Gewichtungsszenarien und die Bundesbank-Belege bleiben unverändert. Die neuen Preisfakten werden in Recherchekarten und Export aufgenommen.
