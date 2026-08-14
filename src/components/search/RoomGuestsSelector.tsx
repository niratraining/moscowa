"use client";

import { useId, useState, type ComponentType } from "react";
import { Baby, Bed, Minus, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/jalali";
import { useOutsideClose } from "./DatePicker";

const MAX_ROOMS = 8;
const MAX_ADULTS = 16;
const MAX_CHILDREN = 8;

interface StepperRowProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}

function StepperRow({ icon: Icon, label, sublabel, value, min, max, onChange }: StepperRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0 text-moscowa-purple" />
        <div>
          <p className="text-[14px] font-semibold text-moscowa-text">{label}</p>
          {sublabel ? <p className="text-[11px] text-moscowa-text-muted">{sublabel}</p> : null}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`کاهش ${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-moscowa-border text-moscowa-purple transition-colors hover:bg-moscowa-purple/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center text-[14px] font-bold text-moscowa-text">
          {toPersianDigits(value)}
        </span>
        <button
          type="button"
          aria-label={`افزایش ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-moscowa-border text-moscowa-purple transition-colors hover:bg-moscowa-purple/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

interface HotelRoomGuestsSelectorProps {
  rooms: number;
  guests: number;
  onChange: (patch: { rooms: number; guests: number }) => void;
}

/**
 * Booking.com / Trip.com-style rooms & occupancy popover.
 * `rooms` stays fully controlled by the parent search state; the
 * adults/children split is kept locally since TravelSearchState only
 * tracks the aggregate `guests` count.
 */
export function HotelRoomGuestsSelector({ rooms, guests, onChange }: HotelRoomGuestsSelectorProps) {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(() => Math.max(1, guests));
  const [children, setChildren] = useState(0);
  const rootRef = useOutsideClose(open, setOpen);
  const panelId = useId();

  function commit(nextRooms: number, nextAdults: number, nextChildren: number) {
    onChange({ rooms: nextRooms, guests: nextAdults + nextChildren });
  }

  function handleRooms(next: number) {
    const nextRooms = Math.max(1, Math.min(MAX_ROOMS, next));
    const nextAdults = Math.max(adults, nextRooms);
    setAdults(nextAdults);
    commit(nextRooms, nextAdults, children);
  }

  function handleAdults(next: number) {
    const nextAdults = Math.max(rooms, Math.min(MAX_ADULTS, next));
    setAdults(nextAdults);
    commit(rooms, nextAdults, children);
  }

  function handleChildren(next: number) {
    const nextChildren = Math.max(0, Math.min(MAX_CHILDREN, next));
    setChildren(nextChildren);
    commit(rooms, adults, nextChildren);
  }

  return (
    <div ref={rootRef} className={cn("relative min-w-0 flex-1 overflow-visible", open && "z-50")}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-[64px] w-full items-center justify-between gap-3 px-4 py-3 text-right transition-colors hover:bg-moscowa-bg-secondary/70"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Users className="h-4 w-4 shrink-0 text-moscowa-purple" aria-hidden />
          <span className="whitespace-nowrap text-[15px] font-semibold text-moscowa-text">
            {toPersianDigits(rooms)} اتاق، {toPersianDigits(guests)} مهمان
          </span>
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="اتاق و مسافران"
          className="absolute z-50 top-[calc(100%+8px)] right-0 w-72 max-w-[calc(100vw-1.25rem)] origin-top animate-[calendar-pop_0.16s_ease-out_both] rounded-2xl border border-moscowa-border bg-white p-4 shadow-search"
        >
          <StepperRow
            icon={Bed}
            label="اتاق"
            value={rooms}
            min={1}
            max={MAX_ROOMS}
            onChange={handleRooms}
          />
          <div className="border-t border-moscowa-border" />
          <StepperRow
            icon={Users}
            label="بزرگسال"
            sublabel="۱۳ سال به بالا"
            value={adults}
            min={rooms}
            max={MAX_ADULTS}
            onChange={handleAdults}
          />
          <div className="border-t border-moscowa-border" />
          <StepperRow
            icon={Baby}
            label="کودک"
            sublabel="۰ تا ۱۲ سال"
            value={children}
            min={0}
            max={MAX_CHILDREN}
            onChange={handleChildren}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 h-10 w-full rounded-xl bg-moscowa-purple text-sm font-semibold text-white transition-colors hover:bg-moscowa-purple-dark"
          >
            تأیید
          </button>
        </div>
      ) : null}
    </div>
  );
}
