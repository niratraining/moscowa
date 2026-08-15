import Image from "next/image";
import Link from "next/link";
import { travelArticles } from "@/data/homepage";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TravelGuide() {
  return (
    <section className="container-page section-spacing !pt-0" aria-label="راهنمای سفر">
      <SectionHeader
        title="راهنمای سفر"
        description="محتوای کاربردی برای برنامه‌ریزی بهتر و سفر هوشمندتر"
        actionLabel="مشاهده همه"
        actionHref="/guide"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {travelArticles.map((article) => (
          <Link key={article.id} href={article.href} className="group">
            <article className="overflow-hidden rounded-[16px] border border-moscowa-border bg-white transition-all duration-200 hover:-translate-y-[3px] hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="text-[12px] font-medium text-moscowa-orange">
                  {article.category}
                </p>
                <h3 className="mt-1 text-[16px] font-bold leading-7 text-moscowa-text">
                  {article.title}
                </h3>
                <p className="mt-2 text-[12px] text-moscowa-text-muted">
                  {article.readingTime}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
