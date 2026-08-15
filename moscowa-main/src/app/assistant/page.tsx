import type { Metadata } from "next";
import { Suspense } from "react";
import { AssistantClient } from "./AssistantClient";

export const metadata: Metadata = {
  title: "دستیار هوشمند سفر",
  description: "ساخت برنامه سفر بر اساس مقصد، زمان و بودجه",
};

export default function AssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page section-spacing text-moscowa-text-secondary">
          در حال بارگذاری دستیار سفر...
        </div>
      }
    >
      <AssistantClient />
    </Suspense>
  );
}
