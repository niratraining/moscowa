import { PageHero } from "@/components/layout/PageHero";
import { FlightResultsDemo } from "@/components/demo/FlightResultsDemo";
import { ServiceSearchEmbed } from "@/components/search/ServiceSearchEmbed";

export default async function FlightSearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await searchParams;

  return (
    <>
      <PageHero
        title="نتایج جستجوی پرواز"
        description="نسخه دمو نتایج؛ اتصال API در فاز بعدی انجام می‌شود."
        breadcrumbs={[
          { label: "پرواز", href: "/flights" },
          { label: "نتایج جستجو" },
        ]}
      />
      <div className="container-page -mt-6 pb-2 sm:-mt-8">
        <ServiceSearchEmbed initialService="flight" />
      </div>
      <FlightResultsDemo />
    </>
  );
}
