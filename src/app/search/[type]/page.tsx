import type { ComponentType } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { HotelResultsDemo } from "@/components/demo/HotelResultsDemo";
import { HotelResultsLive } from "@/components/hotels/HotelResultsLive";
import { TourResultsDemo } from "@/components/demo/TourResultsDemo";
import { StayResultsDemo } from "@/components/demo/StayResultsDemo";
import {
  BusResultsDemo,
  TrainResultsDemo,
} from "@/components/demo/TransportResultsDemo";
import {
  ResultsSearchBar,
  type ResultsSearchSummaryItem,
} from "@/components/search/ResultsSearchBar";
import type { ServiceType } from "@/components/search/types";

type SearchParams = Record<string, string | string[] | undefined>;

const config: Record<
  string,
  {
    title: string;
    service: ServiceType;
    href: string;
    Demo: ComponentType;
    summary: (params: SearchParams) => ResultsSearchSummaryItem[];
  }
> = {
  hotels: {
    title: "نتایج جستجوی هتل",
    service: "hotel",
    href: "/hotels",
    Demo: HotelResultsDemo,
    summary: (p) => [
      { icon: <MapPin className="h-4 w-4" />, label: str(p.destination, "مسکو") },
      {
        icon: <Calendar className="h-4 w-4" />,
        label: `${str(p.checkIn, "۱۴۰۵/۰۳/۱۰")} – ${str(p.checkOut, "۱۴۰۵/۰۳/۱۵")}`,
      },
      {
        icon: <Users className="h-4 w-4" />,
        label: `${str(p.rooms, "۱")} اتاق، ${str(p.guests, "۲")} مهمان`,
      },
    ],
  },
  tours: {
    title: "نتایج جستجوی تور",
    service: "tour",
    href: "/tours",
    Demo: TourResultsDemo,
    summary: (p) => [
      { icon: <MapPin className="h-4 w-4" />, label: str(p.destination, "مسکو") },
      { icon: <Calendar className="h-4 w-4" />, label: str(p.date, "۱۴۰۵/۰۳/۱۰") },
      { icon: <Users className="h-4 w-4" />, label: `${str(p.passengers, "۱")} مسافر` },
    ],
  },
  stays: {
    title: "نتایج جستجوی اقامتگاه",
    service: "stay",
    href: "/stays",
    Demo: StayResultsDemo,
    summary: (p) => [
      { icon: <MapPin className="h-4 w-4" />, label: str(p.city, "مسکو") },
      {
        icon: <Calendar className="h-4 w-4" />,
        label: `${str(p.checkIn, "۱۴۰۵/۰۳/۱۰")} – ${str(p.checkOut, "۱۴۰۵/۰۳/۱۵")}`,
      },
      { icon: <Users className="h-4 w-4" />, label: `${str(p.guests, "۲")} مهمان` },
    ],
  },
  trains: {
    title: "نتایج جستجوی قطار",
    service: "train",
    href: "/trains",
    Demo: TrainResultsDemo,
    summary: (p) => [
      {
        icon: <MapPin className="h-4 w-4" />,
        label: `${str(p.origin, "تهران")} ← ${str(p.destination, "مسکو")}`,
      },
      { icon: <Calendar className="h-4 w-4" />, label: str(p.date, "۱۴۰۵/۰۳/۱۰") },
      { icon: <Users className="h-4 w-4" />, label: `${str(p.passengers, "۱")} مسافر` },
    ],
  },
  buses: {
    title: "نتایج جستجوی اتوبوس",
    service: "bus",
    href: "/buses",
    Demo: BusResultsDemo,
    summary: (p) => [
      {
        icon: <MapPin className="h-4 w-4" />,
        label: `${str(p.origin, "تهران")} ← ${str(p.destination, "مسکو")}`,
      },
      { icon: <Calendar className="h-4 w-4" />, label: str(p.date, "۱۴۰۵/۰۳/۱۰") },
      { icon: <Users className="h-4 w-4" />, label: `${str(p.passengers, "۱")} مسافر` },
    ],
  },
};

function str(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] || fallback;
  return value || fallback;
}

export default async function GenericSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { type } = await params;
  const query = await searchParams;
  const page = config[type] ?? config.hotels;
  const Demo = page.Demo;

  // هتل‌ها: به‌جای دیتای دمو، از داده‌ی زنده‌ی D1 (پایپلاین) استفاده کن.
  // اگه D1 خالی یا کانفیگ نشده باشه، خودِ HotelResultsLive به دمو fallback می‌کنه.
  if (type === "hotels") {
    return (
      <>
        <ResultsSearchBar service={page.service} items={page.summary(query)} />
        <HotelResultsLive
          initialDestination={str(query.destination, "مسکو")}
          initialCheckIn={str(query.checkIn, "")}
          initialCheckOut={str(query.checkOut, "")}
          initialGuests={Number(str(query.guests, "2"))}
        />
      </>
    );
  }

  return (
    <>
      <ResultsSearchBar service={page.service} items={page.summary(query)} />
      <Demo />
    </>
  );
}
