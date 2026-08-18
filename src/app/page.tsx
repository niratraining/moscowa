import { FeaturedHotels } from "@/components/homepage/FeaturedHotels";
import { Hero } from "@/components/homepage/Hero";
import { OstrovokStatsWidget } from "@/components/homepage/OstrovokStatsWidget";
import { LoyaltyProgram } from "@/components/homepage/LoyaltyProgram";
import { PopularDestinations } from "@/components/homepage/PopularDestinations";
import { RecentSearchBar } from "@/components/homepage/RecentSearchBar";
import { RussianCuisineSpotlight } from "@/components/homepage/RussianCuisineSpotlight";
import { VibeTripPlanner } from "@/components/homepage/VibeTripPlanner";
import { WhyMoscowa } from "@/components/homepage/WhyMoscowa";
import { TravelSearch } from "@/components/search/TravelSearch";
import { siteConfig } from "@/data/homepage";

function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-stacked.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+98-21-41567",
        contactType: "customer service",
        availableLanguage: ["Persian", "fa"],
        areaServed: "IR",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "fa-IR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search/flights?origin={origin}&destination={destination}`,
      "query-input": "required name=origin required name=destination",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <RecentSearchBar />
      <Hero />
      <TravelSearch />
      <PopularDestinations />
      <VibeTripPlanner />
      <FeaturedHotels />
      <OstrovokStatsWidget />
      <WhyMoscowa />
      <RussianCuisineSpotlight />
      <LoyaltyProgram />
    </>
  );
}
