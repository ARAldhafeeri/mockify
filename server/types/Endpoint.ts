import { IResource } from "./Resource";

export interface IEndpointService {
  create: (resource : IResource) => Promise<Array<Object>>;
}