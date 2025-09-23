import axios, { type AxiosRequestConfig } from "axios";
import { showToast } from "../utils/toastHandler";
import type { ApiRequestOptions } from "../interface";
import { errorMessages } from "../utils/constants";

// Axios response interceptor for handling token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "https://dummyjson.com/auth/refresh",
            {
              refreshToken,
            }
          );
          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        } catch {
          // Refresh failed, clear tokens
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          showToast("Session expired. Please log in again.", "error");
        }
      }
    }
    return Promise.reject(error);
  }
);

export const apiRequestHandler = async ({
  url,
  method = "get",
  data = {},
  headers = {},
}: ApiRequestOptions) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
    };

    if (
      method !== "get" &&
      data !== undefined &&
      Object.keys(data as object).length > 0
    ) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Network error: no response received
      if (!error.response) {
        const message =
          "Unable to connect. Please check your internet connection and try again.";
        showToast(message, "error");
        throw message;
      }

      // Server responded with an error status
      const { status, data } = error.response;
      const serverMessage =
        data?.message || errorMessages[status] || "An error occurred";
      showToast(serverMessage, "error");
      throw serverMessage;
    }
    // Non-Axios error
    const message = "An error occurred while processing your request.";
    showToast(message, "error");
    throw new Error(message);
  }
};
