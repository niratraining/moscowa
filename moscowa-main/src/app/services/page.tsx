import type { Metadata } from "next";
import { ServicesHubDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.services;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <ServicesHubDemoPage />;
}
