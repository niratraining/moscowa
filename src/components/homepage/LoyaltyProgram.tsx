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
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
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

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {loyaltyTiers.map((tier) => {
          const unlocked = tier.status === "unlocked";
          return (
            <Card
              key={tier.id}
              className={cn(
                "p-4 sm:p-5",
                unlocked
                  ? "border-moscowa-orange/50 bg-[color-mix(in_srgb,var(--color-moscowa-orange)_5%,white)]"
                  : "border-moscowa-border",
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
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
              <p className="mt-3 text-[20px] font-bold text-moscowa-purple sm:text-[22px]">
                {tier.discount}
              </p>
              <p className="mt-1 text-[14px] font-semibold text-moscowa-text">
                {tier.title}
              </p>
              <p className="mt-1 text-[12.5px] leading-6 text-moscowa-text-secondary">
                {tier.requirement}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:gap-5">
        <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#4f2f7c_0%,#6b4a96_60%,#f84209_150%)] p-6 text-white sm:p-7">
          <p className="text-[13px] text-white/75">شروع رایگان</p>
          <p className="mt-2 max-w-sm text-[19px] font-bold leading-8 sm:text-[21px]">
            با ثبت‌نام، سطح ۱ باشگاه مسکوا فعال می‌شود
          </p>
          <p className="mt-2 max-w-sm text-[13.5px] leading-7 text-white/85">
            همین امروز عضو شوید و ۵٪ تخفیف روی اولین رزرو هتل خود در روسیه بگیرید.
          </p>
          <Button
            href="/auth/register"
            variant="white"
            size="md"
            className="mt-5"
          >
            ثبت‌نام و فعال‌سازی تخفیف
          </Button>
        </div>

        <div className="rounded-[20px] border border-moscowa-border bg-white p-5 sm:p-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {loyaltyPerks.map((perk) => {
              const Icon = perkIcons[perk.icon];
              return (
                <li key={perk.id} className="flex items-start gap-3">
                  <IconBox size="sm" className="shrink-0">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </IconBox>
                  <div>
                    <p className="text-[13.5px] font-semibold text-moscowa-text">
                      {perk.title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-6 text-moscowa-text-secondary">
                      {perk.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
