# Plugin tienda-equipo

Empaqueta las skills, los subagentes y el hook de formato del equipo (resultado del Módulo 7).

| Acción | macOS (Terminal) | Windows (PowerShell) |
|---|---|---|
| Validar | `claude plugin validate ./tienda-equipo` | `claude plugin validate .\tienda-equipo` |
| Probar en local | `claude --plugin-dir ./tienda-equipo` | `claude --plugin-dir .\tienda-equipo` |

Dentro de la sesión, las skills llevan el prefijo del plugin: `/tienda-equipo:reglas-api`. El hook de formato necesita jq y, en Windows, Git Bash.

Para instalarlo desde el marketplace del equipo (cuando exista):

```
/plugin install tienda-equipo --marketplace <owner>/<repo>
```
