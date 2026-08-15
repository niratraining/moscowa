import { NextRequest, NextResponse } from "next/server";
import { getHotelInfo, retrieveHotelPage } from "@/lib/ostrovok/client";
import { getOstrovokConfig } from "@/lib/ostrovok/config";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ hid: string }> },
) {
  const { hid } = await params;
  const numericHid = Number(hid);
  const config = getOstrovokConfig();

  if (!config.configured) {
    return NextResponse.json({ configured: false, hotel: null, rates: [] });
  }
  if (!Number.isFinite(numericHid)) {
    return NextResponse.json({ error: "invalid_hid" }, { status: 400 });
  }

  const search = req.nextUrl.searchParams;
  const checkin = search.get("checkin") || todayPlus(14);
  const checkout = search.get("checkout") || todayPlus(17);
  const adults = Number(search.get("adults") || 2);

  try {
    const [info, hp] = await Promise.all([
      getHotelInfo(numericHid).catch(() => null),
      retrieveHotelPage(numericHid, {
        checkin,
        checkout,
        residency: config.residency,
        currency: config.currency,
        guests: [{ adults, children: [] }],
      }).catch(() => null),
    ]);

    return NextResponse.json({
      configured: true,
      hotel: info?.data ?? null,
      rates: hp?.data?.hotels?.[0]?.rates ?? [],
    });
  } catch {
    return NextResponse.json(
      { configured: true, error: "unexpected_error", hotel: null, rates: [] },
      { status: 500 },
    );
  }
}
