import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escaparHtml, formatearPrecio } from '../packages/ui/html.js';
import { tarjetaProducto } from '../packages/ui/tarjetaProducto.js';
import { resumenPedido } from '../packages/ui/resumenPedido.js';

test('escapa HTML', () => {
  assert.equal(escaparHtml('<b>"x"</b>'), '&lt;b&gt;&quot;x&quot;&lt;/b&gt;');
});

test('formatea precios con dos decimales', () => {
  assert.equal(formatearPrecio(4.1), '$4.10');
});

test('la tarjeta marca los productos agotados', () => {
  const html = tarjetaProducto({ nombre: 'Taza', precio: 19.99, stock: 0 });
  assert.match(html, /Agotado/);
});

test('el resumen muestra el total', () => {
  const pedido = { lineas: [{ nombre: 'Taza', precioUnitario: 19.99, cantidad: 1 }] };
  assert.match(resumenPedido(pedido, 19.99), /Total: \$19\.99/);
});
