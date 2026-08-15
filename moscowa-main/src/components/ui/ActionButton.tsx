"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";

interface ActionButtonProps extends ButtonProps {
  message?: string;
  successLabel?: string;
}

/** Demo action button that shows immediate feedback instead of doing nothing. */
export function ActionButton({
  message = "انجام شد (نسخه دمو)",
  successLabel,
  children,
  onClick,
  ...props
}: ActionButtonProps) {
  const [done, setDone] = useState(false);

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        setDone(true);
        window.setTimeout(() => setDone(false), 2200);
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("moscowa-toast", { detail: message }),
          );
        }
      }}
    >
      {done && successLabel ? successLabel : children}
    </Button>
  );
}
