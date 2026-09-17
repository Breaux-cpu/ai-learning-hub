# Deploy AI Learning Hub to your host over FTP/FTPS.
# Usage:  pwsh -File deploy.ps1
# Requires: deploy.local.json (copy from deploy.local.json.example and fill in).

param(
  [string]$Config = "$PSScriptRoot\deploy.local.json",
  [string]$Source = "$PSScriptRoot\dist"
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $Config)) {
  Write-Host "Missing $Config" -ForegroundColor Red
  Write-Host "Copy deploy.local.json.example to deploy.local.json and fill in your FTP details."
  exit 1
}
if (-not (Test-Path $Source)) {
  Write-Host "Missing build folder: $Source — run 'npm run build' first." -ForegroundColor Red
  exit 1
}

$cfg = Get-Content $Config -Raw | ConvertFrom-Json
$server  = $cfg.server.TrimEnd('/')
$user    = $cfg.username
$pass    = $cfg.password
$remote  = '/' + $cfg.remoteDir.Trim('/')
$useSsl  = [bool]$cfg.useSsl

function New-FtpRequest([string]$path, [string]$method) {
  $uri = "$server$remote$path"
  $req = [System.Net.FtpWebRequest]::Create($uri)
  $req.Method = $method
  $req.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
  $req.UsePassive = $true
  $req.UseBinary = $true
  $req.KeepAlive = $false
  $req.EnableSsl = $useSsl
  $req.Timeout = 60000
  return $req
}

function Ensure-Directory([string]$path) {
  try {
    $req = New-FtpRequest $path ([System.Net.WebRequestMethods+Ftp]::MakeDirectory)
    $resp = $req.GetResponse()
    $resp.Close()
    Write-Host "  + created $path" -ForegroundColor DarkGray
  } catch {
    # Already exists — fine.
  }
}

function Send-File([string]$localFile, [string]$remotePath) {
  $req = New-FtpRequest $remotePath ([System.Net.WebRequestMethods+Ftp]::UploadFile)
  $bytes = [System.IO.File]::ReadAllBytes($localFile)
  $req.ContentLength = $bytes.Length
  $stream = $req.GetRequestStream()
  $stream.Write($bytes, 0, $bytes.Length)
  $stream.Close()
  $resp = $req.GetResponse()
  $resp.Close()
  Write-Host "  ^ $remotePath ($([math]::Round($bytes.Length/1KB,1)) KB)" -ForegroundColor Green
}

Write-Host "Deploying to $server$remote" -ForegroundColor Cyan
Ensure-Directory ''

$files = Get-ChildItem -Recurse -File $Source
$dirs = $files | ForEach-Object {
  $rel = $_.DirectoryName.Substring($Source.Length).Replace('\', '/')
  if ($rel -and $rel -ne '/') { $rel }
} | Sort-Object -Unique

foreach ($d in $dirs) { Ensure-Directory $d }

foreach ($f in $files) {
  $rel = $f.FullName.Substring($Source.Length).Replace('\', '/')
  Send-File $f.FullName $rel
}

Write-Host ""
Write-Host "Deployed $($files.Count) files." -ForegroundColor Cyan
Write-Host "Check it at your domain (hard-refresh with Ctrl+F5)."