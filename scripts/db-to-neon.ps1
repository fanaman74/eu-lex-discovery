<#
Copies the local EU Lex Discovery database into another PostgreSQL database (Neon by default).

  ./scripts/db-to-neon.ps1                 # dump local, restore into Neon, verify row counts
  ./scripts/db-to-neon.ps1 -DumpOnly       # only write a backup file
  ./scripts/db-to-neon.ps1 -TargetUrl ...  # restore into any other database

Connection strings come from .env: the source is LOCAL_DATABASE_URL and the target is DATABASE_URL_UNPOOLED,
the direct Neon connection that `neon link` writes (restores should not go through the pooler).
The target must be empty unless -Force is given; -Force drops and recreates the app's tables there.
#>
param(
  [string]$SourceUrl,
  [string]$TargetUrl,
  [switch]$DumpOnly,
  [switch]$Force
)
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$tables = 'sources','courts','cases','documents','topics','case_topics','reports','monitoring_runs','provider_settings','schedule_preferences'

function Invoke-Native([scriptblock]$Command) { $out = & $Command; if ($LASTEXITCODE -ne 0) { throw "Command failed with exit code $LASTEXITCODE" }; $out }
function Get-Counts([string]$Url) {
  $sql = ($tables | ForEach-Object { "SELECT '$_', count(*) FROM $_" }) -join ' UNION ALL '
  $counts = [ordered]@{}
  Invoke-Native { psql -X -At -F '=' -v ON_ERROR_STOP=1 -d $Url -c $sql } | ForEach-Object { $name, $value = $_ -split '='; $counts[$name] = [int]$value }
  $counts
}

function Get-EnvValue([string]$Name) {
  $line = Get-Content (Join-Path $root '.env') | Where-Object { $_ -match "^$Name=" } | Select-Object -First 1
  if ($line) { ($line -replace "^$Name=", '').Trim('"', "'") }
}

$sourceUrl = if ($SourceUrl) { $SourceUrl } else { Get-EnvValue 'LOCAL_DATABASE_URL' }
if (-not $sourceUrl) { throw 'LOCAL_DATABASE_URL is missing from .env' }

$backupDir = Join-Path $root '.local\backups'
New-Item -ItemType Directory -Force $backupDir | Out-Null
$dump = Join-Path $backupDir ("eulex-{0}.dump" -f (Get-Date -Format 'yyyyMMdd-HHmmss'))
Invoke-Native { pg_dump --format=custom --no-owner --no-acl --file $dump -d $sourceUrl }
Write-Host "Backup written: $dump ($([math]::Round((Get-Item $dump).Length / 1KB)) KB)"
if ($DumpOnly) { return }

if (-not $TargetUrl) { $TargetUrl = Get-EnvValue 'DATABASE_URL_UNPOOLED' }
if (-not $TargetUrl) { throw 'DATABASE_URL_UNPOOLED is missing from .env. Run `neon link` first, or pass -TargetUrl.' }
$target = [uri]$TargetUrl
if ($target.Host -eq ([uri]$sourceUrl).Host -and $target.Port -eq ([uri]$sourceUrl).Port -and $target.AbsolutePath -eq ([uri]$sourceUrl).AbsolutePath) { throw 'Target and source are the same database.' }
Write-Host "Target: $($target.Host):$($target.Port)$($target.AbsolutePath)"

$existing = Invoke-Native { psql -X -At -v ON_ERROR_STOP=1 -d $TargetUrl -c "SELECT count(*) FROM information_schema.tables WHERE table_schema='public'" }
if ([int]$existing -gt 0 -and -not $Force) { throw "Target already has $existing table(s) in the public schema. Re-run with -Force to replace the app's tables there." }

$restoreArgs = @('--no-owner', '--no-acl', '--exit-on-error', '--single-transaction', '-d', $TargetUrl)
if ($Force) { $restoreArgs = @('--clean', '--if-exists') + $restoreArgs }
Invoke-Native { pg_restore @restoreArgs $dump }

$before = Get-Counts $sourceUrl
$after = Get-Counts $TargetUrl
$mismatch = $false
foreach ($table in $tables) {
  $ok = $before[$table] -eq $after[$table]
  if (-not $ok) { $mismatch = $true }
  Write-Host ("{0,-22} local {1,6}   target {2,6}   {3}" -f $table, $before[$table], $after[$table], $(if ($ok) { 'ok' } else { 'MISMATCH' }))
}
if ($mismatch) { throw 'Row counts differ between source and target.' }
Write-Host 'Restore verified: every table has the same row count as the local database.'
