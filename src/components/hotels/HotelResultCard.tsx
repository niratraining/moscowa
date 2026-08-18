import Image from "next/image";
import Link from "next/link";
import { ImageOff, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

function scoreWord(score: number) {
  if (score >= 9) return "استثنایی";
  if (score >= 8) return "عالی";
  if (score >= 7) return "خیلی خوب";
  return "خوب";
}

export interface HotelResultCardProps {
  href: string;
  name: string;
  city: string;
  stars: number;
  board?: string;
  tags: string[];
  image: string;
  imageUnoptimized?: boolean;
  priceLabel: string;
  priceNote?: string;
  score?: number;
  reviews?: number;
  ctaLabel?: string;
}

export function HotelResultCard({
  href,
  name,
  city,
  stars,
  board,
  tags,
  image,
  imageUnoptimized,
  priceLabel,
  priceNote,
  score,
  reviews,
  ctaLabel = "مشاهده اتاق‌ها",
}: HotelResultCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-moscowa-border bg-white transition hover:shadow-card sm:rounded-[20px]">
      <div className="flex flex-col sm:flex-row">
        <Link
          href={href}
          className="relative block h-48 shrink-0 bg-moscowa-bg-secondary sm:h-auto sm:w-64 lg:w-72"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              unoptimized={imageUnoptimized}
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              sizes="(max-width:640px) 100vw, 288px"
              // If the CDN URL 404s or is blocked (hotlink protection, expired
              // link, ...), swap to a plain placeholder instead of a broken image icon.
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement
                  ?.querySelector("[data-image-fallback]")
                  ?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            data-image-fallback
            className={`absolute inset-0 flex items-center justify-center bg-moscowa-bg-secondary text-moscowa-text-muted ${
              image ? "hidden" : ""
            }`}
          >
            <ImageOff className="h-6 w-6" aria-hidden />
          </div>
        </Link>

        <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link href={href} className="hover:text-moscowa-purple">
                  <h3 className="text-[17px] font-bold leading-snug text-moscowa-text">
                    {name}
                  </h3>
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-moscowa-text-secondary">
                  {stars > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-moscowa-orange">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {city}
                  </span>
                  {board && <span>· {board}</span>}
                </div>
              </div>

              {typeof score === "number" && (
                <div className="flex shrink-0 flex-col items-end gap-0.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-medium text-moscowa-text-secondary">
                      {scoreWord(score)}
                    </span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-moscowa-purple px-2 py-1 text-[13px] font-bold text-white">
                      {score.toLocaleString("fa-IR")}
                    </span>
                  </div>
                  {typeof reviews === "number" && (
                    <span className="text-[11px] text-moscowa-text-muted">
                      {reviews.toLocaleString("fa-IR")} نظر
                    </span>
                  )}
                </div>
              )}
            </div>

            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-moscowa-bg-secondary px-2.5 py-1 text-[11px] text-moscowa-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-end justify-between gap-3 border-t border-moscowa-border pt-3">
            <div>
              <p className="text-[12px] text-moscowa-text-muted">شروع از</p>
              <p className="text-[19px] font-bold text-moscowa-purple" dir="ltr">
                {priceLabel}
              </p>
              {priceNote && (
                <p className="text-[11px] text-moscowa-text-muted">{priceNote}</p>
              )}
            </div>
            <Button href={href} size="sm">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
