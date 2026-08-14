import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { guideArticles } from "@/data/pages";

interface GuideArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(guideArticles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuideArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = guideArticles[slug];
  if (!article) return { title: "راهنما" };
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function GuideArticlePage({
  params,
}: GuideArticlePageProps) {
  const { slug } = await params;
  const article = guideArticles[slug];
  if (!article) notFound();

  return (
    <>
      <PageHero
        title={article.title}
        description={article.summary}
        breadcrumbs={[
          { label: "راهنما", href: "/guide" },
          { label: article.title },
        ]}
      >
        <div className="flex flex-wrap gap-3 text-[13px] text-moscowa-text-secondary">
          <span className="rounded-full bg-white px-3 py-1 border border-moscowa-border">
            {article.category}
          </span>
          <span className="rounded-full bg-white px-3 py-1 border border-moscowa-border">
            {article.readingTime}
          </span>
        </div>
      </PageHero>

      <article className="container-page section-spacing !pt-10">
        <div className="mx-auto max-w-3xl space-y-8">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[20px] font-bold text-moscowa-text">
                {section.heading}
              </h2>
              <p className="mt-3 text-[15px] leading-8 text-moscowa-text-secondary">
                {section.body}
              </p>
            </section>
          ))}

          <div className="flex flex-wrap gap-3 pt-4">
            <Button href="/guide" variant="outline">
              بازگشت به راهنما
            </Button>
            <Button href="/flights">جستجوی پرواز</Button>
          </div>
        </div>
      </article>
    </>
  );
}
