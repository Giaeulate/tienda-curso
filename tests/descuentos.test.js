import { test } from 'node:test';
import assert from 'node:assert/strict';
import { descuentoPorCategoria, descuentoPorVolumen, aplicarDescuentos } from '../src/descuentos/descuentos.js';

const linea = (categoria, precioUnitario, cantidad) => ({ categoria, precioUnitario, cantidad });

test('descuento por categoría: 10 % en papelería', () => {
  const lineas = [linea('papeleria', 10, 2), linea('hogar', 50, 1)];
  assert.equal(descuentoPorCategoria(lineas, { categoria: 'papeleria', porcentaje: 10 }), 2);
});

test('sin descuento por volumen con menos de 10 unidades', () => {
  const lineas = [linea('hogar', 10, 9)];
  assert.equal(descuentoPorVolumen(lineas, 90, { minimoUnidades: 10, porcentaje: 5 }), 0);
});

test('descuento por volumen con 10 unidades', () => {
  const lineas = [linea('hogar', 10, 10)];
  assert.equal(descuentoPorVolumen(lineas, 100, { minimoUnidades: 10, porcentaje: 5 }), 5);
});

test('descuento por categoría redondeado al centavo con precios sin representación binaria exacta', () => {
  const lineas = [linea('papeleria', 4.1, 3)];
  assert.equal(descuentoPorCategoria(lineas, { categoria: 'papeleria', porcentaje: 10 }), 1.23);
});

test('descuento por volumen redondeado al centavo', () => {
  const lineas = [linea('papeleria', 0.7, 13)];
  assert.equal(descuentoPorVolumen(lineas, 9.1, { minimoUnidades: 10, porcentaje: 5 }), 0.46);
});

test('suma los descuentos de categoría y volumen al centavo', () => {
  const lineas = [linea('papeleria', 4.1, 10)];
  assert.equal(aplicarDescuentos(lineas, 41), 6.15);
});

test('aplica las reglas vigentes', () => {
  const lineas = [linea('hogar', 20, 1)];
  assert.equal(aplicarDescuentos(lineas, 20), 0);
});
