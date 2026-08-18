import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface OstrovokDailyStats {
  date: string | null;
  hotelsCount: number;
  avgMinPrice: number | null;
  avgAvailabilityPercent: number | null;
}

interface StatsRow {
  date: string | null;
  hotels_count: number;
  avg_min_price: number | null;
  avg_availability: number | null;
}

interface D1PreparedStatementLike {
  first<T = unknown>(): Promise<T | null>;
}

interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatementLike;
}

interface OstrovokEnv {
  OSTROVOK_DB?: D1DatabaseLike;
}

export async function getOstrovokDailyStats(): Promise<OstrovokDailyStats | null> {
  const { env } = await getCloudflareContext({ async: true });
  const db = (env as unknown as OstrovokEnv).OSTROVOK_DB;

  if (!db) return null;

  const row = await db
    .prepare(
      `SELECT (SELECT MAX(date) FROM hotel_stats) AS date,
              COUNT(*) AS hotels_count,
              AVG(min_price) AS avg_min_price,
              AVG(available_rooms_percent) AS avg_availability
       FROM hotel_stats`,
    )
    .first<StatsRow>();

  if (!row || row.hotels_count === 0) return null;

  return {
    date: row.date,
    hotelsCount: row.hotels_count,
    avgMinPrice: row.avg_min_price,
    avgAvailabilityPercent: row.avg_availability,
  };
}
