export const ENDPOINTS = {
  LOGIN: "/login",
  USER: "/user",
  USER_DELETE: (id : string) => `/user/?id=${id}`,
}