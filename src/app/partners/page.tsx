import type { Metadata } from "next";
import { PartnersDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.partners;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <PartnersDemoPage />;
}
