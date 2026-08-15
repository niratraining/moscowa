import { BadgePercent, Link2, MapPin, Zap } from "lucide-react";
import { trustMetrics } from "@/data/homepage";
import { IconBox } from "@/components/ui/IconBox";

const icons = {
  direct: Link2,
  voucher: Zap,
  price: BadgePercent,
  support: MapPin,
};

export function WhyMoscowa() {
  return (
    <section
      className="container-page pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10"
      aria-label="چرا مسکوا؟"
    >
      <p className="mb-4 text-[13px] font-semibold tracking-wide text-moscowa-purple sm:mb-6">
        چرا مسکوا؟
      </p>

      <div
        className="flex gap-0 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible md:divide-x md:divide-x-reverse md:divide-moscowa-border [&::-webkit-scrollbar]:hidden"
      >
        {trustMetrics.map((metric, index) => {
          const Icon = icons[metric.icon];
          return (
            <div
              key={metric.id}
              className={`flex w-[210px] shrink-0 flex-col items-start gap-2.5 py-1 pe-6 md:w-auto md:px-6 first:ps-0 ${
                index === 0 ? "" : "border-s border-moscowa-border md:border-s-0"
              }`}
            >
              <IconBox
                size="sm"
                className="border border-moscowa-purple/15 bg-transparent text-moscowa-purple"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </IconBox>
              <div>
                <p className="text-[14.5px] font-bold text-moscowa-text">
                  {metric.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-6 text-moscowa-text-secondary">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
