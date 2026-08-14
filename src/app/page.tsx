import { AITravelAssistant } from "@/components/homepage/AITravelAssistant";
import { AppDownload } from "@/components/homepage/AppDownload";
import { DestinationSpotlight } from "@/components/homepage/DestinationSpotlight";
import { FooterTrust } from "@/components/homepage/FooterTrust";
import { Hero } from "@/components/homepage/Hero";
import { InstallmentTravel } from "@/components/homepage/InstallmentTravel";
import { PopularDestinations } from "@/components/homepage/PopularDestinations";
import { PromoBanners } from "@/components/homepage/PromoBanners";
import { QuickServices } from "@/components/homepage/QuickServices";
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
      <Hero />
      <TravelSearch />
      <QuickServices />
      <PromoBanners />
      <DestinationSpotlight />
      <PopularDestinations />
      <AITravelAssistant />
      <InstallmentTravel />
      <WhyMoscowa />
      <FooterTrust />
      <AppDownload />
    </>
  );
}
