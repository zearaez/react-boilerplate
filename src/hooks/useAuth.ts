import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILogin } from "@/types/login";
import { authService } from "@/core/api/auth-service";
import { useAppDispatch } from "@/store/hooks/hooks";
import { setAuthTokens, clearToken } from "@/store/slice/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * React Query hooks for authentication
 * These replace the AuthResource class methods with modern hook-based approach
 */

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: ILogin) => authService.login(credentials),
    onSuccess: (response) => {
      const { data } = response;

      // Extract tokens (handle different response formats)
      const token = data.access || data.token;
      const refreshToken = data.refresh || data.refreshToken;

      if (token && refreshToken) {
        dispatch(
          setAuthTokens({
            token,
            refreshToken,
            user: data.user,
          }),
        );

        // Clear any previous query cache
        queryClient.clear();

        // Navigate to dashboard or intended route
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      // Handle login error (show toast, etc.)
      // eslint-disable-next-line no-console
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: string) => authService.logout(refreshToken),
    onSuccess: () => {
      // Clear auth state
      dispatch(clearToken());

      // Clear all query cache
      queryClient.clear();

      // Navigate to login
      navigate("/login");
    },
    onError: (error) => {
      // Handle logout error
      // eslint-disable-next-line no-console
      console.error("Logout failed:", error);
      // Even if logout fails on server, clear local state
      dispatch(clearToken());
      queryClient.clear();
      navigate("/login");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (response) => {
      // Handle success (show success message, etc.)
      // eslint-disable-next-line no-console
      console.log("Password reset email sent:", response.data.message);
    },
    onError: (error) => {
      // Handle error (show error message, etc.)
      // eslint-disable-next-line no-console
      console.error("Forgot password failed:", error);
    },
  });
};

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (refreshToken: string) =>
      authService.refreshToken(refreshToken),
    onSuccess: (response, refreshToken) => {
      const { data } = response;

      // Update tokens in state
      const token = data.access || data.token;
      const newRefreshToken = data.refresh || data.refreshToken;

      if (token) {
        dispatch(
          setAuthTokens({
            token,
            refreshToken: newRefreshToken || refreshToken,
            user: data.user || null,
          }),
        );
      }
    },
    onError: (error) => {
      // Clear auth state and redirect to login
      // eslint-disable-next-line no-console
      console.error("Token refresh failed:", error);
      dispatch(clearToken());
    },
  });
};
