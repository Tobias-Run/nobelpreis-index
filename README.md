<div align="center">

# Nobelpreis
### Was das gute Leben kostet.

Ein kuratierter Preisindex für gehobenen Konsum in Deutschland.

![Status: Prototyp](https://img.shields.io/badge/Status-Prototyp-467253)
![Warenkorb: Demo](https://img.shields.io/badge/Warenkorb-Demo-b89a57)
![Referenz: Bundesbank](https://img.shields.io/badge/Referenz-Bundesbank-467253)
![Projektsprache: Deutsch](https://img.shields.io/badge/Projektsprache-Deutsch-19291f)

</div>

**Wie stark verteuert sich gehobener Konsum – und wie unterscheidet sich das von der allgemeinen Inflation?** Nobelpreis soll diese Frage mit einem nachvollziehbaren deutschen Warenkorb, Europreisen und einem Vergleich zum Verbraucherpreisindex beantworten.

*Nobelpreis is an independent German-market project comparing price changes in a curated premium consumption basket with general consumer inflation, inspired by [CPI Reserve](https://cpireserve.com/).*

## Kritischer Review und nächster Meilenstein

Der [Gesamtreview vom 23.10.2026](docs/gesamtreview-2026-10-23.md) bestätigt die reproduzierbare Berechnung und benennt die wesentliche Grenze: Die neun Preispaare haben unterschiedliche Zeitfenster und teilweise Leistungswechsel. Ihr Abstand zum August-VPI ist deshalb keine belastbare zusätzliche Inflationsrate. Der hohe Menübeitrag und die Sensitivität der Auswahl sind nachrechenbar dokumentiert.

Die [priorisierte Roadmap](docs/roadmap.md) empfiehlt zuerst eine gemeinsame öffentliche Forschungsbeta mit überprüfbaren Produktgeschichten, fachlichen Freigaberegeln und verlässlichem Releaseablauf. Ein gemeinsamer nominaler Index folgt nach eigenem Freigabegate. Die Umsetzung wird in [Issue #26](https://github.com/Tobias-Run/nobelpreis-index/issues/26) verfolgt; dieser Review verändert die bestehende Website und Berechnung noch nicht.

## Historische Preise und Forschungs-PoC

[**Pragmatischer Startwarenkorb**](docs/pragmatischer-warenkorb-2026-10-21.md): Neun festgelegte Positionen, höhere belegte Grundvarianten und ausdrücklich benannte Teilpreise. Nominaler Vergleich der 2025er/2026er Belege: **+4,60 %**, Bundesbank-VPI August: **+2,86 %**. Unterschiedliche Beobachtungstermine und Leistungswechsel; keine qualitätsbereinigte Haushaltsinflation. Vier unzureichend belegte Positionen stehen mit festen Referenzen im Backlog.

[**Weitere Archive geprüft**](docs/weitere-archive-2026-10-21.md): Arquivo.pt, Common Crawl und historische Dokumentablagen erschließen zwei Originalkarten der Schwarzwaldstube: 265 € im Archivstand 2021 und 325 € im Archivstand 2024, jeweils inklusive MwSt. Jetzt 63 Recherchebeobachtungen; keine automatische Verkettung oder Indexfreigabe.

[**Archivrecherche · 21.10.2026**](docs/archivluecken-2026-10-21.md): Sieben weitere Beobachtungen, insgesamt 61. Neu sind historische Lanserhof-Zimmerkomponenten und Alarm-Tarif-/Ab-Angebote. 25 Suchabfragen und 15 gelesene Archivbelege dokumentiert; keine zusätzlichen freigegebenen Indexreihen.

[**Zeitreihen erweitert · 20.10.2026**](docs/zeitreihen-erweiterung-2026-10-20.md): Neu sind Salem ab 2021/22, der Arlberg-Skipass ab 2023/24 und zwei getrennte Saxonia-Referenzen ab 2019 beziehungsweise 2024. Insgesamt fünf Positionen grafisch untersuchbar. Zusätzliche Bundesbank-Referenz: 93 Monatswerte ab 2019; fehlender Oktober-VPI bleibt leer. Der gemeinsame Zweier-Pilot bleibt unverändert.

[**Gewichtungsversuch und Lückenanalyse · 18.10.2026**](docs/gewichtungsversuch-und-luecken-2026-10-18.md): Drei reproduzierbare Modelle für 13 Recherchepositionen. Vorhandene Pilot-Teilreihen decken je nach Modell nur 12,5–15,4 % des geplanten Gewichts ab; ein vollständiger Index bleibt offen. [Szenarien auf der Website](https://tobias-run.github.io/nobelpreis-index/zeitreihe/#szenarien).

[**Vertiefte Prüfung aller 13 Positionen**](docs/rechercheabschluss-und-gewichtung-2026-10-17.md) · [Julius-Bär-Gewichtung aller Komponenten](docs/methodik-gewichtung-2026-10-17.md) · [Konkrete Beleganforderungen](docs/anbieteranfragen-2026-10-17.md)

[**Echte Zeitreihen ansehen**](https://tobias-run.github.io/nobelpreis-index/zeitreihe/) · [Historienprüfung aller 13 Positionen](docs/historische-preise-und-poc-2026-10-16.md) · [19 neue Preisbelege aus der Archivrecherche](docs/archivrecherche-2026-10-17.md)

Die separate Forschungsansicht enthält 63 recherchierte Einzelbeobachtungen einschließlich Komponenten und Zukunftstarifen. Standardmäßig ist der nominale Neuner-Vergleich geöffnet. Der bisherige Zweier-Pilot mit Bayreuth und einer Liegeplatz-Tarifeinheit bleibt separat verfügbar. Beide verwenden einen ausdrücklich groben August-Anker aus dem offiziellen monatlichen Bundesbank-VPI; Einzelkurven zeigen ihre jeweils dokumentierten Vergleichsmonate. Keine redaktionelle Indexfreigabe. Historische Lücken und Leistungswechsel bleiben sichtbar; keine Auffüllung. Die bisherige Startseite bleibt eine klar gekennzeichnete Design-Demo mit synthetischen Produktpreisen.

```bash
python3 scripts/build-zeitreihe.py
node --test tests/reference.test.cjs tests/zeitreihe.test.mjs
```

## Aktueller Stand

Der [vollständige Warenkorb-Prüfstand](docs/warenkorb-pruefstand-2026-10-16.md) führt alle elf dokumentierten Kandidaten und zwei zusätzliche Recherchevorschläge mit eigenen Dossiers, Datenstatus und offenen Belegen zusammen.

Die bisherige Startseite enthält einen bedienbaren Gestaltungsprototyp. **Dessen Produktpreise und Premium-Warenkorb sind synthetische Demonstrationsdaten. Seine VPI-Referenz verwendet dagegen offizielle Jahresdurchschnitte aus dem Statistikangebot der Deutschen Bundesbank (Ursprungsquelle: Statistisches Bundesamt).** Aus dem Demo-Warenkorb und seinem Abstand zum VPI lassen sich keine Aussagen über tatsächliche Preisentwicklungen gehobenen Konsums ableiten. Die separate Forschungsansicht verwendet die oben beschriebenen recherchierten Beobachtungen.

Der erste fachliche Meilenstein ist ein **belegbarer Testwarenkorb**, bevor ein realer Index veröffentlicht wird. Das Projekt beansprucht keine Repräsentativität für das reichste Prozent und ist weder amtliche Statistik noch Anlageberatung. Es besteht keine Verbindung zu CPI Reserve; Name, Gestaltung und Umsetzung sind eigenständig. „Nobelpreis“ ist ein Arbeitstitel.

Die [Recherche der ersten fünf Positionen](docs/produktrecherche-2026-10-16.md) dokumentiert Cayenne, Salem, Saxonia Thin, Kelly und Lanserhof Sylt mit belegten Einzelpreisen, Quellen und offenen Vergleichbarkeitsfragen. Die [strukturierten Forschungsdaten](data/research/erste-fuenf-2026-10-16.json) sind noch nicht für den Index freigegeben und werden nicht in die Demo geladen.

Für die [weiteren sechs Kandidaten](docs/produktrecherche-rest-2026-10-16.md) gibt es eigene Dossiers: E-Bike, Bayreuther Festspiele, Bodensee-Liegeplatz, Skiurlaub, Alarmaufschaltung und Sylt-Hausbetreuung. Sie unterscheiden belegte Preise, Teilpreise, künftige Tarife und offene Datenlücken; die zugehörigen [strukturierten Daten](data/research/weitere-produkte-2026-10-16.json) bleiben ebenfalls außerhalb des Demoindex.

Die [Würdigung und Abgrenzung gegenüber Julius Bär](docs/abgrenzung-julius-baer.md) erläutert die Überschneidungen, unseren angestrebten Mehrwert und die Voraussetzungen, um ihn einzulösen.

Die [Recherche weiterer Vergleichsangebote](docs/vergleichsangebote-luxuspreise-2026-10-16.md) ergänzt sieben Beispiele für Luxuswarenkörbe und spezialisierte Preistracker mit methodischen Konsequenzen für Nobelpreis.

## Lokal starten

Voraussetzung: Python 3. Es sind keine Installation und kein Build erforderlich.

```bash
git clone https://github.com/Tobias-Run/nobelpreis-index.git
cd nobelpreis-index
python3 -m http.server 8000 --directory dist
```

Anschließend **http://localhost:8000** öffnen. Optional lässt sich die JavaScript-Syntax mit Node.js prüfen:

```bash
node --check dist/app.js
```

## Funktionen

- Indexvergleich mit drei gemeinsamen Vergleichszeiträumen und gleicher Basisnormierung.
- 16 Beispielpositionen in fünf Kategorien, mit Suche und Filtern.
- Produktdetails mit Jahrespreisen, kumulierter und annualisierter Veränderung sowie hypothetischem Vergleichspreis.
- JSON-Export mit Demopreisen, Prüfstatus und vollständigen Metadaten der offiziellen VPI-Referenz.
- Responsive Darstellung sowie sichtbare Methodik- und Quellenhinweise.

## Berechnung im Prototyp

Der Warenkorb ist gleich gewichtet. Für das gewählte Basisjahr **b** und Vergleichsjahr **t** gilt:

```text
Index(t) = 100 × (1 / n) × Σ [Preisᵢ(t) / Preisᵢ(b)]
Kumulierte Veränderung (%) = [Index(t) / 100 − 1] × 100
Annualisierte Veränderung (%) = [(Preis(t) / Preis(b))^(1 / Jahre) − 1] × 100
Abstand (Prozentpunkte) = Warenkorbveränderung (%) − Vergleichsveränderung (%)
```

Jede Warenkorbposition besitzt sechs explizite synthetische Jahreswerte von 2020 bis 2025. Diese Beispiele sind keine recherchierten Beobachtungen. Das gemeinsame Basisjahr bleibt für den späteren realen Warenkorb zu prüfen.

Die graue Vergleichsreihe ist der **offizielle deutsche Gesamt-VPI, Jahresdurchschnitte, Ursprungswerte, 2020 = 100**. Quelle: Deutsche Bundesbank; Ursprungsquelle: Statistisches Bundesamt, Wiesbaden. Zeitreihe: `BBDP1.A.DE.N.VPI.C.A00000.I20.A`. Die Werte von 2020 bis 2025 lauten **100,0 / 103,1 / 110,2 / 116,7 / 119,3 / 121,9**. Bei Wahl eines anderen Startjahres wird der VPI entsprechend umbasiert; jährliche Inflationsraten werden nicht addiert.

[Offizielle Zeitreihe](https://statistiken.bundesbank.de/statistiken-de/zeitreihen/BBDP1/A.DE.N.VPI.C.A00000.I20.A) · [Dokumentation und Quellenstand](docs/bundesbank-referenz.md)

Die importierte Referenz und unveränderte CSV-Belege sind versioniert. Es gibt keine verdeckte Interpolation oder Live-Abhängigkeit vom Bundesbank-Server. Der Import lässt sich lokal reproduzieren:

```bash
python3 scripts/import-bundesbank-vpi.py
node --test tests/reference.test.cjs
```

## Gestaltung

Die Oberfläche orientiert sich an der ruhigen Anmutung klassischer Grandhotels: große Serifenschrift, zentrierte Wortmarke, viel Freiraum und dezente Goldakzente. Die konkrete Umsetzung und Referenz sind in [docs/gestaltung.md](docs/gestaltung.md) dokumentiert.

Der [UX-Vergleich vom 16.10.2026](docs/ux-audit-2026-10-16.md) dokumentiert Vergleichsangebote, konkrete Bedienungslücken und priorisierte nächste Schritte.

## Projektstruktur

```text
dist/
  index.html     Seitenstruktur und Methodiktexte
  style.css      Gestaltung und responsive Darstellung
  app.js         Demodaten, Berechnung und Interaktionen
.github/
  ISSUE_TEMPLATE/ Vorlagen für Fehler und Preisrecherchen
CONTRIBUTING.md  Zusammenarbeit und Quellenanforderungen
```

## Nächste Meilensteine

Die [Roadmap vom 23.10.2026](docs/roadmap.md) ersetzt die bisherige Start-Checkliste. Offizielle Bundesbank-Referenzen, strukturierte Forschungsdaten und historische Beobachtungen sind bereits vorhanden. Die nächsten Arbeitspakete sind:

1. Messversprechen, Zeitkonvention und fachliche Freigabe je Reihe festlegen.
2. Vorhandene Kernreihen und Belege prüfen sowie die Eingangsvalidierung vervollständigen.
3. Eine gemeinsame Forschungsbeta mit Produktlinks und nachrechenbaren Exporten schaffen.
4. Geprüfte Releases, redaktionelle Zuständigkeiten und Korrekturen etablieren.
5. Einen gemeinsamen nominalen Index nach eigenem Freigabegate veröffentlichen.

Die ursprünglichen 15–25 Positionen bleiben ein späterer Umfang; zunächst tragen die vorhandenen neun Themen die Forschungsbeta. Datenqualität bestimmt die Erweiterung.

## Mitwirken

**Projektsprache ist Deutsch:** Dokumentation, Issues, Pull Requests und redaktionelle Texte werden auf Deutsch verfasst. Technische Bezeichner können etablierte englische Begriffe verwenden.

Beiträge und Preisrecherchen sind willkommen; die Anforderungen stehen in [CONTRIBUTING.md](CONTRIBUTING.md). Fehler und Recherchekandidaten können über die [Issue-Vorlagen](https://github.com/Tobias-Run/nobelpreis-index/issues/new/choose) eingereicht werden.

## Prüfung und Veröffentlichung

JavaScript-Syntax, Datenumfang und Basisnormierung wurden beim Erstellen des Prototyps geprüft. Der aktuelle Gestaltungsstand wurde in Chromium bei 390 × 844 und 1440 × 1000 Pixeln einschließlich Menü, Zeitraumwahl, Suche und Produktdialog geprüft. Tests auf realen Mobilgeräten und eine vollständige Barrierefreiheitsprüfung stehen aus. Für GitHub Pages enthält der Branch `gh-pages` die statischen Dateien aus `dist/`. Die Aktivierung erfolgt unter **Settings → Pages → Build and deployment → Deploy from a branch → gh-pages → / (root)**. Die erwartete Adresse nach erfolgreicher Bereitstellung ist https://tobias-run.github.io/nobelpreis-index/. Die Website war beim Abruf am 16.10.2026 erreichbar. Bei Änderungen an `dist/` muss der Veröffentlichungsbranch ebenfalls aktualisiert werden. Sites-spezifische Hosting-Metadaten sind nicht Bestandteil dieses Repositories.

Eine Open-Source-Lizenz ist derzeit nicht festgelegt. Die öffentliche Einsehbarkeit stellt keine pauschale Nutzungserlaubnis dar.
