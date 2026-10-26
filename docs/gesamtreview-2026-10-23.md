# Kritischer Gesamtreview · 23. Oktober 2026

**Nachrecherche 26.10.2026:** Der [Schwarzwaldstube-Deep-Dive](schwarzwaldstube-preisanstieg-2026-10-26.md) erschließt einen Oktober-2025-Primärbeleg zu 325 € und einen Dezember-2025-Beleg zu bereits 385 €. Die in Abschnitt 1 kritisierte 19-Monats-Lücke ist für diese Position inzwischen auf einen Oktobervergleich eingegrenzt. Der alte Review und seine Diagnose bleiben als Prüfung des damaligen Stands erhalten; die übrigen Zeit-/VPI-Probleme sind dadurch nicht gelöst.

**Nobelpreis hat eine brauchbare Recherchebasis und einen funktionierenden Prototyp. Für die Veröffentlichung einer belastbaren Inflationsdifferenz reicht der jetzige Neuner-Vergleich noch nicht.** Der nächste sinnvolle Meilenstein ist eine gemeinsame öffentliche Forschungsbeta mit überprüfbaren Produktgeschichten. Ein gemeinsamer nominaler Index folgt nach fachlicher Freigabe.

Die [Roadmap](roadmap.md) übersetzt die Befunde in Arbeitspakete und Abnahmen. Umsetzungstracking: [Issue #26](https://github.com/Tobias-Run/nobelpreis-index/issues/26).

**Nachfolgende Projektentscheidung vom 23.10.2026:** Die in Abschnitt 2 noch offene Auswahlregel ist inzwischen festgelegt: Bei Änderungen wird das [vergleichbarste belegte Premiummodell beziehungsweise Premiumpaket](premiumvergleich.md) verwendet. Charger5 vario und Lanserhof Classic Plus werden nominal fortgeführt; Komponenten- oder Anwendungswechsel allein blockieren das nicht. Der nachfolgende Review hält den zuvor geprüften Stand fest. Präzisierung: Der detaillierte Lanserhof-Anwendungsabgleich betrifft Classic, nicht Classic Plus; für Plus ist Anwendungsgleichheit nicht vollständig geprüft.

## Grundlage und Grenzen dieses Reviews

- Geprüfter Code: `4052a25`; aktiver Recherche-/Auswahlstand: 21.10.2026, Forschungsdatenversion `poc-0.4.0`.
- Quellcode, strukturierte Daten, Berechnungsregeln, Produktdossiers, bisherige Audits und offene GitHub-Issues wurden geprüft. Drei unabhängige Teilreviews untersuchten Methodik, UX sowie Technik/Betrieb; hinzu kommt eine Quellenstichprobe.
- Alle 21 vorhandenen Tests und drei JavaScript-Syntaxprüfungen bestanden. Forschungsbuild und VPI-Import erzeugten in einer separaten Kopie byteidentische Artefakte. Das belegt die Reproduzierbarkeit der implementierten Regeln; ihre fachliche Angemessenheit muss gesondert beurteilt werden.
- Browserprüfung bei 390 × 844 Pixeln: beide öffentlichen Ansichten, Navigation, Verlauf und Produkt-Direktlink. Fünf zentrale veröffentlichte Assets waren bytegleich mit dem geprüften Repository. Kein aktueller Deployfehler, keine JavaScript-Fehler und kein horizontaler Seitenüberlauf in diesen Ansichten.
- Quellenstichprobe: Salem **50.400 → 53.400 €**, Schwarzwaldstube Menü II **325 → 385 €** und Ski-Arlberg-Hauptsaisonpass **423 → 450 €** wurden anhand von sechs erneut abgerufenen Belegen bestätigt. Alle Abrufe lieferten HTTP 200; die Inhalte stimmten mit vorhandenen Prüfsummen überein, beim aktuellen Menü über einen gesonderten Prüfeintrag derselben URL. Das historische Menüfoto wurde zusätzlich visuell geprüft; sein Datum stammt aus dem zugehörigen Besuchsbericht. [Abruf- und Hashprotokoll](../data/reviews/quellenstichprobe-2026-10-23.json).
- Keine erneute Vollprüfung aller externen Quellen, kein vollständiges WCAG- oder Rechtsgutachten, kein neuer vollständiger Wettbewerbsvergleich. Branchschutz war wegen fehlender API-Leseberechtigung nicht prüfbar; sein Fehlen wird nicht unterstellt.

## Was bereits trägt

1. **Konkrete deutsche und regional nahe Konsumthemen.** Salem, Bayreuth, Bodensee, Arlberg und deutsche Hersteller ergeben einen erkennbaren redaktionellen Ansatz.
2. **Nachvollziehbare Eingabedaten.** Beobachtungs- und Quellen-IDs, Preisarten, archivierte Fundstellen, Einschränkungen und versionierte Bundesbank-Belege sind vorhanden. Fehlende Werte werden nicht heimlich interpoliert.
3. **Sinnvolle Abgrenzungen.** Immobilienkäufe bleiben außerhalb des Konsumindex. Saxonia-Referenzen bleiben getrennt. Bayreuth enthält die Pflichtgebühr; Zugang und Preis werden unterschieden. Ein fehlender Oktober-VPI bleibt in den Einzelkurven leer.
4. **Nützliche Forschungsfunktionen.** Lesbare mobile Forschungsdiagramme, exakte Punktwerte, Tabellen, Suche, JSON/CSV und teilbare Vergleichszustände sind umgesetzt.
5. **Angemessene Technik.** Eine statische Website mit zentraler Berechnungslogik reicht. Ein Frameworkwechsel oder eine Datenbank wäre derzeit kein wesentlicher Fortschritt.

## 1. P0: Der prominente VPI-Abstand beantwortet die Leitfrage noch nicht

Die neun Preisverhältnisse ergeben rechnerisch **+4,6027 %**. Der August-VPI steigt von 122,3 auf 125,8, also **+2,8618 %**. Die Differenz beträgt **+1,7409 Prozentpunkte**. Die Rechnung ist korrekt; ihre Inputs messen aber verschiedene Zeitfenster:

| Position | Tatsächlicher Bezug der verwendeten Belege | Problem beim gemeinsamen Augustvergleich |
|---|---|---|
| Schwarzwaldstube | März 2025 → Oktober 2026 | Rund 19 Monate Preisabstand gegenüber zwölf Monaten VPI |
| Cayenne | Juli 2025 → Oktober 2026 | Rund 15 Monate statt zwölf |
| Saxonia neu | Oktober 2025 → Oktober 2026 | Passender Oktober-2026-VPI im verwendeten Stand noch nicht vorhanden |
| Salem | Schuljahr 2025/26 → 2026/27 | September-Konvention der Einzelreihe unterscheidet sich vom August-Anker |
| Ski Arlberg | Saison 2024/25 → 2025/26 | Im Aggregat Saisonendjahr, in der Einzelkurve Saisonbeginn und Dezember-Anker |

Das verändert das Ergebnis tatsächlich: Nach der bestehenden Einzelreihen-Konvention beträgt der VPI-Anstieg für den Skipass **Dezember 2024 → Dezember 2025 +1,8257 %**, für Salem **September 2025 → September 2026 +3,2626 %**. Beide werden im Neuner-Vergleich demselben August-Anstieg gegenübergestellt.

Die Einschränkungen sind bereits offen dokumentiert. Ihre Platzierung neben einer dominanten Kennzahl „Abstand zum VPI“ kann trotzdem den Eindruck eines vergleichbaren Inflationsmaßes erzeugen. **Aus den +1,74 Prozentpunkten darf derzeit keine Aussage „gehobener Konsum verteuert sich um so viel stärker“ abgeleitet werden.**

**Maßnahme:** Die Neuner-Rechnung vorerst als sekundäres Rechenexperiment führen. Für veröffentlichte Produktvergleiche tatsächliche Preis-/Gültigkeitsdaten und festgelegte Referenzmonate zeigen. Einen Gesamtvergleich erst nach einer konsistenten Zeitkonvention freigeben. Eine bloße Umbenennung oder ein neuer Fußnotentext löst den Zeitunterschied nicht.

Belege: [Auswahl und Zeitfenster](pragmatischer-warenkorb-2026-10-21.md), [August-Festlegung in der Berechnung](../dist/zeitreihe/berechnung.mjs#L31), [Kennzahlen](../dist/zeitreihe/app.mjs#L36).

## 2. P0: Zwischen Preisgeschichte und vergleichbarer Leistung fehlt eine verbindliche Regel

Charger5 hat nachweislich eine andere Gabel und Nabe; Lanserhof ändert enthaltene Anwendungen. Ein vergleichbarer Modellname allein macht daraus keine konstante Konsumleistung. Umgekehrt muss ein redaktioneller Tarifindex keine amtliche Qualitätsbereinigung leisten: Eine bewusst definierte, fortgeführte Leistungsstufe kann ein legitimer nominaler Untersuchungsgegenstand sein, etwa das große siebenteilige Menü ohne Getränke.

Derzeit stehen strenge ältere Anforderungen an unveränderte Leistungen neben einer später bewusst gelockerten nominalen Auswahl. Der öffentlich sichtbare Vergleich ist nachvollziehbar, aber die Freigaberegel für den nächsten Modellwechsel bleibt unklar.

**Maßnahme:** Pro Reihe Preisart, Einheit, Kernleistung, Pflichtbestandteile und Umgang mit Änderungen festlegen: fortführbar als nominale Tarifstufe, Reihenbruch oder Ausschluss aus dem gemeinsamen Vergleich. Keine nachträgliche Auswahl nach günstigem Ergebnis. Die gewünschte höhere Variante bleibt innerhalb identischen Umfangs und gleicher Dauer zulässig; sie wird für künftige Updates fixiert. Die vorhandene Auswahl wurde anhand bereits bekannter Daten getroffen und ist keine prospektiv erhobene Stichprobe.

Belege: [Charger5, dokumentierter Wechsel](produkte/riese-mueller-charger5.md), [Auswahlrezept](../data/methodik/pragmatische-auswahl-2026-10-21.json), [bisherige Mehrwertanforderungen](abgrenzung-julius-baer.md).

## 3. P1: Ein einzelnes Produkt prägt das Ergebnis stark

Die Schwarzwaldstube trägt **2,0513 Prozentpunkte beziehungsweise 44,57 % des Nettoanstiegs** bei. Das liegt an ihrem hohen Preisverhältnis und dem festen Gewicht von 1/9. Eine rein diagnostische Weglassprobe ergibt für die übrigen acht Positionen **+2,8703 %**. Beim Weglassen jeweils einer der neun Positionen liegen die Ergebnisse zwischen **+2,8703 % und +5,3510 %**.

Das ist **kein Vorschlag, das Menü zu entfernen**, kein alternativer belastbarer Index und keine statistische Unsicherheitsspanne. Es zeigt die Abhängigkeit der Aussage von einem kleinen, kuratierten Warenkorb. Die Zeit- und Leistungsprobleme bleiben in allen Weglassproben bestehen.

**Maßnahme:** Treiber und Sensitivität am aktuellen Warenkorb erklären. Die historischen 13er-Gewichtungsszenarien ersetzen das nicht. Gleiche Gewichte bleiben ein praktikabler redaktioneller Ausgangspunkt. Julius-Bär-Gewichte liefern keine gemessenen deutschen Haushaltsausgaben und lösen weder Zeit- noch Qualitätsprobleme.

Nachrechnung mit Eingabe-Hashes: [Review-Diagnose](../data/reviews/gesamtreview-2026-10-23.json). Reproduktion:

```bash
python3 scripts/review-sensitivitaet.py
```

## 4. P1: Der echte Erkenntnisfortschritt ist kleiner als die Rohdatenzahl

Vorhanden sind **13 Recherchepositionen und 63 Rohbeobachtungen**. Darunter befinden sich Gebührenkomponenten, angekündigte Zukunftspreise, Varianten und unvollständige Angebote. Der aktuelle Neuner-Vergleich verwendet 20 konkrete Beobachtungen für je zwei zusammengesetzte oder einzelne Preise. Er hat nur einen Veränderungsschritt, keine mehrjährige gemeinsame Zeitreihe. Daneben existieren zehn getrennte Einzelkurven für neun Positionen, einschließlich zweier Saxonia-Segmente.

Alle Positionen bleiben `indexfreigabe:false`. Diese Vorsicht ist richtig, reicht aber als Veröffentlichungssteuerung nicht: „Preis belegt“, „nominales Vergleichspaar freigegeben“ und „für Aggregation zugelassen“ sind unterschiedliche Entscheidungen.

**Maßnahme:** Fortschritt anhand fachlich freigegebener Reihen, zulässiger Jahrespaarungen und rekonstruierbarer Belege messen. Eine aktuelle Produktmatrix ersetzt widersprüchliche Zusammenfassungen früherer Recherchestände. Kelly, Alarm, Sylt-Service und Adlon bleiben abgegrenzter Backlog. Ein Skipass bleibt ein Skipass; der Flächentarif bleibt eine Einheit statt eines vollständigen Liegeplatzes.

Belege: [aktives Register](../data/research/produktregister.json), [Auswahl und Ausschlüsse](../data/methodik/pragmatische-auswahl-2026-10-21.json), [Einzelkurven](../scripts/einzelzeitreihen.py).

## 5. P1: Zwei öffentliche Einstiege vermitteln verschiedene Produkte

Die Startseite zeigt weiterhin eine korrekt gekennzeichnete synthetische 16er-Demo mit **+39,2 % seit 2020**. Die separate Forschung zeigt echte Belege, den Neuner-Vergleich, den alten Zweier-Pilot und historische Gewichtungsszenarien. Der Besucher muss den gültigen Stand selbst zusammensetzen.

Die ursprünglichen UX-Mängel sind im alten Entwurf weiterhin reproduzierbar: erste mobile Kennzahl bei **y ≈ 1.065**, Diagrammbeschriftung horizontal auf rechnerisch etwa **3 Pixel** verkleinert, Browser-Zurück lässt den Produktdialog offen. Die Forschung ist hier deutlich besser: Kennzahlen beginnen bei **y ≈ 704**, Diagrammtexte bleiben 12 Pixel groß, Werte und gültige Vergleichszustände sind zugänglich.

**Maßnahme:** Eine Forschungsbeta als Hauptseite mit der gewünschten ruhigen Hotelgestaltung. Den synthetischen Entwurf als Designarchiv erhalten. Bestehende UX-Issues am gemeinsamen Zielprodukt abnehmen, statt beide Oberflächen parallel vollständig auszubauen.

Belege: [Startseite](../dist/index.html), [Forschungsansicht](../dist/zeitreihe/index.html), offene Issues [#2](https://github.com/Tobias-Run/nobelpreis-index/issues/2), [#3](https://github.com/Tobias-Run/nobelpreis-index/issues/3), [#4](https://github.com/Tobias-Run/nobelpreis-index/issues/4).

## 6. P1/P2: Die Belegfülle erschwert den Weg zur einzelnen Aussage

Bei 390 Pixeln Breite ist die Forschungsseite etwa **12.362 Pixel** hoch. Das durchsuchbare Produktarchiv beginnt erst bei **y ≈ 5.725**, hinter neun vollständigen Quellenkarten. Treiber führen nicht direkt zum passenden Produkt. Ein Link wie `/zeitreihe/#rm-charger5` öffnet die dynamisch erzeugte Detailkarte beim Direktaufruf nicht.

Der JSON-Export enthält die Auswahl und das Ergebnis. Die CSV enthält dagegen die Rohbeobachtungen, aber keinen vollständigen Nachrechnungsbogen des angezeigten Vergleichs mit Auswahl, Gewichten, Beiträgen und VPI-Fenstern. Für ein Recherchewerkzeug ist gerade dieser Weg wesentlich.

**Maßnahme:** Produktübersicht früher zeigen, Quellen je Produkt aufklappbar machen, stabile Produktlinks mit Verlauf einführen und einen Export des sichtbaren Vergleichs anbieten. Kleine goldene Texte erreichen mit der aktuellen Farbwahl nur etwa 3,74:1 Kontrast; für normalen Text mindestens 4,5:1 vorsehen. Dies ist ein Einzelbefund und kein vollständiges Barrierefreiheitsaudit.

Belege: [Treiber und Quellenkarten](../dist/zeitreihe/app.mjs#L39), [Produktkarten](../dist/zeitreihe/app.mjs#L70), [Exporte](../dist/zeitreihe/app.mjs#L103), [Farben](../dist/zeitreihe/style.css). Bestehende Arbeitspakete [#5](https://github.com/Tobias-Run/nobelpreis-index/issues/5), [#6](https://github.com/Tobias-Run/nobelpreis-index/issues/6), [#7](https://github.com/Tobias-Run/nobelpreis-index/issues/7).

## 7. P1: Reproduzierbarer Build, aber unvollständige Eingangsprüfung

Der Build prüft IDs, Quellenverweise und positive Beträge. Wesentliche Pflichtfelder und Datums-/Zulassungsregeln werden nicht vollständig geprüft. In einer isolierten Kopie ließen sich beim ausgewählten `cayenne-2026` unabhängig voneinander folgende Änderungen mit erfolgreichem Build durchschleusen:

- Gültigkeitsbeginn `2027-01-01` trotz Recherchestand 21.10.2026.
- Entfernte Felder `preisart` und `umsatzsteuer`.
- Ungültiges Preisdatum `2026-19-98`.

Das beweist eine Schutzlücke für künftige Eingaben, keine aktuell falsche Preisangabe. Recherchearchive dürfen Zukunftstarife behalten; ein laufender Vergleich muss sie zuverlässig ausschließen.

**Maßnahme:** Gemeinsames Schema und fachliche Validierung mit klaren Fehlermeldungen je Beobachtungs-ID. Freigabe des Preisfakts, des Vergleichspaars und der Aggregation getrennt prüfen. Negativproben in den festen Testbestand übernehmen.

Beleg: [zentrale Eingangsprüfung](../scripts/build-zeitreihe.py#L23).

## 8. P1/P2: Redaktioneller Betrieb und Veröffentlichung sind noch Handarbeit

Es gibt keine eingecheckten CI-Workflows. Die Veröffentlichung erfolgt durch manuelles Kopieren von `dist/` nach `gh-pages`. Aktuell stimmen die geprüften öffentlichen Dateien; der Handablauf birgt aber vermeidbare Risiken bei weiteren Ständen. Datierte Dateipfade, Jahresgrenzen und Metadaten stehen an mehreren Stellen im Code.

Quellen sind ausführlich dokumentiert, ihre langfristige Prüfbarkeit aber uneinheitlich: Externe URLs und Hashes ersetzen keine erreichbare historische Fassung. Im Repository liegen keine ursprünglichen HTML-/PDF-Preisbelege. Vier der 20 direkt ausgewählten Quellen-Einträge haben keinen Hash; beim Menü liegt unter einer anderen Quellen-ID bereits eine gehashte Prüfung derselben URL vor. Die Zuordnung ist also ebenfalls zu konsolidieren. Ein Hash ohne wiederbeschaffbaren Inhalt genügt nicht als Belegarchiv.

Ein Korrekturprozess ist beschrieben, aber nicht als kleine, ausführbare Freigabe-/Korrekturhistorie umgesetzt. Zuständige Personen, Prüftermine und Aktualisierungstakt fehlen als verbindlicher Betriebsplan. Mehrere Produktdossiers beginnen mit inzwischen überholten Statusmeldungen und hängen aktuelle Erkenntnisse unten an. README und Backlog mischen historische und aktuelle Zustände.

**Maßnahme:** PR-CI, Release aus demselben geprüften Commit, eindeutiges Release-Manifest, gesicherte Belegkette, redaktionelle Zuständigkeit und ein öffentlicher Musterkorrekturfall. Aktuelle Zusammenfassung oben, historische Protokolle darunter. Code-Lizenz, Faktenexportrechte und gegebenenfalls erforderliche rechtliche Seiten/Kontaktangaben vor dem redaktionellen Launch entscheiden. Fehlende Rechteentscheidungen bedeuten nicht pauschal, dass Preisfakten nicht ausgewertet werden dürfen.

Belege: [Build-Eingänge](../scripts/build-zeitreihe.py#L11), [feste UI-Jahresgrenzen](../dist/zeitreihe/app.mjs#L19), [Korrekturvorgaben](../CONTRIBUTING.md#methodische-änderungen-und-korrekturen), [Salem-Dossier mit früheren und neuen Ständen](produkte/schloss-salem.md).

## Positionierung, Julius Bär und Umfang

Die [bisherige Würdigung](abgrenzung-julius-baer.md) bleibt richtig: „Inflation für Wohlhabende“ ist keine neue Idee, Deutschland allein keine ausreichende Abgrenzung. Der konkrete Mehrwert liegt in **öffentlich nachprüfbaren, langfristigen Produkt- und Tarifgeschichten mit deutschem Bezug**. Diesen Nutzen kann eine kleine Forschungsbeta schon liefern, bevor ein Gesamtindex belastbar ist.

Gleiche Gewichte sind für eine offen kuratierte Auswahl vertretbar. Die Julius-Bär-Adaption ist ein Szenario, keine Validierung unserer Haushaltsrelevanz. Immobilienkäufe bleiben ausgeschlossen; Alarm und Sylt-Service ersetzen keine umfassende Wohnkostenkomponente. Im aktuellen Neuner-Vergleich ist Wohnen/Service daher nicht enthalten. Eine zusätzliche Kerninflationsreferenz kann später Kontext geben, löst jedoch das jetzige Zeitproblem nicht; ein eigenes konkretes Umsetzungsissue dazu wurde im geprüften Backlog nicht gefunden.

Der ursprüngliche MVP mit 15–25 Positionen und mehrjährigem gemeinsamem Index ist noch nicht erreicht. Die auf neun Positionen reduzierte Auswahl ist ein sinnvoller pragmatischer Schritt. Jetzt weiter Kandidaten und Archive zu sammeln hat weniger Nutzen als die vorhandenen Reihen fachlich freizugeben und künftig nach einem festen Erhebungsplan zu beobachten. Einzelne präzise Belegfragen bleiben sinnvoll; pauschale weitere Archivrunden bekommen kein eigenes Erfolgskriterium „mehr Fundstellen“.

Empfohlener nächster Erfolg: Ein Leser findet einen auffälligen Preis, versteht die genaue Leistung und den Zeitraum, gelangt zum gesicherten Beleg und kann die Rechnung nachstellen. Das ist eine konkrete, überprüfbare Abgrenzung und die Grundlage der [Roadmap](roadmap.md).
