param(
  [string]$CollectionPath = "./postman_collection.json",
  [string]$EnvPath = "./postman_env.json"
)

Write-Output "Running Newman E2E (requires Node/npm and newman)"
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  Write-Error "npx not found. Install Node.js/npm or install newman globally (npm i -g newman)"
  exit 2
}

# Run newman using npx to avoid global install requirement
$npx = "npx newman run $CollectionPath -e $EnvPath --insecure"
Write-Output "Executing: $npx"
Invoke-Expression $npx