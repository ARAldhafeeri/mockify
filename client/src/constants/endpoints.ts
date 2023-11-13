export const ENDPOINTS = {
  LOGIN: "/login",
  USER: "/user",
  PROJECT: "/project",
  POLICY: "/policy",
  RESOURCE: "/resource",
  DATA: "/data",
  DATA_RESOURCE_NAME: (name: string) => `/data?resource=${name}`,
  ENDPOINT: "/endpoint",
  USER_DELETE: (id : string) => `/user/?id=${id}`,
  PROJECT_DELETE: (id : string) => `/project/?id=${id}`,
  RESOURCE_DELETE: (id : string) => `/resource/?id=${id}`,
  DATA_DELETE: (id : string ) => `/data/?id=${id}`,
  POLICY_DELETE: (id : string) => `/policy/?id=${id}`,
  DATA_POLICY_NAME: (projectID: string) => `/policy?projectID=${projectID}`,

}