import { BadgeCheck, Building2, Percent } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AgencyPanelBanner() {
  return (
    <section className="border-t border-moscowa-border bg-moscowa-bg-secondary">
      <div className="container-page py-8 sm:py-10">
        <div className="flex flex-col items-start gap-5 rounded-[20px] border border-moscowa-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_8%,white)] text-moscowa-purple">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-moscowa-text">
                پنل آژانس‌های همکار
              </p>
              <p className="mt-1 max-w-md text-[12.5px] leading-6 text-moscowa-text-secondary">
                آژانس مسافرتی خود را ثبت کنید، با برند اختصاصی واچر صادر کنید
                و از هر رزرو کمیسیون همکاری دریافت کنید.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-moscowa-bg-secondary px-2.5 py-1.5 text-[11.5px] font-medium text-moscowa-text-secondary">
                  <BadgeCheck className="h-3.5 w-3.5 text-moscowa-purple" />
                  واچر با لوگوی شما
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-moscowa-bg-secondary px-2.5 py-1.5 text-[11.5px] font-medium text-moscowa-text-secondary">
                  <Percent className="h-3.5 w-3.5 text-moscowa-purple" />
                  کمیسیون هر رزرو
                </span>
              </div>
            </div>
          </div>
          <Button
            href="/partners/agencies"
            size="md"
            className="w-full shrink-0 sm:w-auto"
          >
            ثبت‌نام آژانس همکار
          </Button>
        </div>
      </div>
    </section>
  );
}
