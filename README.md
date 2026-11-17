# tienda-curso

Repositorio de práctica del curso **Agentes, Subagentes, Memoria y Skills en IA**. Es una tienda pequeña (catálogo, clientes, pedidos y descuentos) con una API HTTP y componentes de presentación, sin dependencias externas. Todas las demos y prácticas del curso se hacen sobre este repositorio con Claude Code.

> Algunos archivos están preparados a propósito para las demos del curso (por ejemplo, un CLAUDE.md demasiado largo y errores conocidos en el backlog). No los tomes como referencia de buenas prácticas. El archivo `.env` contiene un valor **falso**: nunca pongas secretos reales en este repo.

## Requisitos

- Node.js 22.20 o superior
- Git
- Claude Code

## Uso

Los comandos son iguales en macOS (Terminal) y Windows (PowerShell):

| Acción | Comando |
|---|---|
| Ejecutar las pruebas | `npm test` |
| Ejecutar un archivo de pruebas | `node --test tests/pedidos.test.js` |
| Levantar la API (puerto 3000) | `npm start` |

Para probar la API con la API levantada:

| macOS (Terminal) | Windows (PowerShell) |
|---|---|
| `curl http://localhost:3000/productos` | `Invoke-RestMethod http://localhost:3000/productos` |

## Estructura

```
src/            dominio: productos, clientes, pedidos y descuentos
packages/api/   API HTTP (node:http)
packages/ui/    componentes de presentación (HTML como texto)
tests/          pruebas (node:test)
infra/          Dockerfile y notas de despliegue
docs/           arquitectura e integraciones
BACKLOG.md      funcionalidades y correcciones pendientes
```

## Puntos de partida por módulo

La rama `main` es el punto de partida del curso. Si te atrasas, puedes saltar al estado con el que empieza cada módulo:

```
git fetch --tags
git checkout modulo-5
```

| Etiqueta | Estado |
|---|---|
| `modulo-1`, `modulo-2`, `modulo-3` | Proyecto inicial |
| `modulo-4` | Con permisos y hooks del Módulo 3 (`.claude/settings.json`, `.claude/hooks/`) |
| `modulo-5` | Con CLAUDE.md breve, tres skills y dos subagentes del Módulo 4 |
| `modulo-6`, `modulo-7` | Con los subagentes de la línea SDD del Módulo 5 (las memorias de Engram del Módulo 6 las genera cada persona) |
| `modulo-8` | Con reglas por carpeta, modelos por subagente y el plugin del equipo del Módulo 7 |

Para volver al inicio: `git checkout main`.
