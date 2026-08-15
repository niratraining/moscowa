import {
  ServiceLandingPage,
  buildServiceMetadata,
} from "@/components/layout/ServiceLandingPage";
import { TourResultsDemo } from "@/components/demo/TourResultsDemo";
import { servicePages } from "@/data/pages";

const page = servicePages.tours;

export const metadata = buildServiceMetadata(page);

export default function Page() {
  return (
    <ServiceLandingPage page={page}>
      <TourResultsDemo />
    </ServiceLandingPage>
  );
}
