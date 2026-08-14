import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2 className="text-[24px] font-bold leading-tight text-moscowa-text sm:text-[30px] lg:text-[32px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-[15px] leading-8 text-moscowa-text-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="text-[14px] font-medium text-moscowa-purple transition-colors hover:text-moscowa-orange"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
