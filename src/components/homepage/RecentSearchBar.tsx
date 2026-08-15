"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, History, X } from "lucide-react";
import { clearRecentSearch, getRecentSearch, type RecentSearch } from "@/lib/recentSearch";

export function RecentSearchBar() {
  const [recent, setRecent] = useState<RecentSearch | null>(null);

  useEffect(() => {
    setRecent(getRecentSearch());
  }, []);

  if (!recent) return null;

  function handleDismiss(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    clearRecentSearch();
    setRecent(null);
  }

  return (
    <div className="relative z-40 border-b border-moscowa-border bg-moscowa-bg-secondary motion-safe:animate-fade-up">
      <div className="container-page flex items-center gap-2 py-2.5 sm:gap-3">
        <Link
          href={recent.url}
          className="group flex min-w-0 flex-1 items-center gap-2.5 text-[13px] text-moscowa-text-secondary transition-colors hover:text-moscowa-purple sm:text-[14px]"
        >
          <History className="h-4 w-4 shrink-0 text-moscowa-purple/70" />
          <span className="truncate">
            <span className="text-moscowa-text-muted">جستجوی اخیر شما: </span>
            <span className="font-semibold text-moscowa-text">
              {recent.label}
            </span>
          </span>
          <span className="mr-auto hidden shrink-0 items-center gap-1 font-semibold text-moscowa-purple sm:inline-flex">
            ادامه بده
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          </span>
        </Link>
        <button
          type="button"
          aria-label="بستن جستجوی اخیر"
          onClick={handleDismiss}
          className="shrink-0 rounded-full p-1.5 text-moscowa-text-muted transition-colors hover:bg-white hover:text-moscowa-text"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
