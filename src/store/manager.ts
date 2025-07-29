import { setAuthTokens } from "./slice/auth.slice";
import { store } from "@/store/store";
import { setToken, clearToken } from "@/store/slice/auth.slice";
import { User } from "@/types";

export const getToken = () => store.getState().auth.token;
export const getRefreshToken = () => store.getState().auth.refreshToken;
export const dispatchSetToken = (token: string) =>
  store.dispatch(setToken(token));
export const dispatchSetAuthTokens = (payload: {
  token: string;
  refreshToken: string;
  user?: User | null;
}) => store.dispatch(setAuthTokens(payload));
export const dispatchClearToken = () => store.dispatch(clearToken());
