# RHOT Digital Tarot Guide (Next.js)

A Vercel-ready Next.js app that turns the attached **RHOT Booklet** PDF into a modern, mobile-first digital experience:
- Browse all **78** cards
- Search by **title, quote, signature, or Housewife**
- Interactive spreads with **tap-to-reveal** and **shareable URLs**
- Card detail pages with clean typography + extracted artwork

## Local dev

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to a Git repo.
2. Import the repo in Vercel.
3. Deploy (defaults work).

> Optional: update `metadataBase` in `src/app/layout.tsx` to your production URL.

## Content & assets

- Card data: `src/data/cards.json`
- Extracted card art images: `public/cards/art/*.webp`

## Notes

- The spread definitions are based on the “CARD SPREADS” pages in the booklet.
- A **one-card pull** page is included as a quality-of-life add-on (not in the PDF).
