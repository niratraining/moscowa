"use client";

import {
  BedDouble,
  Compass,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceType } from "./types";

const tabs: {
  id: ServiceType;
  label: string;
  icon: typeof Plane;
}[] = [
  { id: "hotel", label: "هتل", icon: BedDouble },
  { id: "tour", label: "تور", icon: Compass },
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
        const selected = value === tab.id;
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
