import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { bookingSteps, type BookingStepId } from "@/lib/booking";

export function BookingStepper({ current }: { current: BookingStepId }) {
  const currentIndex = bookingSteps.findIndex((step) => step.id === current);

  return (
    <ol className="mb-8 grid grid-cols-4 gap-2">
      {bookingSteps.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        return (
          <li key={step.id} className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold",
                  done && "bg-moscowa-purple text-white",
                  active && "bg-moscowa-orange text-white",
                  !done && !active && "bg-moscowa-bg-secondary text-moscowa-text-muted",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : (index + 1).toLocaleString("fa-IR")}
              </span>
              <span
                className={cn(
                  "truncate text-[12px] font-medium sm:text-[13px]",
                  active ? "text-moscowa-text" : "text-moscowa-text-muted",
                )}
              >
                {step.label}
              </span>
            </div>
            <div
              className={cn(
                "mt-2 h-1 rounded-full",
                done || active ? "bg-moscowa-purple" : "bg-moscowa-border",
              )}
            />
          </li>
        );
      })}
    </ol>
  );
}
