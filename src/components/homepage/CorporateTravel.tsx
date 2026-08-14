import { BriefcaseBusiness, ChartColumn, CreditCard, ShieldCheck, Users, WalletCards } from "lucide-react";
import { corporateFeatures } from "@/data/homepage";
import { Button } from "@/components/ui/Button";

const featureIcons = [Users, ShieldCheck, ChartColumn, WalletCards, BriefcaseBusiness, CreditCard];

export function CorporateTravel() {
  return (
    <section className="bg-moscowa-bg-secondary" aria-labelledby="corporate-title">
      <div className="container-page section-spacing">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="corporate-title"
              className="text-[24px] font-bold text-moscowa-text sm:text-[30px] lg:text-[32px]"
            >
              سفرهای سازمانی، بدون دردسر
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-8 text-moscowa-text-secondary">
              مدیریت متمرکز سفر کارکنان، کنترل هزینه و گزارش‌گیری در یک پنل.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {corporateFeatures.map((feature, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-moscowa-border bg-white px-4 py-3"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_8%,white)] text-moscowa-purple">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[14px] font-medium text-moscowa-text">
                      {feature}
                    </span>
                  </li>
                );
              })}
            </ul>

            <Button href="/corporate/request" variant="secondary" size="lg" className="mt-8">
              درخواست پنل سازمانی
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-[24px] border border-moscowa-border bg-white p-4 shadow-card sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-moscowa-text-muted">پنل سازمانی</p>
                  <p className="text-[18px] font-bold text-moscowa-text">
                    داشبورد سفر شرکت
                  </p>
                </div>
                <span className="rounded-full bg-moscowa-purple/10 px-3 py-1 text-[12px] font-medium text-moscowa-purple">
                  Live Preview
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "هزینه ماه", value: "۲۴۸ م" },
                  { label: "سفر فعال", value: "۳۷" },
                  { label: "صرفه‌جویی", value: "۱۸٪" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-moscowa-bg-secondary p-4"
                  >
                    <p className="text-[12px] text-moscowa-text-muted">{item.label}</p>
                    <p className="mt-1 text-[22px] font-bold text-moscowa-purple">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {["تهران → دبی · بیزینس", "اصفهان → تهران · اکونومی", "تهران → استانبول · تور"].map(
                  (row) => (
                    <div
                      key={row}
                      className="flex items-center justify-between rounded-xl border border-moscowa-border px-3 py-3 text-[13px]"
                    >
                      <span className="text-moscowa-text">{row}</span>
                      <span className="text-moscowa-text-muted">تأیید شده</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
