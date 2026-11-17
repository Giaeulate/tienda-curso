---
name: release
description: Pasos para publicar una versión de la tienda con versionado semántico, CHANGELOG, etiqueta de Git e imagen de Docker. Usar cuando se pida publicar, liberar o etiquetar una versión, o actualizar el CHANGELOG.
disable-model-invocation: true
---

# Publicar una versión

1. Estar en `main` actualizada y con `npm test` pasando.
2. Elegir la versión: MAJOR si rompe la API, MINOR si agrega funcionalidad compatible, PATCH si solo corrige.
3. Actualizar `version` en `package.json`.
4. Actualizar `CHANGELOG.md` (crearlo si no existe):
   - Encabezado `## [x.y.z] - AAAA-MM-DD`.
   - Subsecciones `Agregado`, `Cambiado`, `Corregido`, `Eliminado`, una línea por cambio con su pull request.
5. Commit "Publicar versión x.y.z" y etiqueta `vx.y.z`.
6. Pedir confirmación antes de `git push && git push --tags`.
7. Construir la imagen: `docker build -f infra/Dockerfile -t tienda:x.y.z .`.
8. Si algo falla después de publicar, no borrar la etiqueta: publicar un PATCH.
