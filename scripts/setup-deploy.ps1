# KYBER-WEB — Windows deployment setup
# Run from repo root: npm run setup:deploy

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Write-Step($message) {
  Write-Host "`n==> $message" -ForegroundColor Cyan
}

Write-Step "Checking prerequisites"
$nodeVersion = node -v
$npmVersion = npm -v
$gitVersion = git --version
Write-Host "Node: $nodeVersion"
Write-Host "npm:  $npmVersion"
Write-Host "Git:  $gitVersion"

Write-Step "Installing dependencies"
npm install

$envLocal = Join-Path $Root ".env.local"
$envExample = Join-Path $Root ".env.example"
if (-not (Test-Path $envLocal) -and (Test-Path $envExample)) {
  Copy-Item $envExample $envLocal
  Write-Host "Created .env.local from .env.example — fill in SMTP values before testing the form."
} elseif (Test-Path $envLocal) {
  Write-Host ".env.local already exists."
} else {
  Write-Host "Warning: .env.example not found."
}

Write-Step "Running production build"
npm run build
if ($LASTEXITCODE -ne 0) {
  throw "Build failed. Fix errors before deploying."
}

Write-Step "Checking Vercel CLI login"
$whoami = npx vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "Not logged in to Vercel yet." -ForegroundColor Yellow
  Write-Host "Run:  npx vercel login"
  Write-Host "Then: npx vercel link"
} else {
  Write-Host "Vercel account: $whoami"
}

Write-Step "Deployment checklist"
Write-Host @"

Local machine is ready. Complete these in the browser:

1. Vercel (https://vercel.com)
   - Project: kyber-web / marslog/KYBER-WEB
   - Settings -> Environment Variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, PROJECT_REGISTRATION_TO
   - Settings -> Domains: add kyber-it.com and www.kyber-it.com

2. Squarespace DNS (kyber-it.com)
   - Add A record @ -> 76.76.21.21 (or value from Vercel Domains page)
   - Add CNAME www -> cname.vercel-dns.com
   - Keep existing MX + SPF records for Google Workspace email

3. Optional CLI deploy (after vercel login + link)
   - Preview:  npm run deploy:preview
   - Production: npm run deploy:prod

4. Local form testing
   - Edit .env.local with real SMTP credentials
   - npm run dev  ->  http://localhost:3001/contact

"@
