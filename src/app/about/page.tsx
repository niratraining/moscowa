import type { Metadata } from "next";
import { AboutDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.about;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <AboutDemoPage />;
}
