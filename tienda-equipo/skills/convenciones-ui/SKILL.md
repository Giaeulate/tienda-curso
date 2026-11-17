---
name: convenciones-ui
description: Convenciones de los componentes de presentación de la tienda (funciones que devuelven HTML como texto, escapado, clases BEM y accesibilidad). Usar al crear o modificar archivos en packages/ui o sus pruebas en tests/ui.test.js.
---

# Convenciones de UI

- Cada componente es una función pura que recibe datos y devuelve HTML como texto; un componente por archivo en `packages/ui/`.
- Todo texto que venga de datos pasa por `escaparHtml`. Sin excepciones.
- Los precios se muestran con `formatearPrecio`.
- Clases CSS con BEM: `bloque__elemento--modificador` (por ejemplo `tarjeta-producto__precio`).
- Sin estilos en línea ni JavaScript en línea.
- Textos en español neutro.
- Accesibilidad: elementos semánticos (`article`, `section`, `ul`, `button`), `alt` en imágenes, texto o `aria-label` en botones, nunca información solo por color.
- Estados vacíos y de error explícitos, con un mensaje claro.
- Cada componente nuevo lleva pruebas en `tests/ui.test.js`.
