import { redirect } from "react-router";
import { ApiEndpoint } from "../enum";

export async function authLoader() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken && !refreshToken) {
    throw redirect(ApiEndpoint.AUTH_LOGIN);
  }
  return null;
}

export async function loginLoader() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    throw redirect(ApiEndpoint.HOME);
  }
  return null;
}
