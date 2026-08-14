import type { Metadata } from "next";
import { FaqDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.faq;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <FaqDemoPage />;
}
