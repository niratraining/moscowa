"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Minus, Plus, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  cabinClassLabels,
  passengerSummary,
  type CabinClass,
  type PassengerState,
} from "./types";

interface PassengerSelectorProps {
  value: PassengerState;
  onChange: (value: PassengerState) => void;
}

function Counter({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div>
        <p className="text-sm font-semibold text-moscowa-text">{label}</p>
        <p className="text-xs text-moscowa-text-secondary">{hint}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`کاهش ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-moscowa-border text-moscowa-purple disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-bold">{value}</span>
        <button
          type="button"
          aria-label={`افزایش ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-moscowa-border text-moscowa-purple disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function PassengerSelector({ value, onChange }: PassengerSelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0 flex-1 overflow-visible", open && "z-50")}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-full min-h-[76px] w-full flex-col justify-center gap-1 px-4 text-right transition-colors hover:bg-moscowa-bg-secondary/70"
      >
        <span className="text-[12px] text-moscowa-text-muted">مسافران و کلاس</span>
        <span className="flex items-center gap-2">
          <UsersRound className="h-4 w-4 shrink-0 text-moscowa-purple" aria-hidden />
          <span className="text-[15px] font-semibold text-moscowa-text">
            {passengerSummary(value)}
          </span>
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="انتخاب مسافران و کلاس"
          className="absolute left-0 top-[calc(100%-6px)] z-50 w-[min(320px,90vw)] rounded-2xl border border-moscowa-border bg-white p-4 shadow-search"
        >
          <Counter
            label="بزرگسال"
            hint="۱۲ سال به بالا"
            value={value.adults}
            min={1}
            max={9}
            onChange={(adults) => onChange({ ...value, adults })}
          />
          <Counter
            label="کودک"
            hint="۲ تا ۱۲ سال"
            value={value.children}
            min={0}
            max={9}
            onChange={(children) => onChange({ ...value, children })}
          />
          <Counter
            label="نوزاد"
            hint="کمتر از ۲ سال"
            value={value.infants}
            min={0}
            max={value.adults}
            onChange={(infants) => onChange({ ...value, infants })}
          />

          <div className="mt-3 border-t border-moscowa-border pt-3">
            <p className="mb-2 text-xs text-moscowa-text-secondary">کلاس پرواز</p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(cabinClassLabels) as CabinClass[]).map((cabin) => (
                <button
                  key={cabin}
                  type="button"
                  onClick={() => onChange({ ...value, cabinClass: cabin })}
                  className={cn(
                    "h-9 rounded-lg text-xs font-medium transition-colors",
                    value.cabinClass === cabin
                      ? "bg-moscowa-purple text-white"
                      : "bg-moscowa-bg-secondary text-moscowa-text-secondary hover:text-moscowa-purple",
                  )}
                >
                  {cabinClassLabels[cabin]}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
