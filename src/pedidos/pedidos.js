// Pedidos: creación, líneas, totales y cierre.
import { obtenerProducto } from '../productos/productos.js';
import { aplicarDescuentos } from '../descuentos/descuentos.js';

let siguienteId = 1;

export function crearPedido(clienteId) {
  if (!clienteId) throw new Error('El pedido necesita un cliente');
  return { id: `ped-${siguienteId++}`, clienteId, lineas: [], estado: 'abierto' };
}

export function agregarLinea(pedido, productoId, cantidad) {
  if (pedido.estado !== 'abierto') throw new Error('El pedido no está abierto');
  const producto = obtenerProducto(productoId);
  if (!producto) throw new Error(`El producto ${productoId} no existe`);
  if (!Number.isInteger(cantidad) || cantidad <= 0) throw new Error('Cantidad inválida');
  if (cantidad > producto.stock) throw new Error('Stock insuficiente');

  const existente = pedido.lineas.find((linea) => linea.productoId === productoId);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    pedido.lineas.push({
      productoId,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precioUnitario: producto.precio,
      cantidad,
    });
  }
  return pedido;
}

export function calcularSubtotal(pedido) {
  return pedido.lineas.reduce((acc, linea) => acc + linea.precioUnitario * linea.cantidad, 0);
}

export function calcularTotal(pedido) {
  const subtotal = calcularSubtotal(pedido);
  const descuento = aplicarDescuentos(pedido.lineas, subtotal);
  return subtotal - descuento;
}

export function cerrarPedido(pedido) {
  if (pedido.lineas.length === 0) throw new Error('No se puede cerrar un pedido vacío');
  pedido.estado = 'cerrado';
  pedido.total = calcularTotal(pedido);
  return pedido;
}
