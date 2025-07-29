import React, { useCallback } from "react";
import { usePrefetch } from "@/hooks/usePrefetch";

interface PrefetchLinkProps {
  to: string;
  resource: string;
  id?: string;
  params?: unknown;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

/**
 * Enhanced Link component that prefetches data on hover
 * Provides better UX by loading data before user clicks
 * Respects VITE_ENABLE_PREFETCHING environment variable
 */
const PrefetchLink: React.FC<PrefetchLinkProps> = ({
  to,
  resource,
  id,
  params,
  className = "",
  children,
  delay = 150,
}) => {
  const { prefetchItem, prefetchList, isCached } = usePrefetch();
  const isPrefetchingEnabled =
    import.meta.env.VITE_ENABLE_PREFETCHING === "true";

  const handleMouseEnter = useCallback(async () => {
    // Skip prefetching if disabled
    if (!isPrefetchingEnabled) {
      return;
    }

    // Small delay to avoid prefetching on accidental hovers
    setTimeout(async () => {
      try {
        if (id) {
          // Prefetch specific item
          const queryKey = [resource, "detail", id];
          if (!isCached(queryKey)) {
            await prefetchItem(resource, id);
          }
        } else {
          // Prefetch list
          const queryKey = [resource, "list", params];
          if (!isCached(queryKey)) {
            await prefetchList(resource, params);
          }
        }
      } catch (error) {
        // Silently fail - prefetching is a performance optimization
        // eslint-disable-next-line no-console
        console.debug("Prefetch failed:", error);
      }
    }, delay);
  }, [
    resource,
    id,
    params,
    delay,
    prefetchItem,
    prefetchList,
    isCached,
    isPrefetchingEnabled,
  ]);

  const handleClick = (e: React.MouseEvent) => {
    // If it's a regular click (not middle-click or ctrl+click), navigate
    if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      window.history.pushState(null, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <a
      href={to}
      className={`prefetch-link ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default PrefetchLink;
