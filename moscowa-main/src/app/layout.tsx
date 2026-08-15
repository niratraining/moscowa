import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ToastHost } from "@/components/ui/ToastHost";
import { siteConfig } from "@/data/homepage";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "مسکوا | رزرو پرواز، هتل، تور و سفر اقساطی",
    template: "%s | مسکوا",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "مسکوا | سفر را هوشمندانه تجربه کنید",
    description: siteConfig.description,
    images: [
      {
        url: "/brand/logo-stacked.png",
        width: 901,
        height: 782,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مسکوا | سفر را هوشمندانه تجربه کنید",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen overflow-x-hidden font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:shadow-card"
        >
          پرش به محتوای اصلی
        </a>
        <SiteChrome>{children}</SiteChrome>
        <ToastHost />
      </body>
    </html>
  );
}
