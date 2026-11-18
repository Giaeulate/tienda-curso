import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aCentavos, aMonto, porcentajeEnCentavos } from '../src/montos/montos.js';

test('convierte a centavos montos que no tienen representación binaria exacta', () => {
  assert.equal(aCentavos(4.1), 410);
  assert.equal(aCentavos(0.7), 70);
  assert.equal(aCentavos(19.99), 1999);
});

test('convierte cero y montos enteros a centavos', () => {
  assert.equal(aCentavos(0), 0);
  assert.equal(aCentavos(34), 3400);
});

test('convierte centavos a monto con dos decimales', () => {
  assert.equal(aMonto(1107), 11.07);
  assert.equal(aMonto(0), 0);
});

test('calcula un porcentaje redondeado al centavo', () => {
  assert.equal(porcentajeEnCentavos(1230, 10), 123);
  assert.equal(porcentajeEnCentavos(0, 10), 0);
});

test('redondea hacia arriba el medio centavo exacto', () => {
  assert.equal(porcentajeEnCentavos(125, 10), 13);
  assert.equal(porcentajeEnCentavos(10, 5), 1);
});
