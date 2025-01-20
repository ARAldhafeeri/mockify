import { domain } from "../getEnv";
import { IEdge, IEndpointService } from "../entities/endpoint";
import { IEndpointFeatures } from "../entities/resource";
import EdgeService from "./edge";

class SwaggerService {
  endpointService: IEndpointService;

  constructor() {
    this.endpointService = new this.EndpointService();
  }
}

export default SwaggerService;
