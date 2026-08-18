"use client";

import { ReactNode, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FieldOverlay } from "@/components/search/FieldOverlay";
import { cn } from "@/lib/utils";

export interface FilterGroup {
  id: string;
  title: string;
  options: { id: string; label: string; count?: number }[];
}

interface ResultsShellProps {
  /** Optional — omit when the summary bar above already shows this (e.g. live hotel results). */
  title?: string;
  resultCount: number;
  filterGroups: FilterGroup[];
  sortOptions: { id: string; label: string }[];
  children: ReactNode;
  defaultSort?: string;
  /** Optional small label above the title. Omitted by default. */
  eyebrow?: string;
  /** Hides the "N نتیجه پیدا شد" line while keeping resultCount for other UI (e.g. the filters sheet). */
  hideResultCount?: boolean;
  /** Called whenever a sort pill is clicked, so the caller can actually reorder its results. */
  onSortChange?: (sortId: string) => void;
}

function FilterRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 border-b border-moscowa-border/60 py-3 text-[14px] text-moscowa-text last:border-0">
      <span>
        {label}
        {typeof count === "number" && (
          <span className="text-moscowa-text-muted"> ({count.toLocaleString("fa-IR")})</span>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 rounded border-moscowa-border text-moscowa-purple focus:ring-moscowa-purple"
      />
    </label>
  );
}

export function ResultsShell({
  title,
  resultCount,
  filterGroups,
  sortOptions,
  children,
  defaultSort,
  eyebrow,
  hideResultCount,
  onSortChange,
}: ResultsShellProps) {
  const [sort, setSort] = useState(defaultSort ?? sortOptions[0]?.id);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCount = Object.values(activeFilters).reduce(
    (sum, ids) => sum + ids.length,
    0,
  );

  function toggleFilter(groupId: string, optionId: string) {
    setActiveFilters((prev) => {
      const current = prev[groupId] ?? [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [groupId]: next };
    });
  }

  const filterGroupList = (
    <div className="space-y-5">
      {filterGroups.map((group) => (
        <div key={group.id}>
          <p className="mb-1 text-[13px] font-semibold text-moscowa-text">
            {group.title}
          </p>
          <div>
            {group.options.map((option) => (
              <FilterRow
                key={option.id}
                label={option.label}
                count={option.count}
                checked={(activeFilters[group.id] ?? []).includes(option.id)}
                onChange={() => toggleFilter(group.id, option.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="container-page section-spacing !pt-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow && (
            <p className="text-[13px] text-moscowa-text-muted">{eyebrow}</p>
          )}
          {title && (
            <h2 className={cn("text-[22px] font-bold text-moscowa-text sm:text-[26px]", eyebrow && "mt-1")}>
              {title}
            </h2>
          )}
          {!hideResultCount && (
            <p className="mt-1 text-[14px] text-moscowa-text-secondary">
              {resultCount.toLocaleString("fa-IR")} نتیجه پیدا شد
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filterGroups.length > 0 && (
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-moscowa-border px-4 text-[13px] font-medium text-moscowa-text transition-colors hover:bg-moscowa-bg-secondary lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              فیلترها
              {activeCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-moscowa-purple px-1 text-[11px] font-bold text-white">
                  {activeCount.toLocaleString("fa-IR")}
                </span>
              )}
            </button>
          )}
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setSort(option.id);
                onSortChange?.(option.id);
              }}
              className={cn(
                "h-10 rounded-full px-4 text-[13px] font-medium transition-colors",
                sort === option.id
                  ? "bg-moscowa-purple text-white"
                  : "bg-moscowa-bg-secondary text-moscowa-text-secondary hover:text-moscowa-purple",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        {filterGroups.length > 0 && (
          <aside className="hidden h-fit rounded-[20px] border border-moscowa-border bg-white p-4 lg:sticky lg:top-28 lg:block">
            <p className="mb-3 text-[15px] font-bold text-moscowa-text">فیلترها</p>
            {filterGroupList}
          </aside>
        )}

        <div className="space-y-4">{children}</div>
      </div>

      {filterGroups.length > 0 && (
        <FieldOverlay
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          title="فیلتر بر اساس"
          footer={
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveFilters({})}
                className="text-[13px] font-semibold text-moscowa-purple"
              >
                بازنشانی
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="h-11 flex-1 rounded-xl bg-moscowa-purple px-5 text-[14px] font-bold text-white"
              >
                نمایش {resultCount.toLocaleString("fa-IR")} نتیجه
              </button>
            </div>
          }
        >
          {filterGroupList}
        </FieldOverlay>
      )}
    </section>
  );
}
