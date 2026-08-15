import Image from "next/image";
import Link from "next/link";
import { Car, Coffee, Dumbbell, Star, Waves, Wifi } from "lucide-react";
import { featuredHotels } from "@/data/homepage";
import { Price } from "@/components/ui/Price";

const amenityIcons = {
  wifi: Wifi,
  breakfast: Coffee,
  parking: Car,
  gym: Dumbbell,
  pool: Waves,
};

export function FeaturedHotels() {
  return (
    <section
      className="container-page pt-4 pb-12 sm:pt-5 sm:pb-16 lg:pt-6 lg:pb-[88px]"
      aria-label="هتل‌های منتخب"
    >
      <p className="mb-4 text-[13px] font-medium text-moscowa-orange sm:mb-5">
        هتل‌های منتخب
      </p>

      <div className="space-y-3 sm:space-y-4">
        {featuredHotels.map((hotel) => (
          <Link
            key={hotel.id}
            href={hotel.href}
            className="group flex overflow-hidden rounded-2xl border border-moscowa-border bg-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moscowa-purple/35"
          >
            <div className="relative w-[110px] shrink-0 overflow-hidden sm:w-[160px] lg:w-[200px]">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width:640px) 110px, (max-width:1024px) 160px, 200px"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3 sm:p-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-[14.5px] font-bold text-moscowa-text sm:text-[16px]">
                      {hotel.name}
                    </h3>
                    <p
                      dir="ltr"
                      className="mt-0.5 truncate text-left text-[11px] text-moscowa-text-muted sm:text-[12px]"
                    >
                      {hotel.nameEn}
                    </p>
                    <p className="mt-0.5 text-[12px] text-moscowa-text-secondary sm:text-[13px]">
                      {hotel.city}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                    {Array.from({ length: hotel.stars }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-3 w-3 fill-moscowa-orange text-moscowa-orange sm:h-3.5 sm:w-3.5"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-2 hidden items-center gap-3 sm:flex">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <Icon
                        key={amenity}
                        className="h-4 w-4 text-moscowa-text-muted"
                        strokeWidth={1.75}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-end justify-between gap-2">
                <span
                  className={`inline-flex flex-col items-start rounded-lg px-2 py-1 leading-none text-white ${
                    hotel.rating >= 9 ? "bg-moscowa-green" : "bg-moscowa-purple"
                  }`}
                >
                  <span className="text-[12px] font-bold sm:text-[13px]">
                    {hotel.rating.toFixed(1)}
                  </span>
                  <span className="mt-0.5 text-[9px] text-white/80 sm:text-[10px]">
                    {hotel.ratingLabel}
                  </span>
                </span>

                <div className="text-left">
                  <span className="block text-[11px] text-moscowa-text-muted line-through">
                    {new Intl.NumberFormat("fa-IR").format(hotel.originalPrice)}
                  </span>
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--color-moscowa-orange)_10%,white)] px-1.5 py-0.5 text-[9px] font-semibold text-moscowa-orange">
                    قیمت اعضا
                  </span>
                  <Price
                    amount={hotel.memberPrice}
                    prefix="هر شب از"
                    className="mt-0.5"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
