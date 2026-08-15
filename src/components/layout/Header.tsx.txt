"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Headphones, Menu } from "lucide-react";
import { mainNav, siteConfig } from "@/data/homepage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-moscowa-border/70 bg-white/90 shadow-[0_1px_0_rgba(50,35,80,0.03)] backdrop-blur-xl">
      <div className="container-page">
        <div className="flex h-[78px] items-center justify-between gap-4 lg:h-[80px]">
          <div className="flex min-w-0 items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className="relative flex h-12 w-[168px] shrink-0 items-center sm:h-[52px] sm:w-[190px]"
              aria-label={siteConfig.name}
            >
              <Image
                src="/brand/logo-horizontal.png"
                alt={siteConfig.name}
                fill
                priority
                className="object-contain object-right"
                sizes="190px"
              />
            </Link>

            <nav
              aria-label="منوی اصلی"
              className="hidden items-center gap-1 xl:flex"
            >
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "relative whitespace-nowrap px-2.5 py-2 text-[13.5px] font-medium transition-colors duration-200",
                      active
                        ? "text-moscowa-orange"
                        : "text-moscowa-text-secondary hover:text-moscowa-purple",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-moscowa-orange" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={siteConfig.phoneHref}
              className="hidden items-center gap-2 rounded-xl px-2 py-2 text-moscowa-purple transition-colors hover:bg-moscowa-bg-secondary md:inline-flex"
            >
              <Headphones className="h-[18px] w-[18px]" aria-hidden />
              <span className="text-[14px] font-semibold tracking-wide" dir="ltr">
                {siteConfig.phone}
              </span>
            </a>

            <div className="hidden items-center gap-2 sm:flex">
              <Button href="/account" variant="outline" size="sm">
                ورود / ثبت‌نام
              </Button>
              <Button href="/admin" variant="ghost" size="sm" className="text-moscowa-text-muted">
                ادمین
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-moscowa-border text-moscowa-purple xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="باز کردن منو"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileNavDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
