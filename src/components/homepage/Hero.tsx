"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: "wing",
    src: "/images/hero/wing-sunset.jpg",
    alt: "بال هواپیما بالای ابرها در غروب",
    objectPosition: "object-[72%_45%] sm:object-[68%_42%]",
    ken: "motion-safe:animate-hero-ken",
    caption: "پرواز به افق‌های تازه",
  },
  {
    id: "jet",
    src: "/images/hero/jet-islands.jpg",
    alt: "هواپیما بر فراز جزایر استوایی در غروب",
    objectPosition: "object-[55%_40%]",
    ken: "motion-safe:animate-hero-ken-alt",
    caption: "مقصد بعدی، فقط یک جستجو فاصله دارد",
  },
  {
    id: "villa",
    src: "/images/hero/villa-terrace.jpg",
    alt: "تراس لوکس مشرف به دریا در غروب آفتاب",
    objectPosition: "object-[62%_48%] sm:object-[58%_45%]",
    ken: "motion-safe:animate-hero-ken-pan",
    caption: "اقامت‌هایی که خاطره می‌سازند",
  },
  {
    id: "hafez",
    src: "/images/hero/hafez-shiraz.jpg",
    alt: "آرامگاه حافظ در شیراز هنگام غروب",
    objectPosition: "object-[48%_42%]",
    ken: "motion-safe:animate-hero-ken",
    caption: "ایران را از نزدیک کشف کنید",
  },
  {
    id: "coast",
    src: "/images/mood/coastal-resort.jpg",
    alt: "ریزورت ساحلی لوکس در غروب",
    objectPosition: "object-[40%_45%] sm:object-[35%_42%]",
    ken: "motion-safe:animate-hero-ken-alt",
    caption: "از ساحل تا شهر؛ همه در یک پلتفرم",
  },
] as const;

const SLIDE_MS = 6500;

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative isolate h-[520px] overflow-hidden sm:h-[580px] lg:h-[640px]"
      aria-label="معرفی مسکوا"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            index === active ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className={cn(
              "object-cover will-change-transform",
              slide.objectPosition,
              index === active && slide.ken,
            )}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Atmospheric overlays — photographic depth, not flat purple wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,140,40,0.18)_0%,transparent_45%),radial-gradient(ellipse_at_80%_20%,rgba(79,47,124,0.22)_0%,transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(20,14,28,0.22)_0%,rgba(32,22,48,0.38)_48%,rgba(18,12,28,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,28,0.35)_0%,rgba(18,12,28,0.08)_36%,rgba(18,12,28,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent" />

      {/* Soft light sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light motion-safe:animate-hero-sheen"
        aria-hidden
      />

      <div className="container-page relative z-10 flex h-full flex-col justify-between pb-28 pt-10 sm:pb-32 sm:pt-12 lg:pb-36 lg:pt-14">
        <div className="max-w-2xl">
          <p className="mb-4 text-[13px] font-semibold tracking-[0.18em] text-moscowa-orange motion-safe:animate-fade-up sm:text-[14px]">
            MOSCOWA
          </p>

          <h1 className="font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-[0_4px_28px_rgba(12,8,24,0.45)] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
            <span className="block text-[40px] sm:text-[56px] lg:text-[68px]">
              مسکوا
            </span>
            <span className="mt-2 block max-w-xl text-[22px] font-bold text-white/95 sm:mt-3 sm:text-[30px] lg:text-[34px]">
              سفر را هوشمندانه تجربه کنید
            </span>
          </h1>

          <p className="mt-4 max-w-md text-[15px] leading-8 text-white/90 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:mt-5 sm:text-[17px]">
            پرواز، هتل و تور — با تصاویر زنده مقصد و جستجوی شفاف قیمت
          </p>

          <p
            key={slides[active].id}
            className="mt-6 inline-flex items-center gap-2 text-[13px] text-white/80 motion-safe:animate-fade-up sm:text-[14px]"
          >
            <span
              className="h-px w-8 bg-gradient-to-l from-moscowa-orange to-transparent"
              aria-hidden
            />
            {slides[active].caption}
          </p>
        </div>

        <div className="flex items-center gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
          <div className="flex gap-2" role="tablist" aria-label="اسلایدهای هیرو">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`اسلاید ${index + 1}: ${slide.caption}`}
                onClick={() => setActive(index)}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-500",
                  index === active
                    ? "w-10 bg-white/35"
                    : "w-1.5 bg-white/45 hover:bg-white/70",
                )}
              >
                {index === active && !paused ? (
                  <span
                    className="absolute inset-y-0 right-0 w-full origin-right rounded-full bg-moscowa-orange motion-safe:animate-hero-progress"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                ) : null}
                {index === active && paused ? (
                  <span className="absolute inset-0 rounded-full bg-moscowa-orange" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
