"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard, StatCard } from "@/components/panel/PanelShell";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="نرخ تبدیل جستجو→خرید" value="۴٫۸٪" />
        <StatCard label="میانگین مبلغ سفارش" value="۶٫۲M" />
        <StatCard label="NPS پشتیبانی" value="۶۸" />
      </div>
      <PanelCard title="گزارش‌های آماده دانلود">
        <ul className="space-y-3">
          {[
            "فروش روزانه پرواز",
            "عملکرد هتل‌ها",
            "اقساط معوق",
            "تیکت‌های حل‌نشده",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center justify-between rounded-2xl bg-moscowa-bg-secondary px-4 py-3 text-[14px]"
            >
              <span className="text-moscowa-text">{item}</span>
              <ActionButton
                size="sm"
                variant="ghost"
                message={`دانلود «${item}» شروع شد`}
              >
                دانلود CSV
              </ActionButton>
            </li>
          ))}
        </ul>
      </PanelCard>
    </div>
  );
}
