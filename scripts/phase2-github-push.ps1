# Phase 2 - Liaison GitHub (à lancer dans un NOUVEAU terminal après installation de gh)
# 1. Ouvre un nouveau terminal (Ctrl+Shift+`) ou redémarre Cursor
# 2. cd c:\dev\florent-le-bot
# 3. .\scripts\phase2-github-push.ps1

Set-Location $PSScriptRoot\..

# Créer le repo distant et configurer origin
gh repo create florent-le-bot --public --source=. --remote=origin

# Push sur main
git push -u origin main

Write-Host "Phase 2 terminee. Repo: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)"
