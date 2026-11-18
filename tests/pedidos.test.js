import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { reiniciarCatalogo } from '../src/productos/productos.js';
import { crearPedido, agregarLinea, calcularSubtotal, calcularTotal, cerrarPedido } from '../src/pedidos/pedidos.js';

beforeEach(() => reiniciarCatalogo());

test('crea un pedido abierto y vacío', () => {
  const pedido = crearPedido('cli-1');
  assert.equal(pedido.estado, 'abierto');
  assert.deepEqual(pedido.lineas, []);
});

test('exige un cliente', () => {
  assert.throws(() => crearPedido(), /necesita un cliente/);
});

test('agrega líneas y acumula cantidades del mismo producto', () => {
  const pedido = crearPedido('cli-1');
  agregarLinea(pedido, 'p1', 1);
  agregarLinea(pedido, 'p1', 2);
  assert.equal(pedido.lineas.length, 1);
  assert.equal(pedido.lineas[0].cantidad, 3);
});

test('rechaza cantidades inválidas y falta de stock', () => {
  const pedido = crearPedido('cli-1');
  assert.throws(() => agregarLinea(pedido, 'p1', 0), /Cantidad inválida/);
  assert.throws(() => agregarLinea(pedido, 'p3', 16), /Stock insuficiente/);
});

test('total de un pedido simple sin descuentos', () => {
  const pedido = crearPedido('cli-1');
  agregarLinea(pedido, 'p3', 2);
  assert.equal(calcularSubtotal(pedido), 119.8);
  assert.equal(calcularTotal(pedido), 119.8);
});

test('cierra el pedido y guarda el total', () => {
  const pedido = crearPedido('cli-1');
  agregarLinea(pedido, 'p4', 1);
  cerrarPedido(pedido);
  assert.equal(pedido.estado, 'cerrado');
  assert.equal(pedido.total, 34.5);
});

test('calcula el subtotal de 3 cuadernos con dos decimales exactos', () => {
  const pedido = crearPedido('cli-1');
  agregarLinea(pedido, 'p2', 3);
  assert.equal(calcularSubtotal(pedido), 12.3);
});

test('calcula el total de 3 cuadernos con descuento de papelería con dos decimales exactos', () => {
  const pedido = crearPedido('cli-1');
  agregarLinea(pedido, 'p2', 3);
  assert.equal(calcularTotal(pedido), 11.07);
});

test('no cierra pedidos vacíos', () => {
  assert.throws(() => cerrarPedido(crearPedido('cli-1')), /vacío/);
});
