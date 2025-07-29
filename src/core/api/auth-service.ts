import { ILogin } from "@/types/login";
import { User } from "@/types";
import {
  AUTH_FORGOT_PASSWORD,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
} from "../http/endpoint-urls";
import http from "../http/http";

/**
 * Auth API service - replaces AuthResource class
 * Uses functional approach instead of class-based
 */

export interface AuthTokenResponse {
  access: string;
  refresh: string;
  token?: string;
  refreshToken?: string;
  user?: User;
}

export interface LoginResponse extends AuthTokenResponse {
  user: User;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export const authService = {
  /**
   * Login user with email and password
   */
  login: (credentials: ILogin) =>
    http.post<LoginResponse>(AUTH_LOGIN, credentials),

  /**
   * Send forgot password email
   */
  forgotPassword: (email: string) =>
    http.post<{ message: string }>(AUTH_FORGOT_PASSWORD, { email }),

  /**
   * Logout user
   */
  logout: (refreshToken: string) =>
    http.post<{ message: string }>(AUTH_LOGOUT, {
      refresh_token: refreshToken,
    }),

  /**
   * Refresh access token
   */
  refreshToken: (refreshToken: string) =>
    http.post<AuthTokenResponse>(AUTH_REFRESH_TOKEN, { refresh: refreshToken }),
};
