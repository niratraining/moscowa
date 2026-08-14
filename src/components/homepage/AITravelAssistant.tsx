"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AITravelAssistant() {
  const [prompt, setPrompt] = useState(
    "مثلاً برای ۴ روز سفر به استانبول با بودجه ۵۰ میلیون تومان برنامه بده",
  );

  return (
    <section className="container-page section-spacing !pt-0" aria-labelledby="ai-travel-title">
      <div className="overflow-hidden rounded-[24px] border border-[color-mix(in_srgb,var(--color-moscowa-purple)_16%,white)] bg-[linear-gradient(135deg,#f7f4fb_0%,#ffffff_48%,#f3eef9_100%)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-moscowa-purple)_12%,white)] bg-white px-3 py-1.5 text-[13px] font-medium text-moscowa-purple shadow-soft">
            <Sparkles className="h-4 w-4 text-moscowa-orange" />
            دستیار هوشمند سفر
          </div>
          <h2
            id="ai-travel-title"
            className="text-[24px] font-bold text-moscowa-text sm:text-[30px] lg:text-[32px]"
          >
            سفرت را هوشمندانه بساز
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-8 text-moscowa-text-secondary">
            به مسکوا بگو کجا می‌خواهی بروی، چقدر زمان داری و بودجه‌ات چقدر است؛
            بهترین ترکیب پرواز، هتل و برنامه سفر را برایت پیدا می‌کنیم.
          </p>

          <form
            className="mt-7 space-y-3 text-right"
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = `/assistant?q=${encodeURIComponent(prompt)}`;
            }}
          >
            <label htmlFor="ai-prompt" className="sr-only">
              درخواست برنامه سفر
            </label>
            <textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-2xl border border-moscowa-border bg-white px-4 py-4 text-[15px] leading-7 text-moscowa-text shadow-soft outline-none transition focus:border-moscowa-purple"
            />
            <div className="flex justify-center">
              <Button type="submit" size="lg" className="min-w-[220px]">
                برنامه سفر بساز
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
