import type { Metadata } from "next";
import { RefundDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.refund;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <RefundDemoPage />;
}
