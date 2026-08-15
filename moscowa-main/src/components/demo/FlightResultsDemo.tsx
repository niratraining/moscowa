import { Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { demoFlights, priceLabel } from "@/data/demo";
import { buildBookingHref } from "@/lib/booking";
import { ResultsShell } from "./ResultsShell";

export function FlightResultsDemo() {
  return (
    <ResultsShell
      title="نتایج پرواز تهران → مشهد"
      resultCount={demoFlights.length}
      defaultSort="recommended"
      sortOptions={[
        { id: "recommended", label: "پیشنهادی" },
        { id: "cheapest", label: "ارزان‌ترین" },
        { id: "fastest", label: "سریع‌ترین" },
      ]}
      filterGroups={[
        {
          id: "stops",
          title: "توقف",
          options: [
            { id: "direct", label: "مستقیم", count: 4 },
            { id: "one", label: "یک توقف", count: 1 },
          ],
        },
        {
          id: "time",
          title: "ساعت پرواز",
          options: [
            { id: "morning", label: "صبح", count: 2 },
            { id: "noon", label: "ظهر", count: 1 },
            { id: "night", label: "شب", count: 2 },
          ],
        },
        {
          id: "cabin",
          title: "کلاس پرواز",
          options: [
            { id: "economy", label: "اکونومی", count: 4 },
            { id: "business", label: "بیزینس", count: 1 },
          ],
        },
      ]}
    >
      {demoFlights.map((flight) => (
        <article
          key={flight.id}
          className="rounded-[20px] border border-moscowa-border bg-white p-4 shadow-[0_8px_24px_rgba(50,35,80,0.04)] transition hover:-translate-y-0.5 hover:shadow-card sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_10%,white)] text-moscowa-purple">
                  <Plane className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[14px] font-bold text-moscowa-text">
                    {flight.airline}
                  </p>
                  <p className="text-[12px] text-moscowa-text-muted" dir="ltr">
                    {flight.flightNo}
                  </p>
                </div>
                {flight.badge ? (
                  <span className="rounded-full bg-moscowa-orange/10 px-2.5 py-1 text-[11px] font-medium text-moscowa-orange">
                    {flight.badge}
                  </span>
                ) : null}
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                <div>
                  <p className="text-[22px] font-bold text-moscowa-text">
                    {flight.departTime}
                  </p>
                  <p className="text-[13px] text-moscowa-text-secondary">
                    {flight.origin} ({flight.originCode})
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[12px] text-moscowa-text-muted">
                    {flight.duration}
                  </p>
                  <div className="my-1 h-px w-16 bg-moscowa-border sm:w-24" />
                  <p className="text-[12px] text-moscowa-text-secondary">
                    {flight.stops === 0 ? "مستقیم" : `${flight.stops} توقف`}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-[22px] font-bold text-moscowa-text">
                    {flight.arriveTime}
                  </p>
                  <p className="text-[13px] text-moscowa-text-secondary">
                    {flight.destination} ({flight.destinationCode})
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-moscowa-border pt-4 lg:min-w-[200px] lg:flex-col lg:items-end lg:border-r lg:border-t-0 lg:pr-0 lg:pt-0 lg:border-r-moscowa-border lg:pl-5">
              <div className="text-right lg:text-left">
                <p className="text-[12px] text-moscowa-text-muted">{flight.cabin}</p>
                <p className="text-[20px] font-bold text-moscowa-purple">
                  {priceLabel(flight.price)}
                </p>
                {flight.seatsLeft ? (
                  <p className="text-[12px] text-moscowa-orange">
                    فقط {flight.seatsLeft.toLocaleString("fa-IR")} صندلی
                  </p>
                ) : null}
              </div>
              <Button
                href={buildBookingHref("passengers", {
                  type: "flight",
                  id: flight.id,
                })}
                size="md"
              >
                انتخاب و خرید
              </Button>
            </div>
          </div>
        </article>
      ))}
    </ResultsShell>
  );
}
