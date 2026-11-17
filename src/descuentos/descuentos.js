// Reglas de descuento vigentes de la tienda.
// Cada regla devuelve el monto a descontar; aplicarDescuentos suma todas las que correspondan.

export const REGLAS = [
  { tipo: 'categoria', categoria: 'papeleria', porcentaje: 10 }, // 10 % en papelería
  { tipo: 'volumen', minimoUnidades: 10, porcentaje: 5 }, // 5 % si el pedido tiene 10 unidades o más
];

export function descuentoPorCategoria(lineas, regla) {
  return lineas
    .filter((linea) => linea.categoria === regla.categoria)
    .reduce((acc, linea) => acc + (linea.precioUnitario * linea.cantidad * regla.porcentaje) / 100, 0);
}

export function descuentoPorVolumen(lineas, subtotal, regla) {
  const unidades = lineas.reduce((acc, linea) => acc + linea.cantidad, 0);
  return unidades >= regla.minimoUnidades ? (subtotal * regla.porcentaje) / 100 : 0;
}

export function aplicarDescuentos(lineas, subtotal, reglas = REGLAS) {
  let descuento = 0;
  for (const regla of reglas) {
    if (regla.tipo === 'categoria') descuento += descuentoPorCategoria(lineas, regla);
    else if (regla.tipo === 'volumen') descuento += descuentoPorVolumen(lineas, subtotal, regla);
  }
  return descuento;
}
