// Componente: tarjeta de un producto del catálogo.
import { escaparHtml, formatearPrecio } from './html.js';

export function tarjetaProducto(producto) {
  const sinStock = producto.stock === 0;
  return [
    `<article class="tarjeta-producto${sinStock ? ' tarjeta-producto--agotado' : ''}">`,
    `  <h3 class="tarjeta-producto__nombre">${escaparHtml(producto.nombre)}</h3>`,
    `  <p class="tarjeta-producto__precio">${formatearPrecio(producto.precio)}</p>`,
    sinStock ? '  <p class="tarjeta-producto__aviso">Agotado</p>' : '',
    '</article>',
  ]
    .filter(Boolean)
    .join('\n');
}
