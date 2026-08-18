import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface SearchBody {
  destination?: string; // free text, e.g. "مسکو" or "Moscow"
  regionId?: number; // kept for API-shape compatibility, unused with D1
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  adults?: number;
  children?: number[];
}

interface HotelRow {
  ota_hotel_id: string;
  name: string;
  name_en: string | null;
  city: string | null;
  city_slug: string | null;
  image_url: string | null;
  min_price: number | null;
  currency: string | null;
  available_rooms_percent: number | null;
}

interface D1ResultLike<T> {
  results: T[];
}

interface D1PreparedStatementLike {
  bind(...values: unknown[]): D1PreparedStatementLike;
  all<T = unknown>(): Promise<D1ResultLike<T>>;
}

interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatementLike;
}

interface OstrovokEnv {
  OSTROVOK_DB?: D1DatabaseLike;
}

/**
 * Free-text destination -> city_slug used by the data pipeline (see
 * moscowa-data-pipeline/ostrovok_hotels.py CITIES). Extend this list any
 * time a new city is added to the pipeline.
 */
function resolveCitySlug(destination: string): string | null {
  const q = destination.trim().toLowerCase();
  if (!q) return "moscow";
  if (q.includes("مسکو") || q.includes("moscow") || q.includes("mow")) return "moscow";
  if (
    q.includes("پترزبورگ") ||
    q.includes("پترزبوگ") ||
    q.includes("petersburg") ||
    q.includes("spb") ||
    q.includes("ledovyi")
  ) {
    return "st._petersburg";
  }
  return null;
}

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function POST(req: NextRequest) {
  let body: SearchBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const checkin = body.checkin || todayPlus(14);
  const checkout = body.checkout || todayPlus(17);
  const citySlug = resolveCitySlug(body.destination || "Moscow");

  if (!citySlug) {
    return NextResponse.json({
      configured: true,
      source: "d1",
      hotels: [],
      message: "این مقصد هنوز توسط پایپلاین داده پوشش داده نمی‌شود.",
    });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as OstrovokEnv).OSTROVOK_DB;

    if (!db) {
      // D1 binding missing (e.g. local `next dev` without wrangler) -> let the
      // client fall back to the demo grid instead of a hard error.
      return NextResponse.json({ configured: false, source: "demo", hotels: [] });
    }

    const { results } = await db
      .prepare(
        `SELECT h.ota_hotel_id, h.name, h.name_en, h.city, h.city_slug, h.image_url,
                s.min_price, s.currency, s.available_rooms_percent
         FROM hotels h
         LEFT JOIN hotel_stats s ON s.ota_hotel_id = h.ota_hotel_id
         WHERE h.city_slug = ?
         ORDER BY s.min_price ASC`,
      )
      .bind(citySlug)
      .all<HotelRow>();

    const hotels = results
      .filter((r) => r.min_price != null)
      .map((r) => ({
        id: r.ota_hotel_id,
        hid: Number(r.ota_hotel_id) || 0,
        name: r.name_en || r.name,
        city: r.city || "",
        stars: 0,
        board: "فقط اقامت",
        priceFrom: r.min_price ?? 0,
        // Respect whatever currency the pipeline actually stored the price
        // in (e.g. RUB) instead of always labelling it USD — that mislabel
        // was making prices look wrong (a RUB amount shown with a $ sign).
        currency: r.currency || "USD",
        image: r.image_url || "",
        tags:
          r.available_rooms_percent != null
            ? [`${Math.round(r.available_rooms_percent)}٪ موجودی`]
            : [],
      }));

    return NextResponse.json({
      configured: true,
      source: "d1",
      region: { id: 0, name: body.destination || "روسیه" },
      checkin,
      checkout,
      hotels,
    });
  } catch (err) {
    return NextResponse.json(
      { configured: true, source: "d1", error: "unexpected_error", hotels: [], detail: String(err) },
      { status: 500 },
    );
  }
}
