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
