import {
  ServiceLandingPage,
  buildServiceMetadata,
} from "@/components/layout/ServiceLandingPage";
import { BusResultsDemo } from "@/components/demo/TransportResultsDemo";
import { servicePages } from "@/data/pages";

const page = servicePages.buses;

export const metadata = buildServiceMetadata(page);

export default function Page() {
  return (
    <ServiceLandingPage page={page}>
      <BusResultsDemo />
    </ServiceLandingPage>
  );
}
