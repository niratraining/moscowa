"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "چطور بلیط پرواز رزرو کنم؟",
    a: "خدمت پرواز را انتخاب کنید، مبدأ و مقصد و تاریخ را وارد کنید، از بین نتایج گزینه مناسب را بخرید و پرداخت را تکمیل کنید.",
  },
  {
    q: "آیا پرداخت اقساطی برای همه سفرها فعال است؟",
    a: "برای پرواز، هتل و تورهای منتخب فعال است. پس از انتخاب محصول می‌توانید اعتبار سفر را بررسی کنید.",
  },
  {
    q: "استرداد چقدر طول می‌کشد؟",
    a: "بسته به قوانین تأمین‌کننده، معمولاً بین ۲۴ ساعت تا چند روز کاری. وضعیت را از پنل استرداد پیگیری کنید.",
  },
  {
    q: "چطور با پشتیبانی تماس بگیرم؟",
    a: "از طریق شماره ۰۲۱-۴۱۵۶۷، ایمیل support@moscowa.ir یا فرم تیکت در صفحه پشتیبانی.",
  },
];

export function FaqAccordionDemo() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-[18px] border border-moscowa-border bg-white"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
            >
              <span className="text-[15px] font-bold text-moscowa-text">
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-moscowa-purple transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <p className="border-t border-moscowa-border px-5 py-4 text-[14px] leading-7 text-moscowa-text-secondary">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
