# Nobelpreis

**Was das gute Leben kostet.**

Konzeptprototyp für einen deutschen Preisindex gehobenen Konsums.

Eigenständiger deutschsprachiger statischer Website-Entwurf. Sämtliche Preise und die VPI-Vergleichsreihe sind synthetisch und in der Oberfläche als solche gekennzeichnet. Keine belastbare Indexveröffentlichung.

## Start

Im Projektverzeichnis: `python3 -m http.server 8000 --directory dist`, dann http://localhost:8000 öffnen.

## Enthalten

Responsive Dashboard, drei gemeinsame Vergleichszeiträume, 16 synthetische Positionen in fünf Kategorien, Suche und Filter, zugängliche Produktdialoge mit Hash-Links, Preisverläufe als Jahrestabellen, kumulierte und annualisierte Veränderung, hypothetischer Vergleichspreis, JSON-Export, Methodik und Quellenstatus.

## Rechenmodell

Gleichgewichtetes arithmetisches Mittel von Preisverhältnissen, jeweils auf das ausgewählte Startjahr normiert. Jede Position hat sechs explizite synthetische Jahreswerte. Kein automatisiertes Scraping, keine versteckte Interpolation im Frontend. Keine bestätigten historischen Beobachtungen.

## Vor echtem Start erforderlich

Quellenbasierte Machbarkeitsprüfung von zehn Kandidaten; belegter Testwarenkorb; begründete Varianten und Gewichtung; Prüfung eines gemeinsamen Basisjahrs; tatsächliche Destatis-Referenz; Quellenrechte; persistierter redaktioneller Freigabe- und Korrekturprozess; vorgerenderte eigenständige Produktseiten statt Prototypdialogen; Browser-/Mobilprüfung; rechtliche und markenrechtliche Prüfung des Arbeitstitels.

## Verifikation

JavaScript-Syntax erfolgreich geprüft. Datenumfang, sechs Werte pro Position und Basisnormierung geprüft. Kein Browser-QA erfolgt. Deployment nicht erfolgt: Sites-Skripte insbesondere `site-workflow.mjs` sind in dieser Umgebung nicht installiert. Sites-Hosting-Metadaten sind nicht Bestandteil dieses Repositories.
