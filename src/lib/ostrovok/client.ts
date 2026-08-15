import { getOstrovokConfig } from "./config";
import type {
  HotelInfoResponse,
  MulticompleteResponse,
  SearchParamsInput,
  SerpResponse,
} from "./types";

export class OstrovokNotConfiguredError extends Error {
  constructor() {
    super("OSTROVOK_KEY_ID / OSTROVOK_API_KEY are not set yet.");
    this.name = "OstrovokNotConfiguredError";
  }
}

export class OstrovokApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public payload?: unknown,
  ) {
    super(message);
    this.name = "OstrovokApiError";
  }
}

/**
 * POSTs a JSON body to the ETG B2B API using HTTP Basic auth
 * (Authorization: Basic base64(KEY_ID:API_KEY)), per the official docs:
 * https://docs.emergingtravel.com/docs/b2b-api/hotel-search/
 */
async function ostrovokPost<T>(path: string, body: unknown): Promise<T> {
  const config = getOstrovokConfig();
  if (!config.configured) {
    throw new OstrovokNotConfiguredError();
  }

  const credentials = btoa(`${config.keyId}:${config.apiKey}`);

  const res = await fetch(`${config.baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json || json.status === "error") {
    throw new OstrovokApiError(
      json?.error || `Ostrovok API request failed (${res.status})`,
      res.status,
      json,
    );
  }

  return json as T;
}

/** Autocomplete a region or hotel name. Returns up to 5 hotels + 5 regions. */
export function multicomplete(query: string) {
  return ostrovokPost<MulticompleteResponse>("/search/multicomplete/", {
    query,
    language: "en",
  });
}

/** SERP search: all hotels' cheapest rates within a given region. */
export function searchByRegion(regionId: number, params: SearchParamsInput) {
  return ostrovokPost<SerpResponse>("/search/serp/region/", {
    region_id: regionId,
    language: "en",
    ...params,
  });
}

/** SERP search: rates for a specific set of hotels (max 300 ids). */
export function searchByHotelIds(hids: number[], params: SearchParamsInput) {
  return ostrovokPost<SerpResponse>("/search/serp/hotels/", {
    hids,
    language: "en",
    ...params,
  });
}

/** Full rate list + live availability for one hotel (the hotel page step). */
export function retrieveHotelPage(hid: number, params: SearchParamsInput) {
  return ostrovokPost<SerpResponse>("/search/hp/", {
    hid,
    timeout: 8,
    language: "en",
    ...params,
  });
}

/** Static content for one hotel: name, stars, photos, address, geo, kind. */
export function getHotelInfo(hid: number, language = "en") {
  return ostrovokPost<HotelInfoResponse>("/hotel/info/", {
    hid: String(hid),
    language,
  });
}
