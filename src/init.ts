import http from "@/core/http/http";
import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from "@/core/http/interceptors";

/**
 * Initialize interceptors for the application.
 */
function initInterceptors() {
  http.interceptors.request.use(requestInterceptor);
  http.interceptors.response.use(
    responseInterceptor,
    /**
     * This interceptor checks if the response had a 401 status code, which means
     * that the access token used for the request has expired. It then refreshes
     * the access token and resends the original request.
     */
    errorInterceptor
  );
}

export default function init() {
  initInterceptors();
}
