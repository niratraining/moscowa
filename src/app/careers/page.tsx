import type { Metadata } from "next";
import { CareersDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.careers;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <CareersDemoPage />;
}
