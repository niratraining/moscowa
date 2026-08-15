"use client";

import { useRef } from "react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Hotel,
  Plane,
  Smile,
  Timer,
} from "lucide-react";
import { trustMetrics } from "@/data/homepage";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

const icons = {
  experience: Timer,
  hotels: Hotel,
  airlines: Plane,
  price: Award,
  support: Headphones,
  customers: Smile,
};

export function WhyMoscowa() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: "next" | "prev") {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = 220;
    node.scrollBy({
      left: direction === "next" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="container-page pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12" aria-label="چرا مسکوا؟">
      <div className="relative">
        <button
          type="button"
          aria-label="بعدی"
          onClick={() => scrollByCard("next")}
          className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-moscowa-border bg-white/95 text-moscowa-purple shadow-soft backdrop-blur transition hover:-translate-y-[calc(50%+2px)] hover:border-moscowa-purple/30 md:inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="قبلی"
          onClick={() => scrollByCard("prev")}
          className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-moscowa-border bg-white/95 text-moscowa-purple shadow-soft backdrop-blur transition hover:-translate-y-[calc(50%+2px)] hover:border-moscowa-purple/30 md:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:px-12 lg:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {trustMetrics.map((metric) => {
            const Icon = icons[metric.icon];
            return (
              <Card
                key={metric.id}
                className="flex w-[160px] shrink-0 flex-col items-start gap-3 p-4 sm:w-[190px] sm:p-5"
              >
                <IconBox size="sm">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </IconBox>
                <div>
                  <p className="text-[18px] font-bold text-moscowa-purple sm:text-[20px]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-6 text-moscowa-text-secondary">
                    {metric.label}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
