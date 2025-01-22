import { IEndpointService } from "../entities/endpoint";

class SwaggerService {
  endpointService: IEndpointService;

  constructor(endpointService: IEndpointService) {
    this.endpointService = endpointService;
  }
}

export default SwaggerService;
