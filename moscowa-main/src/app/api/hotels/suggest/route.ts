import { NextRequest, NextResponse } from "next/server";
import { multicomplete } from "@/lib/ostrovok/client";
import { getOstrovokConfig } from "@/lib/ostrovok/config";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const config = getOstrovokConfig();
  const query = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!config.configured) {
    return NextResponse.json({ configured: false, regions: [] });
  }
  if (query.length < 2) {
    return NextResponse.json({ configured: true, regions: [] });
  }

  try {
    const res = await multicomplete(query);
    const regions = res.data.regions
      .filter((r) => r.country_code === "RU")
      .map((r) => ({ id: r.id, name: r.name, type: r.type }));
    return NextResponse.json({ configured: true, regions });
  } catch {
    return NextResponse.json({ configured: true, regions: [] }, { status: 502 });
  }
}
