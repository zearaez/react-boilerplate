import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setAuthTokens: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user?: User | null;
      }>,
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user || null;
      state.isAuthenticated = true;
    },
    setUserProfile: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    clearToken: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setToken, setRefreshToken, setAuthTokens, clearToken } =
  authSlice.actions;
export default authSlice.reducer;
