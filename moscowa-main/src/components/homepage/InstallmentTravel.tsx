import { CheckCircle2 } from "lucide-react";
import { installmentHighlights } from "@/data/homepage";
import { Button } from "@/components/ui/Button";

export function InstallmentTravel() {
  return (
    <section className="container-page section-spacing !pt-0" aria-labelledby="installment-title">
      <div className="grid items-center gap-8 overflow-hidden rounded-[24px] border border-moscowa-border bg-white p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-10">
        <div>
          <p className="mb-2 text-[13px] font-medium text-moscowa-orange">
            تمایز استراتژیک مسکوا
          </p>
          <h2
            id="installment-title"
            className="text-[24px] font-bold text-moscowa-text sm:text-[30px] lg:text-[32px]"
          >
            الان سفر کن، بعداً پرداخت کن
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-8 text-moscowa-text-secondary">
            پرواز، هتل و تور را انتخاب کنید و هزینه سفر را در چند قسط پرداخت کنید.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {installmentHighlights.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-moscowa-border bg-moscowa-bg-secondary p-4"
              >
                <p className="text-[15px] font-bold text-moscowa-purple">
                  {item.title}
                </p>
                <p className="mt-1 text-[12.5px] text-moscowa-text-secondary">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          <Button href="/installment/credit-check" size="lg" className="mt-7">
            بررسی اعتبار سفر
          </Button>
        </div>

        <div className="relative rounded-[22px] bg-[linear-gradient(160deg,#4f2f7c_0%,#6b4a96_55%,#f84209_140%)] p-6 text-white sm:p-8">
          <p className="text-[14px] text-white/80">نمونه برنامه اقساط</p>
          <p className="mt-2 text-[28px] font-bold">سفر ۴ نفره استانبول</p>
          <p className="mt-1 text-[14px] text-white/80">پرواز + هتل + ترانسفر</p>
          <div className="mt-6 space-y-3">
            {[
              "پیش‌پرداخت صفر",
              "۱۲ قسط ماهانه",
              "تأیید اعتبار آنلاین",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[14px]">
                <CheckCircle2 className="h-4 w-4 text-[#ffd7c8]" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-[12px] text-white/70">قسط ماهانه از</p>
            <p className="text-[24px] font-bold">۴,۹۰۰,۰۰۰ تومان</p>
          </div>
        </div>
      </div>
    </section>
  );
}
