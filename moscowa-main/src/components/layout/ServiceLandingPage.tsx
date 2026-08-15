import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { ServiceType } from "@/components/search/types";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceSearchEmbed } from "@/components/search/ServiceSearchEmbed";

export interface ServicePageContent {
  slug: string;
  title: string;
  description: string;
  serviceType: ServiceType;
  features: { title: string; description: string }[];
  metaTitle?: string;
  metaDescription?: string;
}

export function buildServiceMetadata(page: ServicePageContent): Metadata {
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? page.description,
  };
}

export function ServiceLandingPage({
  page,
  children,
}: {
  page: ServicePageContent;
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero
        title={page.title}
        description={page.description}
        breadcrumbs={[{ label: page.title }]}
      >
        <p className="inline-flex rounded-full bg-moscowa-orange/10 px-3 py-1 text-[12px] font-medium text-moscowa-orange">
          نسخه دمو · نتایج نمونه برای بررسی دیزاین
        </p>
      </PageHero>
      <div className="container-page -mt-6 pb-2 sm:-mt-8">
        <ServiceSearchEmbed initialService={page.serviceType} />
      </div>
      {children}
    </>
  );
}
