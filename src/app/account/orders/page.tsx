import { Button } from "@/components/ui/Button";
import { PanelCard } from "@/components/panel/PanelShell";
import {
  accountOrders,
  orderStatusClass,
  orderStatusLabel,
} from "@/data/panels";
import { formatToman } from "@/lib/utils";

export default function AccountOrdersPage() {
  return (
    <PanelCard
      title="سفارش‌های من"
      action={
        <Button href="/flights" size="sm">
          خرید جدید
        </Button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-right text-[13px]">
          <thead>
            <tr className="border-b border-moscowa-border text-moscowa-text-muted">
              <th className="pb-3 font-medium">شماره سفارش</th>
              <th className="pb-3 font-medium">نوع</th>
              <th className="pb-3 font-medium">جزئیات</th>
              <th className="pb-3 font-medium">تاریخ</th>
              <th className="pb-3 font-medium">مبلغ</th>
              <th className="pb-3 font-medium">وضعیت</th>
              <th className="pb-3 font-medium">اقدام</th>
            </tr>
          </thead>
          <tbody>
            {accountOrders.map((order) => (
              <tr key={order.id} className="border-b border-moscowa-border/70">
                <td className="py-3 font-medium text-moscowa-purple" dir="ltr">
                  {order.id}
                </td>
                <td className="py-3">{order.type}</td>
                <td className="py-3 text-moscowa-text">{order.title}</td>
                <td className="py-3 text-moscowa-text-secondary">{order.date}</td>
                <td className="py-3">{formatToman(order.amount)}</td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${orderStatusClass[order.status]}`}
                  >
                    {orderStatusLabel[order.status]}
                  </span>
                </td>
                <td className="py-3">
                  <Button href={`/account/orders/${order.id}`} size="sm" variant="outline">
                    جزئیات
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  );
}
