"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { popularDestinations } from "@/data/homepage";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";

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
      className="container-page pt-2 pb-12 sm:pt-3 sm:pb-16 lg:pb-[88px]"
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
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <Badge
                    tone="sky"
                    className="absolute right-3 top-3 shadow-soft"
                  >
                    هتل
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-[18px] font-bold text-moscowa-text">
                    {destination.city}
                  </h3>
                  <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                    {destination.origin}
                  </p>
                  <Price
                    amount={destination.priceFrom}
                    prefix="هر شب از"
                    className="mt-3"
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
