"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PanelNavItem } from "@/data/panels";

interface PanelShellProps {
  title: string;
  subtitle?: string;
  nav: PanelNavItem[];
  brandHref: string;
  brandLabel: string;
  userName: string;
  userMeta: string;
  children: React.ReactNode;
  homeHref?: string;
}

export function PanelShell({
  title,
  subtitle,
  nav,
  brandHref,
  brandLabel,
  userName,
  userMeta,
  children,
  homeHref = "/",
}: PanelShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/account" || href === "/admin") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const activeItem = nav.find((item) => isActive(item.href));
  const resolvedTitle = activeItem?.label ?? title;

  const sidebar = (
    <aside
      className={cn(
        "flex h-full w-[270px] flex-col border-l border-moscowa-border bg-white",
        "fixed inset-y-0 right-0 z-50 transition-transform duration-200 lg:static lg:translate-x-0",
        open ? "translate-x-0" : "translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-[72px] items-center justify-between gap-3 border-b border-moscowa-border px-5">
        <Link href={brandHref} className="relative h-10 w-[140px]">
          <Image
            src="/brand/logo-horizontal.png"
            alt="مسکوا"
            fill
            className="object-contain object-right"
            sizes="140px"
          />
        </Link>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-moscowa-border text-moscowa-purple lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="بستن منو"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5 py-4">
        <p className="text-[12px] font-medium text-moscowa-orange">{brandLabel}</p>
        <p className="mt-1 text-[13px] text-moscowa-text-muted">نسخه دمو پنل</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6" aria-label={brandLabel}>
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
                active
                  ? "bg-[color-mix(in_srgb,var(--color-moscowa-purple)_10%,white)] text-moscowa-purple"
                  : "text-moscowa-text-secondary hover:bg-moscowa-bg-secondary hover:text-moscowa-purple",
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-moscowa-border p-4">
        <Link
          href={homeHref}
          className="block rounded-xl bg-moscowa-bg-secondary px-3 py-2.5 text-center text-[13px] font-medium text-moscowa-purple hover:bg-[color-mix(in_srgb,var(--color-moscowa-purple)_8%,white)]"
        >
          بازگشت به سایت
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#f4f2f8]">
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="بستن منو"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {sidebar}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-4 border-b border-moscowa-border bg-white/90 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-moscowa-border text-moscowa-purple lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="باز کردن منو"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-[18px] font-bold text-moscowa-text sm:text-[20px]">
                {resolvedTitle}
              </h1>
              {subtitle ? (
                <p className="text-[12px] text-moscowa-text-muted sm:text-[13px]">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-moscowa-border text-moscowa-text-secondary hover:text-moscowa-purple"
              aria-label="اعلان‌ها"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("moscowa-toast", {
                    detail: "اعلان جدیدی ندارید",
                  }),
                )
              }
            >
              <Bell className="h-4 w-4" />
            </button>
            <div className="hidden rounded-xl border border-moscowa-border bg-moscowa-bg-secondary px-3 py-1.5 text-right sm:block">
              <p className="text-[13px] font-semibold text-moscowa-text">{userName}</p>
              <p className="text-[11px] text-moscowa-text-muted">{userMeta}</p>
            </div>
          </div>
        </header>

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-[18px] border border-moscowa-border bg-white p-5 shadow-[0_8px_24px_rgba(50,35,80,0.04)]">
      <p className="text-[13px] text-moscowa-text-muted">{label}</p>
      <p className="mt-2 text-[26px] font-bold text-moscowa-purple">{value}</p>
      {hint ? <p className="mt-1 text-[12px] text-moscowa-text-secondary">{hint}</p> : null}
    </div>
  );
}

export function PanelCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[18px] border border-moscowa-border bg-white shadow-[0_8px_24px_rgba(50,35,80,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-moscowa-border px-5 py-4">
        <h2 className="text-[16px] font-bold text-moscowa-text">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
