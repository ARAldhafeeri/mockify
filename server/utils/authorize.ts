import authorization from "../middleware/authorization";

export const authorizerRead = (resourceName: string) => {
  return authorization([resourceName], ["read"]);
};

export const authorizeWrite = (resourceName: string) => {
  return authorization([resourceName], ["write"]);
};

export const authorizeDelete = (resourceName: string) => {
  return authorization([resourceName], ["delete"]);
};

export const authorizeUpdate = (resourceName: string) => {
  return authorization([resourceName], ["update"]);
};
