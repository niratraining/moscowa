import type { ComponentType } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { HotelResultsDemo } from "@/components/demo/HotelResultsDemo";
import { TourResultsDemo } from "@/components/demo/TourResultsDemo";
import { StayResultsDemo } from "@/components/demo/StayResultsDemo";
import {
  BusResultsDemo,
  TrainResultsDemo,
} from "@/components/demo/TransportResultsDemo";
import { ServiceSearchEmbed } from "@/components/search/ServiceSearchEmbed";
import type { ServiceType } from "@/components/search/types";

const config: Record<
  string,
  {
    title: string;
    service: ServiceType;
    href: string;
    Demo: ComponentType;
  }
> = {
  hotels: {
    title: "نتایج جستجوی هتل",
    service: "hotel",
    href: "/hotels",
    Demo: HotelResultsDemo,
  },
  tours: {
    title: "نتایج جستجوی تور",
    service: "tour",
    href: "/tours",
    Demo: TourResultsDemo,
  },
  stays: {
    title: "نتایج جستجوی اقامتگاه",
    service: "stay",
    href: "/stays",
    Demo: StayResultsDemo,
  },
  trains: {
    title: "نتایج جستجوی قطار",
    service: "train",
    href: "/trains",
    Demo: TrainResultsDemo,
  },
  buses: {
    title: "نتایج جستجوی اتوبوس",
    service: "bus",
    href: "/buses",
    Demo: BusResultsDemo,
  },
};

export default async function GenericSearchPage({
  params,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { type } = await params;
  const page = config[type] ?? config.hotels;
  const Demo = page.Demo;

  return (
    <>
      <PageHero
        title={page.title}
        description="نسخه دمو نتایج؛ اتصال API در فاز بعدی انجام می‌شود."
        breadcrumbs={[
          { label: page.title.replace("نتایج جستجوی ", ""), href: page.href },
          { label: "نتایج جستجو" },
        ]}
      />
      <div className="container-page -mt-6 pb-2 sm:-mt-8">
        <ServiceSearchEmbed initialService={page.service} />
      </div>
      <Demo />
    </>
  );
}
