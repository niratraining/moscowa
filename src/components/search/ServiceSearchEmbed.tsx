"use client";

import { TravelSearch } from "@/components/search/TravelSearch";
import type { ServiceType } from "@/components/search/types";

export function ServiceSearchEmbed({
  initialService,
}: {
  initialService: ServiceType;
}) {
  return <TravelSearch initialService={initialService} embedded />;
}
