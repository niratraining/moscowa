"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { BookingSummary } from "@/components/booking/BookingSummary";
import {
  BOOKING_STORAGE_KEY,
  buildBookingHref,
  calcBookingTotal,
  createBookingDraft,
  generateOrderCode,
  type BookingDraft,
  type BookingItem,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

type PayMethod = "gateway" | "wallet" | "installment";

export function PaymentStep({ item }: { item: BookingItem }) {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft>(() => createBookingDraft(item));
  const [method, setMethod] = useState<PayMethod>("gateway");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
      if (!raw) {
        router.replace(buildBookingHref("passengers", item));
        return;
      }
      const parsed = JSON.parse(raw) as BookingDraft;
      if (parsed.type !== item.type || parsed.id !== item.id) {
        router.replace(buildBookingHref("passengers", item));
        return;
      }
      setDraft(parsed);
    } catch {
      router.replace(buildBookingHref("passengers", item));
    }
  }, [item, router]);

  const total = useMemo(
    () => calcBookingTotal(item.price, draft.extras, draft.passengers.length),
    [draft.extras, draft.passengers.length, item.price],
  );

  const extrasLabels = [
    draft.extras.flexibleRefund ? "بسته استرداد منعطف" : "",
    draft.extras.insurance ? "بیمه مسافرتی" : "",
  ].filter(Boolean);

  function pay() {
    if (!draft.acceptTerms) {
      setError("برای ادامه، قوانین و مقررات را بپذیرید.");
      return;
    }
    setError("");
    setLoading(true);
    const order = generateOrderCode();
    sessionStorage.setItem(
      BOOKING_STORAGE_KEY,
      JSON.stringify({ ...draft, order, method, discount }),
    );
    window.setTimeout(() => {
      router.push(buildBookingHref("success", item, { order }));
    }, 700);
  }

  const methods: {
    id: PayMethod;
    title: string;
    desc: string;
    icon: typeof CreditCard;
  }[] = [
    {
      id: "gateway",
      title: "درگاه بانکی",
      desc: "پرداخت آنی با کارت شتاب",
      icon: CreditCard,
    },
    {
      id: "wallet",
      title: "کیف پول مسکوا",
      desc: "کسر از موجودی کیف پول",
      icon: Wallet,
    },
    {
      id: "installment",
      title: "سفر اقساطی",
      desc: "الان رزرو، بعداً پرداخت",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="container-page section-spacing !pt-8">
      <BookingStepper current="payment" />

      <div className="mb-6">
        <p className="text-[13px] text-moscowa-orange">نسخه دمو فلوی رزرو</p>
        <h1 className="mt-1 text-[24px] font-bold text-moscowa-text sm:text-[28px]">
          پرداخت و نهایی‌سازی
        </h1>
        <p className="mt-2 text-[14px] text-moscowa-text-secondary">
          روش پرداخت را انتخاب کنید؛ در نسخه دمو به درگاه واقعی وصل نمی‌شود.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <section className="rounded-[22px] border border-moscowa-border bg-white p-5 sm:p-6">
            <h2 className="text-[16px] font-bold text-moscowa-text">روش پرداخت</h2>
            <div className="mt-4 grid gap-3">
              {methods.map((itemMethod) => {
                const Icon = itemMethod.icon;
                const active = method === itemMethod.id;
                return (
                  <button
                    key={itemMethod.id}
                    type="button"
                    onClick={() => setMethod(itemMethod.id)}
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-4 text-right transition",
                      active
                        ? "border-moscowa-purple bg-[color-mix(in_srgb,var(--color-moscowa-purple)_6%,white)]"
                        : "border-moscowa-border hover:border-moscowa-purple/40",
                    )}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-moscowa-bg-secondary text-moscowa-purple">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[14px] font-bold text-moscowa-text">
                        {itemMethod.title}
                      </span>
                      <span className="mt-1 block text-[13px] text-moscowa-text-secondary">
                        {itemMethod.desc}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[22px] border border-moscowa-border bg-white p-5 sm:p-6">
            <h2 className="text-[16px] font-bold text-moscowa-text">کد تخفیف</h2>
            <div className="mt-3 flex gap-2">
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="مثلاً MOSCOWA1405"
                className="h-11 flex-1 rounded-xl border border-moscowa-border px-3 text-[14px]"
                dir="ltr"
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  if (!discount.trim()) {
                    setError("کد تخفیف را وارد کنید");
                    return;
                  }
                  setError("");
                  window.dispatchEvent(
                    new CustomEvent("moscowa-toast", {
                      detail: `کد ${discount} اعمال شد (دمو)`,
                    }),
                  );
                }}
              >
                ثبت
              </Button>
            </div>
          </section>

          <section className="rounded-[22px] border border-moscowa-border bg-white p-5 sm:p-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--color-moscowa-purple)]"
                checked={draft.acceptTerms}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, acceptTerms: e.target.checked }))
                }
              />
              <span className="text-[14px] leading-7 text-moscowa-text-secondary">
                قوانین و مقررات مسکوا، شرایط استرداد و قیمت نهایی را می‌پذیرم.
              </span>
            </label>
          </section>

          {error ? (
            <p className="rounded-2xl bg-orange-50 px-4 py-3 text-[13px] text-moscowa-orange">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={pay} disabled={loading}>
              {loading ? "در حال انتقال..." : "تایید و پرداخت"}
            </Button>
            <Button href={buildBookingHref("passengers", item)} size="lg" variant="outline">
              بازگشت
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
