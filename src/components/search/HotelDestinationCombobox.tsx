"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Building2, MapPin, Search, Star, X } from "lucide-react";
import {
  hotelCities,
  hotelDirectory,
  type HotelDirectoryItem,
  type CityOption,
} from "@/data/homepage";
import { cn, toPersianDigits } from "@/lib/utils";
import type { LocationValue } from "./types";
import { FieldOverlay, useIsMobileViewport } from "./FieldOverlay";

interface HotelDestinationComboboxProps {
  label?: string;
  value: LocationValue | null;
  onChange: (value: LocationValue) => void;
  error?: string;
}

type ResultRow =
  | { kind: "city"; key: string; city: CityOption }
  | { kind: "hotel"; key: string; hotel: HotelDirectoryItem };

function HighlightText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-[3px] bg-moscowa-purple/15 text-moscowa-purple">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

interface ResultsListProps {
  q: string;
  rows: ResultRow[];
  filteredCities: CityOption[];
  filteredHotels: HotelDirectoryItem[];
  activeIndex: number;
  hotelCountByCity: Map<string, number>;
  value: LocationValue | null;
  listId: string;
  activeId: string;
  onSelectCity: (city: CityOption) => void;
  onSelectHotel: (hotel: HotelDirectoryItem) => void;
  onHoverIndex: (index: number) => void;
}

/** Shared results list rendered inside both the desktop popover and the mobile sheet. */
function ResultsList({
  q,
  rows,
  filteredCities,
  filteredHotels,
  activeIndex,
  hotelCountByCity,
  value,
  listId,
  activeId,
  onSelectCity,
  onSelectHotel,
  onHoverIndex,
}: ResultsListProps) {
  return (
    <ul id={listId} role="listbox" className="max-h-[70vh] overflow-auto lg:max-h-80">
      {rows.length === 0 ? (
        <li className="px-3 py-6 text-center text-sm text-moscowa-text-secondary">
          نتیجه‌ای برای «{q}» پیدا نشد
        </li>
      ) : null}

      {filteredCities.length > 0 ? (
        <>
          <li
            role="presentation"
            className="px-3 pb-1.5 pt-2 text-[11px] font-semibold text-moscowa-text-muted"
          >
            {q ? "شهرها" : "مقاصد محبوب"}
          </li>
          {filteredCities.map((city) => {
            const rowIndex = rows.findIndex(
              (r) => r.kind === "city" && r.city.code === city.code,
            );
            const active = rowIndex === activeIndex;
            const count = hotelCountByCity.get(city.code) ?? 0;
            return (
              <li key={city.code} role="presentation">
                <button
                  type="button"
                  id={`${activeId}-city-${city.code}`}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => onHoverIndex(rowIndex)}
                  onClick={() => onSelectCity(city)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-right transition-colors",
                    active && "bg-moscowa-bg-secondary",
                    value?.code === city.code &&
                      value?.name === city.name &&
                      "bg-moscowa-purple/5",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moscowa-purple/10">
                      <MapPin
                        className="h-4 w-4 text-moscowa-purple"
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-moscowa-text">
                        <HighlightText text={city.name} query={q} />
                      </span>
                      <span className="block truncate text-xs text-moscowa-text-secondary">
                        {city.subtitle}
                      </span>
                    </span>
                  </span>
                  {count > 0 ? (
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-moscowa-bg-secondary px-2 py-1 text-[11px] text-moscowa-text-secondary">
                      {toPersianDigits(count)} هتل
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </>
      ) : null}

      {filteredHotels.length > 0 ? (
        <>
          <li
            role="presentation"
            className="mt-1 border-t border-moscowa-border px-3 pb-1.5 pt-2 text-[11px] font-semibold text-moscowa-text-muted"
          >
            {q ? "هتل‌ها" : "هتل‌های پیشنهادی"}
          </li>
          {filteredHotels.map((hotel) => {
            const rowIndex = rows.findIndex(
              (r) => r.kind === "hotel" && r.hotel.id === hotel.id,
            );
            const active = rowIndex === activeIndex;
            return (
              <li key={hotel.id} role="presentation">
                <button
                  type="button"
                  id={`${activeId}-hotel-${hotel.id}`}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => onHoverIndex(rowIndex)}
                  onClick={() => onSelectHotel(hotel)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-right transition-colors",
                    active && "bg-moscowa-bg-secondary",
                    value?.name === hotel.name && "bg-moscowa-purple/5",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moscowa-orange/10">
                      <Building2
                        className="h-4 w-4 text-moscowa-orange"
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-moscowa-text">
                        <HighlightText text={hotel.name} query={q} />
                      </span>
                      <span className="block truncate text-xs text-moscowa-text-secondary">
                        {hotel.cityName}
                        {hotel.area ? ` · ${hotel.area}` : ""}
                      </span>
                    </span>
                  </span>
                  {hotel.stars ? (
                    <span className="flex shrink-0 items-center gap-0.5 whitespace-nowrap text-[11px] text-moscowa-text-secondary">
                      {toPersianDigits(hotel.stars)}
                      <Star
                        className="h-3 w-3 fill-moscowa-orange text-moscowa-orange"
                        aria-hidden
                      />
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </>
      ) : null}
    </ul>
  );
}

export function HotelDestinationCombobox({
  label = "مقصد یا نام هتل",
  value,
  onChange,
  error,
}: HotelDestinationComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const activeId = useId();
  const isMobile = useIsMobileViewport();

  useEffect(() => {
    if (isMobile) return; // the sheet has its own explicit close button
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isMobile]);

  const hotelCountByCity = useMemo(() => {
    const map = new Map<string, number>();
    for (const hotel of hotelDirectory) {
      map.set(hotel.cityCode, (map.get(hotel.cityCode) ?? 0) + 1);
    }
    return map;
  }, []);

  const q = query.trim();

  const filteredCities = useMemo(() => {
    if (!q) return hotelCities;
    return hotelCities.filter(
      (city) =>
        city.name.includes(q) ||
        (city.subtitle ?? "").includes(q) ||
        city.code.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q]);

  const filteredHotels = useMemo(() => {
    if (!q) return hotelDirectory.slice(0, 4);
    return hotelDirectory.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(q.toLowerCase()) ||
        hotel.cityName.includes(q) ||
        (hotel.area ?? "").includes(q),
    );
  }, [q]);

  const rows = useMemo<ResultRow[]>(() => {
    const cityRows: ResultRow[] = filteredCities.map((city) => ({
      kind: "city",
      key: `city-${city.code}`,
      city,
    }));
    const hotelRows: ResultRow[] = filteredHotels.map((hotel) => ({
      kind: "hotel",
      key: `hotel-${hotel.id}`,
      hotel,
    }));
    return [...cityRows, ...hotelRows];
  }, [filteredCities, filteredHotels]);

  useEffect(() => {
    setActiveIndex(0);
  }, [q, open]);

  function selectCity(city: CityOption) {
    onChange({ code: city.code, name: city.name, subtitle: city.subtitle });
    setOpen(false);
    setQuery("");
  }

  function selectHotel(hotel: HotelDirectoryItem) {
    onChange({
      code: hotel.cityCode,
      name: hotel.name,
      subtitle: `هتل در ${hotel.cityName}${hotel.area ? ` · ${hotel.area}` : ""}`,
    });
    setOpen(false);
    setQuery("");
  }

  function selectRow(row: ResultRow) {
    if (row.kind === "city") selectCity(row.city);
    else selectHotel(row.hotel);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open && (event.key === "ArrowDown" || event.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (rows.length ? (prev + 1) % rows.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        rows.length ? (prev - 1 + rows.length) % rows.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const row = rows[activeIndex];
      if (row) selectRow(row);
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0 flex-1 overflow-visible", open && "z-50")}
    >
      <div
        className={cn(
          "flex h-full min-h-[76px] w-full cursor-text flex-col justify-center gap-1 px-4 text-right transition-colors",
          open ? "bg-moscowa-bg-secondary/70" : "hover:bg-moscowa-bg-secondary/70",
          error && "bg-red-50/60",
        )}
        onClick={() => {
          setOpen(true);
          if (!isMobile) inputRef.current?.focus();
        }}
      >
        <label
          htmlFor={`${listId}-input`}
          className="text-[12px] text-moscowa-text-muted"
        >
          {label}
        </label>
        <span className="flex items-center gap-2">
          <Search className="h-4 w-4 shrink-0 text-moscowa-purple" aria-hidden />
          <input
            ref={inputRef}
            id={`${listId}-input`}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              open && rows[activeIndex]
                ? `${activeId}-${rows[activeIndex].key}`
                : undefined
            }
            value={open && !isMobile ? query : (value?.name ?? "")}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => !isMobile && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="مثلاً مسکو یا Ritz-Carlton"
            readOnly={isMobile}
            tabIndex={isMobile ? -1 : 0}
            className="w-full min-w-0 truncate bg-transparent text-[16px] font-semibold text-moscowa-text outline-none placeholder:text-moscowa-text-muted placeholder:font-normal"
            autoComplete="off"
          />
          {value && !open ? (
            <button
              type="button"
              aria-label="جستجوی مجدد"
              onClick={(e) => {
                e.stopPropagation();
                setQuery("");
                setOpen(true);
                if (!isMobile) inputRef.current?.focus();
              }}
              className="shrink-0 rounded-full p-1 text-moscowa-text-muted transition-colors hover:bg-moscowa-border hover:text-moscowa-text"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : null}
        </span>
        {value?.subtitle && !open ? (
          <span className="truncate pr-6 text-[12px] text-moscowa-text-secondary">
            {value.subtitle}
          </span>
        ) : null}
      </div>

      {error ? (
        <p className="absolute bottom-1 right-4 text-[11px] text-red-600">
          {error}
        </p>
      ) : null}

      <FieldOverlay
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
        title={label}
        desktopClassName="lg:min-w-[360px]"
      >
        {isMobile ? (
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-moscowa-bg-secondary px-3">
            <Search className="h-4 w-4 shrink-0 text-moscowa-purple" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثلاً مسکو یا Ritz-Carlton"
              className="h-12 w-full min-w-0 bg-transparent text-[16px] font-semibold text-moscowa-text outline-none placeholder:text-moscowa-text-muted placeholder:font-normal"
              autoComplete="off"
            />
          </div>
        ) : null}
        <ResultsList
          q={q}
          rows={rows}
          filteredCities={filteredCities}
          filteredHotels={filteredHotels}
          activeIndex={activeIndex}
          hotelCountByCity={hotelCountByCity}
          value={value}
          listId={listId}
          activeId={activeId}
          onSelectCity={selectCity}
          onSelectHotel={selectHotel}
          onHoverIndex={setActiveIndex}
        />
      </FieldOverlay>
    </div>
  );
}
