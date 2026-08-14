"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { BookingStepper } from "@/components/booking/BookingStepper";
import {
  BOOKING_STORAGE_KEY,
  calcBookingTotal,
  formatBookingPrice,
  type BookingDraft,
  type BookingItem,
} from "@/lib/booking";

export function SuccessStep({
  item,
  order,
}: {
  item: BookingItem;
  order: string;
}) {
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
      if (raw) setDraft(JSON.parse(raw) as BookingDraft);
    } catch {
      /* ignore */
    }
  }, []);

  const total = useMemo(() => {
    if (!draft) return item.price;
    return calcBookingTotal(item.price, draft.extras, draft.passengers.length);
  }, [draft, item.price]);

  return (
    <div className="container-page section-spacing !pt-8">
      <BookingStepper current="success" />

      <div className="mx-auto max-w-2xl rounded-[24px] border border-moscowa-border bg-white p-6 text-center shadow-card sm:p-10">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-[26px] font-bold text-moscowa-text sm:text-[30px]">
          رزرو با موفقیت ثبت شد
        </h1>
        <p className="mt-3 text-[14px] leading-7 text-moscowa-text-secondary">
          این یک صدور دمو است. در نسخه واقعی، بلیط/واچر بلافاصله صادر و به ایمیل و
          پنل کاربری ارسال می‌شود.
        </p>

        <div className="mt-6 rounded-[18px] bg-moscowa-bg-secondary p-5 text-right">
          <div className="flex items-center justify-between gap-3 text-[14px]">
            <span className="text-moscowa-text-muted">شماره سفارش</span>
            <span className="font-bold text-moscowa-purple" dir="ltr">
              {order}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-moscowa-text-muted">خدمت</span>
            <span className="font-medium text-moscowa-text">{item.typeLabel}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-moscowa-text-muted">جزئیات</span>
            <span className="max-w-[60%] text-left font-medium text-moscowa-text">
              {item.title}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-moscowa-text-muted">مبلغ</span>
            <span className="font-bold text-moscowa-text">
              {formatBookingPrice(total)}
            </span>
          </div>
        </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ActionButton size="lg" message="دانلود بلیط/واچر شبیه‌سازی شد">
              <Download className="h-4 w-4" />
              دانلود بلیط / واچر
            </ActionButton>
            <Button href="/account/orders" size="lg" variant="outline">
              مشاهده در پنل کاربری
            </Button>
            <Button href="/" size="lg" variant="ghost">
              <Home className="h-4 w-4" />
              صفحه اصلی
            </Button>
          </div>
      </div>
    </div>
  );
}
