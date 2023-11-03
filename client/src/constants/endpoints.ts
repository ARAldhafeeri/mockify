export const ENDPOINTS = {
  LOGIN: "/login",
  USER: "/user",
  PROJECT: "/project",
  POLICY: "/policy",
  RESOURCE: "/resource",
  USER_DELETE: (id : string) => `/user/?id=${id}`,
  PROJECT_DELETE: (id : string) => `/project/?id=${id}`,
  RESOURCE_DELETE: (id : string) => `/resource/?id=${id}`,
}