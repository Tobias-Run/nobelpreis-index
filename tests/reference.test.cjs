const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'dist/design-demo/data/bundesbank-vpi.js'), 'utf8') + ';globalThis.reference = bundesbankVpi;', context);
const reference = JSON.parse(JSON.stringify(context.reference));

test('Offizielle Jahreswerte entsprechen dem versionierten CSV-Beleg', () => {
  const raw = fs.readFileSync(path.join(root, reference.sourceFile));
  assert.equal(crypto.createHash('sha256').update(raw).digest('hex'), reference.sourceSha256);
  const lines = raw.toString('utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  const keys = lines.shift().split(';');
  const rows = lines.filter(Boolean).map(line => Object.fromEntries(line.split(';').map((value, i) => [keys[i], value])));
  assert.equal(rows.length, 6);
  for (const row of rows) {
    assert.equal(row.BBK_ID, reference.seriesId);
    const point = reference.observations.find(point => point.year === Number(row.TIME_PERIOD));
    assert.ok(point);
    assert.equal(point.value, Number(row.OBS_VALUE));
  }
  assert.deepEqual(reference.observations.map(p => p.year), [2020, 2021, 2022, 2023, 2024, 2025]);
});

test('Anwendung verwendet die offizielle Referenz; alle Zeiträume werden korrekt umbasiert', () => {
  // Nur Daten und Rechenfunktionen vor der SVG-Darstellung laden, ohne DOM-Mock.
  const app = fs.readFileSync(path.join(root, 'dist/design-demo/app.js'), 'utf8').split('const shapes=')[0];
  vm.runInContext(app + ';globalThis.values = vpi;globalThis.basket = series();', context);
  const values = Array.from(context.values);
  assert.deepEqual(values, reference.observations.map(point => point.value));
  assert.equal(context.basket[0], 100);
  for (const start of [0, 2, 4]) {
    const normalized = values.slice(start).map(value => 100 * value / values[start]);
    assert.equal(normalized[0], 100);
    assert.ok(Math.abs(normalized.at(-1) - 100 - (121.9 / values[start] - 1) * 100) < 1e-10);
  }
  assert.ok(Math.abs((values.at(-1) / values[0] - 1) * 100 - 21.9) < 1e-10);
});

test('Provenienz und Referenzskript sind vollständig eingebunden', () => {
  assert.equal(reference.provider, 'Deutsche Bundesbank');
  assert.match(reference.originalSource, /Statistisches Bundesamt/);
  assert.equal(reference.frequency, 'Jahresdurchschnitt');
  const html = fs.readFileSync(path.join(root, 'dist/design-demo/index.html'), 'utf8');
  assert.ok(html.indexOf('src="data/bundesbank-vpi.js"') < html.indexOf('src="app.js"'));
  assert.ok(html.includes(reference.sourceUrl));
  for (const point of reference.observations) {
    assert.ok(html.includes(`<td>${point.year}</td><td>${point.value.toFixed(1).replace('.', ',')}</td>`));
  }
});
