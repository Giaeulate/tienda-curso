import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { reiniciarCatalogo, listarProductos, obtenerProducto, actualizarPrecio } from '../src/productos/productos.js';

beforeEach(() => reiniciarCatalogo());

test('lista todos los productos', () => {
  assert.equal(listarProductos().length, 5);
});

test('filtra por categoría', () => {
  const papeleria = listarProductos({ categoria: 'papeleria' });
  assert.deepEqual(
    papeleria.map((p) => p.id),
    ['p2', 'p5'],
  );
});

test('obtiene un producto por id', () => {
  assert.equal(obtenerProducto('p1').nombre, 'Taza de cerámica');
});

test('devuelve null si el producto no existe', () => {
  assert.equal(obtenerProducto('nope'), null);
});

test('actualiza el precio', () => {
  assert.equal(actualizarPrecio('p1', 21.5).precio, 21.5);
  assert.equal(obtenerProducto('p1').precio, 21.5);
});

test('rechaza precios negativos', () => {
  assert.throws(() => actualizarPrecio('p1', -1), /Precio inválido/);
});
