export function clearAuthToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}