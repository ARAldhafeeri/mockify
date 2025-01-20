import { IEndpointFeatures } from "./resource";

export interface ISwaggerService {
  create: (
    features: IEndpointFeatures,
    projectName: string,
    resourceName: string
  ) => Promise<Array<Object>>;
}
