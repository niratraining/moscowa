import Link from "next/link";
import {
  Building2,
  CalendarRange,
  RefreshCcw,
  Shield,
  Star,
  Wallet,
} from "lucide-react";
import { quickServices } from "@/data/homepage";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

const icons = {
  club: Star,
  wallet: Wallet,
  refund: RefreshCcw,
  insurance: Shield,
  hotel: Building2,
  installment: CalendarRange,
};

export function QuickServices() {
  return (
    <section
      className="container-page pt-12 sm:pt-16 lg:pt-[72px]"
      aria-label="خدمات سریع"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {quickServices.map((service) => {
          const Icon = icons[service.icon];
          return (
            <Link
              key={service.id}
              href={service.href}
              className="group focus-visible:outline-none"
            >
              <Card
                interactive
                className="flex h-full flex-col items-start gap-3 p-4 sm:p-5 group-focus-visible:ring-2 group-focus-visible:ring-moscowa-purple/35"
              >
                <IconBox
                  size="sm"
                  className="transition-transform duration-200 group-hover:scale-105 group-hover:bg-[color-mix(in_srgb,var(--color-moscowa-orange)_10%,white)] group-hover:text-moscowa-orange"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </IconBox>
                <div>
                  <h3 className="text-[15px] font-bold text-moscowa-text transition-colors group-hover:text-moscowa-purple">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-6 text-moscowa-text-secondary">
                    {service.description}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
