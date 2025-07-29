import { useEffect, useCallback } from "react";
import { usePrefetch } from "./usePrefetch";

interface UseInfiniteScrollPrefetchOptions {
  resource: string;
  currentPage: number;
  hasNextPage: boolean;
  params?: Record<string, unknown>;
  threshold?: number; // Distance from bottom to trigger prefetch (in pixels)
}

/**
 * Hook for prefetching next pages in infinite scroll scenarios
 * Improves perceived performance by loading data before user reaches the end
 * Respects VITE_ENABLE_PREFETCHING environment variable
 */
export const useInfiniteScrollPrefetch = ({
  resource,
  currentPage,
  hasNextPage,
  params = {},
  threshold = 500,
}: UseInfiniteScrollPrefetchOptions) => {
  const { prefetchNextPage, isCached } = usePrefetch();
  const isPrefetchingEnabled =
    import.meta.env.VITE_ENABLE_PREFETCHING === "true";

  const handleScroll = useCallback(() => {
    // Skip prefetching if disabled
    if (!isPrefetchingEnabled || !hasNextPage) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

    if (distanceFromBottom <= threshold) {
      const nextPage = currentPage + 1;
      const nextParams = { ...params, page: nextPage };

      // Only prefetch if not already cached
      if (!isCached([resource, "list", nextParams])) {
        prefetchNextPage(resource, params, nextPage);
      }
    }
  }, [
    resource,
    currentPage,
    hasNextPage,
    params,
    threshold,
    prefetchNextPage,
    isCached,
    isPrefetchingEnabled,
  ]);

  useEffect(() => {
    // Skip adding scroll listener if prefetching is disabled
    if (!isPrefetchingEnabled) {
      return;
    }

    const throttledScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll, isPrefetchingEnabled]);

  return {
    // This hook works via side effects
    isNearBottom: () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      return distanceFromBottom <= threshold;
    },
  };
};

/**
 * Simple throttle function to limit scroll event frequency
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
