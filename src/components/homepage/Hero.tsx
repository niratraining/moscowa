"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Headphones, Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/data/homepage";
import { cn } from "@/lib/utils";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <section
      className="relative isolate h-[300px] overflow-hidden bg-moscowa-purple sm:h-[330px] lg:h-[360px]"
      aria-label="معرفی مسکوا"
    >
      {/* Hamburger menu overlay */}
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

      <div className="container-page relative z-10 flex h-full flex-col justify-center pt-10">
        <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
          <p className="text-[11px] font-medium tracking-[0.3em] text-white/65 sm:text-[12px]">
            کالکشن روسیه
          </p>
          <h1 className="mt-2 text-[26px] font-bold leading-[1.25] text-white sm:text-[32px] lg:text-[38px]">
            رزرو هتل در مسکو
            <span className="mx-2 text-white/40">·</span>
            سن‌پترزبورگ
          </h1>
        </div>
      </div>
    </section>
  );
}
