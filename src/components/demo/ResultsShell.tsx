"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export interface FilterGroup {
  id: string;
  title: string;
  options: { id: string; label: string; count?: number }[];
}

interface ResultsShellProps {
  title: string;
  resultCount: number;
  filterGroups: FilterGroup[];
  sortOptions: { id: string; label: string }[];
  children: ReactNode;
  defaultSort?: string;
  /** Small label above the title. Defaults to the demo-data notice. */
  eyebrow?: string;
}

export function ResultsShell({
  title,
  resultCount,
  filterGroups,
  sortOptions,
  children,
  defaultSort,
  eyebrow = "نمایش دمو · داده نمونه",
}: ResultsShellProps) {
  const [sort, setSort] = useState(defaultSort ?? sortOptions[0]?.id);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
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

  return (
    <section className="container-page section-spacing !pt-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] text-moscowa-text-muted">{eyebrow}</p>
          <h2 className="mt-1 text-[22px] font-bold text-moscowa-text sm:text-[26px]">
            {title}
          </h2>
          <p className="mt-1 text-[14px] text-moscowa-text-secondary">
            {resultCount.toLocaleString("fa-IR")} نتیجه پیدا شد
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSort(option.id)}
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
        <aside className="h-fit rounded-[20px] border border-moscowa-border bg-white p-4 lg:sticky lg:top-28">
          <p className="mb-4 text-[15px] font-bold text-moscowa-text">فیلترها</p>
          <div className="space-y-5">
            {filterGroups.map((group) => (
              <div key={group.id}>
                <p className="mb-2 text-[13px] font-semibold text-moscowa-text">
                  {group.title}
                </p>
                <ul className="space-y-2">
                  {group.options.map((option) => {
                    const checked = (activeFilters[group.id] ?? []).includes(
                      option.id,
                    );
                    return (
                      <li key={option.id}>
                        <label className="flex cursor-pointer items-center justify-between gap-2 text-[13px] text-moscowa-text-secondary">
                          <span className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleFilter(group.id, option.id)}
                              className="h-4 w-4 rounded border-moscowa-border text-moscowa-purple focus:ring-moscowa-purple"
                            />
                            {option.label}
                          </span>
                          {typeof option.count === "number" ? (
                            <span className="text-moscowa-text-muted">
                              {option.count.toLocaleString("fa-IR")}
                            </span>
                          ) : null}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );
}
