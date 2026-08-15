"use client";

import {
  BedDouble,
  Car,
  Compass,
  Home,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceType } from "./types";

const tabs: {
  id: ServiceType;
  label: string;
  icon: typeof Plane;
  disabled?: boolean;
}[] = [
  { id: "hotel", label: "هتل", icon: BedDouble },
  { id: "tour", label: "تور", icon: Compass, disabled: true },
  { id: "transfer" as ServiceType, label: "ترانسفر فرودگاهی", icon: Car, disabled: true },
  { id: "stay", label: "میزبانی مقصد", icon: Home, disabled: true },
];

interface SearchTabsProps {
  value: ServiceType;
  onChange: (value: ServiceType) => void;
}

export function SearchTabs({ value, onChange }: SearchTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="نوع خدمات سفر"
      className="flex h-[68px] items-stretch gap-1 overflow-x-auto border-b border-moscowa-border px-2 sm:px-4"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const selected = !tab.disabled && value === tab.id;

        if (tab.disabled) {
          return (
            <div
              key={tab.id}
              role="tab"
              aria-disabled="true"
              aria-selected={false}
              className="relative flex min-w-[110px] shrink-0 cursor-not-allowed select-none items-center justify-center gap-2 px-3 text-[14px] font-medium text-moscowa-text-muted/60"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
              <span className="whitespace-nowrap">{tab.label}</span>
              <span className="rounded-full bg-moscowa-bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-moscowa-text-muted">
                به‌زودی
              </span>
            </div>
          );
        }

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex min-w-[88px] shrink-0 items-center justify-center gap-2 px-3 text-[14px] font-medium transition-colors duration-200",
              selected
                ? "text-moscowa-purple"
                : "text-moscowa-text-secondary hover:text-moscowa-purple",
            )}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden />
            <span>{tab.label}</span>
            <span
              className={cn(
                "absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-moscowa-purple transition-transform duration-200 origin-center",
                selected ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
