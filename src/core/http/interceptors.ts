import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// import { refreshUser } from '@/core/api/auth';
import http from '@/core/http/http';
import { AUTH_REFRESH_TOKEN } from '@/core/http/endpoint-urls';
import {
  dispatchClearToken,
  dispatchSetAuthTokens,
  dispatchSetToken,
  getRefreshToken,
  getToken,
} from '@/store/manager';
import AuthResource from '../api/auth';

const RETRY_COUNT_LIMIT = 3;
const AUTHORIZATION_HEADER = 'Authorization';

function buildAuthHeader(accessToken: string) {
  return `Bearer ${accessToken}`;
}

const requestInterceptor = (request: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token && !request.headers[AUTHORIZATION_HEADER]) {
    request.headers[AUTHORIZATION_HEADER] = buildAuthHeader(token);
  }

  document.getElementById('spinner-container')?.classList.add('spinner-container');
  document.getElementById('spinner')?.classList.add('timer-loader');
  return request;
};

const responseInterceptor = (response: AxiosResponse) => {
  const originalRequest = response.config;

  if (originalRequest.url === AUTH_REFRESH_TOKEN && response.status === 200) {
    // Store both tokens from refresh response
    const token = response.data.access || response.data.token;
    const refreshToken = response.data.refresh || response.data.refreshToken;

    // Check if both tokens exist and update accordingly
    if (token && refreshToken) {
      dispatchSetAuthTokens({
        token,
        refreshToken,
        user: response.data.user,
      });
    } else if (token) {
      dispatchSetToken(token);
    }
  }

  document.getElementById('spinner-container')?.classList.remove('spinner-container');
  document.getElementById('spinner')?.classList.remove('timer-loader');

  return response;
};

const errorInterceptor = async (error: AxiosError<{ error: { message: string } }>) => {
  const auth = new AuthResource();
  if (!error.response) {
    return Promise.reject(error);
  }
  const refreshToken = getRefreshToken();
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
    __isRetryRequest?: boolean;
    retryCount: number;
  };

  if (originalRequest.url === AUTH_REFRESH_TOKEN && error.response.status === 401) {
    // if refresh token is expired
    dispatchClearToken();
    window.location.href = '/login';
  }

  if (error.response.status === 401 && !originalRequest.__isRetryRequest) {
    originalRequest._retry = true;
    originalRequest.retryCount = isNaN(originalRequest.retryCount)
      ? 1
      : originalRequest.retryCount++;

    if (!refreshToken) {
      dispatchClearToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      const { data } = await auth.refreshUser(refreshToken);
      dispatchSetAuthTokens({
        token: data.access,
        refreshToken: data.refresh || refreshToken, // Update refresh token if provided
        user: data.user,
      });

      originalRequest.headers[AUTHORIZATION_HEADER] = buildAuthHeader(data.access);
      return http.request(originalRequest);
    } catch (refreshError) {
      // If refresh fails, log out the user
      dispatchClearToken();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }

  if (originalRequest.retryCount > RETRY_COUNT_LIMIT) {
    dispatchClearToken();
    window.location.href = '/login';
  }

  document.getElementById('spinner-container')?.classList.remove('spinner-container');
  document.getElementById('spinner')?.classList.remove('timer-loader');
  return Promise.reject(error);
};

export { errorInterceptor, requestInterceptor, responseInterceptor };
