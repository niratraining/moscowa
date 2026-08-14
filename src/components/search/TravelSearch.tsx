"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  BusSearchForm,
  HotelSearchForm,
  StaySearchForm,
  TourSearchForm,
  TrainSearchForm,
} from "./HotelSearchForm";
import { FlightSearchForm } from "./FlightSearchForm";
import { SearchTabs } from "./SearchTabs";
import {
  buildSearchUrl,
  defaultSearchState,
  validateSearch,
  type SearchErrors,
  type ServiceType,
  type TravelSearchState,
} from "./types";

interface TravelSearchProps {
  initialService?: ServiceType;
  embedded?: boolean;
}

export function TravelSearch({
  initialService = "hotel",
  embedded = false,
}: TravelSearchProps) {
  const router = useRouter();
  const [state, setState] = useState<TravelSearchState>({
    ...defaultSearchState,
    serviceType: initialService,
  });
  const [errors, setErrors] = useState<SearchErrors>({});
  const [isPending, startTransition] = useTransition();

  const form = useMemo(() => {
    const onChange = (patch: Partial<TravelSearchState>) => {
      setErrors({});
      setState((prev) => ({ ...prev, ...patch }));
    };

    switch (state.serviceType) {
      case "hotel":
        return (
          <HotelSearchForm state={state} errors={errors} onChange={onChange} />
        );
      case "tour":
        return (
          <TourSearchForm state={state} errors={errors} onChange={onChange} />
        );
      case "stay":
        return (
          <StaySearchForm state={state} errors={errors} onChange={onChange} />
        );
      case "train":
        return (
          <TrainSearchForm state={state} errors={errors} onChange={onChange} />
        );
      case "bus":
        return (
          <BusSearchForm state={state} errors={errors} onChange={onChange} />
        );
      default:
        return (
          <FlightSearchForm state={state} errors={errors} onChange={onChange} />
        );
    }
  }, [state, errors]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validateSearch(state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(() => {
      router.push(buildSearchUrl(state));
    });
  }

  return (
    <section
      aria-label="جستجوی سفر"
      className={cn(
        "relative z-30",
        embedded
          ? "mt-0"
          : "-mt-48 sm:-mt-56 lg:-mt-64",
      )}
    >
      <div className={embedded ? undefined : "container-page"}>
        <form
          onSubmit={handleSubmit}
          className="relative z-30 mx-auto max-w-[1320px] overflow-visible rounded-[24px] border border-white/70 bg-white/95 shadow-search backdrop-blur-md supports-[backdrop-filter]:bg-white/90"
        >
          <div className="overflow-hidden rounded-t-[24px]">
            <SearchTabs
              value={state.serviceType}
              onChange={(serviceType) => {
                setErrors({});
                setState((prev) => ({ ...prev, serviceType }));
              }}
            />
          </div>

          <div
            className={cn(
              "relative z-40 space-y-4 overflow-visible p-4 transition-opacity duration-200 sm:p-5 lg:p-6",
              isPending && "opacity-70",
            )}
          >
            {form}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {state.serviceType === "flight" ? (
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[13px] text-moscowa-text-secondary">
                    <input
                      type="checkbox"
                      checked={state.directOnly}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          directOnly: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-moscowa-border text-moscowa-purple focus:ring-moscowa-purple"
                    />
                    جستجوی پرواز مستقیم
                  </label>
                  <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[13px] text-moscowa-text-secondary">
                    <input
                      type="checkbox"
                      checked={state.oneWayTicketOnly}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          oneWayTicketOnly: e.target.checked,
                          tripType: e.target.checked ? "oneway" : "roundtrip",
                          returnDate: e.target.checked
                            ? ""
                            : prev.returnDate || "۱۴۰۵/۰۳/۱۵",
                        }))
                      }
                      className="h-4 w-4 rounded border-moscowa-border text-moscowa-purple focus:ring-moscowa-purple"
                    />
                    بلیط فقط رفت
                  </label>
                </div>
              ) : (
                <div className="text-[13px] text-moscowa-text-muted">
                  جستجوی سریع و شفاف با قیمت واقعی
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="w-full sm:w-[200px]"
              >
                {isPending ? "در حال جستجو..." : "جستجو"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
