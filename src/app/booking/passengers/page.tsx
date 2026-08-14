import type { Metadata } from "next";
import { PassengersStep } from "@/components/booking/PassengersStep";
import { Button } from "@/components/ui/Button";
import { resolveBookingItem } from "@/lib/booking";

export const metadata: Metadata = {
  title: "اطلاعات مسافران",
  description: "ورود مشخصات مسافران و ادامه فرآیند خرید",
};

export default async function PassengersBookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : null;
  const id = typeof params.id === "string" ? params.id : null;
  const room = typeof params.room === "string" ? params.room : null;
  const item = resolveBookingItem(type, id, room);

  if (!item) {
    return (
      <div className="container-page section-spacing">
        <div className="mx-auto max-w-lg rounded-[22px] border border-moscowa-border bg-white p-8 text-center">
          <h1 className="text-[22px] font-bold text-moscowa-text">آیتم رزرو یافت نشد</h1>
          <p className="mt-3 text-[14px] text-moscowa-text-secondary">
            لطفاً دوباره از نتایج جستجو یک گزینه انتخاب کنید.
          </p>
          <Button href="/flights" className="mt-6">
            بازگشت به پروازها
          </Button>
        </div>
      </div>
    );
  }

  return <PassengersStep item={item} />;
}
