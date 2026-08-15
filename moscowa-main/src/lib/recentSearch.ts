import { buildSearchUrl, type ServiceType, type TravelSearchState } from "@/components/search/types";
import { JALALI_MONTHS, parseJalaliString, toPersianDigits } from "@/lib/jalali";

const STORAGE_KEY = "moscowa:recent-search";

export interface RecentSearch {
  url: string;
  label: string;
  serviceType: ServiceType;
  savedAt: number;
}

function formatDateRange(start: string, end?: string): string {
  const startDate = parseJalaliString(start);
  if (!startDate) return "";

  const startLabel = `${toPersianDigits(startDate.jd)} ${JALALI_MONTHS[startDate.jm - 1]}`;
  if (!end || end === start) return startLabel;

  const endDate = parseJalaliString(end);
  if (!endDate) return startLabel;

  if (startDate.jy === endDate.jy && startDate.jm === endDate.jm) {
    return `${toPersianDigits(startDate.jd)}-${toPersianDigits(endDate.jd)} ${JALALI_MONTHS[startDate.jm - 1]}`;
  }
  return `${startLabel} تا ${toPersianDigits(endDate.jd)} ${JALALI_MONTHS[endDate.jm - 1]}`;
}

/** Called right before navigating to search results — persists a single "continue where you left off" entry. */
export function saveRecentSearch(state: TravelSearchState): void {
  if (typeof window === "undefined") return;
  const destinationName = state.destination?.name;
  if (!destinationName) return;

  const needsReturnDate =
    state.serviceType === "hotel" ||
    state.serviceType === "stay" ||
    (state.serviceType === "flight" && state.tripType === "roundtrip");

  const dateLabel = formatDateRange(
    state.departureDate,
    needsReturnDate ? state.returnDate : undefined,
  );

  const entry: RecentSearch = {
    url: buildSearchUrl(state),
    label: dateLabel ? `${destinationName}، ${dateLabel}` : destinationName,
    serviceType: state.serviceType,
    savedAt: Date.now(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage unavailable (private mode / quota) — non-critical, fail silently
  }
}

export function getRecentSearch(): RecentSearch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RecentSearch>;
    if (!parsed.url || !parsed.label) return null;
    return parsed as RecentSearch;
  } catch {
    return null;
  }
}

export function clearRecentSearch(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
