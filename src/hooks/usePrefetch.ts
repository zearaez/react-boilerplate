import { useQueryClient } from "@tanstack/react-query";
import { createApiService } from "@/core/api/api-service";

/**
 * Hook for prefetching data to improve performance
 * Loads data in the background before it's actually needed
 * Respects VITE_ENABLE_PREFETCHING environment variable
 */
export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const isPrefetchingEnabled =
    import.meta.env.VITE_ENABLE_PREFETCHING === "true";

  /**
   * Prefetch a list of resources
   */
  const prefetchList = async <T = unknown>(
    resource: string,
    params?: unknown,
    options?: {
      staleTime?: number;
      gcTime?: number;
    },
  ) => {
    // Skip prefetching if disabled by environment variable
    if (!isPrefetchingEnabled) {
      return;
    }

    const apiService = createApiService({ baseUrl: resource });

    await queryClient.prefetchQuery({
      queryKey: [resource, "list", params],
      queryFn: () => apiService.list<T>(params).then((res) => res.data),
      staleTime: options?.staleTime || 1000 * 60 * 5, // 5 minutes default
      gcTime: options?.gcTime || 1000 * 60 * 10, // 10 minutes default
    });
  };

  /**
   * Prefetch a specific resource item
   */
  const prefetchItem = async <T = unknown>(
    resource: string,
    id: string,
    options?: {
      staleTime?: number;
      gcTime?: number;
    },
  ) => {
    // Skip prefetching if disabled by environment variable
    if (!isPrefetchingEnabled) {
      return;
    }

    const apiService = createApiService({ baseUrl: resource });

    await queryClient.prefetchQuery({
      queryKey: [resource, "detail", id],
      queryFn: () => apiService.get<T>(id).then((res) => res.data),
      staleTime: options?.staleTime || 1000 * 60 * 5,
      gcTime: options?.gcTime || 1000 * 60 * 10,
    });
  };

  /**
   * Prefetch multiple resources in parallel
   */
  const prefetchMultiple = async (
    prefetchConfigs: Array<{
      resource: string;
      type: "list" | "item";
      params?: unknown;
      id?: string;
      staleTime?: number;
      gcTime?: number;
    }>,
  ) => {
    const promises = prefetchConfigs.map((config) => {
      if (config.type === "list") {
        return prefetchList(config.resource, config.params, {
          staleTime: config.staleTime,
          gcTime: config.gcTime,
        });
      } else if (config.type === "item" && config.id) {
        return prefetchItem(config.resource, config.id, {
          staleTime: config.staleTime,
          gcTime: config.gcTime,
        });
      }
      return Promise.resolve();
    });

    await Promise.all(promises);
  };

  /**
   * Check if data is already cached
   */
  const isCached = (queryKey: unknown[]) => {
    const data = queryClient.getQueryData(queryKey);
    return !!data;
  };

  /**
   * Prefetch related data when hovering over links
   */
  const prefetchOnHover = async <T = unknown>(
    resource: string,
    id: string,
    delay: number = 100,
  ) => {
    // Small delay to avoid prefetching on accidental hovers
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (!isCached([resource, "detail", id])) {
      await prefetchItem<T>(resource, id, {
        staleTime: 1000 * 60 * 2, // 2 minutes for hover prefetch
      });
    }
  };

  /**
   * Prefetch next page of paginated data
   */
  const prefetchNextPage = async <T = unknown>(
    resource: string,
    currentParams: Record<string, unknown>,
    nextPageNumber: number,
  ) => {
    const nextParams = { ...currentParams, page: nextPageNumber };

    if (!isCached([resource, "list", nextParams])) {
      await prefetchList<T>(resource, nextParams, {
        staleTime: 1000 * 60 * 3, // 3 minutes for pagination prefetch
      });
    }
  };

  return {
    prefetchList,
    prefetchItem,
    prefetchMultiple,
    prefetchOnHover,
    prefetchNextPage,
    isCached,
  };
};
