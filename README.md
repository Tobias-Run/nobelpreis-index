<div align="center">

# Nobelpreis
### Was das gute Leben kostet.

Ein unabhängiges Recherchewerkzeug für ausgewählte Premiumpreise in Deutschland und der Nachbarschaft.

</div>

*Nobelpreis is an independent German-market project comparing price changes in a curated premium consumption basket with general consumer inflation, inspired by [CPI Reserve](https://cpireserve.com/).*

[**Website öffnen**](https://tobias-run.github.io/nobelpreis-index/) · [Produktstatus](docs/produktstatus.md) · [Roadmap](docs/roadmap.md) · [Betrieb und Veröffentlichung](docs/betrieb.md)

## Aktueller Stand

Die Hauptseite zeigt die **jährliche Herbst-Tarifrunde mit neun Positionen**: gemeinsame Herbstfenster für freie Preise und feste Jahres-/Saisonregeln, je 1/9 Gewicht. Der nominale Anstieg 2025 → 2026 beträgt **4,60 %**. Referenz ist das vollständige Mittel der offiziellen Bundesbank-VPI-Indizes für September und Oktober; solange Oktober 2026 fehlt, bleiben VPI-Änderung und Abstand leer. Eine Jahresrunde misst keine gleichzeitig anfallenden Haushaltsausgaben.

Alle **13 Positionen** sind gezielt nachgeprüft; **73 Beobachtungen** einschließlich Komponenten und Zukunftstarifen sowie acht zusätzliche Einzelkurven sind verfügbar. Sechs neue Beobachtungen sichern unter anderem passendere historische Herbststände und den historischen Alarm-Pro-Tarif. Vier Kernlücken benötigen konkrete externe Angebote/Rechnungen: Alarm, Sylt-Service, Kelly und Adlon. [Zeitregeln, Quellenprüfung und Ergebnisse](docs/jahresfenster-und-restbelege-2026-10-26.md).

Der frühere Neuner-Versuch mit August-Referenz bleibt im Rechenlabor. Die gemeinsame Berechnung ist ein nominaler Tarifvergleich mit Teilpreisen; **keine produktive redaktionelle Gesamtindexfreigabe** und kein repräsentatives Haushaltsbudget. Ein veröffentlichter Angebotspreis ist keine Transaktion oder Garantie der Verfügbarkeit.

Bei Modell-/Leistungswechseln wählen wir das [vergleichbarste belegte Premiumangebot](docs/premiumvergleich.md); bei gleicher Vergleichbarkeit die höhere Ausführung. Fortlaufende Weiterentwicklungen führen nicht automatisch zum Ausschluss.

Die frühere Startseite liegt im [**Designarchiv mit synthetischen Preisen**](https://tobias-run.github.io/nobelpreis-index/design-demo/). Bestehende `/zeitreihe/`-Links funktionieren weiterhin. Die ruhige Gestaltung mit Serifenschrift, Papierfarben und Goldakzent bleibt erhalten.

## Funktionen

- Feste Herbst-/Jahreszuordnungen, prüfbare Zeitfenstertabelle und vollständige statt ersetzte Referenzfenster.
- Einzelreihen mit dokumentiertem Zeitraum, Basisnormierung, Preisbelegen und passender monatlicher VPI-Referenz; fehlende Werte bleiben leer.
- Exakte Diagrammwerte über Schaltflächen und Tabelle, auch mobil und mit Tastatur.
- Suchbare Produktliste, stabile Produktlinks, funktionierendes Zurück/Vorwärts und Quellen auf Abruf.
- Beiträge der Positionen und Kategorien zum angezeigten nominalen Vergleich.
- JSON, vollständige Recherche-CSV und separater Vergleichsexport zur Nachrechnung einschließlich Gewichten, Quellen, Beiträgen und VPI-Monaten.
- [Öffentlicher Datenstand und Korrekturen](https://tobias-run.github.io/nobelpreis-index/korrekturen.html); Release-Manifest mit Commit und Prüfsummen.

## Lokal starten

Die Website ist statisch und benötigt zum Ansehen keine Installation:

```bash
python3 -m http.server 8000 --directory dist
```

Dann http://localhost:8000 öffnen. HTML-Vorlage: `site/index.html`; Gestaltung, Interaktion und Berechnung: `dist/zeitreihe/`. Einträge in `data/release.json` bestimmen die aktiven Daten- und Methodikstände. Historische Snapshots werden nicht überschrieben.

```bash
python3 scripts/build-release.py
python3 -m unittest discover -s tests -p 'test_*.py'
node tests/reference.test.cjs
node tests/zeitreihe.test.mjs
```

Browserprüfungen mit Node 24:

```bash
npm ci --ignore-scripts
npx playwright install --with-deps chromium
npm run test:browser
```

Der Build verwendet lokale, versionierte Belege und benötigt keinen Live-Zugriff auf Preisquellen. Nur die Entwicklungswerkzeuge und der Browser werden installiert. Der Workflow prüft PRs und `main` automatisch. Die Veröffentlichung per GitHub Actions ist vorbereitet, benötigt aber einmalig die Pages-/Umgebungseinstellung durch den Repository-Inhaber. Bis dahin wird der erfolgreich geprüfte Stand über den bestehenden Pages-Branch veröffentlicht. Details einschließlich Rollback: [Betrieb](docs/betrieb.md).

## Recherche und Einordnung

- [Jahresfenster und Restbelege: alle 13 Positionen geprüft](docs/jahresfenster-und-restbelege-2026-10-26.md).
- [Schwarzwaldstube: abgeschlossener Deep Dive](docs/schwarzwaldstube-preisanstieg-2026-10-26.md) — 385 € bereits im Dezember 2025; neuer Oktober-2025-Primärbeleg zum unveränderten 325-€-Basispreis.
- [Gesamtreview](docs/gesamtreview-2026-10-23.md) und [Roadmap](docs/roadmap.md).
- [Julius Bär: Würdigung und Abgrenzung](docs/abgrenzung-julius-baer.md), [Gewichtungsprüfung](docs/methodik-gewichtung-2026-10-17.md).
- [Bundesbank-Referenz](docs/bundesbank-referenz.md), [Premium-Auswahlregel](docs/premiumvergleich.md), [Beleganforderungen](docs/anbieteranfragen-2026-10-17.md).

Kein Anspruch auf Repräsentativität für Deutschlands reichstes Prozent. Keine amtliche Statistik, keine Anlageberatung und keine Verbindung zu CPI Reserve. Immobilienkäufe bleiben außerhalb des Konsumindex. „Nobelpreis“ ist ein Arbeitstitel.

**Projektsprache ist Deutsch.** Anforderungen und Korrekturregeln stehen in [CONTRIBUTING.md](CONTRIBUTING.md). Öffentlich einsehbarer Code und fremde Quellen haben unterschiedliche Rechte; eine Open-Source-Lizenz ist noch nicht festgelegt. [Preisfehler melden](https://github.com/Tobias-Run/nobelpreis-index/issues/new/choose).
