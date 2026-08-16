"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InfiniteResultsList } from "@/components/ui/InfiniteResultsList";
import { ResultsShell } from "@/components/demo/ResultsShell";
import { HotelResultsDemo } from "@/components/demo/HotelResultsDemo";
import { HotelResultCard } from "@/components/hotels/HotelResultCard";
import { todayJdn, jdnToGregorian, formatFullLabel } from "@/lib/jalali";

interface RegionSuggestion {
  id: number;
  name: string;
  type: string;
}

interface LiveHotel {
  id: string;
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

function isoFromJdn(jdn: number) {
  const { gy, gm, gd } = jdnToGregorian(jdn);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${gy}-${pad(gm)}-${pad(gd)}`;
}

function priceLabel(amount: number, currency: string) {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : `${currency} `;
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export function HotelResultsLive() {
  const [query, setQuery] = useState("Moscow");
  const [suggestions, setSuggestions] = useState<RegionSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [region, setRegion] = useState<{ id?: number; name: string }>({
    name: "Moscow",
  });

  const checkInJdn = todayJdn() + 14;
  const checkOutJdn = todayJdn() + 17;
  const [adults, setAdults] = useState(2);

  const [hotels, setHotels] = useState<LiveHotel[] | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function runSearch(overrides?: { regionId?: number; destination?: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hotels/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regionId: overrides?.regionId ?? region.id,
          destination: overrides?.destination ?? region.name,
          checkin: isoFromJdn(checkInJdn),
          checkout: isoFromJdn(checkOutJdn),
          adults,
        }),
      });
      const json = await res.json();
      setConfigured(Boolean(json.configured));
      if (json.configured) {
        setHotels(json.hotels ?? []);
        if (json.message) setError(json.message);
      } else {
        setHotels(null); // signal: render the demo grid instead
      }
    } catch {
      setConfigured(false);
      setHotels(null);
      setError("خطا در ارتباط با سرویس جستجو.");
    } finally {
      setLoading(false);
    }
  }

  // Initial load.
  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/hotels/suggest?q=${encodeURIComponent(value)}`);
        const json = await res.json();
        setSuggestions(json.regions ?? []);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }

  function selectSuggestion(s: RegionSuggestion) {
    setQuery(s.name);
    setRegion({ id: s.id, name: s.name });
    setShowSuggestions(false);
    runSearch({ regionId: s.id, destination: s.name });
  }

  const dateRangeLabel = useMemo(
    () => `${formatFullLabel(checkInJdn)} تا ${formatFullLabel(checkOutJdn)}`,
    [checkInJdn, checkOutJdn],
  );

  // Not configured yet → keep the site fully working with the existing demo grid.
  if (configured === false) {
    return (
      <div>
        <div className="container-page !pb-0">
          <div className="mb-4 rounded-2xl border border-dashed border-moscowa-purple/30 bg-moscowa-purple/5 p-4 text-[13px] text-moscowa-text-secondary">
            هنوز کلید API از Ostrovok/RateHawk دریافت نشده — به‌محض تنظیم{" "}
            <code dir="ltr" className="rounded bg-white px-1.5 py-0.5">
              OSTROVOK_KEY_ID
            </code>{" "}
            و{" "}
            <code dir="ltr" className="rounded bg-white px-1.5 py-0.5">
              OSTROVOK_API_KEY
            </code>
            ، این بخش خودکار به نتایج زنده هتل‌های روسیه متصل می‌شود.
          </div>
        </div>
        <HotelResultsDemo />
      </div>
    );
  }

  return (
    <div>
      <div className="container-page !pb-0">
        <div className="mb-6 rounded-2xl border border-moscowa-border bg-white p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <div className="flex items-center gap-2 rounded-xl border border-moscowa-border px-3 py-2.5">
                <Search className="h-4 w-4 shrink-0 text-moscowa-text-muted" />
                <input
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  onFocus={() => suggestions.length && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder="شهر مقصد در روسیه… مثلاً مسکو، سن‌پترزبورگ"
                  className="w-full bg-transparent text-[14px] text-moscowa-text outline-none placeholder:text-moscowa-text-muted"
                />
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-moscowa-border bg-white shadow-card">
                  {suggestions.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onMouseDown={() => selectSuggestion(s)}
                        className="flex w-full items-center gap-2 px-3 py-2.5 text-right text-[13px] text-moscowa-text hover:bg-moscowa-bg-secondary"
                      >
                        <MapPin className="h-3.5 w-3.5 text-moscowa-purple" />
                        {s.name}
                        <span className="text-moscowa-text-muted">· {s.type}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-moscowa-border px-3 py-2.5 text-[13px] text-moscowa-text-secondary">
              {dateRangeLabel} · ۳ شب
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-moscowa-border px-3 py-2.5">
              <button
                type="button"
                onClick={() => setAdults((n) => Math.max(1, n - 1))}
                className="rounded-lg bg-moscowa-bg-secondary px-2 py-1 text-[12px]"
              >
                −
              </button>
              <span className="text-[13px] text-moscowa-text">{adults} مهمان</span>
              <button
                type="button"
                onClick={() => setAdults((n) => Math.min(6, n + 1))}
                className="rounded-lg bg-moscowa-bg-secondary px-2 py-1 text-[12px]"
              >
                +
              </button>
            </div>

            <Button
              onClick={() => runSearch()}
              size="sm"
              disabled={loading}
              className="shrink-0"
            >
              {loading ? "در حال جستجو…" : "جستجو"}
            </Button>
          </div>
        </div>
      </div>

      <ResultsShell
        title={`هتل‌های ${region.name}`}
        resultCount={hotels?.length ?? 0}
        eyebrow="داده زنده · Ostrovok / RateHawk"
        sortOptions={[
          { id: "recommended", label: "پیشنهادی" },
          { id: "price", label: "ارزان‌ترین" },
        ]}
        filterGroups={[]}
      >
        {error && (
          <p className="rounded-xl bg-moscowa-bg-secondary p-3 text-[13px] text-moscowa-text-secondary">
            {error}
          </p>
        )}
        {!loading && hotels && hotels.length === 0 && !error && (
          <p className="rounded-xl bg-moscowa-bg-secondary p-3 text-[13px] text-moscowa-text-secondary">
            نتیجه‌ای برای این مقصد و تاریخ پیدا نشد.
          </p>
        )}
        <InfiniteResultsList
          className="flex flex-col gap-4"
          items={(hotels ?? []).map((hotel) => ({
            key: hotel.id,
            node: (
              <HotelResultCard
                href={`/hotels/${hotel.id}`}
                name={hotel.name}
                city={hotel.city}
                stars={hotel.stars}
                board={hotel.board}
                tags={hotel.tags}
                image={hotel.image}
                imageUnoptimized
                priceLabel={priceLabel(hotel.priceFrom, hotel.currency)}
              />
            ),
          }))}
        />
      </ResultsShell>
    </div>
  );
}
