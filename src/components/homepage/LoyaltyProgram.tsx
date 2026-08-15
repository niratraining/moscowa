import {
  Gift,
  Headphones,
  Lock,
  LockOpen,
  Sparkles,
  Undo2,
} from "lucide-react";
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
      className="container-page pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-[88px]"
      aria-label="باشگاه مسکوا"
    >
      <div className="mb-6 max-w-xl sm:mb-8">
        <p className="text-[13px] font-medium text-moscowa-orange">
          باشگاه مسکوا
        </p>
        <h2 className="mt-1 text-[22px] font-bold text-moscowa-text sm:text-[26px] lg:text-[28px]">
          هرچه بیشتر سفر کنی، بیشتر تخفیف می‌گیری
        </h2>
        <p className="mt-2 text-[14px] leading-7 text-moscowa-text-secondary">
          با هر رزرو یک پله بالاتر می‌روید و تخفیف بیشتری روی هتل‌های روسیه دریافت می‌کنید.
        </p>
      </div>

      <div className="space-y-2 sm:space-y-2.5">
        {loyaltyTiers.map((tier) => {
          const unlocked = tier.status === "unlocked";
          return (
            <div
              key={tier.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-3.5 py-2.5 sm:px-4 sm:py-3",
                unlocked
                  ? "border-moscowa-orange/50 bg-[color-mix(in_srgb,var(--color-moscowa-orange)_5%,white)]"
                  : "border-moscowa-border bg-white",
              )}
            >
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold",
                  unlocked
                    ? "bg-moscowa-orange text-white"
                    : "bg-moscowa-bg-secondary text-moscowa-text-muted",
                )}
              >
                {unlocked ? (
                  <LockOpen className="h-3 w-3" />
                ) : (
                  <Lock className="h-3 w-3" />
                )}
                سطح {tier.level}
              </span>
              <p className="min-w-0 flex-1 truncate text-[13.5px] sm:text-[14px]">
                <span className="font-bold text-moscowa-purple">
                  {tier.discount}
                </span>
                <span className="text-moscowa-text-secondary"> — {tier.title}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-[linear-gradient(135deg,#4f2f7c_0%,#6b4a96_60%,#f84209_150%)] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[14px] font-bold sm:text-[15.5px]">
              با ثبت‌نام، سطح ۱ باشگاه مسکوا فعال می‌شود
            </p>
            <p className="mt-1 text-[12px] text-white/80">
              ۵٪ تخفیف روی اولین رزرو هتل خود در روسیه بگیرید
            </p>
          </div>
          <Button
            href="/auth/register"
            variant="white"
            size="sm"
            className="w-full shrink-0 sm:w-auto"
          >
            ثبت‌نام رایگان
          </Button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {loyaltyPerks.map((perk) => {
            const Icon = perkIcons[perk.icon];
            return (
              <div
                key={perk.id}
                className="flex shrink-0 items-center gap-2 rounded-full border border-moscowa-border bg-white px-3.5 py-2"
              >
                <Icon className="h-4 w-4 text-moscowa-purple" strokeWidth={1.75} />
                <span className="whitespace-nowrap text-[12.5px] font-medium text-moscowa-text">
                  {perk.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
