"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Headphones, Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/data/homepage";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <section
      className="relative isolate h-[340px] overflow-hidden sm:h-[380px] lg:h-[430px]"
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

      {/* Hamburger menu overlay — replaces the site header on the hero image */}
      <div className="container-page absolute inset-x-0 top-0 z-20 flex h-[72px] items-center justify-end sm:h-20">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          aria-expanded={menuOpen}
          aria-controls="hero-nav-menu"
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="hero-nav-menu"
          className="container-page absolute inset-x-0 top-[72px] z-20 sm:top-20"
        >
          <nav
            aria-label="منوی اصلی"
            className="ms-auto flex max-w-xs flex-col gap-1 rounded-2xl border border-white/10 bg-white p-3 shadow-card"
          >
            {mainNav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-moscowa-bg-secondary text-moscowa-orange"
                    : "text-moscowa-text-secondary hover:bg-moscowa-bg-secondary hover:text-moscowa-purple",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-moscowa-border pt-3">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 px-3 py-2 text-moscowa-purple"
              >
                <Headphones className="h-4 w-4" />
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-[11px] border border-[color-mix(in_srgb,var(--color-moscowa-purple)_28%,white)] bg-white text-[15px] font-semibold text-moscowa-purple transition-colors hover:bg-moscowa-bg-secondary"
              >
                ورود / ثبت‌نام
              </Link>
            </div>
          </nav>
        </div>
      ) : null}

      <div className="container-page relative z-10 flex h-full flex-col justify-end pb-6 pt-10 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-14">
        <div className="mb-5 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms] sm:mb-6 lg:mb-7">
          <p className="text-[11px] font-medium tracking-[0.3em] text-white/65 sm:text-[12px]">
            کالکشن روسیه
          </p>
          <h1 className="mt-2 text-[26px] font-bold leading-[1.25] text-white sm:text-[32px] lg:text-[38px]">
            رزرو هتل در مسکو
            <span className="mx-2 text-white/40">·</span>
            سن‌پترزبورگ
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
