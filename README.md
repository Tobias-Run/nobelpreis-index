<div align="center">

# Nobelpreis
### Was das gute Leben kostet.

Ein unabhängiges Recherchewerkzeug für ausgewählte Premiumpreise in Deutschland und der Nachbarschaft.

</div>

*Nobelpreis is an independent German-market project comparing price changes in a curated premium consumption basket with general consumer inflation, inspired by [CPI Reserve](https://cpireserve.com/).*

[**Website öffnen**](https://tobias-run.github.io/nobelpreis-index/) · [Produktstatus](docs/produktstatus.md) · [Roadmap](docs/roadmap.md) · [Betrieb und Veröffentlichung](docs/betrieb.md)

## Aktueller Stand

Die Hauptseite zeigt recherchierte Preisgeschichten mit offiziellen Bundesbank-VPI-Monatswerten (Ursprungsquelle Destatis). Ausgangspunkt ist die mehrjährige Salem-Tarifreihe. Zehn Einzelkurven zu neun ausgewählten Positionen, 13 recherchierte Produkte und 67 Beobachtungen einschließlich Komponenten und Zukunftstarifen sind verfügbar. Teilpreise, fehlende Referenzmonate und unterschiedliche Leistungen bleiben sichtbar.

Der nominale Neuner-Warenkorb bleibt als **Rechenlabor** verfügbar: feste Gewichte von je 1/9, kein repräsentatives Haushaltsbudget. Wegen unterschiedlicher Beobachtungsfenster wird daraus kein zeitgleicher Inflationsabstand ausgegeben. Die gemeinsame Berechnung bleibt experimentell; es gibt keine produktive redaktionelle Indexfreigabe. Ein veröffentlichter Angebotspreis ist keine Transaktion oder Garantie der Verfügbarkeit.

Bei Modell-/Leistungswechseln wählen wir das [vergleichbarste belegte Premiumangebot](docs/premiumvergleich.md); bei gleicher Vergleichbarkeit die höhere Ausführung. Fortlaufende Weiterentwicklungen führen nicht automatisch zum Ausschluss.

Die frühere Startseite liegt im [**Designarchiv mit synthetischen Preisen**](https://tobias-run.github.io/nobelpreis-index/design-demo/). Bestehende `/zeitreihe/`-Links funktionieren weiterhin. Die ruhige Gestaltung mit Serifenschrift, Papierfarben und Goldakzent bleibt erhalten.

## Funktionen

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

- [Schwarzwaldstube: abgeschlossener Deep Dive](docs/schwarzwaldstube-preisanstieg-2026-10-26.md) — 385 € bereits im Dezember 2025; neuer Oktober-2025-Primärbeleg zum unveränderten 325-€-Basispreis.
- [Gesamtreview](docs/gesamtreview-2026-10-23.md) und [Roadmap](docs/roadmap.md).
- [Julius Bär: Würdigung und Abgrenzung](docs/abgrenzung-julius-baer.md), [Gewichtungsprüfung](docs/methodik-gewichtung-2026-10-17.md).
- [Bundesbank-Referenz](docs/bundesbank-referenz.md), [Premium-Auswahlregel](docs/premiumvergleich.md), [Beleganforderungen](docs/anbieteranfragen-2026-10-17.md).

Kein Anspruch auf Repräsentativität für Deutschlands reichstes Prozent. Keine amtliche Statistik, keine Anlageberatung und keine Verbindung zu CPI Reserve. Immobilienkäufe bleiben außerhalb des Konsumindex. „Nobelpreis“ ist ein Arbeitstitel.

**Projektsprache ist Deutsch.** Anforderungen und Korrekturregeln stehen in [CONTRIBUTING.md](CONTRIBUTING.md). Öffentlich einsehbarer Code und fremde Quellen haben unterschiedliche Rechte; eine Open-Source-Lizenz ist noch nicht festgelegt. [Preisfehler melden](https://github.com/Tobias-Run/nobelpreis-index/issues/new/choose).
