export const API_ROUTE: string = "/v1";
const withAPiRoute = (route: string) => `${API_ROUTE}/${route}`;
export const USER_ROUTE: string = withAPiRoute("user");
export const USER_LOGIN_ROUTE: string = "/login";
export const POLICY_ROUTE: string = withAPiRoute("policy");
export const PROJECT_ROUTE: string = withAPiRoute("project");
export const PROJECT_ROUTE_REFRESH: string = "/refresh";
export const RESOURCE_ROUTE: string = withAPiRoute("resource");
export const DATA_ROUTE: string = withAPiRoute("data");
export const ENDPOINT_ROUTE: string = withAPiRoute("endpoint");

export const MOCK_ROUTE: string = withAPiRoute("mock");
export const MOCK_ROUTE_RESOURCE_PARAM: string = "/:resourceId";
export const MOCK_ROUTE_PAGINATE: string = "/paginate";
export const MOCK_ROUTE_FILTER: string = "/filter";
export const MOCK_ROUTE_SEARCH: string = "/search";
export const MOCK_ROUTE_VALIDATE: string = "/validate";

export const EDGE_ROUTE: string = withAPiRoute("edge");
export const CACHE_ROUTE: string = withAPiRoute("cache/:projectId");
export const CAACHE_ROUTE_ONLY: string = withAPiRoute("cache");
export const EDGE_ROUTE_WITH_PARAMS: string = "/mock/:edgeId/:resourceId";

export const EVENT_ROUTE: string = withAPiRoute("event");
export const EVENT_ROUTE_WITH_PARAMS: string = "/event/:resourceId";

export const ROOT_ROUTE = "/";

export const WITH_PROJECT_ID_ROUTE = "/:projectId";
export const WITH_RESOURCE_ID_ROUTE = "/:resourceId";

export const CLIENT_ROUTE: string = withAPiRoute("client");
