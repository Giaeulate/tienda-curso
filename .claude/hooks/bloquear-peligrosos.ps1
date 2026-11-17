# Bloquea comandos destructivos antes de que el agente los ejecute (versión Windows).
$data = [Console]::In.ReadToEnd() | ConvertFrom-Json
$cmd = $data.tool_input.command
if ($cmd -match 'rm -rf|Remove-Item.*-Recurse|git push --force|git reset --hard') {
    [Console]::Error.WriteLine("Bloqueado por la política del curso: $cmd")
    exit 2   # código 2 = bloquear la acción y devolver el motivo al agente
}
exit 0
