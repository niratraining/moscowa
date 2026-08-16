"use client";

import { useEffect, useRef, useState } from "react";

interface InfiniteResultsListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Cards rendered on first paint. Keep small so the initial page stays fast. */
  initialCount?: number;
  /** Cards appended each time the sentinel scrolls into view. */
  batchSize?: number;
  /** Unique key per item, for React + to reset paging when the result set changes. */
  getKey: (item: T, index: number) => string;
  renderSkeleton?: () => React.ReactNode;
  className?: string;
}

/**
 * Renders `items` progressively: an initial slice on mount (fast first paint,
 * no visible "streaming in"), then more as an IntersectionObserver sentinel
 * near the bottom comes into view — the same pattern Booking.com/Skyscanner
 * use so a large result set never slows down the initial render. Resets to
 * the initial slice whenever the item set itself changes (new search).
 */
export function InfiniteResultsList<T>({
  items,
  renderItem,
  initialCount = 6,
  batchSize = 6,
  getKey,
  renderSkeleton,
  className,
}: InfiniteResultsListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(initialCount, items.length),
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const itemsKey = items.map((item, i) => getKey(item, i)).join("|");

  // New result set (new search / filter / sort) → start over from the fast
  // initial slice instead of dumping everything back in at once.
  useEffect(() => {
    setVisibleCount(Math.min(initialCount, items.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, initialCount]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setLoadingMore(true);
        // Small delay avoids a jarring "instant dump" of many cards/images
        // at once and keeps scroll input feeling smooth on slower devices.
        window.setTimeout(() => {
          setVisibleCount((count) => Math.min(count + batchSize, items.length));
          setLoadingMore(false);
        }, 150);
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, items.length, batchSize]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className={className}>
      {visibleItems.map((item, i) => (
        <div key={getKey(item, i)}>{renderItem(item, i)}</div>
      ))}

      {hasMore && (
        <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      )}

      {loadingMore &&
        (renderSkeleton ? (
          renderSkeleton()
        ) : (
          <div className="flex items-center justify-center py-6">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-moscowa-purple/30 border-t-moscowa-purple" />
          </div>
        ))}
    </div>
  );
}
