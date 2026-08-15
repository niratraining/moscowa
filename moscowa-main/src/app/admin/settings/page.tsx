"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";

export default function AdminSettingsPage() {
  const [brand, setBrand] = useState("مسکوا");
  const [phone, setPhone] = useState("۰۲۱-۴۱۵۶۷");
  const [email, setEmail] = useState("support@moscowa.ir");

  return (
    <div className="space-y-6">
      <PanelCard title="تنظیمات عمومی">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-[13px]">
            <span className="mb-1.5 block font-medium text-moscowa-text">نام برند</span>
            <input
              className="h-11 w-full rounded-xl border border-moscowa-border px-3"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
          <label className="text-[13px]">
            <span className="mb-1.5 block font-medium text-moscowa-text">تلفن پشتیبانی</span>
            <input
              className="h-11 w-full rounded-xl border border-moscowa-border px-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
            />
          </label>
          <label className="text-[13px] sm:col-span-2">
            <span className="mb-1.5 block font-medium text-moscowa-text">ایمیل پشتیبانی</span>
            <input
              className="h-11 w-full rounded-xl border border-moscowa-border px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
            />
          </label>
        </div>
        <ActionButton className="mt-5" message="تنظیمات ذخیره شد" successLabel="ذخیره شد">
          ذخیره تنظیمات
        </ActionButton>
      </PanelCard>

      <PanelCard title="درگاه و پرداخت">
        <ul className="space-y-3 text-[14px]">
          {[
            ["درگاه بانکی", "فعال"],
            ["کیف پول", "فعال"],
            ["سفر اقساطی", "فعال (دمو)"],
          ].map(([label, status]) => (
            <li
              key={label}
              className="flex items-center justify-between rounded-2xl bg-moscowa-bg-secondary px-4 py-3"
            >
              <span>{label}</span>
              <ActionButton
                size="sm"
                variant="outline"
                message={`وضعیت «${label}» به‌روز شد`}
              >
                {status}
              </ActionButton>
            </li>
          ))}
        </ul>
      </PanelCard>
    </div>
  );
}
