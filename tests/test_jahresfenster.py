"""Fachliche Fehlzuordnungen müssen die Jahresrunde sperren."""
import copy
import json
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT/'scripts'))
from jahresfenster import erstellen
from datenpruefung import Datenfehler


class Jahresfenster(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        release = json.loads((ROOT/'data/release.json').read_text())
        cls.recipe = json.loads((ROOT/release['herbstvergleich']).read_text())
        cls.raw = json.loads((ROOT/cls.recipe['quelle_daten']).read_text())

    def changed(self, pid):
        recipe = copy.deepcopy(self.recipe)
        return recipe, next(p for p in recipe['positionen'] if p['produkt_id'] == pid)

    def test_alle_neun_positionen_und_achtzehn_zuordnungen(self):
        result = erstellen(self.raw, self.recipe)
        self.assertEqual(len(result['reihen']), 9)
        self.assertEqual(len(result['zeitpruefung']), 18)
        self.assertTrue(result['zeitregeln_geprueft'])
        self.assertFalse(result['indexfreigabe'])

    def test_juli_und_august_sind_keine_herbstbelege(self):
        for pid, oid in [('porsche-cayenne', 'cayenne-archiv-2025'), ('rm-charger5', 'rm-archiv-2025-basis')]:
            with self.subTest(pid=pid):
                r, p = self.changed(pid); p['beobachtung_ids']['2025'] = [oid]
                with self.assertRaisesRegex(Datenfehler, 'außerhalb des Herbstfensters'):
                    erstellen(self.raw, r)

    def test_naechster_stand_statt_teuerstem_oder_letztem_preis(self):
        r, p = self.changed('rm-charger5')
        p['beobachtung_ids']['2026'] = ['rm-herbst-2026']
        with self.assertRaisesRegex(Datenfehler, 'am nächsten zum 15. Oktober'):
            erstellen(self.raw, r)

    def test_zukunftswinter_nicht_ins_aktuelle_jahr_verschieben(self):
        r, p = self.changed('skiurlaub-arlberg'); p['beobachtung_ids']['2026'] = ['ski-2026']
        with self.assertRaisesRegex(Datenfehler, 'Zukunftspreis'):
            erstellen(self.raw, r)

    def test_winter_beginjahr_statt_endjahr_wird_abgewiesen(self):
        r, p = self.changed('skiurlaub-arlberg'); p['beobachtung_ids']['2026'] = ['ski-beleg-2024']
        with self.assertRaisesRegex(Datenfehler, 'im Indexjahr enden'):
            erstellen(self.raw, r)

    def test_schuljahre_und_jahrestarife_nicht_verschieben(self):
        for pid, oid, pattern in [('salem', 'salem-archiv-2024', 'im Indexjahr beginnen'), ('lanserhof-sylt', 'lanserhof-2023-classic-plus', 'Broschürenjahr')]:
            with self.subTest(pid=pid):
                r, p = self.changed(pid); p['beobachtung_ids']['2025'] = [oid]
                with self.assertRaisesRegex(Datenfehler, pattern):
                    erstellen(self.raw, r)

    def test_keine_stille_fensterverschiebung_oder_fremde_kandidaten(self):
        r = copy.deepcopy(self.recipe); r['erhebungsfenster']['von_mm_tt'] = '07-01'
        with self.assertRaisesRegex(Datenfehler, 'nicht stillschweigend verschieben'):
            erstellen(self.raw, r)
        r, p = self.changed('rm-charger5'); p['kandidaten']['2025'].append('cayenne-herbst-2025')
        with self.assertRaisesRegex(Datenfehler, 'zu Produkt und Tarifeinheit'):
            erstellen(self.raw, r)


class ErsatzJahresrunde(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        release = json.loads((ROOT/'data/release.json').read_text())
        cls.raw = json.loads((ROOT/release['recherche']).read_text())
        cls.recipe = json.loads((ROOT/release['jahresvergleich']).read_text())

    def test_vollstaendiger_korb_und_richtige_hotelmengen(self):
        result = erstellen(self.raw, self.recipe)
        self.assertEqual(len(result['reihen']), 13)
        self.assertEqual(len(result['zeitpruefung']), 26)
        hotel = next(r for r in result['reihen'] if r['id']=='hotel-dolomitengolf-penthouse')
        for p in hotel['punkte']:
            self.assertEqual([c['menge'] for c in p['komponenten']], [2,14])
            self.assertAlmostEqual(p['betrag'], 6000.4)
            self.assertNotAlmostEqual(p['betrag'], 2982+2.6)

    def test_gekuerzten_korb_nicht_still_auf_zwoelf_neu_gewichten(self):
        r = copy.deepcopy(self.recipe)
        missing = r['positionen'].pop()
        r['nicht_im_vergleich'].append({'produkt_id':missing['produkt_id']})
        for p in r['positionen']: p['gewicht_bruch']={'zaehler':1,'nenner':12}
        with self.assertRaisesRegex(Datenfehler, 'vollständige festgelegte Zusammensetzung'):
            erstellen(self.raw,r)

    def test_altkandidat_ist_keine_preisbeobachtung_des_ersatzprodukts(self):
        r=copy.deepcopy(self.recipe)
        p=next(p for p in r['positionen'] if p['produkt_id']=='gfw-alarm-premium')
        p['produkt_id']='alarmaufschaltung'
        p['beobachtung_ids']={'2025':['alarm-securando-ab-archiv-2025'],'2026':['alarm-securando-ab-2026']}
        r['nicht_im_vergleich']=[p for p in r['nicht_im_vergleich'] if p['produkt_id']!='alarmaufschaltung']+[{'produkt_id':'gfw-alarm-premium'}]
        with self.assertRaisesRegex(Datenfehler, 'vollständige festgelegte Zusammensetzung'):
            erstellen(self.raw,r)

    def test_ortstaxe_nicht_pro_aufenthalt_statt_pro_personnacht(self):
        for menge in [1,'14',True]:
            with self.subTest(menge=menge):
                r=copy.deepcopy(self.recipe)
                p=next(p for p in r['positionen'] if p['produkt_id']=='hotel-dolomitengolf-penthouse')
                p['berechnung']['komponenten'][1]['menge']=menge
                with self.assertRaisesRegex(Datenfehler, 'Komponentenmenge|Komponentenmengen|ganzzahlige Komponentenmenge'):
                    erstellen(self.raw,r)

    def test_alle_pflichtbestandteile_in_richtiger_einheit(self):
        for fehler in ['fehlt','vertauscht']:
            with self.subTest(fehler=fehler):
                r=copy.deepcopy(self.recipe)
                p=next(p for p in r['positionen'] if p['produkt_id']=='hotel-dolomitengolf-penthouse')
                p['beobachtung_ids']['2025']=p['beobachtung_ids']['2025'][:1] if fehler=='fehlt' else list(reversed(p['beobachtung_ids']['2025']))
                with self.assertRaisesRegex(Datenfehler, 'Tarifkomponenten|Tarifeinheit'):
                    erstellen(self.raw,r)


if __name__ == '__main__':
    unittest.main()
