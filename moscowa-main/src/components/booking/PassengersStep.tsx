"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { BookingSummary } from "@/components/booking/BookingSummary";
import {
  BOOKING_STORAGE_KEY,
  buildBookingHref,
  calcBookingTotal,
  createBookingDraft,
  type BookingDraft,
  type BookingItem,
  type PassengerDraft,
} from "@/lib/booking";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[13px] text-moscowa-text-secondary">
      <span className="mb-1.5 block font-medium text-moscowa-text">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-moscowa-border bg-white px-3 text-[14px] text-moscowa-text outline-none transition focus:border-moscowa-purple focus:ring-2 focus:ring-moscowa-purple/20";

export function PassengersStep({ item }: { item: BookingItem }) {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft>(() => createBookingDraft(item));
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as BookingDraft;
      if (parsed.type === item.type && parsed.id === item.id) {
        setDraft({
          ...parsed,
          roomId: item.roomId ?? parsed.roomId,
        });
      }
    } catch {
      /* ignore */
    }
  }, [item.id, item.roomId, item.type]);

  const total = useMemo(
    () => calcBookingTotal(item.price, draft.extras, draft.passengers.length),
    [draft.extras, draft.passengers.length, item.price],
  );

  const extrasLabels = [
    draft.extras.flexibleRefund ? "بسته استرداد منعطف" : "",
    draft.extras.insurance ? "بیمه مسافرتی" : "",
  ].filter(Boolean);

  function updatePassenger(
    index: number,
    key: keyof PassengerDraft,
    value: string,
  ) {
    setDraft((prev) => {
      const passengers = prev.passengers.map((passenger, i) =>
        i === index ? { ...passenger, [key]: value } : passenger,
      );
      return { ...prev, passengers };
    });
  }

  function addPassenger() {
    setDraft((prev) => ({
      ...prev,
      passengers: [
        ...prev.passengers,
        {
          firstName: "",
          lastName: "",
          nationalId: "",
          gender: "",
          birthDate: "",
          phone: "",
          email: "",
        },
      ],
    }));
  }

  function removePassenger(index: number) {
    setDraft((prev) => ({
      ...prev,
      passengers:
        prev.passengers.length <= 1
          ? prev.passengers
          : prev.passengers.filter((_, i) => i !== index),
    }));
  }

  function validate() {
    for (const passenger of draft.passengers) {
      if (
        !passenger.firstName.trim() ||
        !passenger.lastName.trim() ||
        !passenger.nationalId.trim() ||
        !passenger.gender
      ) {
        return "لطفاً نام، نام خانوادگی، کد ملی و جنسیت همه مسافران را کامل کنید.";
      }
    }
    if (!draft.contactPhone.trim()) {
      return "شماره موبایل تماس الزامی است.";
    }
    return "";
  }

  function continueToPayment() {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(draft));
    router.push(buildBookingHref("payment", item));
  }

  return (
    <div className="container-page section-spacing !pt-8">
      <BookingStepper current="passengers" />

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[13px] text-moscowa-orange">نسخه دمو فلوی رزرو</p>
          <h1 className="mt-1 text-[24px] font-bold text-moscowa-text sm:text-[28px]">
            اطلاعات مسافران
          </h1>
          <p className="mt-2 text-[14px] text-moscowa-text-secondary">
            مثل فلای‌تودی؛ مشخصات را دقیق وارد کنید تا بلیط/واچر درست صادر شود.
          </p>
        </div>
        <Link
          href={item.backHref}
          className="text-[13px] font-medium text-moscowa-purple hover:underline"
        >
          بازگشت به انتخاب
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          {draft.passengers.map((passenger, index) => (
            <section
              key={index}
              className="rounded-[22px] border border-moscowa-border bg-white p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[16px] font-bold text-moscowa-text">
                  مسافر {(index + 1).toLocaleString("fa-IR")}
                </h2>
                {draft.passengers.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removePassenger(index)}
                    className="text-[13px] text-moscowa-orange hover:underline"
                  >
                    حذف
                  </button>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="نام (فارسی)">
                  <input
                    className={inputClass}
                    value={passenger.firstName}
                    onChange={(e) =>
                      updatePassenger(index, "firstName", e.target.value)
                    }
                    placeholder="مثلاً مهدی"
                  />
                </Field>
                <Field label="نام خانوادگی (فارسی)">
                  <input
                    className={inputClass}
                    value={passenger.lastName}
                    onChange={(e) =>
                      updatePassenger(index, "lastName", e.target.value)
                    }
                    placeholder="مثلاً معظمی"
                  />
                </Field>
                <Field label="کد ملی / پاسپورت">
                  <input
                    className={inputClass}
                    value={passenger.nationalId}
                    onChange={(e) =>
                      updatePassenger(index, "nationalId", e.target.value)
                    }
                    placeholder="۰۰۱۰۰۰۰۰۰۰"
                    dir="ltr"
                  />
                </Field>
                <Field label="جنسیت">
                  <select
                    className={inputClass}
                    value={passenger.gender}
                    onChange={(e) =>
                      updatePassenger(index, "gender", e.target.value)
                    }
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                </Field>
                <Field label="تاریخ تولد">
                  <input
                    className={inputClass}
                    value={passenger.birthDate}
                    onChange={(e) =>
                      updatePassenger(index, "birthDate", e.target.value)
                    }
                    placeholder="۱۳۷۰/۰۱/۰۱"
                  />
                </Field>
              </div>
            </section>
          ))}

          <button
            type="button"
            onClick={addPassenger}
            className="w-full rounded-[18px] border border-dashed border-moscowa-purple/40 bg-[color-mix(in_srgb,var(--color-moscowa-purple)_4%,white)] px-4 py-3 text-[14px] font-medium text-moscowa-purple hover:bg-[color-mix(in_srgb,var(--color-moscowa-purple)_8%,white)]"
          >
            + افزودن مسافر
          </button>

          <section className="rounded-[22px] border border-moscowa-border bg-white p-5 sm:p-6">
            <h2 className="text-[16px] font-bold text-moscowa-text">اطلاعات تماس</h2>
            <p className="mt-1 text-[13px] text-moscowa-text-secondary">
              بلیط و وضعیت سفارش به این شماره/ایمیل ارسال می‌شود.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="موبایل">
                <input
                  className={inputClass}
                  value={draft.contactPhone}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, contactPhone: e.target.value }))
                  }
                  placeholder="۰۹۱۲xxxxxxx"
                  dir="ltr"
                />
              </Field>
              <Field label="ایمیل (اختیاری)">
                <input
                  className={inputClass}
                  value={draft.contactEmail}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, contactEmail: e.target.value }))
                  }
                  placeholder="you@email.com"
                  dir="ltr"
                />
              </Field>
            </div>
          </section>

          <section className="rounded-[22px] border border-moscowa-border bg-white p-5 sm:p-6">
            <h2 className="text-[16px] font-bold text-moscowa-text">خدمات تکمیلی</h2>
            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-moscowa-bg-secondary p-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[var(--color-moscowa-purple)]"
                  checked={draft.extras.flexibleRefund}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      extras: {
                        ...prev.extras,
                        flexibleRefund: e.target.checked,
                      },
                    }))
                  }
                />
                <span>
                  <span className="block text-[14px] font-semibold text-moscowa-text">
                    بسته استرداد منعطف
                  </span>
                  <span className="mt-1 block text-[13px] text-moscowa-text-secondary">
                    امکان لغو آسان‌تر با کارمزد کمتر · ۱۸۰٬۰۰۰ تومان برای هر مسافر
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-moscowa-bg-secondary p-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[var(--color-moscowa-purple)]"
                  checked={draft.extras.insurance}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      extras: { ...prev.extras, insurance: e.target.checked },
                    }))
                  }
                />
                <span>
                  <span className="block text-[14px] font-semibold text-moscowa-text">
                    بیمه مسافرتی
                  </span>
                  <span className="mt-1 block text-[13px] text-moscowa-text-secondary">
                    پوشش درمانی پایه سفر · ۳۲۰٬۰۰۰ تومان برای هر مسافر
                  </span>
                </span>
              </label>
            </div>
          </section>

          {error ? (
            <p className="rounded-2xl bg-orange-50 px-4 py-3 text-[13px] text-moscowa-orange">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={continueToPayment}>
              ادامه فرآیند خرید
            </Button>
            <Button href={item.backHref} size="lg" variant="outline">
              انصراف
            </Button>
          </div>
        </div>

        <BookingSummary
          item={item}
          total={total}
          passengerCount={draft.passengers.length}
          extrasLabels={extrasLabels}
        />
      </div>
    </div>
  );
}
