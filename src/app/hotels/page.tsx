import {
  ServiceLandingPage,
  buildServiceMetadata,
} from "@/components/layout/ServiceLandingPage";
import { HotelResultsDemo } from "@/components/demo/HotelResultsDemo";
import { servicePages } from "@/data/pages";

const page = servicePages.hotels;

export const metadata = buildServiceMetadata(page);

export default function Page() {
  return (
    <ServiceLandingPage page={page}>
      <HotelResultsDemo />
    </ServiceLandingPage>
  );
}
