import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiRequestHandler } from "../api/productApi";
import type { GetCurrentUserType, LoginState } from "../interface";
import { showToast } from "../utils/toastHandler";

export const userLogin = createAsyncThunk<
  // Returned payload type
  { accessToken: string; refreshToken: string },
  // Argument type
  { username: string; password: string }
>("login", async ({ username, password }) => {
  const response = await apiRequestHandler({
    url: "https://dummyjson.com/auth/login",
    method: "post",
    data: { username, password, expiresInMins: 30 },
  });

  return {
    accessToken: response.token ?? response.accessToken,
    refreshToken: response.refreshToken ?? "",
  };
});

export const getCurrentUser = createAsyncThunk<
  GetCurrentUserType,
  { accessToken: string }
>("currentUser", async () => {
  const response = await apiRequestHandler({
    url: "https://dummyjson.com/auth/me",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response;
});

const initialState: LoginState = {
  userProfile: null,
  error: null,
  isLoading: false,
  loggedIn: false,
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.userProfile = null;
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        showToast("Login successful", "success");
        state.error = null;
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message || "Failed to login";
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to get current user";
        state.isLoading = false;
      });
  },
});

export const { setUserLoggedIn } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
