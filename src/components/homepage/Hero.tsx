"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      className="relative isolate h-[300px] overflow-hidden bg-moscowa-orange sm:h-[330px] lg:h-[360px]"
      aria-label="معرفی مسکوا"
    >
      {/* Hamburger menu trigger */}
      <div className="container-page absolute inset-x-0 top-0 z-20 flex h-[72px] items-center justify-end sm:h-20">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          aria-expanded={menuOpen}
          aria-label="باز کردن منو"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="container-page relative z-10 flex h-full flex-col items-center justify-center pb-16 pt-4 text-center sm:pb-20 sm:pt-6 lg:pb-24">
        <div className="flex flex-col items-center motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
          <Image
            src="/brand/logo-stacked-white.png"
            alt="Moscowa"
            width={746}
            height={498}
            priority
            className="h-14 w-auto sm:h-16 lg:h-[72px]"
          />
          <h1 className="mt-4 text-[26px] font-bold leading-[1.25] text-white sm:mt-5 sm:text-[32px] lg:text-[38px]">
            رزرو هتل در مسکو
            <span className="mx-2 text-white/40">·</span>
            سن‌پترزبورگ
          </h1>
        </div>
      </div>
    </section>
  );
}
