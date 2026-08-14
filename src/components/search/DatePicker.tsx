"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  helper?: string;
}

/**
 * Lightweight Persian-friendly date field.
 * Architecture allows swapping in a full Jalali calendar later.
 */
export function DatePicker({
  label,
  value,
  onChange,
  error,
  disabled,
  helper,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    setDraft(value);
  }, [value]);

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
          <CalendarDays
            className="h-4 w-4 shrink-0 text-moscowa-purple"
            aria-hidden
          />
          <span className="text-[15px] font-semibold text-moscowa-text">
            {value || "انتخاب تاریخ"}
          </span>
        </span>
        {helper ? (
          <span className="pr-6 text-[12px] text-moscowa-text-secondary">
            {helper}
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
          id={panelId}
          role="dialog"
          aria-label={label}
          className="absolute inset-x-0 top-[calc(100%-6px)] z-50 rounded-2xl border border-moscowa-border bg-white p-4 shadow-search"
        >
          <label className="mb-2 block text-xs text-moscowa-text-secondary">
            تاریخ شمسی (YYYY/MM/DD)
          </label>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="۱۴۰۵/۰۳/۱۰"
            className="h-11 w-full rounded-xl border border-moscowa-border px-3 text-sm outline-none focus:border-moscowa-purple"
            dir="ltr"
          />
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="h-10 flex-1 rounded-xl bg-moscowa-purple text-sm font-semibold text-white transition-colors hover:bg-moscowa-purple-dark"
              onClick={() => {
                onChange(draft.trim());
                setOpen(false);
              }}
            >
              تأیید
            </button>
            <button
              type="button"
              className="h-10 flex-1 rounded-xl border border-moscowa-border text-sm text-moscowa-text-secondary"
              onClick={() => setOpen(false)}
            >
              انصراف
            </button>
          </div>
        </div>
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
}

/**
 * Single-row combined check-in / check-out field (Booking.com style).
 * Collapsed state shows one line: icon + "checkIn - checkOut".
 * Expanded panel still edits both dates, just from one shared box.
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
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [draftIn, setDraftIn] = useState(checkIn);
  const [draftOut, setDraftOut] = useState(checkOut);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const error = checkInError || checkOutError;

  useEffect(() => {
    setDraftIn(checkIn);
    setDraftOut(checkOut);
  }, [checkIn, checkOut]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const summary = checkIn && checkOut
    ? `${checkIn} - ${checkOut}`
    : checkIn
      ? `${checkIn} - انتخاب خروج`
      : "تاریخ ورود - خروج";

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0 flex-1 overflow-visible", open && "z-50")}
    >
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
        <CalendarRange
          className="h-4 w-4 shrink-0 text-moscowa-purple"
          aria-hidden
        />
        <span className="truncate text-[15px] font-semibold text-moscowa-text">
          {summary}
        </span>
      </button>

      {error ? (
        <p className="absolute bottom-1 right-4 text-[11px] text-red-600">
          {error}
        </p>
      ) : null}

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={`${checkInLabel} / ${checkOutLabel}`}
          className="absolute inset-x-0 top-[calc(100%-6px)] z-50 rounded-2xl border border-moscowa-border bg-white p-4 shadow-search"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-xs text-moscowa-text-secondary">
                {checkInLabel}
              </label>
              <input
                value={draftIn}
                onChange={(e) => setDraftIn(e.target.value)}
                placeholder="۱۴۰۵/۰۳/۱۰"
                className="h-11 w-full rounded-xl border border-moscowa-border px-3 text-sm outline-none focus:border-moscowa-purple"
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-moscowa-text-secondary">
                {checkOutLabel}
              </label>
              <input
                value={draftOut}
                onChange={(e) => setDraftOut(e.target.value)}
                placeholder="۱۴۰۵/۰۳/۱۵"
                className="h-11 w-full rounded-xl border border-moscowa-border px-3 text-sm outline-none focus:border-moscowa-purple"
                dir="ltr"
              />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="h-10 flex-1 rounded-xl bg-moscowa-purple text-sm font-semibold text-white transition-colors hover:bg-moscowa-purple-dark"
              onClick={() => {
                onChange(draftIn.trim(), draftOut.trim());
                setOpen(false);
              }}
            >
              تأیید
            </button>
            <button
              type="button"
              className="h-10 flex-1 rounded-xl border border-moscowa-border text-sm text-moscowa-text-secondary"
              onClick={() => setOpen(false)}
            >
              انصراف
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
