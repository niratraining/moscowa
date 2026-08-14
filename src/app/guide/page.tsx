import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { travelArticles } from "@/data/homepage";
import { guideArticles } from "@/data/pages";

export const metadata: Metadata = {
  title: "راهنمای سفر",
  description: "مقالات و راهنماهای کاربردی برای برنامه‌ریزی بهتر سفر",
};

export default function GuideIndexPage() {
  const cards = [
    ...travelArticles,
    {
      id: "buying",
      title: guideArticles.buying.title,
      category: guideArticles.buying.category,
      readingTime: guideArticles.buying.readingTime,
      image: "/images/articles/flights.jpg",
      href: "/guide/buying",
    },
    {
      id: "refund-policy",
      title: guideArticles["refund-policy"].title,
      category: guideArticles["refund-policy"].category,
      readingTime: guideArticles["refund-policy"].readingTime,
      image: "/images/articles/budget.jpg",
      href: "/guide/refund-policy",
    },
  ];

  return (
    <>
      <PageHero
        title="راهنمای سفر"
        description="محتوای کاربردی برای انتخاب بهتر پرواز، مقصد و مدیریت هزینه سفر"
        breadcrumbs={[{ label: "راهنما" }]}
      />
      <div className="container-page section-spacing !pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((article) => (
            <Link key={article.id} href={article.href} className="group">
              <article className="overflow-hidden rounded-[16px] border border-moscowa-border bg-white transition-all duration-200 hover:-translate-y-[3px] hover:shadow-card">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width:1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[12px] font-medium text-moscowa-orange">
                    {article.category}
                  </p>
                  <h2 className="mt-1 text-[16px] font-bold leading-7 text-moscowa-text">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-[12px] text-moscowa-text-muted">
                    {article.readingTime}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
