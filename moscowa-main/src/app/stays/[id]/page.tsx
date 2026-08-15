import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StayDetailDemo } from "@/components/demo/DetailPages";
import { demoStays, getDemoStay } from "@/data/demo";

export function generateStaticParams() {
  return demoStays.map((stay) => ({ id: stay.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const stay = getDemoStay(id);
  if (!stay) return { title: "اقامتگاه یافت نشد" };
  return {
    title: stay.title,
    description: stay.description,
  };
}

export default async function StayDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stay = getDemoStay(id);
  if (!stay) notFound();
  return <StayDetailDemo stay={stay} />;
}
