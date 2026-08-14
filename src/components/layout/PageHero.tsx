import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-moscowa-border bg-[linear-gradient(180deg,#f7f4fb_0%,#ffffff_100%)]",
        className,
      )}
    >
      <div className="container-page py-10 sm:py-12 lg:py-14">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="مسیر صفحه" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-[13px] text-moscowa-text-muted">
              <li>
                <Link href="/" className="hover:text-moscowa-purple">
                  صفحه اصلی
                </Link>
              </li>
              {breadcrumbs.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-1">
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-moscowa-purple">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-moscowa-text-secondary">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <h1 className="text-[28px] font-bold leading-tight text-moscowa-text sm:text-[34px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-8 text-moscowa-text-secondary">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
