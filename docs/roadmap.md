# Roadmap · Nobelpreis

Stand: 23.10.2026. Grundlage: [kritischer Gesamtreview](gesamtreview-2026-10-23.md). Umsetzungstracking: [#26](https://github.com/Tobias-Run/nobelpreis-index/issues/26).

**Nächstes Produktziel: eine öffentliche Forschungsbeta für neun kuratierte Preisgeschichten.** Der gemeinsame nominale Index ist ein eigener, nachgelagerter Freigabeschritt. Die bestehende Website und Berechnung wurden im Rahmen des Reviews nicht verändert; die folgenden Punkte sind der empfohlene Arbeitsplan.

## Reihenfolge und Aufwand

Die Aufwände sind grobe Arbeitstage für konzentrierte Umsetzung und Prüfung, keine zugesagten Kalendertermine. Externe Belege und Anbieterantworten haben zusätzliche, nicht planbare Wartezeit. Redaktionelle und technische Rollen können bei unserem Umfang von denselben Personen ausgefüllt werden; die unabhängige Belegprüfung muss erkennbar bleiben.

| Phase | Ergebnis | Aufwand | Abhängigkeit | Verantwortung |
|---|---|---:|---|---|
| **0 · Aussage und Umfang klären** | Gültige Publikationsregeln, aktuelle Produktmatrix, eindeutiger Beta-Auftrag | 1–2 Tage | sofort | Projektinhaber + Redaktion/Methodik |
| **1 · Daten freigabefähig machen** | Geprüfte Kernreihen, belastbarer Validator und gesicherte Belege | 3–5 Tage plus externe Klärung | Regeln aus Phase 0 | Redaktion/Methodik + Entwicklung |
| **2 · Beta-Oberfläche bereitstellen** | Gemeinsamer Einstieg, Produktlinks, gute mobile Recherche und Nachrechnung | 3–5 Tage | klare Aussagen; technisch teils parallel zu Phase 1 | Produkt/Design + Entwicklung |
| **3 · Veröffentlichung betreiben** | Geprüfter Releaseablauf, Zuständigkeiten, Korrekturen und Aktualisierungsplan | 2–3 Tage | Phase 1; CI kann früher beginnen | Entwicklung + Redaktion + Projektinhaber |
| **4 · Gemeinsamen Index freigeben** | Fachlich freigegebener nominaler Warenkorb oder bewusst weiter getrennte Reihen | eigenes Gate | konsistente historische Daten; Phasen 0–3 | Redaktion/Methodik + Projektinhaber |

Für die Forschungsbeta ist damit eine Größenordnung von **9–15 Arbeitstagen** plausibel; die Arbeitsblöcke können sich teilweise überlappen. Der Termin für den Index hängt von den Daten ab, nicht von zusätzlichem Frontend-Aufwand.

Die fertige Oberfläche aus Phase 2 wird als Forschungsbeta veröffentlicht, sobald auch das Mindestgate aus Phase 3 erfüllt ist: geprüfter Release, benannte Verantwortung und geklärte erforderliche Kontakt-/Rechtsangaben.

## Phase 0 · Zuerst das Messversprechen festlegen

- Primärangebot als Preisarchiv/Recherchewerkzeug definieren. Neuner-Rechnung sekundär als Experiment einordnen; keinen prominenten zusätzlichen Inflationsanspruch aus den +1,74 Prozentpunkten ableiten.
- Pro Position Preisart, Grundvariante, Kernleistung, Einheit, Pflichtbestandteile, Preis-/Gültigkeitsdatum und zeitliche Zuordnung festlegen. Die höhere belegte Variante innerhalb gleicher Dauer und Leistung für künftige Updates fixieren.
- Regeln für nominale Tarifstufen, konkrete Leistungswechsel, Reihenbrüche, fehlende Daten und saisonale Preise festhalten. Monats-VPI bleibt ein Monatsdurchschnitt, keine tagesgenaue Vergleichsmessung.
- Aktuelle Matrix für alle 13 Positionen erstellen: veröffentlichbare Preisfakten, freigegebene Vergleichspaare, aggregierbare Reihe, nächster erforderlicher Nachweis und zuständige Rolle.
- Forschungsbeta auf die bestehenden neun Themen begrenzen. Kelly, Alarm, Sylt-Service und Adlon bleiben benannter Backlog. Der Premium-Entwurf erhält künftig einen eigenen Archivplatz.

**Abnahme:** Für jede sichtbare Zahl ist verständlich, was sie misst und welche Behauptung sie trägt. Beobachtungsfenster und fehlende Referenzmonate bleiben sichtbar; kein gemeinsamer Inflationsabstand für inkompatible Zeitfenster. Die Regeln sind dokumentiert, bevor neue Inputs ausgewählt werden.

## Phase 1 · Vorhandene Reihen prüfen und dauerhaft nachprüfbar machen

| Reihenfolge | Position | Konkrete Arbeit |
|---|---|---|
| 1 | **Salem** | Klasse 8 und zwölf reguläre Raten bestätigen; Schuljahres-/Septemberkonvention und enthaltene Grundleistungen prüfen. Sechs vorhandene Schuljahre nutzen. |
| 2 | **Bayreuth** | A1 Parsifal, Buchungsart und Pflichtgebühr fortführen; vollständigen Zahlbetrag und Bruttobehandlung prüfen. Vorhandene drei Spielzeiten nutzen. |
| 3 | **Ski Arlberg** | Sechs Tage, Erwachsene, Hauptsaison als Teilpreis fixieren; einheitliche Saison-/Dezemberzuordnung in allen Ansichten. |
| 4 | **Saxonia neu** | Angebotspreise der `201.027-LB` fortführen; alte Referenz separat. Passenden Oktober-VPI erst nach Verfügbarkeit ergänzen. |
| 5 | **YCL** | €/m² als eigenständige Tarifeinheit freigeben. Flächenformel/Pflichtkosten nur für einen späteren Gesamtliegeplatzpreis verlangen. |
| 6 | **Cayenne** | Nominale Modellstufe mit Ausstattungs-/Modellwechselregel festlegen; Pflichtkosten eindeutig abgrenzen. |
| 7 | **Menü II** | Großes Menü als definierte Tarifstufe entscheiden; zeitlich passende jährliche Belege und Steuer-/Pflichtbestandteile prüfen. Hohen Anstieg offen erklären. |
| 8 | **Charger5 und Lanserhof** | Konkrete Ausstattungs-/Leistungswechsel nach derselben Policy entscheiden; bis dahin als eingeschränkte Preisgeschichte führen. |

Parallel einen gemeinsamen Validator für Rohdaten und Auswahlrezept bauen: gültige Daten, Pflichtfelder, Quellzuordnung, Produkt-/Variantenbezug, Verwendbarkeit zum Stichtag und fachlicher Freigabestatus. Zukunftstarife dürfen im Archiv stehen, aber nicht unbemerkt im laufenden Vergleich.

Für veröffentlichte Preise stabile Archivfassung oder zulässige interne Belegablage, Hash, genaue Fundstelle, Prüfer und Datum erfassen. Doppelte Quellen derselben Fassung konsolidieren. Veröffentlichung von Originalbelegen und exportierten Fakten jeweils getrennt bewerten.

**Abnahme:** Ein zweiter Bearbeiter kann jedes veröffentlichte Vergleichspaar anhand gesicherter Belege nachrechnen. Die im Review reproduzierten ungültigen Daten, fehlenden Preisart-/Brutto-Netto-Felder und zukünftigen Vergleichspreise werden mit konkreter Fehlermeldung zurückgewiesen. Ein ausdrücklich unbekannter einzelner Steuersatz ist zulässig, wenn der vollständige Brutto-Endpreis belegt ist und die offene Detailfrage den Vergleich nicht berührt. Mindestens die ersten vier Kernreihen erhalten einen expliziten Freigabeentscheid; das ist keine automatische Freigabe des Neuner-Index.

Bestehende Belegaufgaben: [#13](https://github.com/Tobias-Run/nobelpreis-index/issues/13), [E-Bike #8](https://github.com/Tobias-Run/nobelpreis-index/issues/8). Provideranfragen sind vorbereitet, aber **nicht versandt**. Ein erforderlicher Versand wird gesondert beauftragt; diese Roadmap sendet keine Nachrichten.

## Phase 2 · Den Rechercheweg zusammenführen

- Forschung als Hauptseite mit der gewünschten Grandhotel-Anmutung. Historische Pilot-/Gewichtungsexperimente in einen vertiefenden Bereich, synthetische Demo ins Designarchiv.
- Kompakter Einstieg mit tatsächlichem Umfang, Datum und verständlichen Aussagen. Produktauswahl vor langen Quellenblöcken; Belege je Produkt aufklappbar.
- Treiber direkt mit der passenden Produktansicht verknüpfen. Stabile Produktlinks mit Ausgangs-/Endpreis, tatsächlichen Daten, Preisart, Einheit, Zugang, Einschränkungen und zugehörigen Quellen.
- JSON und Rohdaten-CSV behalten; zusätzlich den angezeigten Vergleich mit Inputs, Gewichten, Beiträgen, Referenzmonaten und Version als Nachrechnungsdatei exportieren.
- Forschungsvorteile erhalten: echte 12-Pixel-Diagrammtexte, Punktknöpfe, Datentabelle, fehlender VPI als leerer Wert, URL-Zustand. Kleine Textkontraste korrigieren.

**Abnahme:** Bei 390 × 844 Pixeln erkennt man die Kernaussage und ihren Zeitraum im ersten Bildschirm. Vom Treiber führt eine Aktion zum Produkt. Direktlink, Neuladen und Zurück/Vorwärts erhalten denselben Kontext. Keine seitlichen Seitenüberläufe bei 320, 390, 768 und 1440 Pixeln; Bedienung mit Tastatur und verständliche zugängliche Namen. Der Vergleich ist allein aus seinem Export nachrechenbar.

Bestehende Issues am gemeinsamen Zielprodukt abnehmen: Einstieg [#2](https://github.com/Tobias-Run/nobelpreis-index/issues/2), Diagramm [#3](https://github.com/Tobias-Run/nobelpreis-index/issues/3), Navigation [#4](https://github.com/Tobias-Run/nobelpreis-index/issues/4), Treiber [#5](https://github.com/Tobias-Run/nobelpreis-index/issues/5), Produktdetails [#6](https://github.com/Tobias-Run/nobelpreis-index/issues/6), Export/Zitation [#7](https://github.com/Tobias-Run/nobelpreis-index/issues/7). Bereits in der Forschung gelöste Teile gezielt prüfen; offene Issues sind kein Beweis, dass diese Funktionen überall fehlen.

## Phase 3 · Einen wiederholbaren Releaseablauf schaffen

- PR-CI mit Validator, reproduzierbarem Build, Syntax-, Unit- und kleinen dauerhaft eingecheckten Browserprüfungen. Veröffentlichung nur aus demselben erfolgreich geprüften Commit.
- Release-Manifest als Einstieg für Quellenstand, Auswahl, Referenz, Methodikversion und Artefakt-Hashes. Rollback auf einen vorherigen Release dokumentieren.
- Zuständigkeit und Kalender festlegen: Bundesbank-Referenz monatlich prüfen, Produktpreise nach festem jährlichem beziehungsweise saisonalem Erhebungsfenster; Änderungen zusätzlich dokumentieren. Monatlicher VPI erzeugt keine monatlich beobachteten Produktpreise.
- Öffentliche Korrekturseite mit Vorher/Nachher, Anlass, Datum und Auswirkung auf Ergebnisse; aktuelle Dossier-Zusammenfassungen oben, historische Protokolle darunter.
- Verantwortlichen/Kontakt, erforderliche rechtliche Seiten, Umgang mit Code-/Datenlizenzen und Arbeitstitel vor dem redaktionellen Launch klären. GitHub-Beschreibung und Projekt-URL an die unabhängige deutsche Positionierung anpassen.

**Abnahme:** Ein fehlerhafter Input blockiert den Release. Die öffentliche Version ist einem Commit und Datenstand zuordenbar. Ein neuer Daten-/VPI-Stand erfordert keine Änderung der Berechnungslogik; alte Releases bleiben reproduzierbar. Eine kontrollierte Beispielkorrektur und ein Rollback sind nachvollziehbar durchgeführt.

## Phase 4 · Freigabegate für einen gemeinsamen nominalen Index

Der gemeinsame Index wird veröffentlicht, wenn **alle** folgenden Bedingungen erfüllt sind:

- Feste Zusammensetzung und Gewichte, dokumentierte Produkt- und Leistungsdefinitionen sowie konsistente Preisarten.
- Eine begründete gemeinsame Erhebungs-/Zeitkonvention. Ein festes jährliches Erhebungsfenster oder eine konsistente Regel für Saison-/Jahrestarife genügt; identische Kalendertage sind nicht erforderlich. Zulässige Abweichungen werden vorab definiert. Beobachtungsdatum, Gültigkeitszeitraum und saisonaler Anker werden unterschieden; VPI-Fenster passen zur behaupteten Veränderung. Für nicht passende Fenster wird kein gemeinsamer Inflationsabstand ausgegeben.
- Alle im Index benötigten Preise fachlich freigegeben, vollständiger Zahlbetrag, Pflichtbestandteile und Brutto-/Nettobehandlung geklärt. Offene Steuerdetails blockieren, soweit sie die Vergleichbarkeit berühren. Keine verdeckte Interpolation oder wechselnde Besetzung.
- Einheitliche Regel für nominale Leistungsstufen, Modellwechsel und Reihenbrüche. Keine vorgetäuschte amtliche Qualitätsbereinigung.
- Beiträge, Sensitivität und Grenzen für den tatsächlich veröffentlichten Korb dokumentiert; keine Repräsentativität für deutsche 1%-Haushalte.
- Release-/Korrekturprozess und Belegkette funktionieren.

Zwei Zeitpunkte reichen für einen Paarvergleich. Für das Versprechen eines **mehrjährigen Trackers** sind mindestens drei zulässige Ankerpunkte je veröffentlichter Kernreihe das nächste Produktziel. Das ist ein Produktmeilenstein, keine allgemeine statistische Mindestregel. Scheitert der gemeinsame Zeitraum, bleibt die Beta bei getrennten Reihen. Ein kleinerer Index wäre eine ausdrücklich neue Auswahlversion mit Begründung; fehlende Positionen werden nicht stillschweigend umgewichtet.

## Danach und bewusst später

- **Sinnvolle Erweiterungen:** zwei bis drei Produkte über tatsächlich gemeinsame Zeiträume vergleichen; optional amtliche Kerninflation als zusätzliche, sauber definierte Referenz; eigene Referenz für Wohnen nur bei neuer klarer Forschungsfrage.
- **Datenbacklog:** Kelly mit passendem zweitem Preis/Boutique-Beleg, aktueller identischer Alarm-Pro-Tarif, standardisiertes Sylt-Angebot, tatsächlich vergleichbare öffentliche Adlon-Raten. Erst nach konkretem Beleggewinn aufnehmen; [#13](https://github.com/Tobias-Run/nobelpreis-index/issues/13), [#9](https://github.com/Tobias-Run/nobelpreis-index/issues/9), [#1](https://github.com/Tobias-Run/nobelpreis-index/issues/1).
- **Vorerst zurückstellen:** 15–25 Positionen als Mengenziel, zweiter Luxuskorb, weitere pauschale Archivrunden, Personalisierung, Konten, Echtzeitpreise, automatische Scraper und Frameworkmigration. Gewichtsmodelle erst nach der Zeit-/Leistungsfrage vertiefen; Julius-Bär-Gewichte bleiben ein Szenario.
