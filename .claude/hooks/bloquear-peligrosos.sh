#!/usr/bin/env bash
# Bloquea comandos destructivos antes de que el agente los ejecute.
cmd=$(jq -r '.tool_input.command // empty')
if echo "$cmd" | grep -qE 'rm -rf|Remove-Item.*-Recurse|git push --force|git reset --hard'; then
  echo "Bloqueado por la política del curso: $cmd" >&2
  exit 2   # código 2 = bloquear la acción y devolver el motivo al agente
fi
exit 0
