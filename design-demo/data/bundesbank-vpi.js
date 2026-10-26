// Erzeugt durch scripts/import-bundesbank-vpi.py. Nicht von Hand bearbeiten.
const bundesbankVpi = Object.freeze({
  "version": "2026-10-16",
  "title": "Verbraucherpreisindex Deutschland – Gesamtindex",
  "provider": "Deutsche Bundesbank",
  "originalSource": "Statistisches Bundesamt, Wiesbaden.",
  "seriesId": "BBDP1.A.DE.N.VPI.C.A00000.I20.A",
  "sourceUrl": "https://statistiken.bundesbank.de/statistiken-de/zeitreihen/BBDP1/A.DE.N.VPI.C.A00000.I20.A",
  "downloadUrl": "https://api.statistiken.bundesbank.de/rest/data/BBDP1/A.DE.N.VPI.C.A00000.I20.A?startPeriod=2020&endPeriod=2025",
  "retrievedAt": "2026-10-16",
  "providerUpdatedAt": "13.10.2026 08:17:55 Uhr",
  "frequency": "Jahresdurchschnitt",
  "adjustment": "Ursprungswerte, nicht saisonbereinigt",
  "baseYear": 2020,
  "unit": "2020=100",
  "attribution": "Quelle: Deutsche Bundesbank; Ursprungsquelle: Statistisches Bundesamt, Wiesbaden.",
  "transformation": "Für Vergleiche eigene Umbasierung: 100 × VPI(Jahr) / VPI(Startjahr). Kumulierte Veränderung: [VPI(Endjahr) / VPI(Startjahr) − 1] × 100.",
  "termsUrl": "https://www.bundesbank.de/de/startseite/benutzerhinweise",
  "sourceFile": "data/sources/bundesbank-vpi-2020-2025-2026-10-16.csv",
  "sourceSha256": "aad833204078e1ae7ac5b522d7d545a49c300a22b766547d59ae15be1fff104f",
  "observations": [
    {
      "year": 2020,
      "value": 100.0
    },
    {
      "year": 2021,
      "value": 103.1
    },
    {
      "year": 2022,
      "value": 110.2
    },
    {
      "year": 2023,
      "value": 116.7
    },
    {
      "year": 2024,
      "value": 119.3
    },
    {
      "year": 2025,
      "value": 121.9
    }
  ]
});
