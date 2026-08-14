"use client";

import { Users } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { DestinationSelector } from "./DestinationSelector";
import type { SearchErrors, TravelSearchState } from "./types";

interface SimpleRoomGuestsProps {
  rooms: number;
  guests: number;
  onChange: (patch: Partial<TravelSearchState>) => void;
  label?: string;
}

function RoomGuestsField({
  rooms,
  guests,
  onChange,
  label = "اتاق و مسافر",
}: SimpleRoomGuestsProps) {
  return (
    <div className="flex min-h-[76px] min-w-0 flex-1 flex-col justify-center gap-1 px-4">
      <span className="text-[12px] text-moscowa-text-muted">{label}</span>
      <span className="flex items-center gap-2">
        <Users className="h-4 w-4 text-moscowa-purple" aria-hidden />
        <span className="text-[15px] font-semibold text-moscowa-text">
          {String(rooms).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])} اتاق،{" "}
          {String(guests).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])} مهمان
        </span>
      </span>
      <div className="mt-1 flex gap-2">
        <button
          type="button"
          className="rounded-lg bg-moscowa-bg-secondary px-2 py-1 text-[11px] text-moscowa-text-secondary"
          onClick={() =>
            onChange({
              rooms: Math.max(1, rooms - 1),
              guests: Math.max(1, guests - (guests > rooms ? 1 : 0)),
            })
          }
        >
          −
        </button>
        <button
          type="button"
          className="rounded-lg bg-moscowa-bg-secondary px-2 py-1 text-[11px] text-moscowa-text-secondary"
          onClick={() => onChange({ rooms: rooms + 1, guests: guests + 1 })}
        >
          +
        </button>
      </div>
    </div>
  );
}

interface FormProps {
  state: TravelSearchState;
  errors: SearchErrors;
  onChange: (patch: Partial<TravelSearchState>) => void;
}

function FieldShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-visible rounded-2xl border border-moscowa-border">
      <div className="relative z-10 flex flex-col divide-y divide-moscowa-border overflow-visible lg:flex-row lg:divide-x lg:divide-y-0 lg:divide-moscowa-border">
        {children}
      </div>
    </div>
  );
}

export function HotelSearchForm({ state, errors, onChange }: FormProps) {
  return (
    <FieldShell>
      <DestinationSelector
        label="مقصد / هتل"
        value={state.destination}
        error={errors.destination}
        onChange={(destination) => onChange({ destination })}
      />
      <DatePicker
        label="تاریخ ورود"
        value={state.departureDate}
        error={errors.departureDate}
        onChange={(departureDate) => onChange({ departureDate })}
      />
      <DatePicker
        label="تاریخ خروج"
        value={state.returnDate}
        error={errors.returnDate}
        onChange={(returnDate) => onChange({ returnDate })}
      />
      <RoomGuestsField
        rooms={state.rooms}
        guests={state.guests}
        onChange={onChange}
      />
    </FieldShell>
  );
}

export function TourSearchForm({ state, errors, onChange }: FormProps) {
  return (
    <FieldShell>
      <DestinationSelector
        label="مبدا"
        value={state.origin}
        error={errors.origin}
        onChange={(origin) => onChange({ origin })}
      />
      <DestinationSelector
        label="مقصد"
        value={state.destination}
        error={errors.destination}
        onChange={(destination) => onChange({ destination })}
      />
      <DatePicker
        label="تاریخ"
        value={state.departureDate}
        error={errors.departureDate}
        onChange={(departureDate) => onChange({ departureDate })}
      />
      <RoomGuestsField
        rooms={1}
        guests={state.passengers.adults + state.passengers.children}
        label="تعداد مسافر"
        onChange={(patch) =>
          onChange({
            passengers: {
              ...state.passengers,
              adults: Math.max(1, patch.guests ?? 1),
              children: 0,
              infants: 0,
            },
          })
        }
      />
    </FieldShell>
  );
}

export function TrainSearchForm({ state, errors, onChange }: FormProps) {
  return (
    <FieldShell>
      <DestinationSelector
        label="مبدا"
        value={state.origin}
        error={errors.origin}
        onChange={(origin) => onChange({ origin })}
      />
      <DestinationSelector
        label="مقصد"
        value={state.destination}
        error={errors.destination}
        onChange={(destination) => onChange({ destination })}
      />
      <DatePicker
        label="تاریخ"
        value={state.departureDate}
        error={errors.departureDate}
        onChange={(departureDate) => onChange({ departureDate })}
      />
      <RoomGuestsField
        rooms={1}
        guests={state.passengers.adults}
        label="مسافر"
        onChange={(patch) =>
          onChange({
            passengers: {
              ...state.passengers,
              adults: Math.max(1, patch.guests ?? 1),
            },
          })
        }
      />
    </FieldShell>
  );
}

export function BusSearchForm({ state, errors, onChange }: FormProps) {
  return <TrainSearchForm state={state} errors={errors} onChange={onChange} />;
}

export function StaySearchForm({ state, errors, onChange }: FormProps) {
  return (
    <FieldShell>
      <DestinationSelector
        label="شهر"
        value={state.destination}
        error={errors.destination}
        onChange={(destination) => onChange({ destination })}
      />
      <DatePicker
        label="ورود"
        value={state.departureDate}
        error={errors.departureDate}
        onChange={(departureDate) => onChange({ departureDate })}
      />
      <DatePicker
        label="خروج"
        value={state.returnDate}
        error={errors.returnDate}
        onChange={(returnDate) => onChange({ returnDate })}
      />
      <RoomGuestsField
        rooms={1}
        guests={state.guests}
        label="مهمان"
        onChange={onChange}
      />
    </FieldShell>
  );
}
