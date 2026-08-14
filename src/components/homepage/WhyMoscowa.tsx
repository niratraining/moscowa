import {
  Award,
  Headphones,
  Hotel,
  Plane,
  Smile,
  Timer,
} from "lucide-react";
import { trustMetrics } from "@/data/homepage";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = {
  experience: Timer,
  hotels: Hotel,
  airlines: Plane,
  price: Award,
  support: Headphones,
  customers: Smile,
};

export function WhyMoscowa() {
  return (
    <section className="container-page section-spacing" aria-label="چرا مسکوا؟">
      <SectionHeader title="چرا مسکوا؟" />

      {/*
        IMPORTANT: Metric values below come from data/homepage.ts placeholders.
        Replace with verified business data before production marketing use.
      */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {trustMetrics.map((metric) => {
          const Icon = icons[metric.icon];
          return (
            <Card key={metric.id} className="flex flex-col items-start gap-3 p-4 sm:p-5">
              <IconBox size="sm">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </IconBox>
              <div>
                <p className="text-[18px] font-bold text-moscowa-purple sm:text-[20px]">
                  {metric.value}
                </p>
                <p className="mt-1 text-[12.5px] leading-6 text-moscowa-text-secondary">
                  {metric.label}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
