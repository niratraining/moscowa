import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { demoStays, priceLabel } from "@/data/demo";
import { ResultsShell } from "./ResultsShell";

export function StayResultsDemo() {
  return (
    <ResultsShell
      title="اقامتگاه‌های منتخب"
      resultCount={demoStays.length}
      sortOptions={[
        { id: "rating", label: "بهترین امتیاز" },
        { id: "price", label: "ارزان‌ترین" },
      ]}
      filterGroups={[
        {
          id: "type",
          title: "نوع اقامت",
          options: [
            { id: "villa", label: "ویلا", count: 1 },
            { id: "suite", label: "سوئیت", count: 1 },
            { id: "trad", label: "اقامتگاه سنتی", count: 1 },
          ],
        },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {demoStays.map((stay) => (
          <article
            key={stay.id}
            className="overflow-hidden rounded-[20px] border border-moscowa-border bg-white transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <Link href={`/stays/${stay.id}`} className="relative block aspect-[4/3]">
              <Image
                src={stay.image}
                alt={stay.title}
                fill
                className="object-cover"
                sizes="(max-width:1280px) 50vw, 33vw"
              />
              <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-medium text-moscowa-purple">
                {stay.type}
              </span>
            </Link>
            <div className="p-4">
              <h3 className="text-[16px] font-bold text-moscowa-text">
                <Link href={`/stays/${stay.id}`} className="hover:text-moscowa-purple">
                  {stay.title}
                </Link>
              </h3>
              <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                {stay.city}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-moscowa-text-muted">
                <Users className="h-3.5 w-3.5" />
                {stay.guests.toLocaleString("fa-IR")} مهمان ·{" "}
                {stay.rooms.toLocaleString("fa-IR")} اتاق · امتیاز{" "}
                {stay.rating.toLocaleString("fa-IR")}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-[16px] font-bold text-moscowa-purple">
                  {priceLabel(stay.priceFrom)}
                </p>
                <Button href={`/stays/${stay.id}`} size="sm" variant="outline">
                  جزئیات
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ResultsShell>
  );
}
