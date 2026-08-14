import type { Metadata } from "next";
import { InsuranceDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.insurance;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <InsuranceDemoPage />;
}
