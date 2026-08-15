import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "purple" | "orange" | "neutral" | "sky" | "green";
}

const tones = {
  purple: "bg-moscowa-purple text-white",
  orange: "bg-moscowa-orange text-white",
  neutral: "bg-white/90 text-moscowa-text border border-moscowa-border",
  sky: "bg-[#E8F3FF] text-[#2B6CB0]",
  green: "bg-moscowa-green text-white",
};

export function Badge({
  className,
  tone = "purple",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
