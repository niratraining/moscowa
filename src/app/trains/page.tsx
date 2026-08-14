import {
  ServiceLandingPage,
  buildServiceMetadata,
} from "@/components/layout/ServiceLandingPage";
import { TrainResultsDemo } from "@/components/demo/TransportResultsDemo";
import { servicePages } from "@/data/pages";

const page = servicePages.trains;

export const metadata = buildServiceMetadata(page);

export default function Page() {
  return (
    <ServiceLandingPage page={page}>
      <TrainResultsDemo />
    </ServiceLandingPage>
  );
}
