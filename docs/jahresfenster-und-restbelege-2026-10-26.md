# Jahresfenster und gezielte Restbelege

**Prüfstand: 26.10.2026 · Version `poc-0.7.0`**  
Auftrag: [#35](https://github.com/Tobias-Run/nobelpreis-index/issues/35), fachliche Teilaufgaben aus [#26](https://github.com/Tobias-Run/nobelpreis-index/issues/26).

## Ergebnis und Aussage

Alle neun Positionen folgen jetzt einer verbindlichen, maschinengeprüften jährlichen Zeitkonvention. Zwei zusätzliche historische Originalbelege bringen den Cayenne und den Charger5 in das gemeinsame Herbstfenster. **Der nominale Tarifvergleich bleibt bei +4,6027 %**, weil die besser passenden Belege dieselben Preise nennen. Gewichte, Premiumstufen und Zusammensetzung bleiben unverändert.

Die neue Hauptansicht zeigt diese Jahresrunde. Der bisherige Neuner-Versuch mit August-VPI bleibt im Rechenlabor erhalten; seine Preise werden nicht rückwirkend überschrieben. Die mehrjährigen Einzelkurven bleiben zugänglich.

**Ein gleichzeitiger Einkaufswagen lässt sich aus diesen Daten weiterhin nicht behaupten.** Schule, Sommerliegeplatz, Festspiele und Winterpass haben unterschiedliche Leistungsperioden. Wir messen eine wiederholbare Auswahl jährlicher Angebotspreise und Tarife. Das ist eine nachvollziehbare Jahresrunde, keine gemessene Kalenderjahresausgabe eines Haushalts und keine tagesgleiche Preisniveaumessung. Die Zeitregel ist freigegeben; eine produktive redaktionelle Gesamtindexfreigabe wird daraus nicht automatisch.

Die gezielte öffentliche Nachrecherche ist für alle 13 Positionen dokumentiert: **71 Abrufe**, davon 58 HTTP-200-Antworten, fünf technische 202-Antworten und acht Fehler/Timeouts. HTTP 200 allein ist kein brauchbarer Beleg: ein Securando-Inhalt ist passwortgeschützt, Suchantworten und Downloadverzeichnisse liefern nicht automatisch Preise. Insgesamt kommen **sechs Beobachtungen** zum unveränderten bisherigen Bestand hinzu: 73 Rohbeobachtungen einschließlich Komponenten, weiterer Angebotsstände und ausgeschlossener Zukunftstarife. Keine Zahl wurde geschätzt.

## 1. Die verbindliche Zeitkonvention

### Frei veränderliche Preise: jedes Jahr dasselbe Herbstfenster

Für Cayenne, Charger5, Saxonia-LB und Menü II gilt **1. September bis 31. Oktober**. Unter den zur gleichen nominalen Preisdefinition geprüften Belegen wählen wir den Stand mit dem kleinsten Tagesabstand zum **15. Oktober**. Bei Gleichstand zählt zuerst der frühere Tag, dann die Beleg-ID. Der Preis selbst ist kein Auswahlkriterium. Dieses Vorgehen verhindert eine Auswahl nach besonders hohem Anstieg.

Es gilt der bis zum Datenstand tatsächlich geprüfte Quellenbestand, keine behauptete Vollerfassung sämtlicher Archiv-Captures. Eine spätere bessere Quelle erzeugt eine dokumentierte neue Auswahlversion. Ein Archivdatum belegt einen archivierten Angebotsstand, keinen Gültigkeitsbeginn. Zwischen zwei Beobachtungen wird weder ein konstanter Preis noch ein genauer Preiswechsel unterstellt.

| Position | Basisstand 2025 | Endstand 2026 | Preisverhältnis | Belegabstand |
|---|---|---|---:|---:|
| Cayenne | **12.09.2025**, 101.500 € | 16.10.2026, 102.700 € | +1,1823 % | 399 Tage |
| Charger5 vario | **16.10.2025**, 6.199 € | 16.10.2026, 6.499 € | +4,8395 % | 365 Tage |
| Saxonia 201.027-LB | 27.10.2025, 25.600 € | 16.10.2026, 27.000 € | +5,4688 % | 354 Tage |
| Menü II | 14.10.2025, 325 € | 16.10.2026, 385 € | +18,4615 % | 367 Tage |

Der frühere Cayenne-Basisstand war Juli, beim Charger5 August. Beide liegen außerhalb des neuen Fensters und werden vom Validator als Ersatz abgewiesen. Die zusätzlich am 26.10.2026 bestätigten Preise bleiben als neue Beobachtungen im Archiv. Für die Jahresrunde sind die vorhandenen 16.-Oktober-Stände näher am festgelegten Zieltag und haben deshalb Vorrang. Das ist keine Auswahl des letzten oder teuersten Angebots.

Die Bandbreite der vier Belegabstände bleibt sichtbar; **+4,6027 % ist keine aus exakt 365 Tagen errechnete Inflationsrate**. Es erfolgt keine Hochrechnung auf zwölf Monate.

### Jahres- und Saisontarife: feste Regel statt künstlichem Preisstichtag

| Position | Zuordnungsregel | Basisrunde 2025 | Endrunde 2026 |
|---|---|---|---|
| Salem | Schuljahr **beginnt** im Indexjahr | 2025/26 · 50.400 € | 2026/27 · 53.400 € |
| Lanserhof Classic Plus | Jahresbroschüre des Indexjahres | Broschüre 2025 · 4.046 € | Broschüre 2026 · 3.990 € |
| Bayreuth Parsifal A1 | Festspielsaison des Indexjahres | 2025 · 352 + 6 = 358 € | 2026 · 352 + 6 = 358 € |
| YCL | Sommergebühr des Indexjahres | ab 10.05.2025 · 96 €/m² | ab 20.04.2026 · 96,50 €/m² |
| Ski Arlberg | Wintersaison **endet** im Indexjahr | 2024/25 · 423 € | 2025/26 · 450 € |

Das sind ausdrücklich Tarifjahreskonventionen. Sie machen aus einem erst im Mai beschlossenen YCL-Tarif keinen Januarpreis und aus einem Schuljahr kein Kalenderjahr. Jahresbro­schüren erhalten keinen erfundenen einzelnen Preisstichtag.

Beim Skipass bezeichnet die Jahresmarke jetzt **überall das Saisonendjahr**. Die Einzelkurve behält ihren sachlichen VPI-Anker Dezember im Saisonbeginnjahr: Jahresmarke 2025 = Winter 2024/25 = Dezember-VPI 2024. Die gemeinsame Jahresrunde hat dagegen ihren eigenen Herbstanker. Saison 2026/27 gehört zur Jahresmarke 2027 und bleibt am Datenstand ein ausgeschlossener Zukunftstarif. Ein angekündigter Preis wird nicht zum aktuellen Saisonpreis gemacht.

### Gemeinsame Bundesbank-Referenz: vollständig oder leer

Wir verwenden das arithmetische Mittel der beiden offiziellen Monatsindizes:

```text
VPI_Herbst(y) = [VPI_September(y) + VPI_Oktober(y)] / 2
VPI_normiert(y) = 100 × VPI_Herbst(y) / VPI_Herbst(Basis)
```

Gemittelt werden **Indexstände**, keine monatlichen Inflationsraten. Die Bundesbank liefert die Ursprungswerte des deutschen Gesamt-VPI; Ursprungsquelle ist Destatis. Unsere Herbstmittelbildung ist eine eigene transparente Auswertung, keine gesonderte amtliche Zeitreihe.

| Referenzjahr | September | Oktober | Herbstmittel |
|---|---:|---:|---:|
| 2025 | 122,6 | 123,0 | **122,8** |
| 2026 | 126,6 | **nicht im Beleg verfügbar** | **nicht verfügbar** |

Fehlt einer der beiden Monate, bleiben Herbstmittel, normierter Endwert, VPI-Änderung und Abstand leer. Es wird weder September allein verwendet noch August eingeschoben. Aktuell ist deshalb **kein Gesamt-Abstand zum Herbst-VPI** ausgewiesen. Die 2026er Preisrunde wird deswegen nicht gelöscht.

Das spätere Herbstmittel dient der Einordnung der Tarifrunde. Es bildet keine identische Leistungsverteilung eines Haushalts nach. Der Vergleich wird entsprechend als Abstand zum Herbstanker bezeichnet. Der Zeitpunkt eines offiziellen Oktoberbelegs wird abgewartet, kein Abrufdatum des bestehenden September-Belegs auf heute umgeschrieben.

## 2. Neue und nachgeprüfte Belege

### Cayenne und Riese & Müller

Der [Porsche-Originalstand 12.09.2025](https://web.archive.org/web/20250912074139/https://www.porsche.com/germany/models/cayenne/cayenne-models/cayenne/) nennt in eingebetteten Komponentendaten 101.500 € inklusive MwSt., Basis-Benziner SUV, 260 kW/353 PS. Die teurere Black Edition ist eine andere Variante. Aktuell sind 102.700 € erneut bestätigt. Wir beobachten den veröffentlichten Modell-Grundpreis; Überführung, Zulassung und Extras sind keine stillschweigend enthaltenen Vollkosten. Eine vollständig identische Serienausstattung wird nicht behauptet.

Der [Riese-&-Müller-Originalstand 16.10.2025](https://web.archive.org/web/20251016003952/https://www.r-m.de/de/bikes/charger5/) zeigt **Charger5 vario ab 6.199 €**. Maßgeblich ist der exakte vario-Abschnitt: 800 Wh/Kiox 500, SR Suntour Mobie 34 und Enviolo Heavy Duty in der zugehörigen Komponententabelle. CORE, HS und Pinion werden nicht vermischt. Aktuell sind 6.499 € bestätigt; Fox AWL 34 und Utility V1 dokumentieren den nominalen Ausstattungswechsel.

Die [offiziellen Online-Shop-AGB](https://www.r-m.de/api/term-document/online-store-terms/) vom **02.07.2026, § 5**, nennen Endpreise einschließlich gesetzlicher Mehrwertsteuer und Versand zum gewählten deutschen Fachhändler. Das klärt die aktuelle Shop-Regel. Es bestätigt nicht rückwirkend jede historische Konfiguration oder Händlernebenleistung. Die identische pine/L-Endkonfiguration von 2025 ist weiterhin nicht separat belegt, nach der verbindlichen Premiumregel aber keine zusätzliche Voraussetzung für die ausdrücklich gewählte Modellpreisgeschichte.

### Lanserhof: Classic Plus jetzt direkt abgeglichen

Wir haben die tatsächlich ausgewählte Stufe auf **PDF-Seite 7 der Broschüre 2025** und **Seite 4 der Broschüre 2026** verglichen. Beide nennen Classic Plus für 7–8 Nächte, pro Person, ohne Unterkunft: 4.046 → 3.990 €.

Gemeinsamer medizinischer Kern: Anfangsuntersuchung 40 Minuten, erweiterte Untersuchung 20 Minuten, zwei Kontrollen à 20 Minuten, Befundbesprechung 30 Minuten, Abschluss 30 Minuten, Anfangs-/Endlabor, Fettlebermessung, HRV, Stoffwechselmessung sowie Massage-/Detox-Leistungen. 2026 nennt unter anderem eine weitere Bioimpedanz-/Handkraft-Besprechung, Fußbad, Facial und Vo2Max/Besprechung; die Stoffwechselmessung steigt von 20 auf 30 Minuten. Das telefonische Nachgespräch nach drei Monaten steht 2025 in der Liste, 2026 nicht. Keine rechnerische Qualitätsbereinigung.

Der Bereitschaftsdienst steht in beiden Programmlisten. 2026 nennt die Fußnote **42 €/Nacht als festen Bestandteil**; die Preiszeile spricht von einem Gesamtpreis aus Einzelpreisen. **Wir addieren keine unbelegten zusätzlichen 294 € zu den ausgewiesenen 3.990 €.** Aus den Broschüren allein lässt sich trotzdem keine vollständige tatsächlich bezahlte Aufenthaltsrechnung ableiten. 2025 ist kein separater Pauschalbetrag ausgewiesen. Unsere Reihe bleibt beim veröffentlichten Programmbetrag, ohne Zimmer, Medikamente und Nahrungsergänzungsmittel. Für einen vollständigen Aufenthaltsindex wäre ein entsprechender Rechnungs-/Angebotsbeleg nötig.

Die Classic-/Plus-Verwechslungen im Einleitungstext der Broschüren sind dokumentiert; eindeutige Überschrift und Preiszeile bestimmen die Stufe. Die Mehrwertsteuerangabe steht jeweils am Ende der Broschüre. [Produktdossier mit beiden Originalen](produkte/lanserhof-sylt.md).

### Salem, Bayreuth, Saxonia und YCL

- **Salem:** Klasse 8 gehört zur deutschen Klassenstufe 5–10. Gebührenblatt und AVB bestätigen Jahressatz und zwölf Monatsraten. 2026/27 ausdrücklich 53.400 €, nicht die teureren internationalen Klassen oder freiwillige Überzahlungen. Kaution, einmalige Aufnahme/Administration und Nebenkosten bleiben außerhalb des Grundtarifs.
- **Bayreuth:** A1/Parsifal 352 € und Pflichtgebühr 6 € je verkauftem Platz im Original geprüft. Die zusätzliche Gebühr für schriftliche Bestellungen und der Postversand entfallen bei der definierten Online-/Digitalbuchung. Ein unbelegter einzelner Steuersatz wird nicht aufgeschlagen.
- **Saxonia:** LB100063/201.027-LB, aktuell erneut 27.000 € inklusive MwSt.; temporär nicht verfügbar. Die Reihe misst eine Händlernotierung, keine verfügbare Transaktion. Die Bedeutung des LB-Suffixes ist für die getrennt geführte LB-Reihe keine zusätzliche Freigabehürde; das alte Segment wird weiterhin nicht angehängt.
- **YCL:** Die veröffentlichten Sommer-Flächengebühren 2025/26 einschließlich 7 % MwSt. sind erneut bestätigt. Verzeichnis, alte und migrierte Dateipfade sowie gezielte Archivabfragen liefern weiterhin kein auswertbares Originaltarifblatt 2023/24. Die verbindliche Bootsflächenformel bleibt offen. Beides blockiert **nicht** den definierten 2025/26-Vergleich je m²; es begrenzt Rückverlängerung und Gesamtliegeplatzkosten.

Schwarzwaldstube bleibt entsprechend der Nutzerentscheidung abgeschlossen. Ihr Oktoberpaar passt ins Fenster; keine erneute Recherche zu betrieblichen Kostenursachen.

## 3. Die vier verbleibenden externen Kernbelege

| Position | Gezielt geprüft / Ergebnis | Was zur Aufnahme konkret fehlt |
|---|---|---|
| **Alarmaufschaltung** | Historischer **Pro-Tarif 30 €/Monat brutto** aus Original-PDF ergänzt; höhere passende Paketstufe mit Schlüsselaufbewahrung, mobiler Bereitschaft und 15 Aktivitäten. Aktuelles Ab-Angebot kein identischer Pro-Tarif; Ratgeber passwortgeschützt. | Aktuelles vollständiges Pro-Tarifblatt bzw. datiertes Angebot mit Pflichtbestandteilen, Laufzeit und Einrichtung. Alte Nebenpreis-Gültigkeitswidersprüche klären, soweit relevant. |
| **Sylt-Hausbetreuung** | Enkelmann, Haus & Hand sowie zusätzlich Clean & Green, Silke Heer und Mein Haus auf Sylt geprüft. Individuelle Angebote, keine öffentliche Referenzpauschale. | Datierte vergleichbare Angebote/Rechnungen für 150 m² Westerland, 24 dokumentierte Kontrollen, Schlüssel und Anfahrt. Kein Stundenlohn oder Reinigungspreis als Ersatz. |
| **Hermès Kelly** | Passendes Berliner Handbag-Sense-Produkt mit Retourné-/Togo-/Noir-/Gold-/Ungetragen-Beschreibung, aber verkauft und ohne eigenen Preis. Europa-Tabelle nennt 10.100 €; kein deutscher Boutique-Nachweis. | Deutscher datierter Boutique-Beleg und verfügbares vergleichbares Zweitmarktangebot mit Steuer-/Versandbedingungen. Kein verifizierter Markup. |
| **Adlon Deluxe** | Offizielle Zimmerseite und Archive geprüft. Der angeforderte Oktober-Capture liefert tatsächlich ein Dezember-2025-Memento ohne vollständige Rate. 2024-Abruf 503. Keine Umdeutung von Ghorfa-Sondertarifen. | Zwei passende öffentliche flexible Deluxe-King-Angebote: gleiche Belegung, Reise-/Vorlauf-/Storno-/Steuerbedingungen. |

Die **öffentliche Recherche** dieser Fragen ist abgeschlossen; die **Preislücken** sind damit nicht geschlossen. Für die fehlenden Belege wäre ein tatsächliches Anbieterangebot oder ein freiwillig bereitgestellter, anonymisierter Kundenbeleg erforderlich. Es wurden keine Anbieter, Händler, Eigentümer oder Kunden kontaktiert und keine Buchung oder kostenpflichtige Anfrage ausgelöst. Die [konkreten Nachweisvorlagen](anbieteranfragen-2026-10-17.md) bleiben vorbereitet.

Bei Adlon ist das künftige Erhebungsprofil festgelegt: zweiter Dienstag im März, eine Nacht, zwei Erwachsene, Deluxe King, ohne Frühstück, öffentliche flexible Direktbuchung, **56 Tage Vorlauf**. Für die Vergangenheit zählt nur ein Beleg derselben Bedingungen. Die jetzt abgerufene Zimmerbeschreibung ersetzt dieses Angebot nicht.

Ein vollständiger Skiurlaub bleibt eine **separate Erweiterung** der ausdrücklich gewählten Skipassposition. Burg Vital nennt aktuell drei Nächte ab 1.428/1.825 € für die Zukunftssaison 2026/27. Diese Angebote erfüllen weder die feste Sieben-Nächte-Dauer noch eine identische historische Zimmer-/Verpflegungsauswahl. Sie werden nicht zum Skipass addiert.

## 4. Berechnung, Beiträge und Robustheit

Alle neun vorher festgelegten Positionen erhalten je **1/9** Gewicht:

```text
I(y) = 100 / 9 × Σ [p_i(y) / p_i(2025)]
Nominale Veränderung = I(2026) − 100
Beitrag_i = 100 / 9 × [p_i(2026) / p_i(2025) − 1]
```

| Position | Veränderung | Beitrag zum Tarifanstieg |
|---|---:|---:|
| Menü II | +18,4615 % | +2,0513 Pp. |
| Skipass Arlberg | +6,3830 % | +0,7092 Pp. |
| Salem | +5,9524 % | +0,6614 Pp. |
| Saxonia LB | +5,4688 % | +0,6076 Pp. |
| Charger5 vario | +4,8395 % | +0,5377 Pp. |
| Cayenne | +1,1823 % | +0,1314 Pp. |
| YCL je m² | +0,5208 % | +0,0579 Pp. |
| Bayreuth | 0,0000 % | 0,0000 Pp. |
| Lanserhof Classic Plus | −1,3841 % | −0,1538 Pp. |
| **Gesamt** | **+4,6027 %** | **+4,6027 Pp.** |

Das Menü erklärt rund 44,57 % des nominalen Nettoanstiegs. Das ist ein Gewichts-/Preisbeitrag, keine gesicherte Erklärung betrieblicher Kosten. Weglassproben mit neu normierten Gewichten stehen als Sensitivitätsdiagnose in der Analyse; sie begründen keine Entfernung einer auffälligen Position. Julius-Bär-Gewichte bleiben ein getrenntes historisches Szenario, keine neu behaupteten deutschen Haushaltsanteile.

## 5. Daten, Prüfung und nächste Aktualisierung

- [Versionierter Forschungsbestand](../data/research/herbstfenster-und-restbelege-2026-10-26.json): frühere Beobachtungen und Quellen unverändert, sechs neue Beobachtungen.
- [Jahresfenster-Rezept](../data/methodik/jahresfenster-2026-10-26.json): alle Kandidaten, ausgewählte IDs, feste Gewichte und Zeitbegründungen.
- [Fachprüfung aller 13 Positionen](../data/reviews/fachpruefung-2026-10-26.json) und [Abrufprotokoll](../data/research/restbelege-protokoll-2026-10-26.json): URLs, tatsächliche Weiterleitungen, HTTP-Status, Memento-Daten, SHA-256 und Restnachweise.
- [Unabhängig nachgerechnete Analyse](../data/analysen/herbstvergleich-2026-10-26.json): Eingabe-Hashes, Einzelbeiträge, tatsächliche Belegabstände, Herbst-VPI mit fehlendem Oktober und Sensitivitäten.
- [Produktmatrix](produktstatus.md) und aktuelle Zusammenfassungen in allen 13 Produktdossiers; frühere Prüfstände bleiben aufklappbar.

Die automatisierten Prüfungen weisen Juli-/August-Ersatzstände, eine Auswahl weiter vom Zieltag, vertauschte Schul-/Wintersaisons, Zukunftspreise, fremde Produktkandidaten und unvollständige Referenzfenster ab. Python-Analyse und Browserrechnung stimmen überein. Der Vergleichs-CSV enthält zusätzlich Zeitregeln, tatsächliche Belegpreise, Preisdefinition/Steuerstatus und beide VPI-Rohwerte zur vollständigen Nachrechnung. Fehlende Werte sind auch im Export leer bzw. ausdrücklich als fehlend bezeichnet.

Quellen wurden gelesen und gegen die Produktdefinitionen geprüft; eine unabhängige zweite Redaktion wird nicht behauptet. Veröffentlicht werden Preisfakten, eigene Auswertungen und Quellenlinks, keine vollständigen fremden PDF-/HTML-/Bildbelege. Weitergehende Nutzungsrechte werden nicht unterstellt.

**Nächste fachliche Auslöser:** offizieller Oktober-VPI; konkrete Belege für die vier externen Kernlücken; optional YCL-Originale 2023/24. Weitere pauschale Archivrunden, unveränderte Modellnamen als Identitätsbehauptung oder beliebige Ersatzpreise sind dafür kein Fortschritt.
