import axios, { type AxiosRequestConfig } from "axios";
import { showToast } from "../utils/toastHandler";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface ApiRequestOptions {
  url: string;
  method?: HttpMethod;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const errorMessages: Record<number, string> = {
  401: "Unauthorized. Please log in again.",
  403: "Forbidden. You do not have permission.",
  404: "Requested resource not found.",
  500: "Server is currently unavailable. Please try later.",
};

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
