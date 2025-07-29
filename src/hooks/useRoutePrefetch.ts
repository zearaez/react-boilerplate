import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePrefetch } from "./usePrefetch";

/**
 * Route-based prefetching strategies
 * Automatically prefetches data based on current route and user navigation patterns
 * Respects VITE_ENABLE_PREFETCHING environment variable
 */
export const useRoutePrefetch = () => {
  const location = useLocation();
  const { prefetchList, prefetchItem, prefetchMultiple } = usePrefetch();
  const isPrefetchingEnabled =
    import.meta.env.VITE_ENABLE_PREFETCHING === "true";

  /**
   * Prefetch data for common routes
   */
  useEffect(() => {
    // Skip all route prefetching if disabled
    if (!isPrefetchingEnabled) {
      return;
    }

    const prefetchForRoute = async () => {
      const pathname = location.pathname;

      switch (pathname) {
        case "/dashboard":
          // Prefetch data commonly needed on dashboard
          await prefetchMultiple([
            { resource: "users", type: "list", params: { limit: 10 } },
            {
              resource: "notifications",
              type: "list",
              params: { unread: true },
            },
            { resource: "stats", type: "list" },
          ]);
          break;

        case "/users":
          // Prefetch user list and common user details
          await prefetchList("users", { page: 1, limit: 20 });
          break;

        case "/login":
          // Prefetch data for post-login experience
          await prefetchList("notifications", { limit: 5 });
          break;

        default: {
          // For detail routes (e.g., /users/123)
          const userMatch = pathname.match(/^\/users\/(.+)$/);
          if (userMatch) {
            const userId = userMatch[1];
            // Prefetch related user data
            await prefetchMultiple([
              { resource: "users", type: "item", id: userId },
              { resource: "user-activity", type: "list", params: { userId } },
            ]);
          }
          break;
        }
      }
    };

    // Small delay to avoid blocking initial render
    const timer = setTimeout(prefetchForRoute, 100);
    return () => clearTimeout(timer);
  }, [
    location.pathname,
    prefetchList,
    prefetchItem,
    prefetchMultiple,
    isPrefetchingEnabled,
  ]);

  /**
   * Prefetch likely next routes based on current location
   */
  useEffect(() => {
    // Skip prefetching if disabled
    if (!isPrefetchingEnabled) {
      return;
    }

    const prefetchLikelyRoutes = async () => {
      const pathname = location.pathname;

      // Define likely next routes based on current route
      const routePredictions: Record<string, string[]> = {
        "/dashboard": ["/users", "/settings", "/notifications"],
        "/users": ["/users/new", "/dashboard"],
        "/login": ["/dashboard"],
      };

      const likelyRoutes = routePredictions[pathname];
      if (likelyRoutes) {
        // Prefetch data for likely next routes with lower priority
        const prefetchPromises = likelyRoutes.map((route) => {
          switch (route) {
            case "/users":
              return prefetchList("users", { page: 1, limit: 10 });
            case "/dashboard":
              return prefetchList("stats", {});
            case "/notifications":
              return prefetchList("notifications", { limit: 10 });
            default:
              return Promise.resolve();
          }
        });

        // Use requestIdleCallback if available, otherwise setTimeout
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => {
            Promise.all(prefetchPromises);
          });
        } else {
          setTimeout(() => {
            Promise.all(prefetchPromises);
          }, 1000);
        }
      }
    };

    prefetchLikelyRoutes();
  }, [location.pathname, prefetchList, isPrefetchingEnabled]);

  return {
    // This hook primarily works via side effects
    // but we can return utilities if needed
    currentRoute: location.pathname,
  };
};
