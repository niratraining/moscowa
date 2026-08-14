import type { Metadata } from "next";
import { InstallmentDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.installment;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <InstallmentDemoPage />;
}
