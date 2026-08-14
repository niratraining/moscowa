import Image from "next/image";
import type { BookingItem } from "@/lib/booking";
import { formatBookingPrice } from "@/lib/booking";

export function BookingSummary({
  item,
  total,
  extrasLabels = [],
  passengerCount,
}: {
  item: BookingItem;
  total: number;
  extrasLabels?: string[];
  passengerCount: number;
}) {
  return (
    <aside className="h-fit rounded-[22px] border border-moscowa-border bg-white p-5 shadow-card lg:sticky lg:top-28">
      <p className="text-[12px] font-medium text-moscowa-orange">{item.typeLabel}</p>
      <h2 className="mt-1 text-[17px] font-bold text-moscowa-text">{item.title}</h2>
      <p className="mt-1 text-[13px] text-moscowa-text-secondary">{item.subtitle}</p>

      {item.image ? (
        <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="300px"
          />
        </div>
      ) : null}

      <ul className="mt-4 space-y-2 border-t border-moscowa-border pt-4 text-[13px] text-moscowa-text-secondary">
        {item.meta.map((line) => (
          <li key={line}>• {line}</li>
        ))}
        <li>• تعداد مسافر: {passengerCount.toLocaleString("fa-IR")}</li>
        {extrasLabels.map((label) => (
          <li key={label}>• {label}</li>
        ))}
      </ul>

      <div className="mt-5 rounded-2xl bg-moscowa-bg-secondary p-4">
        <div className="flex items-center justify-between text-[13px] text-moscowa-text-secondary">
          <span>مبلغ پایه</span>
          <span>{formatBookingPrice(item.price)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[14px] font-bold text-moscowa-text">مبلغ قابل پرداخت</span>
          <span className="text-[18px] font-bold text-moscowa-purple">
            {formatBookingPrice(total)}
          </span>
        </div>
      </div>
    </aside>
  );
}
