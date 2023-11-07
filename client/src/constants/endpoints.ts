export const ENDPOINTS = {
  LOGIN: "/login",
  USER: "/user",
  PROJECT: "/project",
  POLICY: "/policy",
  RESOURCE: "/resource",
  DATA: "/data",
  DATA_RESOURCE_NAME: (name: string) => `/data?resourceName=${name}`,
  ENDPOINT: "/endpoint",
  USER_DELETE: (id : string) => `/user/?id=${id}`,
  PROJECT_DELETE: (id : string) => `/project/?id=${id}`,
  RESOURCE_DELETE: (id : string) => `/resource/?id=${id}`,
  DATA_DELETE: (id : string ) => `/data/?id=${id}`,
}