import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/layout/PageHero";

interface FeatureItem {
  title: string;
  description: string;
}

interface ContentPageProps {
  title: string;
  description: string;
  breadcrumbLabel: string;
  features?: FeatureItem[];
  highlights?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  children?: React.ReactNode;
}

export function ContentPage({
  title,
  description,
  breadcrumbLabel,
  features = [],
  highlights = [],
  ctaLabel = "بازگشت به صفحه اصلی",
  ctaHref = "/",
  children,
}: ContentPageProps) {
  return (
    <>
      <PageHero
        title={title}
        description={description}
        breadcrumbs={[{ label: breadcrumbLabel }]}
      />
      <div className="container-page section-spacing !pt-10">
        {features.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="p-5">
                <h2 className="text-[17px] font-bold text-moscowa-text">
                  {feature.title}
                </h2>
                <p className="mt-2 text-[14px] leading-7 text-moscowa-text-secondary">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        ) : null}

        {highlights.length > 0 ? (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-moscowa-border bg-moscowa-bg-secondary px-4 py-3 text-[14px] text-moscowa-text"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {children}

        <div className="mt-10">
          <Button
            href={ctaHref}
            variant={ctaHref === "/" ? "outline" : "primary"}
            size="lg"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
