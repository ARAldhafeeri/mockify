import { domain } from "../getEnv";
import { IEdge, IEndpointService,  } from "../types/Endpoint";
import { IEndpointFeatures } from "../types/Resource";
import EdgeService from "./Edge";



class SwaggerService {

  endpointService : IEndpointService;

  constructor() {
    this.endpointService = new this.EndpointService();
  }


}

export default SwaggerService;
