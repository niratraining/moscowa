"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { TravelSearch } from "@/components/search/TravelSearch";
import type { ServiceType } from "@/components/search/types";
import { cn } from "@/lib/utils";

export interface ResultsSearchSummaryItem {
  icon: React.ReactNode;
  label: string;
}

interface ResultsSearchBarProps {
  service: ServiceType;
  items: ResultsSearchSummaryItem[];
}

/**
 * Slim, sticky "search recap" bar used at the top of results pages —
 * the pattern global OTAs (Booking, Skyscanner, …) use instead of
 * repeating the full-size homepage search box on every results page.
 * Clicking "ویرایش جستجو" reveals a compact, tabs-free edit form
 * scoped to the current service (not the homepage's service switcher).
 */
export function ResultsSearchBar({ service, items }: ResultsSearchBarProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="sticky top-[78px] z-40 border-b border-moscowa-border bg-white/95 backdrop-blur-md lg:top-20">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-1.5">
            {items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-moscowa-text"
              >
                <span className="text-moscowa-purple">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors",
              editing
                ? "border-moscowa-purple bg-moscowa-purple text-white"
                : "border-moscowa-border text-moscowa-purple hover:bg-moscowa-bg-secondary",
            )}
          >
            {editing ? (
              <>
                <X className="h-3.5 w-3.5" />
                بستن
              </>
            ) : (
              <>
                <Pencil className="h-3.5 w-3.5" />
                ویرایش جستجو
              </>
            )}
          </button>
        </div>

        {editing && (
          <div className="pb-4">
            <TravelSearch initialService={service} embedded showTabs={false} />
          </div>
        )}
      </div>
    </div>
  );
}
