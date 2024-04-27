export const ENDPOINTS = {
  LOGIN: "/login",
  USER: "/user",
  PROJECT: "/project",
  POLICY: "/policy",
  RESOURCE: "/resource",
  RESOURCE_PROJECT_ID: (projectID: string | undefined) => `/resource?projectId=${projectID}`,
  DATA: "/data",
  DATA_RESOURCE_ID: (name: string) => `/data?resourceId=${name}`,
  ENDPOINT: "/endpoint",
  USER_DELETE: (id : string) => `/user/?id=${id}`,
  PROJECT_DELETE: (id : string) => `/project/?id=${id}`,
  RESOURCE_DELETE: (id : string) => `/resource/?id=${id}`,
  DATA_DELETE: (id : string ) => `/data/?id=${id}`,
  POLICY_DELETE: (id : string) => `/policy/?id=${id}`,
  DATA_POLICY_NAME: (projectID: string) => `/policy?projectID=${projectID}`,
  // edge 
  EDGE: "/edge",
  EDGE_DELETE: (name: string, id : string) => `/${name}/edge/?id=${id}`,
  EDGE_NAME: (res: string) => `/${res}/edge`,
  // cache 
  CACHE: (projectName : string) => `/cache/${projectName}`,
  CACHE_KEY: (projectName : string, key : string) => `/cache/${projectName}?key=${key}`,
  // event
  EVENT: "/event",
  EVENT_DELETE: (id : string) => `/event/?id=${id}`,
  EVENT_PARAM: (resourceId: string) => `/event?resourceId=${resourceId}`,
  // client
  CLIENT: "/client",
  CLIENT_DELETE: (id : string) => `/client/?id=${id}`,
  CLIENT_PARAM: (projectID: string | undefined) => `/client?projectId=${projectID}`,
};