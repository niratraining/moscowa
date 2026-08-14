"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: "moscow",
    src: "/images/hero/moscow-red-square.jpg",
    alt: "کلیسای جامع سنت باسیل در میدان سرخ مسکو",
    objectPosition: "object-[50%_38%] sm:object-[50%_35%]",
    ken: "motion-safe:animate-hero-ken",
  },
  {
    id: "embankment",
    src: "/images/hero/moscow-river-embankment.jpg",
    alt: "غروب آفتاب در کرانه رودخانه مسکو با کلیسا و ساختمان‌های تاریخی",
    objectPosition: "object-[50%_40%] sm:object-[50%_36%]",
    ken: "motion-safe:animate-hero-ken",
  },
  {
    id: "kul-sharif",
    src: "/images/hero/kul-sharif-mosque.jpg",
    alt: "مسجد قول شریف با مناره‌های سفید و گنبد فیروزه‌ای",
    objectPosition: "object-[50%_38%]",
    ken: "motion-safe:animate-hero-ken-alt",
  },
  {
    id: "historical-museum",
    src: "/images/hero/historical-museum-facade.jpg",
    alt: "نمای آجر قرمز موزه تاریخی نزدیک میدان سرخ",
    objectPosition: "object-[50%_45%]",
    ken: "motion-safe:animate-hero-ken-pan",
  },
  {
    id: "christ-saviour",
    src: "/images/hero/christ-saviour-cathedral.jpg",
    alt: "کلیسای جامع مسیح ناجی با گنبدهای طلایی در انتهای خیابان",
    objectPosition: "object-[45%_45%] sm:object-[40%_42%]",
    ken: "motion-safe:animate-hero-ken-alt",
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

          <h1 className="font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_28px_rgba(12,8,24,0.45)] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
            <span className="block text-[30px] sm:text-[42px] lg:text-[50px]">
              رزرو هتل در
            </span>
            <span className="relative mt-1 inline-block bg-[linear-gradient(90deg,#ff8c28_0%,#ffcf8a_45%,#ff8c28_100%)] bg-clip-text text-[34px] text-transparent sm:text-[48px] lg:text-[58px]">
              مسکو، سن‌پترزبورگ، سوچی
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
          <div className="flex gap-2" role="tablist" aria-label="اسلایدهای هیرو">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`اسلاید ${index + 1}`}
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
