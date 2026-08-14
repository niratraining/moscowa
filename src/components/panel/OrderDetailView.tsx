import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";
import {
  accountOrders,
  adminOrders,
  orderStatusClass,
  orderStatusLabel,
  type PanelOrder,
} from "@/data/panels";
import { formatToman } from "@/lib/utils";

function findOrder(id: string, pool: PanelOrder[]) {
  return pool.find((item) => item.id === id);
}

export function OrderDetailView({
  order,
  backHref,
  admin = false,
}: {
  order: PanelOrder;
  backHref: string;
  admin?: boolean;
}) {
  return (
    <div className="space-y-6">
      <PanelCard
        title={`سفارش ${order.id}`}
        action={
          <Button href={backHref} variant="outline" size="sm">
            بازگشت
          </Button>
        }
      >
        <dl className="grid gap-4 sm:grid-cols-2 text-[14px]">
          <div className="rounded-2xl bg-moscowa-bg-secondary p-4">
            <dt className="text-moscowa-text-muted">نوع خدمت</dt>
            <dd className="mt-1 font-bold text-moscowa-text">{order.type}</dd>
          </div>
          <div className="rounded-2xl bg-moscowa-bg-secondary p-4">
            <dt className="text-moscowa-text-muted">وضعیت</dt>
            <dd className="mt-1">
              <span
                className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${orderStatusClass[order.status]}`}
              >
                {orderStatusLabel[order.status]}
              </span>
            </dd>
          </div>
          <div className="rounded-2xl bg-moscowa-bg-secondary p-4 sm:col-span-2">
            <dt className="text-moscowa-text-muted">جزئیات</dt>
            <dd className="mt-1 font-bold text-moscowa-text">{order.title}</dd>
          </div>
          <div className="rounded-2xl bg-moscowa-bg-secondary p-4">
            <dt className="text-moscowa-text-muted">تاریخ</dt>
            <dd className="mt-1 font-bold text-moscowa-text">{order.date}</dd>
          </div>
          <div className="rounded-2xl bg-moscowa-bg-secondary p-4">
            <dt className="text-moscowa-text-muted">مبلغ</dt>
            <dd className="mt-1 font-bold text-moscowa-purple">
              {formatToman(order.amount)} تومان
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-3">
          <ActionButton message="دانلود بلیط/واچر شبیه‌سازی شد">
            دانلود مدارک
          </ActionButton>
          {admin ? (
            <ActionButton
              variant="outline"
              message="درخواست استرداد برای ادمین ثبت شد"
            >
              ثبت استرداد
            </ActionButton>
          ) : (
            <Button href="/account/tickets" variant="outline">
              پشتیبانی سفارش
            </Button>
          )}
        </div>
      </PanelCard>
    </div>
  );
}

export function getAccountOrder(id: string) {
  const order = findOrder(id, accountOrders);
  if (!order) notFound();
  return order;
}

export function getAdminOrder(id: string) {
  const order = findOrder(id, adminOrders);
  if (!order) notFound();
  return order;
}

export function OrderNotFound({ backHref }: { backHref: string }) {
  return (
    <PanelCard title="سفارش یافت نشد">
      <p className="text-[14px] text-moscowa-text-secondary">
        این شماره سفارش در داده دمو وجود ندارد.
      </p>
      <Link href={backHref} className="mt-4 inline-flex text-moscowa-purple">
        بازگشت
      </Link>
    </PanelCard>
  );
}
