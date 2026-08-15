import { Check, Gift, Headphones, Sparkles, Undo2 } from "lucide-react";
import { loyaltyPerks, loyaltyTiers } from "@/data/homepage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const perkIcons = {
  cancel: Undo2,
  support: Headphones,
  priority: Sparkles,
  gift: Gift,
};

export function LoyaltyProgram() {
  return (
    <section
      className="container-page pt-4 pb-12 sm:pt-5 sm:pb-16 lg:pt-6 lg:pb-[88px]"
      aria-label="باشگاه مسکوا"
    >
      <div className="overflow-hidden rounded-3xl border border-moscowa-border bg-white">
        {/* Header */}
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-moscowa-green)_10%,white)] px-2.5 py-1 text-[11.5px] font-semibold text-moscowa-green">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              باشگاه مسکوا
            </span>
            <h2 className="mt-2.5 text-[19px] font-bold text-moscowa-text sm:text-[23px]">
              هرچه بیشتر سفر کنی، بیشتر تخفیف می‌گیری
            </h2>
            <p className="mt-1.5 max-w-md text-[13px] leading-6 text-moscowa-text-secondary">
              با هر رزرو یک پله بالاتر می‌روید و تخفیف بیشتری روی هتل‌های روسیه دریافت می‌کنید.
            </p>
          </div>
          <Button
            href="/auth/register"
            variant="secondary"
            size="md"
            className="w-full shrink-0 sm:w-auto"
          >
            ثبت‌نام رایگان
          </Button>
        </div>

        <div className="h-px bg-moscowa-border" />

        {/* Tier stepper */}
        <div className="px-5 py-6 sm:px-7">
          <div className="flex items-start">
            {loyaltyTiers.map((tier, index) => {
              const unlocked = tier.status === "unlocked";
              const isLast = index === loyaltyTiers.length - 1;
              return (
                <div
                  key={tier.id}
                  className={cn(
                    "flex items-center",
                    isLast ? "shrink-0" : "flex-1",
                  )}
                >
                  <div className="flex w-16 shrink-0 flex-col items-center gap-2 text-center sm:w-24">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-[12.5px] font-bold sm:h-9 sm:w-9",
                        unlocked
                          ? "bg-moscowa-green text-white"
                          : "border-2 border-moscowa-border bg-white text-moscowa-text-muted",
                      )}
                    >
                      {unlocked ? <Check className="h-4 w-4" strokeWidth={2.5} /> : tier.level}
                    </span>
                    <div>
                      <p className="text-[11.5px] font-bold leading-4 text-moscowa-text sm:text-[12.5px]">
                        {tier.title}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-moscowa-purple sm:text-[12px]">
                        {tier.discount}
                      </p>
                    </div>
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "mx-1 h-[2px] flex-1 rounded-full sm:mx-2",
                        unlocked ? "bg-moscowa-green" : "bg-moscowa-border",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-moscowa-border" />

        {/* Perks grid */}
        <div className="grid grid-cols-2 gap-px bg-moscowa-border sm:grid-cols-4">
          {loyaltyPerks.map((perk) => {
            const Icon = perkIcons[perk.icon];
            return (
              <div
                key={perk.id}
                className="flex flex-col items-start gap-2 bg-white p-4 sm:p-5"
              >
                <Icon className="h-[18px] w-[18px] text-moscowa-purple" strokeWidth={1.75} />
                <p className="text-[12.5px] font-bold text-moscowa-text sm:text-[13px]">
                  {perk.title}
                </p>
                <p className="text-[11.5px] leading-5 text-moscowa-text-secondary sm:text-[12px]">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
