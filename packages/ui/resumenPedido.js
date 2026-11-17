// Componente: resumen de un pedido con sus líneas y el total.
import { escaparHtml, formatearPrecio } from './html.js';

export function resumenPedido(pedido, total) {
  const filas = pedido.lineas
    .map(
      (linea) =>
        `    <li>${escaparHtml(linea.nombre)} × ${linea.cantidad}: ${formatearPrecio(linea.precioUnitario * linea.cantidad)}</li>`,
    )
    .join('\n');
  return [
    '<section class="resumen-pedido">',
    '  <ul class="resumen-pedido__lineas">',
    filas,
    '  </ul>',
    `  <p class="resumen-pedido__total">Total: ${formatearPrecio(total)}</p>`,
    '</section>',
  ].join('\n');
}
