"use client";

import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DatePicker } from "./DatePicker";
import { DestinationSelector } from "./DestinationSelector";
import { PassengerSelector } from "./PassengerSelector";
import type {
  SearchErrors,
  TravelSearchState,
  TripType,
} from "./types";

interface FlightSearchFormProps {
  state: TravelSearchState;
  errors: SearchErrors;
  onChange: (patch: Partial<TravelSearchState>) => void;
}

const tripTypes: { id: TripType; label: string }[] = [
  { id: "oneway", label: "یک طرفه" },
  { id: "roundtrip", label: "رفت و برگشت" },
  { id: "multicity", label: "چند مقصدی" },
];

export function FlightSearchForm({
  state,
  errors,
  onChange,
}: FlightSearchFormProps) {
  const [swapping, setSwapping] = useState(false);

  function swapLocations() {
    setSwapping(true);
    onChange({
      origin: state.destination,
      destination: state.origin,
    });
    window.setTimeout(() => setSwapping(false), 350);
  }

  return (
    <div className="space-y-4">
      <div
        role="radiogroup"
        aria-label="نوع سفر"
        className="flex flex-wrap gap-2"
      >
        {tripTypes.map((item) => {
          const selected = state.tripType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() =>
                onChange({
                  tripType: item.id,
                  oneWayTicketOnly: item.id === "oneway",
                  returnDate:
                    item.id === "oneway" ? "" : state.returnDate || "۱۴۰۵/۰۳/۱۵",
                })
              }
              className={cn(
                "h-9 rounded-full px-4 text-[13px] font-medium transition-all duration-200",
                selected
                  ? "bg-moscowa-purple text-white shadow-soft"
                  : "bg-moscowa-bg-secondary text-moscowa-text-secondary hover:text-moscowa-purple",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="overflow-visible rounded-2xl border border-moscowa-border">
        <div className="relative z-10 flex flex-col overflow-visible lg:flex-row lg:items-stretch">
          <div className="relative flex min-w-0 flex-[1.35] flex-col sm:flex-row">
            <DestinationSelector
              label="مبدا"
              value={state.origin}
              error={errors.origin}
              onChange={(origin) => onChange({ origin })}
            />
            <div className="relative z-10 flex items-center justify-center sm:px-0">
              <button
                type="button"
                aria-label="جابه‌جایی مبدا و مقصد"
                onClick={swapLocations}
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-moscowa-purple text-white shadow-soft transition-transform duration-300 hover:bg-moscowa-purple-dark sm:static sm:translate-x-0 sm:translate-y-0",
                  swapping && "rotate-180",
                )}
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>
            <div className="hidden w-px bg-moscowa-border sm:block" />
            <DestinationSelector
              label="مقصد"
              value={state.destination}
              error={errors.destination}
              onChange={(destination) => onChange({ destination })}
            />
          </div>

          <div className="hidden w-px bg-moscowa-border lg:block" />
          <div className="h-px bg-moscowa-border lg:hidden" />

          <DatePicker
            label="تاریخ رفت"
            value={state.departureDate}
            error={errors.departureDate}
            helper="جمعه"
            onChange={(departureDate) => onChange({ departureDate })}
          />

          <div className="hidden w-px bg-moscowa-border lg:block" />
          <div className="h-px bg-moscowa-border lg:hidden" />

          <DatePicker
            label="تاریخ برگشت"
            value={state.returnDate}
            error={errors.returnDate}
            disabled={state.tripType === "oneway"}
            helper={state.tripType === "oneway" ? "غیرفعال" : "چهارشنبه"}
            onChange={(returnDate) => onChange({ returnDate })}
          />

          <div className="hidden w-px bg-moscowa-border lg:block" />
          <div className="h-px bg-moscowa-border lg:hidden" />

          <PassengerSelector
            value={state.passengers}
            onChange={(passengers) => onChange({ passengers })}
          />
        </div>
      </div>
    </div>
  );
}
