
import { AxiosHeaders } from "axios";
import http from "@/core/http/http";

/**
 * Simple REST resource class
 */
class Resource {
  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  list(query?: unknown) {
    return http({
      url: "/" + this.uri + '/',
      method: "get",
      params: query,
    });
  }

  get(id: string) {
    return http({
      url: "/" + this.uri + "/" + id + '/',
      method: "get",
    });
  }
  store(resource: unknown, headers?: AxiosHeaders) {
    return http({
      url: "/" + this.uri + '/',
      method: "post",
      data: resource,
      headers: headers,
    });
  }

  storeFormData(resource: unknown, headers?: AxiosHeaders) {
    return http({
      url: "/" + this.uri + '/',
      method: "post",
      data: resource,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      },
    });
  }
  update(id: string, resource: unknown) {
    return http({
      url: "/" + this.uri + "/" + id + '/',
      method: "put",
      data: resource,
    });
  }
  updateFormData(id: string, resource: unknown, headers?: AxiosHeaders) {
    return http({
      url: "/" + this.uri + "/" + id + '/',
      method: "put",
      data: resource,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      },
    });
  }

  patch(id: string, resource: unknown, headers?: AxiosHeaders) {
    return http({
      url: "/" + this.uri + "/" + id + '/',
      method: "patch",
      data: resource,
      headers: headers,
    });
  }

  patchFormData(id: string, resource: unknown, headers?: AxiosHeaders) {
    return http({
      url: "/" + this.uri + "/" + id + '/',
      method: "patch",
      data: resource,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      },
    });
  }
  destroy(id: string) {
    return http({
      url: "/" + this.uri + "/" + id + '/',
      method: "delete",
    });
  }
}

export { Resource as default };
