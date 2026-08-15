import {
  ServiceLandingPage,
  buildServiceMetadata,
} from "@/components/layout/ServiceLandingPage";
import { FlightResultsDemo } from "@/components/demo/FlightResultsDemo";
import { servicePages } from "@/data/pages";

const page = servicePages.flights;

export const metadata = buildServiceMetadata(page);

export default function Page() {
  return (
    <ServiceLandingPage page={page}>
      <FlightResultsDemo />
    </ServiceLandingPage>
  );
}
