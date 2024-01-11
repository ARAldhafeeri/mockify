import { IEndpointFeatures } from "./Resource";

export interface IEndpointService {
  create: (features: IEndpointFeatures, projectName: string, resourceName: string) => Promise<Array<Object>>;
}