# Helper script to run examples (PowerShell)
# Usage: .\run-example.ps1 basic-odata-editor

param(
    [string]$ExampleName = "basic-odata-editor"
)

Write-Host "🚀 Running example: $ExampleName" -ForegroundColor Cyan
Write-Host ""

# Get repository root
$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

Write-Host "📦 Building main package..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "📂 Navigating to example: $ExampleName" -ForegroundColor Green
Set-Location "examples\$ExampleName"

Write-Host ""
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "🎉 Starting development server..." -ForegroundColor Green
Write-Host ""
npm run dev

