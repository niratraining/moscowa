import Image from "next/image";
import { Smartphone } from "lucide-react";

const stores = [
  { id: "appstore", label: "App Store", sub: "Download on the" },
  { id: "googleplay", label: "Google Play", sub: "Get it on" },
  { id: "bazaar", label: "کافه بازار", sub: "دانلود از" },
];

export function AppDownload() {
  return (
    <section className="container-page section-spacing" aria-labelledby="app-download-title">
      <div className="relative overflow-hidden rounded-[24px] bg-moscowa-purple px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-moscowa-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <div className="order-3 flex justify-center lg:order-1">
            <div className="relative h-[280px] w-[180px] -rotate-6 rounded-[28px] border-[6px] border-white/20 bg-[linear-gradient(180deg,#ffffff_0%,#f3eef9_100%)] p-3 shadow-search sm:h-[320px] sm:w-[200px]">
              <div className="flex h-full flex-col rounded-[20px] bg-white p-3 text-moscowa-text">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-moscowa-purple text-white">
                    <Smartphone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[12px] font-bold">مسکوا</p>
                    <p className="text-[10px] text-moscowa-text-muted">سفر هوشمند</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {["پرواز تهران → مشهد", "هتل کیش · ۳ شب", "تور استانبول"].map(
                    (row) => (
                      <div
                        key={row}
                        className="rounded-xl bg-moscowa-bg-secondary px-3 py-2 text-[11px] font-medium"
                      >
                        {row}
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-auto rounded-xl bg-moscowa-orange px-3 py-2 text-center text-[12px] font-bold text-white">
                  جستجوی سریع
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 text-center lg:order-2 lg:text-right">
            <h2
              id="app-download-title"
              className="text-[24px] font-bold sm:text-[30px] lg:text-[32px]"
            >
              اپلیکیشن مسکوا
            </h2>
            <p className="mt-2 text-[16px] text-white/90">سفر هوشمند در جیب شما</p>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-white/75 lg:mx-0">
              رزرو سریع، اطلاع‌رسانی لحظه‌ای و مدیریت سفر
            </p>

            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-2">
                <Image
                  src="/brand/qr-placeholder.svg"
                  alt="کد QR دانلود اپلیکیشن"
                  width={96}
                  height={96}
                  className="h-full w-full"
                />
              </div>
              <p className="max-w-[160px] text-[12px] leading-6 text-white/75">
                اسکن کنید و اپلیکیشن را سریع نصب کنید
              </p>
            </div>
          </div>

          <div className="order-2 flex flex-col gap-3 lg:order-3">
            {stores.map((store) => (
              <a
                key={store.id}
                href="#"
                className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 transition hover:bg-white/15"
              >
                <div>
                  <p className="text-[11px] text-white/70">{store.sub}</p>
                  <p className="text-[15px] font-semibold">{store.label}</p>
                </div>
                <span className="rounded-lg bg-white/15 px-2 py-1 text-[11px]">
                  Download
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
