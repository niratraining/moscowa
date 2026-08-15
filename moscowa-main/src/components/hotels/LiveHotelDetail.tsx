import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { getHotelInfo, retrieveHotelPage } from "@/lib/ostrovok/client";
import { getOstrovokConfig } from "@/lib/ostrovok/config";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function LiveHotelDetail({ hid }: { hid: number }) {
  const config = getOstrovokConfig();
  const checkin = todayPlus(14);
  const checkout = todayPlus(17);

  const [infoRes, hpRes] = await Promise.all([
    getHotelInfo(hid).catch(() => null),
    retrieveHotelPage(hid, {
      checkin,
      checkout,
      residency: config.residency,
      currency: config.currency,
      guests: [{ adults: 2, children: [] }],
    }).catch(() => null),
  ]);

  const info = infoRes?.data;
  const rates = hpRes?.data?.hotels?.[0]?.rates ?? [];

  if (!info) return null;

  const images = (info.images_ext ?? [])
    .slice(0, 6)
    .map((img) => img.url.replace("{size}", "x500"));

  return (
    <div className="container-page section-spacing !pt-8">
      <nav className="mb-4 text-[13px] text-moscowa-text-muted">
        <Link href="/hotels" className="hover:text-moscowa-purple">
          هتل
        </Link>{" "}
        / {info.name}
      </nav>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-[20px] sm:grid-cols-4">
          {images.map((src, i) => (
            <div
              key={src}
              className={`relative aspect-[4/3] ${i === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 aspect-[16/10]" : ""}`}
            >
              <Image
                src={src}
                alt={info.name}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-[13px] font-medium text-moscowa-orange">
            {info.star_rating ? `${info.star_rating} ستاره` : info.kind} ·{" "}
            {info.region?.name}
          </p>
          <h1 className="mt-1 text-[28px] font-bold text-moscowa-text sm:text-[34px]">
            {info.name}
          </h1>
          {info.address && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-moscowa-text-secondary">
              <MapPin className="h-4 w-4 text-moscowa-purple" />
              {info.address}
            </p>
          )}

          <section className="mt-8">
            <h2 className="text-[18px] font-bold text-moscowa-text">
              اتاق‌های موجود ({checkin} تا {checkout})
            </h2>
            {rates.length === 0 ? (
              <p className="mt-4 text-[14px] text-moscowa-text-secondary">
                در این بازه تاریخ، اتاق موجودی برای این هتل پیدا نشد.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {rates.map((rate) => {
                  const payment = rate.payment_options.payment_types[0];
                  return (
                    <div
                      key={rate.match_hash}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-moscowa-border bg-white p-4"
                    >
                      <div>
                        <p className="text-[15px] font-semibold text-moscowa-text">
                          {rate.room_name}
                        </p>
                        <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                          {rate.meal_data?.has_breakfast ? "با صبحانه" : "فقط اقامت"}
                        </p>
                      </div>
                      {payment && (
                        <p className="text-[18px] font-bold text-moscowa-purple" dir="ltr">
                          {payment.show_currency_code} {payment.show_amount}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-moscowa-border bg-white p-4">
          <p className="inline-flex items-center gap-1.5 text-[13px] text-moscowa-text-secondary">
            <Star className="h-4 w-4 text-moscowa-purple" />
            داده زنده از Ostrovok / RateHawk
          </p>
          <p className="mt-3 text-[13px] text-moscowa-text-muted">
            رزرو آنلاین این هتل هنوز فعال نیست — این مرحله بعدی پس از دریافت
            کلید API و تکمیل فرایند پرداخت است.
          </p>
        </aside>
      </div>
    </div>
  );
}
