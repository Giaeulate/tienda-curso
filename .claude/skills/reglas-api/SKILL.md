---
name: reglas-api
description: Convenciones de la API REST de la tienda (rutas, cuerpos de respuesta, formato de errores, códigos HTTP, validación y paginación). Usar al crear o modificar endpoints en packages/api o sus pruebas en tests/api.test.js.
---

# Reglas de la API

## Rutas y métodos

- Rutas en plural y en minúsculas: `/productos`, `/clientes`, `/pedidos`.
- Recursos anidados en kebab-case: `/pedidos/{id}/lineas`, `/productos/{id}/precios`.
- `GET` lee, `POST` crea, `PATCH` modifica parcialmente, `DELETE` borra. Nunca `GET` para cambiar datos.

## Cuerpos

- Éxito: `{ "datos": ... }`.
- Error: `{ "error": { "codigo": "...", "mensaje": "..." } }`, con códigos en snake_case (`no_encontrado`, `validacion`, `json_invalido`, `error_interno`).
- Nunca devolver trazas de error al cliente.

## Códigos HTTP

| Código | Cuándo |
|---|---|
| 200 | Lectura correcta |
| 201 | Recurso creado |
| 204 | Borrado sin cuerpo |
| 400 | Cuerpo mal formado |
| 404 | Recurso o ruta inexistente |
| 422 | Datos válidos en formato pero inválidos para el negocio |
| 500 | Error no previsto |

## Validación y datos

- Validar toda la entrada en `packages/api`; el dominio (`src/`) no conoce HTTP.
- Paginación con `?pagina=` y `?tamano=` (por defecto 20, máximo 100).
- Fechas en ISO 8601 UTC. Montos como número con dos decimales.
- No exponer campos internos.

## Al terminar

- Al menos una prueba de éxito y una de error por endpoint en `tests/api.test.js` (servidor en el puerto 0).
- Documentar el endpoint en `docs/arquitectura.md`.
