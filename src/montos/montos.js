// Conversión de montos a centavos enteros.
// Los decimales binarios no representan exactamente valores como 4.1, así que operar en centavos
// evita arrastrar errores como 12.299999999999999 en subtotales, descuentos y totales.

export function aCentavos(monto) {
  return Math.round(monto * 100);
}

export function aMonto(centavos) {
  return centavos / 100;
}

export function porcentajeEnCentavos(centavos, porcentaje) {
  return Math.round((centavos * porcentaje) / 100);
}
