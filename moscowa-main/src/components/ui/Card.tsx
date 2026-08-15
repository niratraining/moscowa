import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-moscowa-border bg-white",
        interactive &&
          "transition-all duration-200 hover:-translate-y-[3px] hover:shadow-card",
        className,
      )}
      {...props}
    />
  );
}
