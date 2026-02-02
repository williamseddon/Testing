# RHOT Digital Meaning Guide (Next.js)

A lightweight, mobile-first digital guide optimized for QR scans.

## Features
- Fast browse + search + suit filters
- Card detail pages with share + favorites
- Daily Draw page (optional fun mode)
- Static export (no server needed)

## Quick start
1) Install
   npm install

2) Run locally
   npm run dev

3) Build a static export
   npm run build

The static site outputs to: `out/`

## Hosting under WordPress (/guide)
If you want the guide to live at:
  https://RHOTarot.com/guide/

Set a base path before building:

### macOS/Linux
  NEXT_PUBLIC_BASE_PATH=/guide npm run build

### Windows (PowerShell)
  $env:NEXT_PUBLIC_BASE_PATH="/guide"; npm run build

Then upload the contents of `out/` into your web server folder `/guide/`.

## Editing card content
### Option A (recommended): Edit JSON
Edit: `data/cards.json`

### Option B: Maintain a CSV, then convert
1) Edit: `data/cards.csv`
2) Run: `npm run convert:csv`
This will regenerate `data/cards.json`.

## Notes
- Favorites are stored locally in the browser (no accounts required).
- Add your legal disclaimer in `app/page.tsx` and `app/layout.tsx` if needed.
