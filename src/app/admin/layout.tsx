import type { Metadata } from "next";
import { AdminPanelLayout } from "@/components/panel/AdminPanelLayout";

export const metadata: Metadata = {
  title: "پنل ادمین",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
