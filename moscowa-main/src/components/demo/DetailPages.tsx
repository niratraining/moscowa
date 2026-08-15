import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, Star, Users, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  priceLabel,
  starsLabel,
  type DemoHotel,
  type DemoStay,
  type DemoTour,
} from "@/data/demo";
import { buildBookingHref } from "@/lib/booking";

function DetailBreadcrumbs({
  parentHref,
  parentLabel,
  current,
}: {
  parentHref: string;
  parentLabel: string;
  current: string;
}) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-moscowa-text-muted">
        <li>
          <Link href="/" className="hover:text-moscowa-purple">
            صفحه اصلی
          </Link>
        </li>
        <li className="inline-flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
          <Link href={parentHref} className="hover:text-moscowa-purple">
            {parentLabel}
          </Link>
        </li>
        <li className="inline-flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
          <span className="text-moscowa-text-secondary">{current}</span>
        </li>
      </ol>
    </nav>
  );
}

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3 sm:grid-rows-2 sm:gap-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[320px]">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 66vw"
          priority
        />
      </div>
      {images.slice(1, 3).map((src, index) => (
        <div
          key={src}
          className="relative hidden aspect-[16/10] overflow-hidden rounded-[18px] sm:block sm:min-h-[154px]"
        >
          <Image
            src={src}
            alt={`${alt} ${index + 2}`}
            fill
            className="object-cover"
            sizes="33vw"
          />
        </div>
      ))}
    </div>
  );
}

function StickyBookCard({
  price,
  note,
  cta,
  href,
}: {
  price: number;
  note: string;
  cta: string;
  href: string;
}) {
  return (
    <aside className="h-fit rounded-[22px] border border-moscowa-border bg-white p-5 shadow-card lg:sticky lg:top-28">
      <p className="text-[12px] text-moscowa-text-muted">شروع قیمت</p>
      <p className="mt-1 text-[26px] font-bold text-moscowa-purple">
        {priceLabel(price)}
      </p>
      <p className="mt-2 text-[13px] leading-6 text-moscowa-text-secondary">{note}</p>
      <Button href={href} className="mt-5 w-full" size="lg">
        {cta}
      </Button>
      <p className="mt-3 text-center text-[11px] text-moscowa-text-muted">
        ادامه به فلوی رزرو دمو
      </p>
    </aside>
  );
}

export function HotelDetailDemo({ hotel }: { hotel: DemoHotel }) {
  const defaultRoom = hotel.rooms[0];
  return (
    <div className="container-page section-spacing !pt-8">
      <DetailBreadcrumbs
        parentHref="/hotels"
        parentLabel="هتل"
        current={hotel.name}
      />
      <Gallery images={hotel.gallery} alt={hotel.name} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium text-moscowa-orange">
                {starsLabel(hotel.stars)} · {hotel.city}
              </p>
              <h1 className="mt-1 text-[28px] font-bold text-moscowa-text sm:text-[34px]">
                {hotel.name}
              </h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-moscowa-text-secondary">
                <MapPin className="h-4 w-4 text-moscowa-purple" />
                {hotel.address}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-moscowa-purple px-3 py-2 text-white">
              <Star className="h-4 w-4 fill-white" />
              <span className="text-[16px] font-bold">
                {hotel.score.toLocaleString("fa-IR")}
              </span>
              <span className="text-[12px] text-white/80">
                از {hotel.reviews.toLocaleString("fa-IR")} نظر
              </span>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-moscowa-text-secondary">
            {hotel.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-moscowa-bg-secondary px-3 py-1.5 text-[12px] text-moscowa-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="text-[18px] font-bold text-moscowa-text">امکانات هتل</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {hotel.amenities.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-2xl border border-moscowa-border bg-white px-4 py-3 text-[14px] text-moscowa-text"
                >
                  <Wifi className="h-4 w-4 text-moscowa-purple" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-[18px] font-bold text-moscowa-text">
              اتاق‌های قابل رزرو
            </h2>
            <div className="mt-4 space-y-3">
              {hotel.rooms.map((room) => (
                <article
                  key={room.id}
                  className="flex flex-col gap-4 rounded-[18px] border border-moscowa-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-[16px] font-bold text-moscowa-text">
                      {room.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                      ظرفیت {room.capacity.toLocaleString("fa-IR")} نفر ·{" "}
                      {room.board}
                    </p>
                    <p className="mt-1 text-[12px] text-moscowa-orange">
                      {room.remaining.toLocaleString("fa-IR")} اتاق باقی مانده
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="text-[18px] font-bold text-moscowa-purple">
                      {priceLabel(room.price)}
                    </p>
                    <Button
                      href={buildBookingHref("passengers", {
                        type: "hotel",
                        id: hotel.id,
                        roomId: room.id,
                      })}
                      size="sm"
                    >
                      رزرو اتاق
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <StickyBookCard
          price={hotel.priceFrom}
          note={`هر شب · ${hotel.board} · امکان لغو طبق قوانین اتاق`}
          cta="ادامه رزرو هتل"
          href={buildBookingHref("passengers", {
            type: "hotel",
            id: hotel.id,
            roomId: defaultRoom.id,
          })}
        />
      </div>

      <div className="mt-10">
        <Link
          href="/hotels"
          className="text-[14px] font-medium text-moscowa-purple hover:underline"
        >
          ← بازگشت به لیست هتل‌ها
        </Link>
      </div>
    </div>
  );
}

export function TourDetailDemo({ tour }: { tour: DemoTour }) {
  return (
    <div className="container-page section-spacing !pt-8">
      <DetailBreadcrumbs
        parentHref="/tours"
        parentLabel="تور"
        current={tour.title}
      />
      <Gallery images={tour.gallery} alt={tour.title} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-[13px] font-medium text-moscowa-orange">
            {tour.days.toLocaleString("fa-IR")} روز /{" "}
            {tour.nights.toLocaleString("fa-IR")} شب · حرکت {tour.departure}
          </p>
          <h1 className="mt-1 text-[28px] font-bold text-moscowa-text sm:text-[34px]">
            {tour.title}
          </h1>
          <p className="mt-2 text-[15px] text-moscowa-text-secondary">
            {tour.origin} → {tour.destination}
          </p>
          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-moscowa-text-secondary">
            {tour.description}
          </p>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] border border-moscowa-border bg-white p-5">
              <h2 className="text-[16px] font-bold text-moscowa-text">شامل می‌شود</h2>
              <ul className="mt-3 space-y-2 text-[14px] text-moscowa-text-secondary">
                {tour.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[18px] border border-moscowa-border bg-white p-5">
              <h2 className="text-[16px] font-bold text-moscowa-text">شامل نمی‌شود</h2>
              <ul className="mt-3 space-y-2 text-[14px] text-moscowa-text-secondary">
                {tour.excludes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-[18px] font-bold text-moscowa-text">برنامه سفر</h2>
            <ol className="mt-4 space-y-3">
              {tour.itinerary.map((day) => (
                <li
                  key={day.day}
                  className="rounded-[18px] border border-moscowa-border bg-white p-4"
                >
                  <p className="text-[12px] font-medium text-moscowa-orange">
                    روز {day.day.toLocaleString("fa-IR")}
                  </p>
                  <h3 className="mt-1 text-[16px] font-bold text-moscowa-text">
                    {day.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-7 text-moscowa-text-secondary">
                    {day.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-8">
            <h2 className="text-[18px] font-bold text-moscowa-text">تاریخ‌های نزدیک</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tour.nextDates.map((date) => (
                <span
                  key={date}
                  className="rounded-full bg-moscowa-bg-secondary px-3 py-1.5 text-[13px] text-moscowa-text"
                >
                  {date}
                </span>
              ))}
            </div>
          </section>
        </div>

        <StickyBookCard
          price={tour.priceFrom}
          note="قیمت هر نفر · پرواز + هتل در پکیج‌های منتخب"
          cta="رزرو این تور"
          href={buildBookingHref("passengers", { type: "tour", id: tour.id })}
        />
      </div>

      <div className="mt-10">
        <Link
          href="/tours"
          className="text-[14px] font-medium text-moscowa-purple hover:underline"
        >
          ← بازگشت به لیست تورها
        </Link>
      </div>
    </div>
  );
}

export function StayDetailDemo({ stay }: { stay: DemoStay }) {
  return (
    <div className="container-page section-spacing !pt-8">
      <DetailBreadcrumbs
        parentHref="/stays"
        parentLabel="اقامتگاه"
        current={stay.title}
      />
      <Gallery images={stay.gallery} alt={stay.title} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-[13px] font-medium text-moscowa-orange">
            {stay.type} · {stay.city}
          </p>
          <h1 className="mt-1 text-[28px] font-bold text-moscowa-text sm:text-[34px]">
            {stay.title}
          </h1>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-moscowa-text-secondary">
            <MapPin className="h-4 w-4 text-moscowa-purple" />
            محله {stay.neighborhood}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-[13px] text-moscowa-text-secondary">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-moscowa-bg-secondary px-3 py-1.5">
              <Users className="h-3.5 w-3.5" />
              {stay.guests.toLocaleString("fa-IR")} مهمان
            </span>
            <span className="rounded-full bg-moscowa-bg-secondary px-3 py-1.5">
              {stay.rooms.toLocaleString("fa-IR")} اتاق
            </span>
            <span className="rounded-full bg-moscowa-bg-secondary px-3 py-1.5">
              {stay.beds.toLocaleString("fa-IR")} تخت
            </span>
            <span className="rounded-full bg-moscowa-bg-secondary px-3 py-1.5">
              {stay.baths.toLocaleString("fa-IR")} سرویس
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-moscowa-purple px-3 py-1.5 text-white">
              <Star className="h-3.5 w-3.5 fill-white" />
              {stay.rating.toLocaleString("fa-IR")} ·{" "}
              {stay.reviews.toLocaleString("fa-IR")} نظر
            </span>
          </div>

          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-moscowa-text-secondary">
            {stay.description}
          </p>
          <p className="mt-3 text-[14px] font-medium text-moscowa-text">{stay.host}</p>

          <section className="mt-8">
            <h2 className="text-[18px] font-bold text-moscowa-text">امکانات</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {stay.amenities.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-moscowa-border bg-white px-4 py-3 text-[14px] text-moscowa-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-[18px] font-bold text-moscowa-text">قوانین اقامت</h2>
            <ul className="mt-3 space-y-2 text-[14px] text-moscowa-text-secondary">
              {stay.rules.map((rule) => (
                <li
                  key={rule}
                  className="rounded-xl bg-moscowa-bg-secondary px-4 py-3"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <StickyBookCard
          price={stay.priceFrom}
          note="هر شب · بدون پیش‌پرداخت در طرح‌های منتخب"
          cta="درخواست رزرو"
          href={buildBookingHref("passengers", { type: "stay", id: stay.id })}
        />
      </div>

      <div className="mt-10">
        <Link
          href="/stays"
          className="text-[14px] font-medium text-moscowa-purple hover:underline"
        >
          ← بازگشت به لیست اقامتگاه‌ها
        </Link>
      </div>
    </div>
  );
}
