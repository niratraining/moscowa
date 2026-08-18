"use client";

import { useEffect, useState } from "react";
import { InfiniteResultsList } from "@/components/ui/InfiniteResultsList";
import { ResultsShell } from "@/components/demo/ResultsShell";
import { HotelResultsDemo } from "@/components/demo/HotelResultsDemo";
import { HotelResultCard } from "@/components/hotels/HotelResultCard";
import { todayJdn, jdnToGregorian, jdnFromValueString } from "@/lib/jalali";

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

interface HotelResultsLiveProps {
  /** Destination text from the homepage/results search bar, e.g. "مسکو". */
  initialDestination?: string;
  /** Jalali "YYYY/MM/DD" strings, same format the search form stores (e.g. "۱۴۰۵/۰۶/۱۰"). */
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

/**
 * The search fields themselves live in <ResultsSearchBar> above this
 * component (opened via "ویرایش جستجو") — this component only renders
 * the results for whatever destination/dates/guests are currently active,
 * and re-fetches whenever those props change.
 */
export function HotelResultsLive({
  initialDestination,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: HotelResultsLiveProps = {}) {
  const destination = initialDestination || "Moscow";
  const checkInJdn = (initialCheckIn && jdnFromValueString(initialCheckIn)) || todayJdn();
  const checkOutJdn = (initialCheckOut && jdnFromValueString(initialCheckOut)) || todayJdn() + 3;
  const adults = initialGuests && initialGuests > 0 ? initialGuests : 2;

  const [hotels, setHotels] = useState<LiveHotel[] | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function runSearch() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/hotels/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination,
            checkin: isoFromJdn(checkInJdn),
            checkout: isoFromJdn(checkOutJdn),
            adults,
          }),
        });
        const json = await res.json();
        if (cancelled) return;
        setConfigured(Boolean(json.configured));
        if (json.configured) {
          setHotels(json.hotels ?? []);
          if (json.message) setError(json.message);
        } else {
          setHotels(null); // signal: render the demo grid instead
        }
      } catch {
        if (cancelled) return;
        setConfigured(false);
        setHotels(null);
        setError("خطا در ارتباط با سرویس جستجو.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    runSearch();
    return () => {
      cancelled = true;
    };
  }, [destination, checkInJdn, checkOutJdn, adults]);

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
    <ResultsShell
      resultCount={hotels?.length ?? 0}
      hideResultCount
      sortOptions={[
        { id: "recommended", label: "پیشنهادی" },
        { id: "price", label: "ارزان‌ترین" },
      ]}
      filterGroups={[]}
    >
      {loading && (
        <p className="rounded-xl bg-moscowa-bg-secondary p-3 text-[13px] text-moscowa-text-secondary">
          در حال جستجوی هتل‌ها…
        </p>
      )}
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
  );
}
