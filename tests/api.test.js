import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { crearServidor } from '../packages/api/servidor.js';
import { reiniciarClientes } from '../src/clientes/clientes.js';

let servidor;
let base;

before(async () => {
  reiniciarClientes();
  servidor = crearServidor();
  await new Promise((resolve) => servidor.listen(0, resolve));
  base = `http://localhost:${servidor.address().port}`;
});

after(() => servidor.close());

test('GET /productos lista el catálogo', async () => {
  const res = await fetch(`${base}/productos`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).datos.length, 5);
});

test('GET /productos/:id devuelve 404 con el formato de error', async () => {
  const res = await fetch(`${base}/productos/nope`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).error.codigo, 'no_encontrado');
});

test('POST /clientes y POST /pedidos', async () => {
  const cliente = await fetch(`${base}/clientes`, {
    method: 'POST',
    body: JSON.stringify({ nombre: 'Ana', email: 'ana@ejemplo.com' }),
  }).then((r) => r.json());

  const res = await fetch(`${base}/pedidos`, {
    method: 'POST',
    body: JSON.stringify({ clienteId: cliente.datos.id, lineas: [{ productoId: 'p4', cantidad: 2 }] }),
  });
  assert.equal(res.status, 201);
  assert.equal((await res.json()).datos.total, 69);
});
