export const API_ROUTE : string = "/api/v1";
export const USER_ROUTE : string = '/user';
export const USER_LOGIN_ROUTE : string = '/login';
export const POLICY_ROUTE : string = '/policy';
export const PROJECT_ROUTE : string = "/project";
export const PROJECT_ROUTE_REFRESH : string = "/project/refresh";
export const RESOURCE_ROUTE : string = "/resource";
export const DATA_ROUTE : string = "/data";
export const ENDPOINT_ROUTE : string = "/endpoint";

export const MOCK_ROUTE : string = "/mock";
export const MOCK_ROUTE_RESOURCE_PARAM : string = "/:resourceName";
export const MOCK_ROUTE_PAGINATE : string = "/paginate";
export const MOCK_ROUTE_FILTER : string = "/filter";
export const MOCK_ROUTE_SEARCH : string = "/search";
export const MOCK_ROUTE_VALIDATE : string = "/validate";

const RESOURCE_NAME_PARAM : string = "/:resourceName";
const FUNCTION_NAME_PARAM : string = "/:functionName";

export const EDGE_ROUTE : string = "/edge" + RESOURCE_NAME_PARAM + FUNCTION_NAME_PARAM;

