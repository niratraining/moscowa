import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-moscowa-orange text-white hover:bg-moscowa-orange-hover shadow-soft hover:-translate-y-0.5 hover:shadow-card",
  secondary:
    "bg-moscowa-purple text-white hover:bg-moscowa-purple-dark shadow-soft hover:-translate-y-0.5",
  outline:
    "bg-white text-moscowa-purple border border-[color-mix(in_srgb,var(--color-moscowa-purple)_28%,white)] hover:bg-moscowa-bg-secondary",
  ghost: "bg-transparent text-moscowa-purple hover:bg-moscowa-bg-secondary",
  white:
    "bg-white text-moscowa-purple border border-white/80 hover:bg-white/95 shadow-soft",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-[10px]",
  md: "h-11 px-5 text-[15px] rounded-[11px]",
  lg: "h-[52px] px-8 text-base rounded-xl min-w-[180px]",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moscowa-purple/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      disabled,
      href,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const classes = cn(baseClass, variants[variant], sizes[size], className);

    if (href && !disabled) {
      return (
        <Link
          href={href}
          className={classes}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
