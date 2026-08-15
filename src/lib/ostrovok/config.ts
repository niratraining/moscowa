/**
 * Ostrovok B2B / RateHawk (ETG · Worldota) API configuration.
 *
 * The partner account shown in the app screenshots (B2B-100401044 / AFF-395441)
 * confirms this project already has an Ostrovok B2B + affiliate relationship —
 * once the API key is issued from the partner cabinet, drop it into the two
 * secrets below and search/display goes live immediately. Nothing else in the
 * codebase needs to change.
 *
 * Where to set these values:
 * - Local dev (`next dev`):        .env.local  (copy from .env.local.example)
 * - Cloudflare Workers production: `wrangler secret put OSTROVOK_KEY_ID`
 *                                  `wrangler secret put OSTROVOK_API_KEY`
 *                                  (non-secret values can stay as "vars" in wrangler.jsonc)
 */

export type OstrovokEnv = "sandbox" | "production";

export interface OstrovokConfig {
  configured: boolean;
  env: OstrovokEnv;
  baseUrl: string;
  keyId: string;
  apiKey: string;
  /** ISO 3166-1 alpha-2 traveller residency sent on every search request. */
  residency: string;
  /** ISO 4217 currency requested from the API. */
  currency: string;
  /** Hard cap on how many hotels we enrich + return per search. */
  maxResults: number;
}

const SANDBOX_BASE_URL = "https://api-sandbox.worldota.net/api/b2b/v3";
const PRODUCTION_BASE_URL = "https://api.worldota.net/api/b2b/v3";

export function getOstrovokConfig(): OstrovokConfig {
  const keyId = process.env.OSTROVOK_KEY_ID?.trim() ?? "";
  const apiKey = process.env.OSTROVOK_API_KEY?.trim() ?? "";
  const env: OstrovokEnv =
    process.env.OSTROVOK_ENV === "production" ? "production" : "sandbox";

  return {
    configured: Boolean(keyId && apiKey),
    env,
    baseUrl: env === "production" ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL,
    keyId,
    apiKey,
    residency: (process.env.OSTROVOK_RESIDENCY || "ru").toLowerCase(),
    currency: (process.env.OSTROVOK_CURRENCY || "USD").toUpperCase(),
    maxResults: Number(process.env.OSTROVOK_MAX_RESULTS || 24),
  };
}
