import { getHotelInfo, multicomplete, searchByRegion } from "./client";
import { getOstrovokConfig } from "./config";
import type { HotelInfo, SearchParamsInput, SerpHotel } from "./types";

const RUSSIA = "RU";

/** Business rules for which supplier hotels are allowed on the site. Tune freely. */
export const displayFilters = {
  /** Only keep hotel kinds we're happy to sell. Empty array = allow every kind. */
  allowedKinds: [] as string[], // e.g. ["Hotel", "Apart-hotel"] to hide hostels/apartments
  /** Drop anything below this star rating (0 = keep unrated too). */
  minStarRating: 0,
  /** A hotel must have at least one photo to be shown. */
  requireImage: true,
  /** Never return more than this many cards per search, however many the API found. */
  maxResults: undefined as number | undefined, // falls back to OSTROVOK_MAX_RESULTS
};

export interface NormalizedHotel {
  id: string; // "<hid>" — used for routing, e.g. /hotels/[id]
  hid: number;
  name: string;
  city: string;
  stars: number;
  board: string;
  priceFrom: number;
  currency: string;
  image: string;
  tags: string[];
}

function pickImage(info: HotelInfo | null): string | null {
  const first = info?.images_ext?.[0]?.url;
  if (!first) return null;
  // The CDN URL contains a "{size}" placeholder, e.g. .../{size}/content/....
  return first.replace("{size}", "x500");
}

function cheapestNightly(hotel: SerpHotel): number | null {
  let min: number | null = null;
  for (const rate of hotel.rates) {
    const nights = rate.daily_prices.map(Number).filter((n) => !Number.isNaN(n));
    if (!nights.length) continue;
    const total = nights.reduce((a, b) => a + b, 0);
    if (min === null || total < min) min = total;
  }
  return min;
}

function boardLabel(hotel: SerpHotel): string {
  return hotel.rates.some((r) => r.meal_data?.has_breakfast)
    ? "با صبحانه"
    : "فقط اقامت";
}

/**
 * Resolves a free-text destination (e.g. "مسکو", "Moscow", "Kazan") to an
 * Ostrovok region_id, restricted to Russia. Returns null if nothing in
 * Russia matches the query, so callers can fall back or show "not found".
 */
export async function resolveRussianRegion(
  query: string,
): Promise<{ id: number; name: string } | null> {
  const res = await multicomplete(query);
  const ruRegions = res.data.regions.filter((r) => r.country_code === RUSSIA);
  if (!ruRegions.length) return null;

  const q = query.trim().toLowerCase();
  const exact = ruRegions.find((r) => r.name.toLowerCase() === q);
  const starts = ruRegions.find((r) => r.name.toLowerCase().startsWith(q));
  const best = exact ?? starts ?? ruRegions[0];
  return { id: best.id, name: best.name };
}

/** Small concurrency-limited map, so we don't fire 50 parallel hotel/info calls. */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export interface SearchAndNormalizeArgs {
  regionId: number;
  regionName: string;
  checkin: string;
  checkout: string;
  adults: number;
  children?: number[];
}

/**
 * Runs the SERP search by region, then enriches the cheapest N results with
 * static content (name/stars/photo) and returns clean, site-shaped hotels.
 * Hotels without a usable photo/name, or that fail the display filters, are
 * silently dropped — this is the "don't show every raw hotel" normalization
 * step requested for the site.
 */
export async function searchAndNormalizeHotels(
  args: SearchAndNormalizeArgs,
): Promise<{ regionName: string; hotels: NormalizedHotel[] }> {
  const config = getOstrovokConfig();
  const maxResults = displayFilters.maxResults ?? config.maxResults;

  const params: SearchParamsInput = {
    checkin: args.checkin,
    checkout: args.checkout,
    residency: config.residency,
    currency: config.currency,
    guests: [{ adults: args.adults, children: args.children ?? [] }],
  };

  const serp = await searchByRegion(args.regionId, params);
  const hotels = serp.data?.hotels ?? [];

  // Rank by cheapest price first, then only enrich the top slice with a
  // static-content lookup — enriching every hotel in a large region would be
  // dozens/hundreds of extra API calls per search.
  const ranked = hotels
    .map((h) => ({ hotel: h, price: cheapestNightly(h) }))
    .filter((h): h is { hotel: SerpHotel; price: number } => h.price !== null)
    .sort((a, b) => a.price - b.price)
    .slice(0, Math.max(maxResults * 2, maxResults)); // buffer, some will be filtered out below

  const enriched = await mapWithConcurrency(ranked, 6, async ({ hotel, price }) => {
    const info = await getHotelInfo(hotel.hid).catch(() => null);
    return { hotel, price, info: info?.data ?? null };
  });

  const normalized: NormalizedHotel[] = [];
  for (const { hotel, price, info } of enriched) {
    if (normalized.length >= maxResults) break;
    if (!info) continue;
    if (displayFilters.requireImage) {
      const image = pickImage(info);
      if (!image) continue;
    }
    if (
      displayFilters.allowedKinds.length &&
      !displayFilters.allowedKinds.includes(info.kind)
    ) {
      continue;
    }
    if ((info.star_rating ?? 0) < displayFilters.minStarRating) continue;

    normalized.push({
      id: String(hotel.hid),
      hid: hotel.hid,
      name: info.name,
      city: info.region?.name ?? args.regionName,
      stars: info.star_rating ?? 0,
      board: boardLabel(hotel),
      priceFrom: Math.round(price),
      currency: config.currency,
      image: pickImage(info) ?? "",
      tags: [info.kind].filter(Boolean),
    });
  }

  return { regionName: args.regionName, hotels: normalized };
}
