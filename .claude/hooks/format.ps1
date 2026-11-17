# Formatea con prettier el archivo que el agente acaba de editar (versión Windows).
$data = [Console]::In.ReadToEnd() | ConvertFrom-Json
$f = $data.tool_input.file_path
if ($f) { npx prettier --write "$f" }
