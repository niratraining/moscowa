/**
 * Minimal type definitions for the ETG / Worldota B2B v3 API endpoints this
 * project uses. These are intentionally narrow (only the fields we read) —
 * the full schema is documented at https://docs.emergingtravel.com once the
 * partner account has portal access. Extend as new fields are needed.
 */

export interface Guest {
  adults: number;
  children: number[];
}

export interface SearchParamsInput {
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  residency: string; // ISO 3166-1 alpha-2, lowercase
  currency: string; // ISO 4217
  guests: Guest[];
  language?: string;
}

export interface MulticompleteRegion {
  id: number;
  name: string;
  type: string;
  country_code: string;
}

export interface MulticompleteHotel {
  id: string;
  hid: number;
  name: string;
  region_id: number;
}

export interface MulticompleteResponse {
  data: {
    hotels: MulticompleteHotel[];
    regions: MulticompleteRegion[];
  };
  status: "ok" | "error";
  error: string | null;
}

export interface CancellationPolicy {
  start_at: string | null;
  end_at: string | null;
  amount_show: string;
}

export interface PaymentType {
  amount: string;
  show_amount: string;
  currency_code: string;
  show_currency_code: string;
  type: string;
  cancellation_penalties?: {
    policies: CancellationPolicy[];
    free_cancellation_before: string | null;
  };
}

export interface SerpRate {
  match_hash: string;
  daily_prices: string[];
  meal: string;
  meal_data?: { has_breakfast: boolean };
  room_name: string;
  payment_options: { payment_types: PaymentType[] };
}

export interface SerpHotel {
  id: string; // legacy slug id
  hid: number; // numeric hotel id
  rates: SerpRate[];
}

export interface SerpResponse {
  data: { hotels: SerpHotel[]; total_hotels: number } | null;
  status: "ok" | "error";
  error: string | null;
}

export interface HotelImage {
  url: string; // contains a "{size}" placeholder, e.g. https://cdn.worldota.net/t/{size}/content/...
  category_slug?: string;
}

export interface HotelInfo {
  id: string;
  hid: number;
  name: string;
  kind: string; // "Hotel", "Apartment", "Hostel", ...
  star_rating?: number;
  latitude?: number;
  longitude?: number;
  address?: string;
  region?: { id: number; name: string; country_code?: string };
  images_ext?: HotelImage[];
}

export interface HotelInfoResponse {
  data: HotelInfo | null;
  status: "ok" | "error";
  error: string | null;
}
