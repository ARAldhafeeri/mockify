import { IEndpointFeatures } from "./resource";

export interface ISwaggerService {
  create: (features: IEndpointFeatures, name: string) => Promise<Array<Object>>;
}
