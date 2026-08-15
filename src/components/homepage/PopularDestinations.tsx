"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { popularDestinations } from "@/data/homepage";
import { Badge } from "@/components/ui/Badge";

const faDigits = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(value);

export function PopularDestinations() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: "next" | "prev") {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = 280;
    node.scrollBy({
      left: direction === "next" ? -amount : amount,
      behavior: "smooth",
    });
  }

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
          {popularDestinations.map((destination) => (
            <Link
              key={destination.id}
              href={destination.href}
              className="group w-[250px] shrink-0 focus-visible:outline-none sm:w-[280px]"
            >
              <article className="overflow-hidden rounded-[18px] border border-moscowa-border bg-white transition-all duration-300 hover:-translate-y-[4px] hover:shadow-card group-focus-visible:ring-2 group-focus-visible:ring-moscowa-purple/35">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.city}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    sizes="280px"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <Badge
                    tone="sky"
                    className="absolute right-3 top-3 shadow-soft"
                  >
                    هتل
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-2 p-4">
                  <h3 className="text-[17px] font-bold text-moscowa-text">
                    {destination.city}
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1 text-moscowa-text-secondary">
                    <Building2 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                    <span className="text-[12.5px] font-semibold leading-none">
                      {faDigits(destination.hotelCount)} هتل
                    </span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
