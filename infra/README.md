# Infraestructura

Notas de despliegue de la API. No hay un entorno real: estos archivos sirven de ejemplo para el curso.

- `Dockerfile`: imagen de la API con Node 22.
- Variables de entorno: `PORT`, `PAYMENT_API_URL`, `PAYMENT_API_KEY` (ver `.env.example`).
- El despliegue se hace desde la rama `main` después de crear la etiqueta de la versión.
