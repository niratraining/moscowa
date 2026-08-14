# Moscowa

Premium RTL Persian travel booking homepage for **مسکوا / Moscowa**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Vazirmatn
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production:

```bash
npm run build
npm run start
```

If file-watcher errors appear on macOS (`EMFILE`), raise the limit first:

```bash
ulimit -n 10240
```

## Brand assets

Official logo files live in `public/brand/`:

- `logo-horizontal.png`
- `logo-stacked.png`
- `logo-mark.png`

Brand colors:

- Purple `#4F2F7C`
- Orange `#F84209`

## Architecture

- `src/components/layout` — Header / Footer
- `src/components/search` — booking engine (tabs + forms + validation)
- `src/components/homepage` — homepage sections
- `src/components/ui` — shared primitives
- `src/data/homepage.ts` — content + placeholder marketing metrics

## Notes

Marketing metrics in `src/data/homepage.ts` are placeholders and must be replaced with verified business data before production.
