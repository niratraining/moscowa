import { NextRequest, NextResponse } from "next/server";
import { getOstrovokConfig } from "@/lib/ostrovok/config";
import { resolveRussianRegion, searchAndNormalizeHotels } from "@/lib/ostrovok/normalize";
import { OstrovokApiError, OstrovokNotConfiguredError } from "@/lib/ostrovok/client";

interface SearchBody {
  destination?: string; // free text, e.g. "مسکو" or "Moscow"
  regionId?: number; // skip lookup if you already have it
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  adults?: number;
  children?: number[];
}

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function POST(req: NextRequest) {
  const config = getOstrovokConfig();

  if (!config.configured) {
    return NextResponse.json({
      configured: false,
      source: "demo",
      hotels: [],
      message:
        "OSTROVOK_KEY_ID / OSTROVOK_API_KEY not set yet — showing sample data until the RateHawk/Ostrovok B2B key arrives.",
    });
  }

  let body: SearchBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const checkin = body.checkin || todayPlus(14);
  const checkout = body.checkout || todayPlus(17);
  const adults = body.adults && body.adults > 0 ? body.adults : 2;

  try {
    let regionId = body.regionId ?? null;
    let regionName = body.destination ?? "روسیه";

    if (!regionId) {
      const region = await resolveRussianRegion(body.destination || "Moscow");
      if (!region) {
        return NextResponse.json({
          configured: true,
          source: "live",
          hotels: [],
          message: "No Russian region matched that destination.",
        });
      }
      regionId = region.id;
      regionName = region.name;
    }

    const result = await searchAndNormalizeHotels({
      regionId,
      regionName,
      checkin,
      checkout,
      adults,
      children: body.children ?? [],
    });

    return NextResponse.json({
      configured: true,
      source: "live",
      region: { id: regionId, name: result.regionName },
      checkin,
      checkout,
      hotels: result.hotels,
    });
  } catch (err) {
    if (err instanceof OstrovokNotConfiguredError) {
      return NextResponse.json({ configured: false, source: "demo", hotels: [] });
    }
    if (err instanceof OstrovokApiError) {
      return NextResponse.json(
        { configured: true, source: "live", error: err.message, hotels: [] },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { configured: true, source: "live", error: "unexpected_error", hotels: [] },
      { status: 500 },
    );
  }
}
