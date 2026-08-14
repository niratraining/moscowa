import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HotelDetailDemo } from "@/components/demo/DetailPages";
import { demoHotels, getDemoHotel } from "@/data/demo";

export function generateStaticParams() {
  return demoHotels.map((hotel) => ({ id: hotel.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const hotel = getDemoHotel(id);
  if (!hotel) return { title: "هتل یافت نشد" };
  return {
    title: hotel.name,
    description: hotel.description,
  };
}

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hotel = getDemoHotel(id);
  if (!hotel) notFound();
  return <HotelDetailDemo hotel={hotel} />;
}
