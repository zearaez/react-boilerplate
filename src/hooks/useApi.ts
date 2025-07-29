import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "axios";
import { createApiService } from "@/core/api/api-service";

/**
 * Generic React Query hooks for CRUD operations
 * These replace the Resource class with modern hook-based approach
 */

export interface UseApiOptions {
  resource: string;
}

export const useApi = (options: UseApiOptions) => {
  const { resource } = options;
  const apiService = createApiService({ baseUrl: resource });
  const queryClient = useQueryClient();
  const isOptimisticUpdatesEnabled =
    import.meta.env.VITE_ENABLE_OPTIMISTIC_UPDATES === "true";

  // Query hooks
  const useList = <T = unknown>(
    params?: unknown,
    queryOptions?: Record<string, unknown>,
  ) => {
    return useQuery({
      queryKey: [resource, "list", params],
      queryFn: () => apiService.list<T>(params).then((res) => res.data),
      ...queryOptions,
    });
  };

  const useGet = <T = unknown>(
    id: string,
    queryOptions?: Record<string, unknown>,
  ) => {
    return useQuery({
      queryKey: [resource, "detail", id],
      queryFn: () => apiService.get<T>(id).then((res) => res.data),
      enabled: !!id,
      ...queryOptions,
    });
  };

  // Mutation hooks with optimistic updates
  const useCreate = <T = unknown>() => {
    return useMutation({
      mutationFn: (data: unknown) =>
        apiService.create<T>(data).then((res) => res.data),
      onMutate: async (newItem: unknown) => {
        // Skip optimistic updates if disabled
        if (!isOptimisticUpdatesEnabled) {
          return;
        }

        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: [resource, "list"] });

        // Snapshot the previous value
        const previousItems = queryClient.getQueryData([resource, "list"]);

        // Optimistically update to the new value
        queryClient.setQueryData([resource, "list"], (old: T[] | undefined) => {
          if (!old) return [newItem as T];
          const tempId = `temp-${Date.now()}`;
          const newItemWithId =
            typeof newItem === "object" && newItem !== null
              ? ({ ...(newItem as Record<string, unknown>), id: tempId } as T)
              : (newItem as T);
          return [...old, newItemWithId];
        });

        // Return a context object with the snapshotted value
        return { previousItems };
      },
      onError: (_err, _newItem, context) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        if (context?.previousItems && isOptimisticUpdatesEnabled) {
          queryClient.setQueryData([resource, "list"], context.previousItems);
        }
      },
      onSettled: () => {
        // Always refetch after error or success to sync with server state
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
      },
    });
  };

  const useCreateFormData = <T = unknown>() => {
    return useMutation({
      mutationFn: ({
        data,
        headers,
      }: {
        data: unknown;
        headers?: AxiosHeaders;
      }) => apiService.createFormData<T>(data, headers).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
      },
    });
  };

  const useUpdate = <T = unknown>() => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: unknown }) =>
        apiService.update<T>(id, data).then((res) => res.data),
      onMutate: async ({ id, data }) => {
        // Skip optimistic updates if disabled
        if (!isOptimisticUpdatesEnabled) {
          return;
        }

        // Cancel queries for both list and detail
        await queryClient.cancelQueries({ queryKey: [resource, "list"] });
        await queryClient.cancelQueries({ queryKey: [resource, "detail", id] });

        // Snapshot previous values
        const previousList = queryClient.getQueryData([resource, "list"]);
        const previousItem = queryClient.getQueryData([resource, "detail", id]);

        // Optimistically update list
        queryClient.setQueryData([resource, "list"], (old: T[] | undefined) => {
          if (!old) return old;
          return old.map((item: T) => {
            const itemId = (item as Record<string, unknown>)?.id;
            if (itemId === id) {
              return typeof data === "object" && data !== null
                ? ({
                    ...(item as Record<string, unknown>),
                    ...(data as Record<string, unknown>),
                  } as T)
                : (data as T);
            }
            return item;
          });
        });

        // Optimistically update detail
        queryClient.setQueryData(
          [resource, "detail", id],
          (old: T | undefined) => {
            if (!old) return old;
            return typeof data === "object" && data !== null
              ? ({
                  ...(old as Record<string, unknown>),
                  ...(data as Record<string, unknown>),
                } as T)
              : (data as T);
          },
        );

        return { previousList, previousItem, id };
      },
      onError: (_err, { id }, context) => {
        // Rollback on error if optimistic updates were enabled
        if (context && isOptimisticUpdatesEnabled) {
          if (context?.previousList) {
            queryClient.setQueryData([resource, "list"], context.previousList);
          }
          if (context?.previousItem) {
            queryClient.setQueryData(
              [resource, "detail", id],
              context.previousItem,
            );
          }
        }
      },
      onSettled: (_, __, { id }) => {
        // Refetch to sync with server
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
        queryClient.invalidateQueries({ queryKey: [resource, "detail", id] });
      },
    });
  };

  const useUpdateFormData = <T = unknown>() => {
    return useMutation({
      mutationFn: ({
        id,
        data,
        headers,
      }: {
        id: string;
        data: unknown;
        headers?: AxiosHeaders;
      }) =>
        apiService.updateFormData<T>(id, data, headers).then((res) => res.data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
        queryClient.invalidateQueries({
          queryKey: [resource, "detail", variables.id],
        });
      },
    });
  };

  const usePatch = <T = unknown>() => {
    return useMutation({
      mutationFn: ({
        id,
        data,
        headers,
      }: {
        id: string;
        data: unknown;
        headers?: AxiosHeaders;
      }) => apiService.patch<T>(id, data, headers).then((res) => res.data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
        queryClient.invalidateQueries({
          queryKey: [resource, "detail", variables.id],
        });
      },
    });
  };

  const usePatchFormData = <T = unknown>() => {
    return useMutation({
      mutationFn: ({
        id,
        data,
        headers,
      }: {
        id: string;
        data: unknown;
        headers?: AxiosHeaders;
      }) =>
        apiService.patchFormData<T>(id, data, headers).then((res) => res.data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
        queryClient.invalidateQueries({
          queryKey: [resource, "detail", variables.id],
        });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: (id: string) => apiService.remove(id),
      onMutate: async (id: string) => {
        // Skip optimistic updates if disabled
        if (!isOptimisticUpdatesEnabled) {
          return;
        }

        // Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: [resource, "list"] });
        await queryClient.cancelQueries({ queryKey: [resource, "detail", id] });

        // Snapshot the previous values
        const previousList = queryClient.getQueryData([resource, "list"]);
        const previousItem = queryClient.getQueryData([resource, "detail", id]);

        // Optimistically remove from list
        queryClient.setQueryData(
          [resource, "list"],
          (old: unknown[] | undefined) => {
            if (!old) return old;
            return old.filter((item: unknown) => {
              const itemId = (item as Record<string, unknown>)?.id;
              return itemId !== id;
            });
          },
        );

        // Remove detail query immediately
        queryClient.removeQueries({ queryKey: [resource, "detail", id] });

        return { previousList, previousItem, id };
      },
      onError: (_err, id, context) => {
        // Rollback on error if optimistic updates were enabled
        if (context && isOptimisticUpdatesEnabled) {
          if (context?.previousList) {
            queryClient.setQueryData([resource, "list"], context.previousList);
          }
          if (context?.previousItem) {
            queryClient.setQueryData(
              [resource, "detail", id],
              context.previousItem,
            );
          }
        }
      },
      onSettled: (_, __, id) => {
        // Always refetch to sync with server
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
        queryClient.removeQueries({ queryKey: [resource, "detail", id] });
      },
    });
  };

  return {
    // Query hooks
    useList,
    useGet,

    // Mutation hooks
    useCreate,
    useCreateFormData,
    useUpdate,
    useUpdateFormData,
    usePatch,
    usePatchFormData,
    useDelete,
  };
};
