import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { demoHotels, priceLabel, starsLabel } from "@/data/demo";
import { ResultsShell } from "./ResultsShell";

export function HotelResultsDemo() {
  return (
    <ResultsShell
      title="هتل‌های پیشنهادی"
      resultCount={demoHotels.length}
      sortOptions={[
        { id: "recommended", label: "پیشنهادی" },
        { id: "score", label: "بالاترین امتیاز" },
        { id: "price", label: "ارزان‌ترین" },
      ]}
      filterGroups={[
        {
          id: "stars",
          title: "ستاره هتل",
          options: [
            { id: "5", label: "۵ ستاره", count: 2 },
            { id: "4", label: "۴ ستاره", count: 2 },
          ],
        },
        {
          id: "board",
          title: "وعده غذایی",
          options: [
            { id: "breakfast", label: "با صبحانه", count: 3 },
            { id: "room", label: "فقط اقامت", count: 1 },
          ],
        },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {demoHotels.map((hotel) => (
          <article
            key={hotel.id}
            className="overflow-hidden rounded-[20px] border border-moscowa-border bg-white transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <Link href={`/hotels/${hotel.id}`} className="relative block aspect-[16/10]">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-medium text-moscowa-purple">
                {starsLabel(hotel.stars)}
              </span>
            </Link>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[17px] font-bold text-moscowa-text">
                    <Link href={`/hotels/${hotel.id}`} className="hover:text-moscowa-purple">
                      {hotel.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                    {hotel.city} · {hotel.board}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-lg bg-moscowa-purple px-2 py-1 text-[12px] font-bold text-white">
                  <Star className="h-3.5 w-3.5 fill-white" />
                  {hotel.score.toLocaleString("fa-IR")}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {hotel.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-moscowa-bg-secondary px-2.5 py-1 text-[11px] text-moscowa-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] text-moscowa-text-muted">شروع از</p>
                  <p className="text-[18px] font-bold text-moscowa-purple">
                    {priceLabel(hotel.priceFrom)}
                  </p>
                  <p className="text-[11px] text-moscowa-text-muted">
                    {hotel.reviews.toLocaleString("fa-IR")} نظر
                  </p>
                </div>
                <Button href={`/hotels/${hotel.id}`} size="sm">
                  مشاهده اتاق‌ها
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ResultsShell>
  );
}
