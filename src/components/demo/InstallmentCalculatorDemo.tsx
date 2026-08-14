"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatToman } from "@/lib/utils";

const plans = [
  { id: "3", months: 3, rateLabel: "۰٪ کارمزد" },
  { id: "6", months: 6, rateLabel: "کارمزد کم" },
  { id: "12", months: 12, rateLabel: "منعطف‌ترین" },
];

export function InstallmentCalculatorDemo() {
  const [amount, setAmount] = useState(48000000);
  const [planId, setPlanId] = useState("12");
  const plan = plans.find((p) => p.id === planId) ?? plans[2];
  const monthly = useMemo(
    () => Math.round(amount / plan.months),
    [amount, plan.months],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[22px] border border-moscowa-border bg-white p-5 sm:p-7">
        <p className="text-[13px] font-medium text-moscowa-orange">ماشین‌حساب دمو</p>
        <h2 className="mt-2 text-[22px] font-bold text-moscowa-text">
          برنامه اقساط سفر را ببینید
        </h2>
        <label className="mt-6 block text-[13px] text-moscowa-text-secondary">
          مبلغ کل سفر (تومان)
          <input
            type="range"
            min={10000000}
            max={90000000}
            step={1000000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--color-moscowa-purple)]"
          />
          <span className="mt-2 block text-[20px] font-bold text-moscowa-purple">
            {formatToman(amount)} تومان
          </span>
        </label>

        <div className="mt-6 flex flex-wrap gap-2">
          {plans.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPlanId(item.id)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium ${
                planId === item.id
                  ? "bg-moscowa-purple text-white"
                  : "bg-moscowa-bg-secondary text-moscowa-text-secondary"
              }`}
            >
              {item.months.toLocaleString("fa-IR")} قسط · {item.rateLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[22px] bg-[linear-gradient(160deg,#4f2f7c_0%,#6b4a96_55%,#f84209_140%)] p-6 text-white sm:p-8">
        <p className="text-[13px] text-white/75">قسط ماهانه تقریبی</p>
        <p className="mt-2 text-[32px] font-bold">
          {formatToman(monthly)}
          <span className="mr-1 text-[16px] font-medium">تومان</span>
        </p>
        <ul className="mt-6 space-y-2 text-[14px] text-white/90">
          <li>پیش‌پرداخت در طرح‌های منتخب: صفر</li>
          <li>پوشش پرواز، هتل و تور</li>
          <li>بررسی اعتبار آنلاین در کمتر از چند دقیقه</li>
        </ul>
        <Button href="/installment/credit-check" variant="white" size="lg" className="mt-8">
          بررسی اعتبار سفر
        </Button>
      </div>
    </div>
  );
}
