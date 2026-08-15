import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

export function IconBox({ children, className, size = "md" }: IconBoxProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_8%,white)] text-moscowa-purple",
        sizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
