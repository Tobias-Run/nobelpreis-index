# Gewichtung: Julius Bär geprüft, Konsequenzen für Nobelpreis

**Prüfstand: 17.10.2026.** [Strukturierte Gewichte und Entscheidungen](../data/methodik/gewichtung-2026-10-17.json).

## Was Julius Bär tatsächlich veröffentlicht

Die Methodik des **Global Wealth and Lifestyle Report 2026**, gedruckte Seiten **42–43**, nennt **20 % für Wohnimmobilien**, **10 % für Autos** und **70 % gleichmäßig für die übrigen 18 Positionen**. Pro übriger Position sind das rechnerisch `70 / 18 = 3,888888… %`. Die 20 Komponenten stehen auf gedruckter Seite **44**. Dieselbe Gewichtsregel ist im Bericht **2025**, Seiten **52–53**, dokumentiert.

| Komponente im Bericht 2026 | Nominelles Gewicht |
|---|---:|
| Wohnimmobilie | 20 % |
| Auto | 10 % |
| Fahrrad | 3,8889 % |
| Champagner | 3,8889 % |
| Schmuck | 3,8889 % |
| Herrenanzug | 3,8889 % |
| Sportausrüstung | 3,8889 % |
| Technikpaket | 3,8889 % |
| Uhr | 3,8889 % |
| Damenhandtasche | 3,8889 % |
| Damenschuhe | 3,8889 % |
| Business-Class-Flug | 3,8889 % |
| Gehobene Gastronomie | 3,8889 % |
| Gesundheit | 3,8889 % |
| Hotelsuite | 3,8889 % |
| Augenlaserbehandlung | 3,8889 % |
| Rechtsberatung | 3,8889 % |
| MBA | 3,8889 % |
| Privatschule | 3,8889 % |
| Spa | 3,8889 % |

Die Rundung dient nur der Anzeige. Die gespeicherten Brüche `1/5`, `1/10` und jeweils `7/180` ergeben exakt 100 %.

**Wichtige Einschränkung:** 2026 werden die Preisänderungen von Gesundheit und Sportausrüstung wegen veränderter Produktdefinitionen ausgenommen. Die obige Tabelle beschreibt deshalb die **nominelle Struktur des 20er-Warenkorbs**, nicht eine vollständig rekonstruierte effektive Gewichtung des veröffentlichten Änderungsaggregats. Die gelesene Kurzmethodik legt dessen Behandlung der ausgelassenen Gewichte nicht vollständig offen. Wir erfinden dafür keine Neunormierung und rechnen den veröffentlichten Julius-Bär-Inflationswert nicht nach.

Der Bericht beschreibt ein Stadtranking über eine gewichtete USD-Preissumme; vollständige Index-/Stadtergebnisse sind auf Anfrage erhältlich. Das ist nicht automatisch identisch mit unserem transparenten Mittel normierter Preisverhältnisse. Ohne vollständige Eingaben und Rechenkonventionen behaupten wir keine exakte Reproduktion. Aus Indexgewichten und einer begleitenden Vermögendenbefragung folgen insbesondere keine nachgewiesenen Ausgabenanteile deutscher 1%-Haushalte.

## Welche Übernahme für uns sinnvoll ist

Übertragbar sind die **explizite Gewichtsdokumentation**, ein stabiler Warenkorb je Vergleich und der sichtbare Umgang mit Methodenwechseln. Unveränderte Modellnamen reichen nicht für das Verbinden zweier Preise. Unser nachgewiesener Charger5-Ausstattungswechsel und die geänderten Lanserhof-Leistungen sind konkrete Beispiele.

Die Gewichtszahlen werden **nicht unmittelbar in Nobelpreis eingesetzt**:

- Immobilienkaufpreise sind laut Projektbriefing ausgeschlossen. Laufende Alarmaufschaltung oder Hausbetreuung sind andere Leistungen und erhalten nicht automatisch ein Immobiliengewicht von 20 %.
- Einige Kategorien überschneiden sich grob (Auto, Fahrrad, Uhr, Tasche, Privatschule, Gastronomie), aber die konkreten Produkte und Leistungen sind nicht identisch. Unser Hotelzimmer ist beispielsweise keine Julius-Bär-Hotelsuite.
- Liegeplatz, Bayreuth, Skiurlaub, Hausbetreuung und Alarm haben keine eigene passende Position im veröffentlichten 20er-Schema.
- Die verbleibenden Positionen, Zahl der Produkte und gemeinsamen Zeiträume unterscheiden sich. Fehlende Beobachtungen dürfen nicht in jedem Jahr eine andere Gewichtung erzeugen.

**Reines Rechenbeispiel, keine Empfehlung:** Entfernt man nur die Wohnimmobilie aus dem originalen Julius-Bär-Schema, verbleiben 80 % ursprüngliche Gewichte. Eine Normierung auf 100 % ergibt 12,5 % Auto und je rund 4,8611 % für die 18 übrigen Positionen. Das betrifft weiterhin **19 ursprüngliche Julius-Bär-Komponenten**, nicht unseren anders zusammengesetzten 13er-Recherchebestand.

## Entscheidung für den derzeitigen PoC

Der bestehende Zweier-Pilot bleibt bei **50 % Bayreuth und 50 % YCL-Flächentarif**. Die Gewichte beziehen sich auf Preisverhältnisse; Euro je Ticket und Euro je Quadratmeter werden nicht addiert. Die Rechnung ist eine technische Forschungsprobe und kein repräsentatives Haushaltsbudget.

```text
I(t) = 100 × Σ w_i × [p_i(t) / p_i(Basis)]
Σ w_i = 1; dieselben Positionen und Gewichte für den ganzen Zeitraum
Beitrag_i (Prozentpunkte) = 100 × w_i × [p_i(Ende)/p_i(Basis) − 1]
```

Für einen größeren Index bleibt eine **gleichgewichtete, ausdrücklich kuratierte Auswahl** die durch den Projektbrief gedeckte Ausgangslösung. Auch diese ist eine redaktionelle Entscheidung, kein Nachweis tatsächlicher Ausgabenanteile. Ein einzelner teurer Kauf darf nicht allein durch seinen Eurobetrag den Index dominieren. Ein ausgabenbasierter Index benötigt eigenständige Daten zu Mengen, Kaufhäufigkeit und Ausgaben der definierten deutschen Zielgruppe. Der Julius-Bär-Bericht ersetzt diese Datengrundlage nicht.

Vor Veröffentlichung eines größeren Korbs sollen mindestens gleiche Positionsgewichte und eine nachvollziehbare Kategoriengewichtung als Sensitivität geprüft werden. Eine Kategoriengewichtung verringert den Einfluss der zufälligen Anzahl recherchierbarer Produkte pro Kategorie, bleibt aber ebenfalls redaktionell. Sie wird hier nicht als neue Standardgewichtung eingeführt. Die technische Gewichtungsfunktion oder zusätzliche Produkte werden nicht allein aufgrund dieser Methodenprüfung in den laufenden Pilot geändert.

Änderungen erfordern eine neue Indexversion mit Basis, Gewichtungsregel, vollständiger Belegung, Ergebnisvergleich und dokumentiertem Grund. Bei fehlenden Daten wird der mögliche Zeitraum eingeschränkt; die übrigen Gewichte werden nicht still jährlich umverteilt.

## Quellen und Prüfumfang

- [Julius Bär Global Wealth and Lifestyle Report 2026](https://www.juliusbaer.com/fileadmin/publications/julius-baer-global-wealth-and-lifestyle-report-2026.pdf), gedruckte S. 42–44, Abruf 17.10.2026.
- [Julius Bär Global Wealth and Lifestyle Report 2025](https://www.juliusbaer.com/fileadmin/publications/julius-baer-global-wealth-and-lifestyle-report-2025.pdf), gedruckte S. 52–53, Abruf 17.10.2026.

Beide vollständigen Berichte waren im Webwerkzeug lesbar. Direkte PDF-Downloads lieferten HTTP 403; es wird deshalb keine lokale Original-Prüfsumme behauptet. Es wurden keine privaten Rohdaten angefordert oder importiert. Die Tabelle enthält Methodenfakten und eigene rechnerische Ableitungen, keine übernommenen Einzelpreise. Die frühere [Würdigung und Abgrenzung](abgrenzung-julius-baer.md) wird durch diese Prüfung für 2026 ergänzt.

## Ergänzung vom 18. Oktober 2026

Der [Gewichtungsversuch mit drei Modellen und Lückenanalyse](gewichtungsversuch-und-luecken-2026-10-18.md) setzt die Adaption jetzt als reproduzierbares Szenario um. Er ersetzt keine historischen Befunde oder den bestehenden 50/50-Pilot und ist keine produktive Indexfreigabe.
