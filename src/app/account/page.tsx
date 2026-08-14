import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PanelCard, StatCard } from "@/components/panel/PanelShell";
import {
  accountOrders,
  accountUser,
  orderStatusClass,
  orderStatusLabel,
} from "@/data/panels";
import { formatToman } from "@/lib/utils";

export default function AccountDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[20px] bg-[linear-gradient(135deg,#4f2f7c_0%,#6b4a96_55%,#f84209_140%)] p-6 text-white sm:p-7">
        <p className="text-[13px] text-white/75">سلام، {accountUser.name}</p>
        <h2 className="mt-1 text-[24px] font-bold">به پنل مسکوا خوش آمدید</h2>
        <p className="mt-2 max-w-xl text-[14px] text-white/85">
          سفارش‌ها، کیف پول و اقساط سفر را از اینجا مدیریت کنید. این نسخه دمو است.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/flights" variant="white">
            رزرو پرواز جدید
          </Button>
          <Button
            href="/account/orders"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10"
          >
            مشاهده سفارش‌ها
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="سطح باشگاه" value={accountUser.tier} hint="۲٬۵۲۰ امتیاز تا طلایی" />
        <StatCard
          label="امتیاز"
          value={accountUser.points.toLocaleString("fa-IR")}
        />
        <StatCard label="سفارش فعال" value="۱" />
        <StatCard label="موجودی کیف پول" value={`${formatToman(4610000)}`} hint="تومان" />
      </div>

      <PanelCard
        title="آخرین سفارش‌ها"
        action={
          <Link href="/account/orders" className="text-[13px] font-medium text-moscowa-purple">
            همه سفارش‌ها
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-right text-[13px]">
            <thead>
              <tr className="border-b border-moscowa-border text-moscowa-text-muted">
                <th className="pb-3 font-medium">شماره</th>
                <th className="pb-3 font-medium">خدمت</th>
                <th className="pb-3 font-medium">عنوان</th>
                <th className="pb-3 font-medium">مبلغ</th>
                <th className="pb-3 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {accountOrders.slice(0, 4).map((order) => (
                <tr key={order.id} className="border-b border-moscowa-border/70">
                  <td className="py-3 font-medium text-moscowa-purple" dir="ltr">
                    {order.id}
                  </td>
                  <td className="py-3 text-moscowa-text-secondary">{order.type}</td>
                  <td className="py-3 text-moscowa-text">{order.title}</td>
                  <td className="py-3 text-moscowa-text">
                    {formatToman(order.amount)}
                  </td>
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
