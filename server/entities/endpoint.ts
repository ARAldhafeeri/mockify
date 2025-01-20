import { IResource } from "./resource";

export interface IEndpointService {
  create: (resource: IResource) => Promise<Array<Object>>;
}
