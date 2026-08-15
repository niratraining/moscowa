"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Headphones, X } from "lucide-react";
import { mainNav, siteConfig } from "@/data/homepage";
import { cn } from "@/lib/utils";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timeout = setTimeout(() => setMounted(false), 420);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="منوی اصلی">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-[#140b22]/60 backdrop-blur-sm transition-opacity duration-500 ease-out",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-[linear-gradient(160deg,#2c1a4a_0%,#4f2f7c_55%,#3d2460_100%)] shadow-[-24px_0_60px_rgba(20,11,34,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Ambient glow accents, consistent with the site's visual language */}
        <div
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(248,66,9,0.16),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-2xl"
          aria-hidden
        />

        <div className="container-page relative z-10 flex h-full flex-col">
          {/* Top bar */}
          <div className="flex h-[72px] shrink-0 items-center justify-between sm:h-20">
            <Image
              src="/brand/logo-mark-white.png"
              alt={siteConfig.name}
              width={451}
              height={353}
              className="h-7 w-auto sm:h-8"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن منو"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:rotate-90 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav
            aria-label="منوی اصلی"
            className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-6"
          >
            {mainNav.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  style={{ transitionDelay: visible ? `${90 + index * 45}ms` : "0ms" }}
                  className={cn(
                    "group flex items-center justify-between border-b border-white/10 py-4 transition-all duration-500 ease-out",
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                >
                  <span
                    className={cn(
                      "text-[22px] font-bold transition-colors sm:text-[26px]",
                      active
                        ? "text-moscowa-orange"
                        : "text-white group-hover:text-white/80",
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full bg-moscowa-orange transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          {/* Footer actions */}
          <div
            className={cn(
              "shrink-0 space-y-3 border-t border-white/10 py-5 transition-all duration-500 ease-out",
              visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: visible ? "480ms" : "0ms" }}
          >
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2.5 text-white/85 transition-colors hover:text-white"
            >
              <Headphones className="h-[18px] w-[18px]" aria-hidden />
              <span className="text-[14px] font-semibold tracking-wide" dir="ltr">
                {siteConfig.phone}
              </span>
            </a>
            <Link
              href="/account"
              onClick={onClose}
              className="inline-flex h-12 w-full items-center justify-center rounded-[13px] bg-white text-[15px] font-bold text-moscowa-purple transition-colors hover:bg-white/90"
            >
              ورود / ثبت‌نام
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
