import type { Metadata } from "next";
import { WalletDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.wallet;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <WalletDemoPage />;
}
