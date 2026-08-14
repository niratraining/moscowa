import type { Metadata } from "next";
import { ClubDemoPage } from "@/components/demo/ContentDemoPages";
import { contentPages } from "@/data/pages";

const page = contentPages.club;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <ClubDemoPage />;
}
