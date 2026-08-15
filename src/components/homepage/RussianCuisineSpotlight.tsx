"use client";

import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { russianDishes } from "@/data/homepage";
import { Badge } from "@/components/ui/Badge";

/**
 * Trip.com "Things to do" card-row pattern: the intro card stays pinned to
 * the start edge (right, in RTL) via `sticky`, while the topic cards behind
 * it scroll horizontally underneath.
 */
export function RussianCuisineSpotlight() {
  return (
    <section
      className="container-page pt-4 pb-8 sm:pt-5 sm:pb-10"
      aria-label="غذاهای روسی مسکو و سن پترزبورگ"
    >
      <div
        className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Sticky intro card */}
        <Link
          href="/guide/russian-food"
          className="group sticky right-0 z-10 flex h-[300px] w-[190px] shrink-0 flex-col justify-between overflow-hidden rounded-[18px] bg-[linear-gradient(160deg,#2b1a45_0%,#4f2f7c_55%,#7a3f8f_100%)] p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moscowa-purple/40 sm:h-[320px] sm:w-[210px]"
        >
          <div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              <UtensilsCrossed className="h-4 w-4 text-white" strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="mt-3 text-[18px] font-bold leading-6 text-white">چی بخوریم؟</h2>
            <p className="mt-2 text-[12.5px] leading-5 text-white/75">
              در مسکو و سن پترزبورگ دنبال غذای محلی می‌گردید؟ با معروف‌ترین
              طعم‌های آشپزخانه روسیه آشنا شوید.
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-moscowa-purple transition-colors group-hover:bg-white/90">
            مشاهده بیشتر
          </span>
        </Link>

        {/* Scrolling dish cards */}
        {russianDishes.map((dish) => (
          <article
            key={dish.id}
            className="w-[190px] shrink-0 overflow-hidden rounded-[18px] border border-moscowa-border bg-white transition-shadow duration-200 hover:shadow-card sm:w-[210px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                loading="lazy"
                className="object-cover"
                sizes="210px"
              />
              <Badge tone="neutral" className="absolute right-2.5 top-2.5 shadow-soft">
                {dish.city}
              </Badge>
            </div>
            <div className="p-3.5">
              <p className="text-[11px] font-semibold text-moscowa-orange">{dish.category}</p>
              <h3 className="mt-1 text-[15px] font-bold leading-6 text-moscowa-text">
                {dish.name}
              </h3>
              <p dir="ltr" className="mt-0.5 text-[11.5px] text-moscowa-text-muted">
                {dish.nameRu}
              </p>
              <p className="mt-1.5 line-clamp-2 text-[12px] leading-5 text-moscowa-text-secondary">
                {dish.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
