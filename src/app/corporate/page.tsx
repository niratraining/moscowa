import type { Metadata } from "next";
import { CorporateDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.corporate;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <CorporateDemoPage />;
}
