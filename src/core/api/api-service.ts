import { AxiosHeaders } from "axios";
import http from "@/core/http/http";

/**
 * Generic API service functions for CRUD operations
 * These replace the Resource class methods
 */

export interface ApiServiceConfig {
  baseUrl: string;
}

export const createApiService = (config: ApiServiceConfig) => {
  const { baseUrl } = config;

  return {
    // GET /resource
    list: <T = unknown>(params?: unknown) =>
      http.get<T[]>(`/${baseUrl}/`, { params }),

    // GET /resource/:id
    get: <T = unknown>(id: string) => http.get<T>(`/${baseUrl}/${id}/`),

    // POST /resource
    create: <T = unknown>(data: unknown, headers?: AxiosHeaders) =>
      http.post<T>(`/${baseUrl}/`, data, { headers }),

    // POST /resource (with form data)
    createFormData: <T = unknown>(data: unknown, headers?: AxiosHeaders) =>
      http.post<T>(`/${baseUrl}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
      }),

    // PUT /resource/:id
    update: <T = unknown>(id: string, data: unknown) =>
      http.put<T>(`/${baseUrl}/${id}/`, data),

    // PUT /resource/:id (with form data)
    updateFormData: <T = unknown>(
      id: string,
      data: unknown,
      headers?: AxiosHeaders,
    ) =>
      http.put<T>(`/${baseUrl}/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
      }),

    // PATCH /resource/:id
    patch: <T = unknown>(id: string, data: unknown, headers?: AxiosHeaders) =>
      http.patch<T>(`/${baseUrl}/${id}/`, data, { headers }),

    // PATCH /resource/:id (with form data)
    patchFormData: <T = unknown>(
      id: string,
      data: unknown,
      headers?: AxiosHeaders,
    ) =>
      http.patch<T>(`/${baseUrl}/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
      }),

    // DELETE /resource/:id
    remove: (id: string) => http.delete(`/${baseUrl}/${id}/`),
  };
};
