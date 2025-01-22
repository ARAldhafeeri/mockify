import authorization from "../middleware/authorization";

export const authorizerRead = (name: string) => {
  return authorization([name], ["read"]);
};

export const authorizeWrite = (name: string) => {
  return authorization([name], ["write"]);
};

export const authorizeDelete = (name: string) => {
  return authorization([name], ["delete"]);
};

export const authorizeUpdate = (name: string) => {
  return authorization([name], ["update"]);
};
