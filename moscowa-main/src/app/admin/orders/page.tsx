"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";
import {
  adminOrders,
  orderStatusClass,
  orderStatusLabel,
} from "@/data/panels";
import { formatToman } from "@/lib/utils";

const filters = [
  { id: "all", label: "همه" },
  { id: "issued", label: "صادر شده" },
  { id: "pending", label: "در انتظار" },
  { id: "refunded", label: "استرداد" },
] as const;

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const rows =
    filter === "all"
      ? adminOrders
      : adminOrders.filter((order) => order.status === filter);

  return (
    <PanelCard title="مدیریت سفارش‌ها">
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
              filter === item.id
                ? "bg-moscowa-purple text-white"
                : "bg-moscowa-bg-secondary text-moscowa-text-secondary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-right text-[13px]">
          <thead>
            <tr className="border-b border-moscowa-border text-moscowa-text-muted">
              <th className="pb-3 font-medium">شماره</th>
              <th className="pb-3 font-medium">نوع</th>
              <th className="pb-3 font-medium">عنوان</th>
              <th className="pb-3 font-medium">تاریخ</th>
              <th className="pb-3 font-medium">مبلغ</th>
              <th className="pb-3 font-medium">وضعیت</th>
              <th className="pb-3 font-medium">اقدام</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => (
              <tr key={order.id} className="border-b border-moscowa-border/70">
                <td className="py-3 font-medium text-moscowa-purple" dir="ltr">
                  {order.id}
                </td>
                <td className="py-3">{order.type}</td>
                <td className="py-3">{order.title}</td>
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
                  <div className="flex gap-2">
                    <Button
                      href={`/admin/orders/${order.id}`}
                      size="sm"
                      variant="outline"
                    >
                      مشاهده
                    </Button>
                    <ActionButton
                      size="sm"
                      variant="ghost"
                      message={`استرداد برای ${order.id} ثبت شد`}
                    >
                      استرداد
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  );
}
