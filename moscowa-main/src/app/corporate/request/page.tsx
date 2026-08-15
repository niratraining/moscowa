import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/ContentPage";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "درخواست پنل سازمانی",
  description: "ثبت درخواست پنل سفر سازمانی مسکوا",
};

export default function CorporateRequestPage() {
  return (
    <ContentPage
      title="درخواست پنل سازمانی"
      description="اطلاعات سازمان را ارسال کنید تا تیم فروش سازمانی با شما تماس بگیرد."
      breadcrumbLabel="درخواست پنل سازمانی"
      features={[
        {
          title: "مدیریت کاربران",
          description: "تعریف نقش‌ها و دسترسی کارکنان.",
        },
        {
          title: "کنترل هزینه",
          description: "سقف سفر و گزارش‌گیری متمرکز.",
        },
        {
          title: "پشتیبانی اختصاصی",
          description: "همراهی ویژه برای سازمان‌ها.",
        },
      ]}
      ctaLabel="بازگشت به سفر سازمانی"
      ctaHref="/corporate"
    >
      <form className="mt-8 grid max-w-2xl gap-4 rounded-[20px] border border-moscowa-border bg-white p-5 sm:p-6">
        <label className="block text-[13px] text-moscowa-text-secondary">
          نام سازمان
          <input
            required
            name="company"
            className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
          />
        </label>
        <label className="block text-[13px] text-moscowa-text-secondary">
          نام مسئول
          <input
            required
            name="contactName"
            className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
          />
        </label>
        <label className="block text-[13px] text-moscowa-text-secondary">
          شماره تماس
          <input
            required
            name="phone"
            inputMode="tel"
            className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
            dir="ltr"
          />
        </label>
        <label className="block text-[13px] text-moscowa-text-secondary">
          تعداد تقریبی سفر ماهانه
          <input
            name="monthlyTrips"
            inputMode="numeric"
            className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
            dir="ltr"
          />
        </label>
        <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto">
          ارسال درخواست
        </Button>
        <p className="text-[12px] text-moscowa-text-muted">
          این فرم فعلاً نمایشی است و به API متصل نیست.
        </p>
      </form>
    </ContentPage>
  );
}
