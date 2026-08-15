"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tracks whether the viewport is below `breakpoint` (default: Tailwind's
 * `lg`, 1024px) so search fields can swap shells without any layout jump —
 * the check only ever runs on the client, and the hook stays `false` until
 * mount so SSR output matches the first paint.
 */
export function useIsMobileViewport(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

interface FieldOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  panelId?: string;
  /** Extra classes for the desktop popover's width/position. */
  desktopClassName?: string;
  /** Pinned action row shown under the scrollable content. */
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Booking.com / Trip.com-style responsive field overlay.
 *
 * - Mobile: a near-full-screen, swipe-to-dismiss bottom sheet (Vaul) with a
 *   title bar and an explicit close button — the global standard for
 *   destination, date, and guest pickers on small screens.
 * - Desktop: the existing anchored popover, unchanged.
 *
 * Both shells render the same `children`, so callers write the picker UI
 * once and get the right container for the viewport.
 */
export function FieldOverlay({
  open,
  onOpenChange,
  title,
  panelId,
  desktopClassName,
  footer,
  children,
}: FieldOverlayProps) {
  const isMobile = useIsMobileViewport();

  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Drawer.Content
            aria-describedby={undefined}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[92dvh] flex-col rounded-t-3xl bg-white outline-none"
          >
            <div
              aria-hidden
              className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-moscowa-border"
            />
            <div className="flex shrink-0 items-center justify-between border-b border-moscowa-border px-4 py-3">
              <Drawer.Title className="text-[15px] font-bold text-moscowa-text">
                {title}
              </Drawer.Title>
              <Drawer.Close
                aria-label="بستن"
                className="flex h-8 w-8 items-center justify-center rounded-full text-moscowa-text-secondary transition-colors hover:bg-moscowa-bg-secondary"
              >
                <X className="h-4 w-4" aria-hidden />
              </Drawer.Close>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>
            {footer ? (
              <div className="shrink-0 border-t border-moscowa-border px-4 py-3">
                {footer}
              </div>
            ) : null}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  if (!open) return null;

  return (
    <div
      id={panelId}
      role="dialog"
      aria-label={title}
      className={cn(
        "absolute z-50 top-[calc(100%+8px)] w-full max-w-[calc(100vw-1.25rem)] origin-top animate-[calendar-pop_0.16s_ease-out_both]",
        "right-0 inset-x-0 lg:inset-x-auto",
        desktopClassName,
      )}
    >
      <div className="rounded-2xl border border-moscowa-border bg-white p-4 shadow-search">
        {children}
        {footer ? (
          <div className="mt-3 border-t border-moscowa-border pt-3">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
