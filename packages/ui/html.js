// Utilidades de la capa de presentación.

export function escaparHtml(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function formatearPrecio(valor) {
  return `$${valor.toFixed(2)}`;
}
