# Arquitectura

```
packages/ui     → componentes de presentación (HTML como texto)
packages/api    → API HTTP (node:http, sin dependencias)
src/            → dominio: productos, clientes, pedidos y descuentos
infra/          → notas y archivos de despliegue
```

- El dominio no conoce HTTP ni HTML.
- La API valida la entrada y traduce los errores del dominio al formato estándar `{ "error": { "codigo", "mensaje" } }`.
- Todo vive en memoria: no hay base de datos. Reiniciar el proceso borra los datos.
- Los precios se manejan como `number` con dos decimales.
- Las cuentas de dinero (subtotal, descuentos y total) se hacen en centavos enteros con `src/montos/montos.js`.
  Así se evitan errores de redondeo binario como `12.299999999999999`.
- Cada regla de descuento se redondea al centavo una sola vez, sobre el monto al que se aplica.
  El medio centavo se redondea hacia arriba.
