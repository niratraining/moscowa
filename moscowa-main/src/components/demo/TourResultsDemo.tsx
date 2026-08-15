import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { demoTours, priceLabel } from "@/data/demo";
import { ResultsShell } from "./ResultsShell";

export function TourResultsDemo() {
  return (
    <ResultsShell
      title="تورهای آماده رزرو"
      resultCount={demoTours.length}
      sortOptions={[
        { id: "popular", label: "محبوب" },
        { id: "price", label: "ارزان‌ترین" },
        { id: "date", label: "نزدیک‌ترین حرکت" },
      ]}
      filterGroups={[
        {
          id: "duration",
          title: "مدت تور",
          options: [
            { id: "3", label: "۳ روزه", count: 2 },
            { id: "4", label: "۴ روزه", count: 1 },
          ],
        },
        {
          id: "type",
          title: "نوع تور",
          options: [
            { id: "intl", label: "خارجی", count: 1 },
            { id: "dom", label: "داخلی", count: 2 },
          ],
        },
      ]}
    >
      {demoTours.map((tour) => (
        <article
          key={tour.id}
          className="grid overflow-hidden rounded-[20px] border border-moscowa-border bg-white transition hover:-translate-y-0.5 hover:shadow-card md:grid-cols-[240px_minmax(0,1fr)]"
        >
          <Link href={`/tours/${tour.id}`} className="relative min-h-[180px] block">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover"
              sizes="240px"
            />
          </Link>
          <div className="flex flex-col justify-between gap-4 p-4 sm:p-5">
            <div>
              <p className="text-[12px] font-medium text-moscowa-orange">
                {tour.days.toLocaleString("fa-IR")} روز /{" "}
                {tour.nights.toLocaleString("fa-IR")} شب · حرکت {tour.departure}
              </p>
              <h3 className="mt-1 text-[18px] font-bold text-moscowa-text">
                <Link href={`/tours/${tour.id}`} className="hover:text-moscowa-purple">
                  {tour.title}
                </Link>
              </h3>
              <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                {tour.origin} → {tour.destination}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tour.includes.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-moscowa-bg-secondary px-2.5 py-1 text-[11px] text-moscowa-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[12px] text-moscowa-text-muted">شروع قیمت</p>
                <p className="text-[18px] font-bold text-moscowa-purple">
                  {priceLabel(tour.priceFrom)}
                </p>
              </div>
              <Button href={`/tours/${tour.id}`}>جزئیات تور</Button>
            </div>
          </div>
        </article>
      ))}
    </ResultsShell>
  );
}
