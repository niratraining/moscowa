"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export function AssistantClient() {
  const searchParams = useSearchParams();
  const initial = useMemo(
    () =>
      searchParams.get("q") ??
      "مثلاً برای ۴ روز سفر به استانبول با بودجه ۵۰ میلیون تومان برنامه بده",
    [searchParams],
  );
  const [prompt, setPrompt] = useState(initial);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        title="دستیار هوشمند سفر"
        description="مقصد، زمان و بودجه را بگویید تا پیشنهاد ترکیب سفر دریافت کنید."
        breadcrumbs={[{ label: "دستیار هوشمند" }]}
      />
      <div className="container-page section-spacing !pt-10">
        <div className="mx-auto max-w-3xl rounded-[24px] border border-moscowa-border bg-[linear-gradient(135deg,#f7f4fb_0%,#ffffff_55%)] p-5 sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-moscowa-border bg-white px-3 py-1.5 text-[13px] font-medium text-moscowa-purple">
            <Sparkles className="h-4 w-4 text-moscowa-orange" />
            Moscowa Smart
          </div>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label htmlFor="assistant-prompt" className="sr-only">
              درخواست برنامه سفر
            </label>
            <textarea
              id="assistant-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-2xl border border-moscowa-border bg-white px-4 py-4 text-[15px] leading-7 outline-none focus:border-moscowa-purple"
            />
            <Button type="submit" size="lg">
              برنامه سفر بساز
            </Button>
          </form>

          {submitted ? (
            <div className="mt-6 rounded-2xl border border-moscowa-border bg-white p-4 text-[14px] leading-7 text-moscowa-text-secondary">
              درخواست شما ثبت شد. اتصال به موتور پیشنهاد سفر در فاز بعدی فعال
              می‌شود. فعلاً می‌توانید از جستجوی پرواز و هتل شروع کنید.
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/flights">جستجوی پرواز</Button>
                <Button href="/hotels" variant="outline">
                  جستجوی هتل
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
