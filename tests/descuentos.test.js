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

test('aplica las reglas vigentes', () => {
  const lineas = [linea('hogar', 20, 1)];
  assert.equal(aplicarDescuentos(lineas, 20), 0);
});
