# Betrieb und Veröffentlichung

Stand: 26.10.2026. Betreiber des Projekt-Repositories: Tobias-Run. Meldestelle für Fehler: GitHub-Issues; Projektsprache Deutsch. Der Stand bleibt ein öffentlich gekennzeichneter Forschungsprototyp. Vollständige redaktionelle Verantwortungs-/Rechtsangaben für einen späteren regulären Publikationsbetrieb und eine Code-/Datenlizenz sind noch zu entscheiden.

## Ein Datenstand, ein geprüfter Release

`data/release.json` legt aktive Recherche, Auswahl, Premiumregel und VPI-Belege fest. `python3 scripts/build-release.py` prüft die Rohdaten, erzeugt Forschungsdaten und beide Einstiegspfade aus derselben HTML-Vorlage und schreibt `dist/release.json`. Dieses Manifest wird für jeden Build neu erzeugt und nicht eingecheckt. Es enthält Version, Datenstand, Commit, Eingabe- und Artefakt-Prüfsummen. Lokale nicht eingecheckte Änderungen sind als Arbeitskopie gekennzeichnet; CI-Releases entstehen aus einem sauberen Checkout.

Der Workflow `.github/workflows/pruefen-und-veroeffentlichen.yml` läuft für Pull Requests, `main` und manuelle Auslösung. Er prüft:

1. Den Offline-Build und einen leeren Diff der erzeugten, versionierten Dateien.
2. Pflichtfelder, Kalenderdaten, Quellreferenzen und Auswahl zum Recherche-Stichtag; Zukunftstarife dürfen im Archiv stehen, aber nicht im laufenden Vergleich.
3. Negative Datentests, vorhandene Berechnungs- und Bundesbank-Tests sowie Syntax.
4. Browserbedienung bei vier Breiten: Kernwerte im ersten Bildschirm, zwölf Ansichten, Direktlinks, Verlauf, fehlender VPI und CSV-Nachrechnung.

Nach erfolgreicher Prüfung steht das Artefakt `website-geprueft` bereit. Die automatische Pages-Veröffentlichung wird nur gestartet, wenn Pages bereits den Modus `workflow` verwendet. Im bisherigen Branch-Modus bleiben die Prüfungen grün, der automatische Deploy wird übersprungen.

Die aktuelle Integration erhielt bei beiden nötigen Konfigurationsänderungen HTTP 403. Einmalig muss der Repository-Inhaber einstellen:

1. Settings → Environments → github-pages → Deployment branches and tags: `main` zusätzlich zulassen.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.

Bis dahin wird ausschließlich das Artefakt eines erfolgreich geprüften `main`-Runs in `gh-pages` übernommen. Keine Kopie aus einer abweichenden Arbeitskopie. Nach der Umstellung veröffentlicht der Workflow direkt dasselbe geprüfte Artefakt; der historische `gh-pages`-Branch wird dann nicht mehr benötigt.

## Aktualisierung und Freigabe

Produktbeobachtungen werden jährlich beziehungsweise zum festgelegten Saison-/Tarifwechsel ergänzt; die Bundesbank-Referenz wird bei Datenaktualisierungen auf neue Monatsstände geprüft. Der Build ruft keine externen Preise automatisch ab. Ein neuer VPI-Monat erzeugt keine neue Produktbeobachtung. Die bestehende Premium-Auswahlregel gilt auch für Nachfolgemodelle. Eine andere Zusammensetzung/Gewichtung erfordert eine dokumentierte Methodikentscheidung.

Vor einer Änderung: neue Quelldatei beziehungsweise Forschungsversion erstellen, Preisdatum/Gültigkeit/Abruf getrennt erfassen, Beleg und Fundstelle prüfen, anschließend Release-Konfiguration aktualisieren. Die automatische Eingangsprüfung ersetzt keine fachliche Quellenprüfung. Unbekannter einzelner Steuersatz ist bei dokumentiertem Brutto-Endpreis ausdrücklich zulässig; fehlende Steuerangabe als ganzes Feld nicht.

Die [Produktmatrix](produktstatus.md) zeigt vorhandene Belege und nominale Auswahl. Sie behauptet keine automatische redaktionelle Gesamtindexfreigabe. Kelly, Alarm, Adlon und Sylt-Service bleiben Backlog. Die Schwarzwaldstube-Recherche ist abgeschlossen; unbekannte Kostenursachen blockieren die nominale Tarifgeschichte nicht.

## Korrekturen und Rollback

Die [öffentliche Korrekturseite](../dist/korrekturen.html) dokumentiert bereits einen konkreten Belegwechsel: Schwarzwaldstube März- zu Oktober-2025-Quelle bei gleichem Preis, Zeitraum 579 zu 367 Tagen, unverändertes Rechenergebnis. Alte Beobachtungen und Auswahlversionen bleiben gespeichert.

Bei einer Korrektur betroffene Beobachtungs-IDs, vorherigen/neuen Wert oder Zeitbezug, Grund, Datum und Auswirkung auf den Vergleich dokumentieren. Version erhöhen, Korrekturseite ergänzen, PR prüfen lassen und veröffentlichen. Eine unbelegte Zahl wird nicht durch eine Schätzung ersetzt.

Rollback: Den fehlerhaften Merge durch einen Revert-PR zurücknehmen. Nach erfolgreichen Prüfungen veröffentlicht derselbe Ablauf den wiederhergestellten Stand und ein neues Manifest mit dem Revert-Commit. Für eine technische Wiederholung kann der Workflow auf `main` manuell gestartet werden. Vor Freigabe prüfen, dass der aktuelle Pages-Stand und sein Manifest die erwarteten Prüfsummen besitzen. Ein konkreter Produktionsrollback ist erst im Fehlerfall nötig; dieser Ablauf ist dokumentiert, noch kein absichtlich ausgeführter Rollback-Test.
