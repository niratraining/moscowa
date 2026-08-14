import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/layout/ContentPage";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "بررسی اعتبار سفر",
  description: "درخواست بررسی اعتبار برای سفر اقساطی مسکوا",
};

export default function CreditCheckPage() {
  return (
    <ContentPage
      title="بررسی اعتبار سفر"
      description="اطلاعات اولیه را ارسال کنید تا امکان سفر اقساطی برای شما بررسی شود."
      breadcrumbLabel="بررسی اعتبار سفر"
      features={[
        {
          title: "ثبت آنلاین",
          description: "بدون مراجعه حضوری درخواست خود را ثبت کنید.",
        },
        {
          title: "پاسخ سریع",
          description: "نتیجه بررسی از طریق پشتیبانی اطلاع‌رسانی می‌شود.",
        },
        {
          title: "شفافیت اقساط",
          description: "قبل از نهایی شدن، جزئیات بازپرداخت را می‌بینید.",
        },
      ]}
      ctaLabel="بازگشت به سفر اقساطی"
      ctaHref="/installment"
    >
      <form className="mt-8 grid max-w-2xl gap-4 rounded-[20px] border border-moscowa-border bg-white p-5 sm:p-6">
        <label className="block text-[13px] text-moscowa-text-secondary">
          نام و نام خانوادگی
          <input
            required
            name="fullName"
            className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
          />
        </label>
        <label className="block text-[13px] text-moscowa-text-secondary">
          شماره موبایل
          <input
            required
            name="phone"
            inputMode="tel"
            className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
            dir="ltr"
          />
        </label>
        <label className="block text-[13px] text-moscowa-text-secondary">
          مبلغ تقریبی سفر (تومان)
          <input
            required
            name="amount"
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
      <div className="mt-4">
        <Link href="/support" className="text-[14px] text-moscowa-purple hover:underline">
          نیاز به راهنمایی دارید؟ با پشتیبانی صحبت کنید
        </Link>
      </div>
    </ContentPage>
  );
}
