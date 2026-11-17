# Hooks en Windows

`.claude/settings.json` usa hooks en bash. Funcionan en macOS y también en Windows si tienes **Git for Windows** (Claude Code corre los hooks en Git Bash) y **jq** (`winget install jqlang.jq`). En ese caso no tienes que hacer nada.

Si en tu Windows no hay Git Bash o jq, usa la versión en PowerShell: reemplaza el bloque `"hooks"` de `.claude/settings.json` en tu copia local por este (no subas ese cambio al repo):

```json
"hooks": {
  "PostToolUse": [
    {
      "matcher": "Edit|Write",
      "hooks": [
        {
          "type": "command",
          "command": "powershell.exe",
          "args": ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "${CLAUDE_PROJECT_DIR}/.claude/hooks/format.ps1"]
        }
      ]
    }
  ],
  "PreToolUse": [
    {
      "matcher": "Bash|PowerShell",
      "hooks": [
        {
          "type": "command",
          "command": "powershell.exe",
          "args": ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "${CLAUDE_PROJECT_DIR}/.claude/hooks/bloquear-peligrosos.ps1"]
        }
      ]
    }
  ]
}
```

Los scripts `format.ps1` y `bloquear-peligrosos.ps1` ya están en `.claude/hooks/`.
