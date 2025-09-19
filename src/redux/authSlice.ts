import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestHandler } from "../api/productApi";
import type { LoginState } from "../interface";
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
    data: { username, password },
  });

  return {
    accessToken: response.token ?? response.accessToken,
    refreshToken: response.refreshToken ?? "",
  };
});

const initialState: LoginState = {
  error: null,
  isLoading: false,
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
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
      });
  },
});

export const loginReducer = loginSlice.reducer;
