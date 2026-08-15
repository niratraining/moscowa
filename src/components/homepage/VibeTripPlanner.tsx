"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Church, Landmark, MapPin, Waves } from "lucide-react";
import { tripVibes, vibePlaces } from "@/data/homepage";
import { cn } from "@/lib/utils";

const vibeIcons = {
  landmark: Landmark,
  church: Church,
  waves: Waves,
};

export function VibeTripPlanner() {
  const [activeVibe, setActiveVibe] = useState(tripVibes[0].id);
  const currentVibe = tripVibes.find((vibe) => vibe.id === activeVibe) ?? tripVibes[0];
  const VibeIcon = vibeIcons[currentVibe.icon];
  const places = vibePlaces.filter((place) => place.vibeId === activeVibe);

  return (
    <section
      className="container-page pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12"
      aria-label="برنامه‌ریز سفر بر اساس حس‌وحال"
    >
      <div className="overflow-hidden rounded-3xl border border-moscowa-border bg-white">
        <div className="p-5 sm:p-7">
          <h2 className="text-[19px] font-bold text-moscowa-text sm:text-[23px]">
            سفرت رو بر اساس حس‌وحالش انتخاب کن
          </h2>
          <p className="mt-1.5 max-w-lg text-[13px] leading-6 text-moscowa-text-secondary">
            یک حال‌وهوا انتخاب کن، بناهای معروف مسکو و سن‌پترزبورگ رو ببین و با
            یک کلیک هتل‌های همون نزدیکی رو پیدا کن.
          </p>

          <div
            role="tablist"
            className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tripVibes.map((vibe) => {
              const Icon = vibeIcons[vibe.icon];
              const active = vibe.id === activeVibe;
              return (
                <button
                  key={vibe.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveVibe(vibe.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors duration-200 sm:text-[13px]",
                    active
                      ? "border-moscowa-purple bg-moscowa-purple text-white shadow-soft"
                      : "border-moscowa-border bg-white text-moscowa-text-secondary hover:border-moscowa-purple/30 hover:text-moscowa-purple",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.85} />
                  {vibe.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-moscowa-border" />

        <div className="flex gap-3 overflow-x-auto scroll-smooth p-5 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:p-7 sm:pt-5 [&::-webkit-scrollbar]:hidden">
          {places.map((place) => (
            <Link
              key={place.id}
              href={place.href}
              className="group w-[190px] shrink-0 overflow-hidden rounded-2xl border border-moscowa-border bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moscowa-purple/35 sm:w-[220px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {place.image ? (
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width:640px) 190px, 220px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-moscowa-purple via-moscowa-purple-soft to-moscowa-purple-dark transition-transform duration-700 group-hover:scale-[1.06]">
                    <VibeIcon className="h-8 w-8 text-white/75" strokeWidth={1.4} />
                  </div>
                )}
                <span className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[10.5px] font-semibold text-moscowa-text shadow-soft backdrop-blur">
                  {place.cityLabel}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 p-3.5">
                <h3 className="truncate text-[13.5px] font-bold text-moscowa-text">
                  {place.name}
                </h3>

                <p className="flex items-center gap-1 text-[11.5px] text-moscowa-text-secondary">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-moscowa-text-muted" strokeWidth={1.85} />
                  <span className="truncate">{place.area}</span>
                </p>

                <p className="flex items-center gap-1 text-[11px] font-medium text-moscowa-green">
                  <span className="truncate">{place.proximity}</span>
                  <ArrowLeft
                    className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
                    strokeWidth={2.25}
                  />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
