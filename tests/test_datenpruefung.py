"""Regressionsfälle aus dem Gesamtreview, keine bloßen Struktur-Snapshots."""
import copy
import json
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from datenpruefung import pruefen, Datenfehler

class Datenpruefung(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        release=json.loads((ROOT/'data/release.json').read_text())
        cls.raw=json.loads((ROOT/release['recherche']).read_text())
        cls.choice=json.loads((ROOT/release['auswahl']).read_text())

    def changed(self):
        raw=copy.deepcopy(self.raw)
        obs=next(o for p in raw['produkte'] for o in p['beobachtungen']+p['zusätzliche_historische_beobachtungen'] if o['id']=='cayenne-2026')
        return raw,obs

    def test_archiv_erlaubt_ausdrueckliche_zukunftstarife(self):
        result=pruefen(self.raw,self.choice)
        self.assertIn('salem-2027',result)
        self.assertFalse(result['salem-2027']['indexfreigabe'])

    def test_zukuenftige_gueltigkeit_ohne_warnwort_blockiert_auswahl(self):
        raw,o=self.changed();o['gültigkeit']={'von':'2027-01-01'}
        with self.assertRaisesRegex(Datenfehler,'cayenne-2026.*Zukunftspreis'):
            pruefen(raw,self.choice)

    def test_ungueltiges_kalenderdatum(self):
        for value in ['2026-19-98','2026-02-30','2026-2-01']:
            with self.subTest(value=value):
                raw,o=self.changed();o['preisdatum']=value
                with self.assertRaisesRegex(Datenfehler,'cayenne-2026.*Datum|cayenne-2026.*Kalenderdatum'):
                    pruefen(raw,self.choice)

    def test_pflichtangaben_und_quellen(self):
        for field in ['preisart','umsatzsteuer','einheit','abgerufen_am']:
            with self.subTest(field=field):
                raw,o=self.changed();del o[field]
                with self.assertRaisesRegex(Datenfehler,'cayenne-2026'):
                    pruefen(raw,self.choice)
        raw,o=self.changed();o['quelle_id']='unbekannt'
        with self.assertRaisesRegex(Datenfehler,'cayenne-2026.*unbekannte Quelle'):
            pruefen(raw,self.choice)

    def test_keine_fremde_produktvariante_im_rezept(self):
        choice=copy.deepcopy(self.choice)
        choice['positionen'][0]['beobachtung_ids']['2026']=['salem-2026']
        with self.assertRaisesRegex(Datenfehler,'gehört nicht'):
            pruefen(self.raw,choice)

    def test_abweichende_gewichte_werden_nicht_still_ignoriert(self):
        choice=copy.deepcopy(self.choice);choice['positionen'][0]['gewicht_bruch']={'zaehler':1,'nenner':2}
        with self.assertRaisesRegex(Datenfehler,'gleiche Gewichte'):
            pruefen(self.raw,choice)

    def test_unbekannter_steuersatz_ist_als_ausdruecklicher_status_erlaubt(self):
        raw,o=self.changed();o['umsatzsteuer']='Brutto-Endpreis belegt; einzelner Steuersatz offen'
        pruefen(raw,self.choice)

if __name__=='__main__':unittest.main()
