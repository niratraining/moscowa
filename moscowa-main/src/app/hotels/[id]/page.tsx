import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HotelDetailDemo } from "@/components/demo/DetailPages";
import { LiveHotelDetail } from "@/components/hotels/LiveHotelDetail";
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
  if (!hotel) return { title: "هتل" };
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
  if (hotel) return <HotelDetailDemo hotel={hotel} />;

  // Not a demo id — try it as a live Ostrovok numeric hotel id (hid).
  const hid = Number(id);
  if (Number.isFinite(hid)) {
    const live = await LiveHotelDetail({ hid });
    if (live) return live;
  }

  notFound();
}
