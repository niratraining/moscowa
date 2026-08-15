import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/ContentPage";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "ثبت‌نام آژانس همکار",
  description:
    "آژانس مسافرتی خود را در مسکوا ثبت کنید، با برند اختصاصی واچر صادر کنید و کمیسیون همکاری دریافت کنید.",
};

export default function AgencyPartnerRegistrationPage() {
  return (
    <ContentPage
      title="ثبت‌نام آژانس همکار"
      description="اطلاعات آژانس خود را ارسال کنید تا تیم همکاری مسکوا با شما تماس بگیرد و پنل اختصاصی‌تان فعال شود."
      breadcrumbLabel="ثبت‌نام آژانس همکار"
      features={[
        {
          title: "واچر با برند شما",
          description: "صدور واچر رزرو با لوگو و نام آژانس شما برای مشتریانتان.",
        },
        {
          title: "کمیسیون هر رزرو",
          description: "دریافت کمیسیون شفاف و قابل پیگیری به‌ازای هر رزرو تکمیل‌شده.",
        },
        {
          title: "پنل مدیریت رزرو",
          description: "مشاهده و مدیریت رزروهای مشتریان در یک داشبورد اختصاصی.",
        },
      ]}
      ctaLabel="بازگشت به همکاری با ما"
      ctaHref="/partners"
    >
      <form className="mt-8 grid max-w-2xl gap-4 rounded-[20px] border border-moscowa-border bg-white p-5 sm:p-6">
        <label className="block text-[13px] text-moscowa-text-secondary">
          نام آژانس
          <input
            required
            name="agencyName"
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
        <div className="grid gap-4 sm:grid-cols-2">
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
            ایمیل
            <input
              required
              type="email"
              name="email"
              className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
              dir="ltr"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-[13px] text-moscowa-text-secondary">
            شهر فعالیت
            <input
              name="city"
              className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
            />
          </label>
          <label className="block text-[13px] text-moscowa-text-secondary">
            شماره مجوز گردشگری (اختیاری)
            <input
              name="licenseNumber"
              className="mt-1.5 h-11 w-full rounded-xl border border-moscowa-border px-3 text-[14px] outline-none focus:border-moscowa-purple"
              dir="ltr"
            />
          </label>
        </div>
        <label className="block text-[13px] text-moscowa-text-secondary">
          توضیحات تکمیلی (اختیاری)
          <textarea
            name="notes"
            rows={3}
            className="mt-1.5 w-full resize-none rounded-xl border border-moscowa-border px-3 py-2.5 text-[14px] outline-none focus:border-moscowa-purple"
          />
        </label>
        <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto">
          ارسال درخواست ثبت‌نام
        </Button>
        <p className="text-[12px] text-moscowa-text-muted">
          پس از تایید حساب، راهنمای بارگذاری لوگو برای صدور واچر اختصاصی برایتان ارسال می‌شود. این فرم فعلاً نمایشی است و به API متصل نیست.
        </p>
      </form>
    </ContentPage>
  );
}
