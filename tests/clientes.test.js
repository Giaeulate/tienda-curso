import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { reiniciarClientes, registrarCliente, obtenerCliente } from '../src/clientes/clientes.js';

beforeEach(() => reiniciarClientes());

test('registra un cliente', () => {
  const cliente = registrarCliente({ nombre: 'Ana', email: 'ana@ejemplo.com' });
  assert.equal(cliente.id, 'cli-1');
  assert.deepEqual(obtenerCliente('cli-1'), cliente);
});

test('exige nombre y email', () => {
  assert.throws(() => registrarCliente({ email: 'ana@ejemplo.com' }), /nombre/);
  assert.throws(() => registrarCliente({ nombre: 'Ana' }), /email/);
});

test('no permite emails repetidos', () => {
  registrarCliente({ nombre: 'Ana', email: 'ana@ejemplo.com' });
  assert.throws(() => registrarCliente({ nombre: 'Otra', email: 'ana@ejemplo.com' }), /ya está registrado/);
});
