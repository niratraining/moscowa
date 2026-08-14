import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function PromoBanners() {
  return (
    <section
      className="container-page section-spacing !pb-0"
      aria-label="پیشنهادهای ویژه"
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <article className="group relative min-h-[260px] overflow-hidden rounded-[22px] transition-transform duration-500 hover:-translate-y-1 sm:min-h-[280px]">
          <Image
            src="/images/hero/villa-terrace.jpg"
            alt="سفر اقساطی به مقاصد لوکس"
            fill
            className="object-cover object-[70%_45%] transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(32,20,48,0.82)_0%,rgba(44,26,74,0.55)_48%,rgba(32,20,48,0.25)_100%)]" />
          <div className="absolute -left-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-moscowa-orange/20 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-6 px-6 py-8 text-white sm:flex-row sm:items-center sm:px-8 sm:py-10">
            <div>
              <p className="mb-2 text-[13px] text-white/75">محصول مالی سفر</p>
              <h3 className="text-[24px] font-bold leading-9 sm:text-[28px]">
                سفر اقساطی مسکوا
              </h3>
              <p className="mt-2 text-[15px] text-white/85">
                تا ۱۲ ماه بدون پیش پرداخت
              </p>
              <Button href="/installment" variant="white" size="md" className="mt-5">
                اطلاعات بیشتر
              </Button>
            </div>
            <div className="relative mx-auto flex h-28 w-28 shrink-0 items-center justify-center sm:mx-0 sm:h-36 sm:w-36">
              <div className="absolute inset-0 rotate-12 rounded-[28px] bg-gradient-to-br from-moscowa-orange to-[#ff7a3d] shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:rotate-[16deg]" />
              <div className="relative z-10 text-center">
                <span className="block text-[42px] font-black leading-none text-white sm:text-[52px]">
                  ٪۰
                </span>
                <span className="text-[12px] font-medium text-white/90">
                  پیش‌پرداخت
                </span>
              </div>
            </div>
          </div>
        </article>

        <article className="group relative min-h-[260px] overflow-hidden rounded-[22px] transition-transform duration-500 hover:-translate-y-1 sm:min-h-[280px]">
          <Image
            src="/images/mood/coastal-resort.jpg"
            alt="تورهای داخلی و خارجی"
            fill
            className="object-cover object-[55%_40%] transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1a1228ed] via-[#2c1a4aaa] to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-center px-6 py-8 text-white sm:px-8">
            <p className="mb-2 text-[13px] text-white/75">پکیج‌های منتخب</p>
            <h3 className="text-[24px] font-bold leading-9 sm:text-[28px]">
              تورهای داخلی و خارجی
            </h3>
            <p className="mt-2 max-w-sm text-[15px] text-white/85">
              از ساحل تا شهر؛ با بهترین خدمات و قیمت شفاف
            </p>
            <Button
              href="/tours"
              variant="white"
              size="md"
              className="mt-5 border border-white/80 bg-white/95"
            >
              مشاهده تورها
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
