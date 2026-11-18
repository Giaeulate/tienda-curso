// Reglas de descuento vigentes de la tienda.
// Cada regla devuelve el monto a descontar; aplicarDescuentos suma todas las que correspondan.
import { aCentavos, aMonto, porcentajeEnCentavos } from '../montos/montos.js';

export const REGLAS = [
  { tipo: 'categoria', categoria: 'papeleria', porcentaje: 10 }, // 10 % en papelería
  { tipo: 'volumen', minimoUnidades: 10, porcentaje: 5 }, // 5 % si el pedido tiene 10 unidades o más
];

// Cada regla redondea su descuento al centavo una sola vez, sobre el monto completo al que se aplica.
export function descuentoPorCategoria(lineas, regla) {
  const centavos = lineas
    .filter((linea) => linea.categoria === regla.categoria)
    .reduce((acc, linea) => acc + aCentavos(linea.precioUnitario) * linea.cantidad, 0);
  return aMonto(porcentajeEnCentavos(centavos, regla.porcentaje));
}

export function descuentoPorVolumen(lineas, subtotal, regla) {
  const unidades = lineas.reduce((acc, linea) => acc + linea.cantidad, 0);
  return unidades >= regla.minimoUnidades ? aMonto(porcentajeEnCentavos(aCentavos(subtotal), regla.porcentaje)) : 0;
}

export function aplicarDescuentos(lineas, subtotal, reglas = REGLAS) {
  let centavos = 0;
  for (const regla of reglas) {
    if (regla.tipo === 'categoria') centavos += aCentavos(descuentoPorCategoria(lineas, regla));
    else if (regla.tipo === 'volumen') centavos += aCentavos(descuentoPorVolumen(lineas, subtotal, regla));
  }
  return aMonto(centavos);
}
