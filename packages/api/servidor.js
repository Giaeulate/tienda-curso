// API HTTP de la tienda (sin dependencias, con node:http).
import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { listarProductos, obtenerProducto } from '../../src/productos/productos.js';
import { registrarCliente, obtenerCliente } from '../../src/clientes/clientes.js';
import { crearPedido, agregarLinea, calcularSubtotal, calcularTotal } from '../../src/pedidos/pedidos.js';

function responder(res, estado, cuerpo) {
  res.writeHead(estado, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(cuerpo));
}

function error(res, estado, codigo, mensaje) {
  responder(res, estado, { error: { codigo, mensaje } });
}

async function leerJson(req) {
  let datos = '';
  for await (const parte of req) datos += parte;
  if (!datos) return {};
  try {
    return JSON.parse(datos);
  } catch {
    throw Object.assign(new Error('El cuerpo no es JSON válido'), { estado: 400, codigo: 'json_invalido' });
  }
}

async function manejar(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const partes = url.pathname.split('/').filter(Boolean);

  if (req.method === 'GET' && url.pathname === '/productos') {
    const categoria = url.searchParams.get('categoria') ?? undefined;
    return responder(res, 200, { datos: listarProductos({ categoria }) });
  }

  if (req.method === 'GET' && partes[0] === 'productos' && partes.length === 2) {
    const producto = obtenerProducto(partes[1]);
    if (!producto) return error(res, 404, 'no_encontrado', `El producto ${partes[1]} no existe`);
    return responder(res, 200, { datos: producto });
  }

  if (req.method === 'POST' && url.pathname === '/clientes') {
    const cuerpo = await leerJson(req);
    try {
      return responder(res, 201, { datos: registrarCliente(cuerpo) });
    } catch (e) {
      return error(res, 422, 'validacion', e.message);
    }
  }

  if (req.method === 'POST' && url.pathname === '/pedidos') {
    const { clienteId, lineas = [] } = await leerJson(req);
    if (!obtenerCliente(clienteId)) return error(res, 422, 'validacion', 'El cliente no existe');
    try {
      const pedido = crearPedido(clienteId);
      for (const { productoId, cantidad } of lineas) agregarLinea(pedido, productoId, cantidad);
      return responder(res, 201, {
        datos: { ...pedido, subtotal: calcularSubtotal(pedido), total: calcularTotal(pedido) },
      });
    } catch (e) {
      return error(res, 422, 'validacion', e.message);
    }
  }

  return error(res, 404, 'no_encontrado', 'Ruta no encontrada');
}

export function crearServidor() {
  return http.createServer((req, res) => {
    manejar(req, res).catch((e) => error(res, e.estado ?? 500, e.codigo ?? 'error_interno', e.message));
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const puerto = Number(process.env.PORT ?? 3000);
  crearServidor().listen(puerto, () => console.log(`API de la tienda en http://localhost:${puerto}`));
}
