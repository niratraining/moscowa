import type { Metadata } from "next";
import { SupportDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.support;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <SupportDemoPage />;
}
