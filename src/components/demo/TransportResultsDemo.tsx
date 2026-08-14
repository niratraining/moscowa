import { Bus, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  demoBuses,
  demoTrains,
  priceLabel,
  type DemoTransport,
} from "@/data/demo";
import { buildBookingHref } from "@/lib/booking";
import { ResultsShell } from "./ResultsShell";

function TransportCards({
  items,
  mode,
}: {
  items: DemoTransport[];
  mode: "train" | "bus";
}) {
  const Icon = mode === "train" ? TrainFront : Bus;

  return (
    <>
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-[20px] border border-moscowa-border bg-white p-4 sm:p-5 transition hover:-translate-y-0.5 hover:shadow-card"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_10%,white)] text-moscowa-purple">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[14px] font-bold text-moscowa-text">
                    {item.company}
                  </p>
                  <p className="text-[12px] text-moscowa-text-muted">
                    {item.seatClass}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <p className="text-[20px] font-bold text-moscowa-text">
                    {item.departTime}
                  </p>
                  <p className="text-[13px] text-moscowa-text-secondary">
                    {item.origin}
                  </p>
                </div>
                <div className="text-center text-[12px] text-moscowa-text-muted">
                  <p>{item.duration}</p>
                  <div className="my-1 h-px w-14 bg-moscowa-border sm:w-20" />
                </div>
                <div className="text-left">
                  <p className="text-[20px] font-bold text-moscowa-text">
                    {item.arriveTime}
                  </p>
                  <p className="text-[13px] text-moscowa-text-secondary">
                    {item.destination}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:min-w-[180px] sm:flex-col sm:items-end">
              <p className="text-[18px] font-bold text-moscowa-purple">
                {priceLabel(item.price)}
              </p>
              <Button
                href={buildBookingHref("passengers", {
                  type: mode,
                  id: item.id,
                })}
                size="sm"
              >
                انتخاب و خرید
              </Button>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}

export function TrainResultsDemo() {
  return (
    <ResultsShell
      title="بلیط قطار تهران → مشهد"
      resultCount={demoTrains.length}
      sortOptions={[
        { id: "time", label: "ساعت حرکت" },
        { id: "price", label: "ارزان‌ترین" },
      ]}
      filterGroups={[
        {
          id: "class",
          title: "نوع سالن",
          options: [
            { id: "4", label: "۴ تخته", count: 1 },
            { id: "1", label: "۱ تخته", count: 1 },
            { id: "5", label: "۵ ستاره", count: 1 },
          ],
        },
      ]}
    >
      <TransportCards items={demoTrains} mode="train" />
    </ResultsShell>
  );
}

export function BusResultsDemo() {
  return (
    <ResultsShell
      title="اتوبوس‌های بین‌شهری"
      resultCount={demoBuses.length}
      sortOptions={[
        { id: "time", label: "ساعت حرکت" },
        { id: "price", label: "ارزان‌ترین" },
      ]}
      filterGroups={[
        {
          id: "class",
          title: "نوع سرویس",
          options: [
            { id: "vip", label: "VIP", count: 2 },
            { id: "normal", label: "معمولی", count: 1 },
          ],
        },
      ]}
    >
      <TransportCards items={demoBuses} mode="bus" />
    </ResultsShell>
  );
}
