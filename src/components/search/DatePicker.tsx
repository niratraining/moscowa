"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendarPopover } from "./Calendar";
import {
  type CalendarSystem,
  formatFullLabel,
  jdnFromValueString,
  todayJdn,
  valueStringFromJdn,
} from "@/lib/jalali";

function useOutsideClose(open: boolean, setOpen: (v: boolean) => void) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);
  return rootRef;
}

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  helper?: string;
  /** Disallow dates before today. Defaults to true — travel search dates are always upcoming. */
  disallowPast?: boolean;
}

/** Single-date field backed by the dual Jalali/Gregorian calendar popover. */
export function DatePicker({
  label,
  value,
  onChange,
  error,
  disabled,
  helper,
  disallowPast = true,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [system, setSystem] = useState<CalendarSystem>("jalali");
  const selectedJdn = jdnFromValueString(value);
  const [anchorJdn, setAnchorJdn] = useState(() => selectedJdn ?? todayJdn());
  const rootRef = useOutsideClose(open, setOpen);
  const panelId = useId();

  useEffect(() => {
    if (open) setAnchorJdn(selectedJdn ?? todayJdn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative min-w-0 flex-1 overflow-visible", open && "z-50")}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={cn(
          "flex h-full min-h-[76px] w-full flex-col justify-center gap-1 px-4 text-right transition-colors hover:bg-moscowa-bg-secondary/70 disabled:cursor-not-allowed disabled:opacity-50",
          error && "bg-red-50/60",
        )}
      >
        <span className="text-[12px] text-moscowa-text-muted">{label}</span>
        <span className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-moscowa-purple" aria-hidden />
          <span className="text-[15px] font-semibold text-moscowa-text">
            {selectedJdn !== null ? formatFullLabel(selectedJdn) : value || "انتخاب تاریخ"}
          </span>
        </span>
        {helper ? <span className="pr-6 text-[12px] text-moscowa-text-secondary">{helper}</span> : null}
      </button>

      {error ? <p className="absolute bottom-1 right-4 text-[11px] text-red-600">{error}</p> : null}

      {open ? (
        <CalendarPopover
          panelId={panelId}
          ariaLabel={label}
          mode="single"
          system={system}
          onSystemChange={setSystem}
          anchorJdn={anchorJdn}
          onAnchorChange={setAnchorJdn}
          startJdn={selectedJdn}
          endJdn={null}
          minJdn={disallowPast ? todayJdn() : undefined}
          monthsToShow={1}
          onDayClick={(jdn) => {
            onChange(valueStringFromJdn(jdn));
            setOpen(false);
          }}
          onClear={() => onChange("")}
        />
      ) : null}
    </div>
  );
}

interface DateRangePickerProps {
  checkInLabel?: string;
  checkOutLabel?: string;
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
  checkInError?: string;
  checkOutError?: string;
  disabled?: boolean;
  /** Duration shortcuts shown once a start date is picked, e.g. hotel nights. */
  quickNights?: number[];
}

/**
 * Single-row combined check-in / check-out field (Booking.com / Trip.com style),
 * opening a two-month range calendar with a Jalali/Gregorian toggle.
 */
export function DateRangePicker({
  checkInLabel = "تاریخ ورود",
  checkOutLabel = "تاریخ خروج",
  checkIn,
  checkOut,
  onChange,
  checkInError,
  checkOutError,
  disabled,
  quickNights = [1, 2, 3, 7],
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [system, setSystem] = useState<CalendarSystem>("jalali");
  const committedStart = jdnFromValueString(checkIn);
  const committedEnd = jdnFromValueString(checkOut);
  const [draftStart, setDraftStart] = useState<number | null>(committedStart);
  const [draftEnd, setDraftEnd] = useState<number | null>(committedEnd);
  const [anchorJdn, setAnchorJdn] = useState(() => committedStart ?? todayJdn());
  const rootRef = useOutsideClose(open, setOpen);
  const panelId = useId();
  const error = checkInError || checkOutError;

  useEffect(() => {
    if (open) {
      setDraftStart(committedStart);
      setDraftEnd(committedEnd);
      setAnchorJdn(committedStart ?? todayJdn());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleDayClick(jdn: number) {
    if (draftStart === null || draftEnd !== null || jdn <= draftStart) {
      setDraftStart(jdn);
      setDraftEnd(null);
      return;
    }
    setDraftEnd(jdn);
    onChange(valueStringFromJdn(draftStart), valueStringFromJdn(jdn));
    setOpen(false);
  }

  const summary =
    committedStart !== null && committedEnd !== null
      ? `${formatFullLabel(committedStart)} - ${formatFullLabel(committedEnd)}`
      : committedStart !== null
        ? `${formatFullLabel(committedStart)} - انتخاب خروج`
        : "تاریخ ورود - خروج";

  return (
    <div ref={rootRef} className={cn("relative min-w-0 flex-1 overflow-visible", open && "z-50")}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={cn(
          "flex min-h-[64px] w-full items-center gap-2 px-4 py-3 text-right transition-colors hover:bg-moscowa-bg-secondary/70 disabled:cursor-not-allowed disabled:opacity-50",
          error && "bg-red-50/60",
        )}
      >
        <CalendarRange className="h-4 w-4 shrink-0 text-moscowa-purple" aria-hidden />
        <span className="truncate text-[15px] font-semibold text-moscowa-text">{summary}</span>
      </button>

      {error ? <p className="absolute bottom-1 right-4 text-[11px] text-red-600">{error}</p> : null}

      {open ? (
        <CalendarPopover
          panelId={panelId}
          ariaLabel={`${checkInLabel} / ${checkOutLabel}`}
          mode="range"
          system={system}
          onSystemChange={setSystem}
          anchorJdn={anchorJdn}
          onAnchorChange={setAnchorJdn}
          startJdn={draftStart}
          endJdn={draftEnd}
          minJdn={todayJdn()}
          monthsToShow={2}
          quickNights={quickNights}
          onDayClick={handleDayClick}
          onClear={() => {
            setDraftStart(null);
            setDraftEnd(null);
          }}
        />
      ) : null}
    </div>
  );
}
