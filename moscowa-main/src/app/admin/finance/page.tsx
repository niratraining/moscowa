import { PanelCard, StatCard } from "@/components/panel/PanelShell";
import { formatToman } from "@/lib/utils";

export default function AdminFinancePage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="درآمد این ماه" value={formatToman(1864000000)} hint="تومان" />
        <StatCard label="استردادها" value={formatToman(42800000)} />
        <StatCard label="کارمزد درگاه" value={formatToman(12600000)} />
      </div>
      <PanelCard title="خلاصه جریان نقدی (دمو)">
        <ul className="space-y-3 text-[14px]">
          {[
            ["پرداخت موفق درگاه", "+ ۱٫۴۲B"],
            ["کیف پول", "+ ۱۸۶M"],
            ["اقساط وصول‌شده", "+ ۹۴M"],
            ["استرداد به کاربر", "- ۴۲M"],
          ].map(([label, value]) => (
            <li
              key={label}
              className="flex items-center justify-between rounded-2xl bg-moscowa-bg-secondary px-4 py-3"
            >
              <span className="text-moscowa-text">{label}</span>
              <span className="font-bold text-moscowa-purple" dir="ltr">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </PanelCard>
    </div>
  );
}
