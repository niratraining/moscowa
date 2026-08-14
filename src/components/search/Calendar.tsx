"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GREGORIAN_MONTHS_FA,
  JALALI_MONTHS,
  WEEKDAY_LABELS,
  type CalendarSystem,
  gregorianMonthLength,
  gregorianToJdn,
  jalaliMonthLength,
  jalaliToJdn,
  jdnToGregorian,
  jdnToJalali,
  toPersianDigits,
  todayJdn,
  weekdayIndex,
} from "@/lib/jalali";

function monthInfo(jdn: number, system: CalendarSystem) {
  if (system === "jalali") {
    const { jy, jm } = jdnToJalali(jdn);
    return {
      firstJdn: jalaliToJdn(jy, jm, 1),
      length: jalaliMonthLength(jy, jm),
      label: `${JALALI_MONTHS[jm - 1]} ${toPersianDigits(jy)}`,
    };
  }
  const { gy, gm } = jdnToGregorian(jdn);
  return {
    firstJdn: gregorianToJdn(gy, gm, 1),
    length: gregorianMonthLength(gy, gm),
    label: `${GREGORIAN_MONTHS_FA[gm - 1]} ${toPersianDigits(gy)}`,
  };
}

function dayNumber(jdn: number, system: CalendarSystem): number {
  return system === "jalali" ? jdnToJalali(jdn).jd : jdnToGregorian(jdn).gd;
}

export function shiftMonthAnchor(anchorJdn: number, system: CalendarSystem, delta: 1 | -1) {
  const info = monthInfo(anchorJdn, system);
  return delta > 0 ? info.firstJdn + info.length : info.firstJdn - 1;
}

function buildWeeks(firstJdn: number, length: number): (number | null)[][] {
  const lead = weekdayIndex(firstJdn);
  const cells: (number | null)[] = Array(lead).fill(null);
  for (let d = 0; d < length; d += 1) cells.push(firstJdn + d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

interface MonthGridProps {
  anchorJdn: number;
  system: CalendarSystem;
  startJdn: number | null;
  endJdn: number | null;
  hoverJdn: number | null;
  minJdn?: number;
  onDayClick: (jdn: number) => void;
  onDayHover: (jdn: number | null) => void;
}

function MonthGrid({
  anchorJdn,
  system,
  startJdn,
  endJdn,
  hoverJdn,
  minJdn,
  onDayClick,
  onDayHover,
}: MonthGridProps) {
  const info = monthInfo(anchorJdn, system);
  const weeks = buildWeeks(info.firstJdn, info.length);
  const today = todayJdn();
  const previewEnd =
    endJdn ?? (hoverJdn !== null && startJdn !== null && hoverJdn > startJdn ? hoverJdn : null);

  return (
    <div className="flex-1">
      <p className="mb-2 text-center text-[13px] font-bold text-moscowa-text">{info.label}</p>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAY_LABELS.map((w) => (
          <span key={w} className="text-[11px] font-medium text-moscowa-text-muted">
            {w}
          </span>
        ))}
        {weeks.flat().map((jdn, i) => {
          if (jdn === null) return <span key={i} />;
          const disabled = minJdn !== undefined && jdn < minJdn;
          const isStart = jdn === startJdn;
          const isEnd = jdn === endJdn;
          const isEdge = isStart || isEnd;
          const inRange = startJdn !== null && previewEnd !== null && jdn > startJdn && jdn < previewEnd;
          const isToday = jdn === today;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onDayClick(jdn)}
              onMouseEnter={() => onDayHover(jdn)}
              onMouseLeave={() => onDayHover(null)}
              className={cn(
                "relative flex h-9 w-full items-center justify-center text-[13px] transition-colors",
                disabled && "cursor-not-allowed text-moscowa-text-muted/50",
                !disabled && !isEdge && "rounded-full text-moscowa-text hover:bg-moscowa-purple/10",
                inRange && "bg-moscowa-purple/10",
                isToday && !isEdge && "font-bold text-moscowa-purple",
                isEdge && "rounded-full bg-moscowa-purple font-bold text-white",
              )}
            >
              {toPersianDigits(dayNumber(jdn, system))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CalendarPopoverProps {
  panelId: string;
  ariaLabel: string;
  mode: "single" | "range";
  system: CalendarSystem;
  onSystemChange: (system: CalendarSystem) => void;
  anchorJdn: number;
  onAnchorChange: (jdn: number) => void;
  startJdn: number | null;
  endJdn: number | null;
  minJdn?: number;
  onDayClick: (jdn: number) => void;
  onClear: () => void;
  quickNights?: number[];
  monthsToShow?: 1 | 2;
}

export function CalendarPopover({
  panelId,
  ariaLabel,
  mode,
  system,
  onSystemChange,
  anchorJdn,
  onAnchorChange,
  startJdn,
  endJdn,
  minJdn,
  onDayClick,
  onClear,
  quickNights,
  monthsToShow = 2,
}: CalendarPopoverProps) {
  const [hoverJdn, setHoverJdn] = useState<number | null>(null);
  const secondAnchor = shiftMonthAnchor(anchorJdn, system, 1);
  const hasSelection = startJdn !== null;
  const showQuickNights = mode === "range" && !!quickNights && startJdn !== null && endJdn === null;

  return (
    <div
      id={panelId}
      role="dialog"
      aria-label={ariaLabel}
      className={cn(
        "absolute z-50 top-[calc(100%+8px)] w-full max-w-[calc(100vw-1.25rem)] origin-top animate-[calendar-pop_0.16s_ease-out_both]",
        "right-0 inset-x-0 lg:inset-x-auto",
        monthsToShow === 2 ? "lg:w-[min(680px,calc(100vw-1.25rem))]" : "lg:w-[340px]",
      )}
    >
      <div className="rounded-2xl border border-moscowa-border bg-white p-4 shadow-search">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex rounded-full bg-moscowa-bg-secondary p-1 text-[12px] font-medium">
            {(["jalali", "gregorian"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSystemChange(s)}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  system === s
                    ? "bg-moscowa-purple text-white"
                    : "text-moscowa-text-secondary hover:text-moscowa-text",
                )}
              >
                {s === "jalali" ? "شمسی" : "میلادی"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onAnchorChange(todayJdn())}
            className="rounded-full px-3 py-1.5 text-[12px] font-medium text-moscowa-purple hover:bg-moscowa-purple/10"
          >
            امروز
          </button>
        </div>

        <div className="mb-1 flex items-center justify-between">
          <button
            type="button"
            aria-label="ماه قبل"
            onClick={() => onAnchorChange(shiftMonthAnchor(anchorJdn, system, -1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-moscowa-text-secondary hover:bg-moscowa-bg-secondary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="flex-1" />
          <button
            type="button"
            aria-label="ماه بعد"
            onClick={() => onAnchorChange(shiftMonthAnchor(anchorJdn, system, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-moscowa-text-secondary hover:bg-moscowa-bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-6">
          <MonthGrid
            anchorJdn={anchorJdn}
            system={system}
            startJdn={startJdn}
            endJdn={endJdn}
            hoverJdn={hoverJdn}
            minJdn={minJdn}
            onDayClick={onDayClick}
            onDayHover={setHoverJdn}
          />
          {monthsToShow === 2 ? (
            <div className="hidden lg:block lg:flex-1">
              <MonthGrid
                anchorJdn={secondAnchor}
                system={system}
                startJdn={startJdn}
                endJdn={endJdn}
                hoverJdn={hoverJdn}
                minJdn={minJdn}
                onDayClick={onDayClick}
                onDayHover={setHoverJdn}
              />
            </div>
          ) : null}
        </div>

        {showQuickNights || hasSelection ? (
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-moscowa-border pt-3">
            {showQuickNights ? (
              <div className="flex flex-wrap gap-1.5">
                {quickNights!.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onDayClick((startJdn as number) + n)}
                    className="rounded-full border border-moscowa-border px-2.5 py-1 text-[11px] text-moscowa-text-secondary hover:border-moscowa-purple hover:text-moscowa-purple"
                  >
                    {toPersianDigits(n)} شب
                  </button>
                ))}
              </div>
            ) : (
              <span />
            )}
            {hasSelection ? (
              <button
                type="button"
                onClick={onClear}
                className="text-[12px] font-medium text-moscowa-text-secondary hover:text-moscowa-orange"
              >
                پاک کردن
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
