"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Building2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { popularDestinations } from "@/data/homepage";
import { todayJdn, jdnToJalali, formatJalaliString } from "@/lib/jalali";

const faDigits = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(value);

/** destination.id (popularDestinations) -> city_slug used by the D1 pipeline. */
const CITY_SLUG_BY_ID: Record<string, string> = {
  moscow: "moscow",
  "saint-petersburg": "st._petersburg",
};

function jdnToValueString(jdn: number): string {
  const { jy, jm, jd } = jdnToJalali(jdn);
  return formatJalaliString(jy, jm, jd);
}

export function PopularDestinations() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [liveCounts, setLiveCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/hotels/counts")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json?.counts) setLiveCounts(json.counts);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function scrollByCard(direction: "next" | "prev") {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = 280;
    node.scrollBy({
      left: direction === "next" ? -amount : amount,
      behavior: "smooth",
    });
  }

  // امروز تا ۳ شب بعد، برای اینکه با کلیک روی هر شهر مستقیم نتایج هتلِ همون بازه‌ی تاریخ باز شود.
  const checkIn = jdnToValueString(todayJdn());
  const checkOut = jdnToValueString(todayJdn() + 3);

  return (
    <section
      className="container-page pt-8 pb-4 sm:pt-10 sm:pb-5 lg:pt-12 lg:pb-6"
      aria-label="هتل‌های محبوب روسیه"
    >

      <div className="relative">
        <button
          type="button"
          aria-label="مقاصد بعدی"
          onClick={() => scrollByCard("next")}
          className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-moscowa-border bg-white/95 text-moscowa-purple shadow-soft backdrop-blur transition hover:-translate-y-[calc(50%+2px)] hover:border-moscowa-purple/30 md:inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="مقاصد قبلی"
          onClick={() => scrollByCard("prev")}
          className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-moscowa-border bg-white/95 text-moscowa-purple shadow-soft backdrop-blur transition hover:-translate-y-[calc(50%+2px)] hover:border-moscowa-purple/30 md:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {popularDestinations.map((destination) => {
            const slug = CITY_SLUG_BY_ID[destination.id];
            const hotelCount =
              (slug && liveCounts[slug]) || destination.hotelCount;

            return (
              <Link
                key={destination.id}
                href={`${destination.href}&checkIn=${checkIn}&checkOut=${checkOut}`}
                className="group w-[250px] shrink-0 focus-visible:outline-none sm:w-[280px]"
              >
                <article className="overflow-hidden rounded-[18px] border border-moscowa-border bg-white transition-all duration-300 hover:-translate-y-[4px] hover:shadow-card group-focus-visible:ring-2 group-focus-visible:ring-moscowa-purple/35">
                  {/* عکس شهر موقتاً حذف شده — بعد از آپلود عکس‌های درست برمی‌گردد. */}
                  <div className="flex aspect-[16/10] items-center justify-center bg-moscowa-purple/5">
                    <MapPin className="h-9 w-9 text-moscowa-purple/30" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <h3 className="text-[17px] font-bold text-moscowa-text">
                      {destination.city}
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-1 text-moscowa-text-secondary">
                      <Building2 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                      <span className="text-[12.5px] font-semibold leading-none">
                        {faDigits(hotelCount)} هتل
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
