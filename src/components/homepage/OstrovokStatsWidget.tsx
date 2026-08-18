import { getOstrovokDailyStats } from "@/lib/ostrovok-stats";

export async function OstrovokStatsWidget() {
  const stats = await getOstrovokDailyStats();

  if (!stats) return null;

  return (
    <section className="container-page pb-8" aria-label="آمار روزانه هتل‌های اسکن‌شده">
      <div className="grid grid-cols-3 gap-3 rounded-2xl border border-moscowa-border bg-white p-4 sm:p-6">
        <div className="text-center">
          <p className="text-[20px] font-bold text-moscowa-text sm:text-[24px]">
            {stats.hotelsCount.toLocaleString("fa-IR")}
          </p>
          <p className="mt-1 text-[12px] text-moscowa-text-muted">هتل رصدشده</p>
        </div>
        <div className="text-center">
          <p className="text-[20px] font-bold text-moscowa-text sm:text-[24px]">
            {stats.avgAvailabilityPercent !== null
              ? `${Math.round(stats.avgAvailabilityPercent)}٪`
              : "—"}
          </p>
          <p className="mt-1 text-[12px] text-moscowa-text-muted">میانگین موجودی</p>
        </div>
        <div className="text-center">
          <p className="text-[20px] font-bold text-moscowa-text sm:text-[24px]">
            {stats.avgMinPrice !== null ? `$${Math.round(stats.avgMinPrice)}` : "—"}
          </p>
          <p className="mt-1 text-[12px] text-moscowa-text-muted">میانگین کمترین قیمت</p>
        </div>
      </div>
    </section>
  );
}
