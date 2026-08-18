import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface CountRow {
  city_slug: string | null;
  count: number;
}

interface D1ResultLike<T> {
  results: T[];
}

interface D1PreparedStatementLike {
  all<T = unknown>(): Promise<D1ResultLike<T>>;
}

interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatementLike;
}

interface OstrovokEnv {
  OSTROVOK_DB?: D1DatabaseLike;
}

/**
 * Live hotel count per city_slug, straight from the same D1 table
 * HotelResultsLive reads from — used by HotelDestinationCombobox so the
 * "N هتل" badge next to each city reflects real inventory instead of the
 * curated hotelDirectory sample list.
 */
export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as OstrovokEnv).OSTROVOK_DB;
    if (!db) {
      return NextResponse.json({ configured: false, counts: {} });
    }

    const { results } = await db
      .prepare("SELECT city_slug, COUNT(*) as count FROM hotels GROUP BY city_slug")
      .all<CountRow>();

    const counts: Record<string, number> = {};
    for (const row of results) {
      if (row.city_slug) counts[row.city_slug] = Number(row.count) || 0;
    }

    return NextResponse.json({ configured: true, counts });
  } catch {
    return NextResponse.json({ configured: false, counts: {} });
  }
}
