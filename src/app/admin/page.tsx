import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PanelCard, StatCard } from "@/components/panel/PanelShell";
import {
  adminOrders,
  adminSalesSeries,
  adminStats,
  adminSupport,
  orderStatusClass,
  orderStatusLabel,
} from "@/data/panels";
import { formatToman } from "@/lib/utils";

export default function AdminDashboardPage() {
  const max = Math.max(...adminSalesSeries.map((item) => item.value));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            hint={`${stat.change} نسبت به دیروز`}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <PanelCard
          title="فروش ۷ روز اخیر"
          action={
            <Link href="/admin/reports" className="text-[13px] text-moscowa-purple">
              گزارش کامل
            </Link>
          }
        >
          <div className="flex h-48 items-end gap-3">
            {adminSalesSeries.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-[linear-gradient(180deg,#6b4a96,#4f2f7c)]"
                  style={{ height: `${(item.value / max) * 100}%` }}
                  title={`${item.value}`}
                />
                <span className="text-[12px] text-moscowa-text-muted">{item.day}</span>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="تیکت‌های فوری">
          <ul className="space-y-3">
            {adminSupport.slice(0, 3).map((ticket) => (
              <li
                key={ticket.id}
                className="rounded-2xl bg-moscowa-bg-secondary px-4 py-3"
              >
                <p className="text-[12px] text-moscowa-text-muted" dir="ltr">
                  {ticket.id}
                </p>
                <p className="mt-1 text-[14px] font-semibold text-moscowa-text">
                  {ticket.subject}
                </p>
                <p className="mt-1 text-[12px] text-moscowa-text-secondary">
                  {ticket.user} · اولویت {ticket.priority}
                </p>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <PanelCard
        title="آخرین سفارش‌ها"
        action={
          <Button href="/admin/orders" size="sm" variant="outline">
            مدیریت سفارش‌ها
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-right text-[13px]">
            <thead>
              <tr className="border-b border-moscowa-border text-moscowa-text-muted">
                <th className="pb-3 font-medium">شماره</th>
                <th className="pb-3 font-medium">نوع</th>
                <th className="pb-3 font-medium">عنوان</th>
                <th className="pb-3 font-medium">مبلغ</th>
                <th className="pb-3 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {adminOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-moscowa-border/70">
                  <td className="py-3 font-medium text-moscowa-purple" dir="ltr">
                    {order.id}
                  </td>
                  <td className="py-3">{order.type}</td>
                  <td className="py-3">{order.title}</td>
                  <td className="py-3">{formatToman(order.amount)}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${orderStatusClass[order.status]}`}
                    >
                      {orderStatusLabel[order.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </div>
  );
}
