import type { Metadata } from "next";
import { SuccessStep } from "@/components/booking/SuccessStep";
import { Button } from "@/components/ui/Button";
import { resolveBookingItem } from "@/lib/booking";

export const metadata: Metadata = {
  title: "تایید رزرو",
  description: "رزرو شما با موفقیت ثبت شد",
};

export default async function SuccessBookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : null;
  const id = typeof params.id === "string" ? params.id : null;
  const room = typeof params.room === "string" ? params.room : null;
  const order =
    typeof params.order === "string" ? params.order : "NT-000000";
  const item = resolveBookingItem(type, id, room);

  if (!item) {
    return (
      <div className="container-page section-spacing">
        <div className="mx-auto max-w-lg rounded-[22px] border border-moscowa-border bg-white p-8 text-center">
          <h1 className="text-[22px] font-bold text-moscowa-text">سفارش یافت نشد</h1>
          <Button href="/" className="mt-6">
            صفحه اصلی
          </Button>
        </div>
      </div>
    );
  }

  return <SuccessStep item={item} order={order} />;
}
