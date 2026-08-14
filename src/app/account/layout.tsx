import type { Metadata } from "next";
import { AccountPanelLayout } from "@/components/panel/AccountPanelLayout";

export const metadata: Metadata = {
  title: "پنل کاربری",
  robots: { index: false, follow: false },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccountPanelLayout>{children}</AccountPanelLayout>;
}
