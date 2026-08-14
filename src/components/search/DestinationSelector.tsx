"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { cities, type CityOption } from "@/data/homepage";
import { cn } from "@/lib/utils";
import type { LocationValue } from "./types";

interface DestinationSelectorProps {
  label: string;
  value: LocationValue | null;
  onChange: (value: LocationValue) => void;
  error?: string;
  options?: CityOption[];
  placeholder?: string;
  secondaryKey?: "subtitle" | "code";
}

export function DestinationSelector({
  label,
  value,
  onChange,
  error,
  options = cities,
  placeholder = "انتخاب کنید",
  secondaryKey = "subtitle",
}: DestinationSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const filtered = options.filter((item) => {
    const q = query.trim();
    if (!q) return true;
    return (
      item.name.includes(q) ||
      item.code.toLowerCase().includes(q.toLowerCase()) ||
      (item.subtitle ?? "").includes(q)
    );
  });

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0 flex-1 overflow-visible", open && "z-50")}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "group flex h-full min-h-[76px] w-full flex-col justify-center gap-1 px-4 text-right transition-colors hover:bg-moscowa-bg-secondary/70",
          error && "bg-red-50/60",
        )}
      >
        <span className="text-[12px] text-moscowa-text-muted">{label}</span>
        <span className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-moscowa-purple" aria-hidden />
            <span className="truncate text-[16px] font-semibold text-moscowa-text">
              {value?.name ?? placeholder}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-moscowa-text-muted transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </span>
        {value?.subtitle || value?.code ? (
          <span className="truncate pr-6 text-[12px] text-moscowa-text-secondary">
            {secondaryKey === "code"
              ? value.code
              : (value.subtitle ?? value.code)}
          </span>
        ) : null}
      </button>

      {error ? (
        <p className="absolute bottom-1 right-4 text-[11px] text-red-600">
          {error}
        </p>
      ) : null}

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%-6px)] z-50 origin-top rounded-2xl border border-moscowa-border bg-white p-2 shadow-search"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی شهر یا فرودگاه"
            className="mb-2 h-10 w-full rounded-xl border border-moscowa-border bg-moscowa-bg-secondary px-3 text-sm outline-none focus:border-moscowa-purple"
            aria-label="جستجوی مقصد"
          />
          <ul className="max-h-56 overflow-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-center text-sm text-moscowa-text-secondary">
                نتیجه‌ای پیدا نشد
              </li>
            ) : (
              filtered.map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={value?.code === item.code}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right transition-colors hover:bg-moscowa-bg-secondary",
                      value?.code === item.code && "bg-moscowa-bg-secondary",
                    )}
                    onClick={() => {
                      onChange({
                        code: item.code,
                        name: item.name,
                        subtitle: item.subtitle,
                      });
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-moscowa-text">
                        {item.name}
                      </span>
                      <span className="block text-xs text-moscowa-text-secondary">
                        {item.subtitle}
                      </span>
                    </span>
                    <span className="text-xs text-moscowa-text-muted">
                      {item.code}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
