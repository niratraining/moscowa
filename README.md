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

## Ostrovok B2B / RateHawk API (live hotel search)

`/hotels` searches and displays real Russian hotels via the ETG (Emerging
Travel Group / Worldota) B2B v3 API — the same API behind Ostrovok B2B and
RateHawk. Until the API key is issued, the page automatically shows the
existing demo grid, so nothing breaks in the meantime.

**Where the pieces live**

- `src/lib/ostrovok/config.ts` — reads credentials/settings from env vars
- `src/lib/ostrovok/client.ts` — authenticated fetch wrapper for the API
  (`multicomplete`, `searchByRegion`, `retrieveHotelPage`, `getHotelInfo`)
- `src/lib/ostrovok/normalize.ts` — resolves destinations to **Russian
  regions only**, and turns raw supplier data into the site's own hotel
  card shape. This is also where the "don't show every hotel" rules live:
  `displayFilters` (`allowedKinds`, `minStarRating`, `requireImage`,
  `maxResults`) — edit these to control what actually appears on the site.
- `src/app/api/hotels/search`, `.../suggest`, `.../[hid]` — thin route
  handlers the client components call
- `src/components/hotels/HotelResultsLive.tsx` — the live search UI on
  `/hotels`, with the demo grid as fallback
- `src/components/hotels/LiveHotelDetail.tsx` — live rates on
  `/hotels/[hid]` for any hotel id that isn't one of the demo ids

**Turning it on**

1. Get `KEY_ID` / `API_KEY` from the Ostrovok B2B partner cabinet
   (`account.b2b.ostrovok.ru`) or `partner.ratehawk.com`.
2. Local dev: copy `.env.local.example` → `.env.local` and fill them in.
3. Production (Cloudflare Workers):
   ```bash
   wrangler secret put OSTROVOK_KEY_ID
   wrangler secret put OSTROVOK_API_KEY
   ```
   Non-secret settings (`OSTROVOK_ENV`, `OSTROVOK_RESIDENCY`,
   `OSTROVOK_CURRENCY`, `OSTROVOK_MAX_RESULTS`) already live in
   `wrangler.jsonc` under `vars` — adjust as needed.
4. Start in `OSTROVOK_ENV=sandbox` and switch to `production` once sandbox
   results look right — the sandbox and production environments use
   different data and must never be mixed.

**Not built yet (next steps once you're ready):** prebook/booking creation,
payment, cancellation, and a currency-conversion/markup layer on top of the
raw supplier prices (`priceFrom` is currently the raw supplier price in
`OSTROVOK_CURRENCY`, with no margin applied).

## Notes

Marketing metrics in `src/data/homepage.ts` are placeholders and must be replaced with verified business data before production.
