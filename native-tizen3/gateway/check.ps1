# Mojangels AI TV — deployment readiness checklist
#
# Run in PowerShell from this folder, only when ready to configure the gateway.
# This script never prints secret values, changes firewall rules, or contacts the TV.
$ErrorActionPreference = 'Stop'
Write-Host 'Checking Mojangels AI gateway (no secrets will be displayed)...'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host 'Node.js 20+ is not installed or unavailable in PATH.'
  exit 1
}
$versionText = (& node --version).Trim()
$major = [int](($versionText -replace '^v','').Split('.')[0])
if ($major -lt 20) { Write-Host 'Node.js 20+ required.'; exit 1 }
& node --check (Join-Path $PSScriptRoot 'server.js')
if ($LASTEXITCODE -ne 0) { exit 1 }
Write-Host "JavaScript syntax: OK ($versionText)"
$required = @('OPENAI_API_KEY','MOJANGELS_PAIR_CODE','TLS_CERT_FILE','TLS_KEY_FILE')
$missing = @()
foreach ($name in $required) {
  if ([string]::IsNullOrEmpty([Environment]::GetEnvironmentVariable($name))) {
    $missing += $name
  }
}
if ($missing.Count -gt 0) {
  Write-Host ('Not configured: ' + ($missing -join ', '))
  Write-Host 'Gateway has NOT started, and no TV changes were made.'
  exit 2
}
Write-Host 'Required environment settings appear present (values not displayed).'
Write-Host 'No server was started. TLS, gateway reachability and API access remain untested.'
