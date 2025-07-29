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

  // Mutation hooks
  const useCreate = <T = unknown>() => {
    return useMutation({
      mutationFn: (data: unknown) =>
        apiService.create<T>(data).then((res) => res.data),
      onSuccess: () => {
        // Invalidate list queries
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
      onSuccess: (_, variables) => {
        // Invalidate both list and detail queries
        queryClient.invalidateQueries({ queryKey: [resource, "list"] });
        queryClient.invalidateQueries({
          queryKey: [resource, "detail", variables.id],
        });
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
      onSuccess: (_, id) => {
        // Invalidate list queries and remove detail query
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
