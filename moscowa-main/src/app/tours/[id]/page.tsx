import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourDetailDemo } from "@/components/demo/DetailPages";
import { demoTours, getDemoTour } from "@/data/demo";

export function generateStaticParams() {
  return demoTours.map((tour) => ({ id: tour.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tour = getDemoTour(id);
  if (!tour) return { title: "تور یافت نشد" };
  return {
    title: tour.title,
    description: tour.description,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = getDemoTour(id);
  if (!tour) notFound();
  return <TourDetailDemo tour={tour} />;
}
