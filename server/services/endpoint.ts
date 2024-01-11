import { domain } from "../getEnv";
import { IEdge, IEdgeService } from "../types/Edge";
import { IEndpointService } from "../types/Endpoint";
import { IEndpointFeatures } from "../types/Resource";
import EdgeService from "./Edge";



class EndpointService implements IEndpointService {

  edgeService : IEdgeService;

  constructor() {
    this.edgeService = new EdgeService();
  }

  async create(features : IEndpointFeatures, projectName : string,  resourceName : string) : Promise<Array<Object>>{
    let endpoint : Array<Object> = [];
    let getx : string = `${domain}/mock/${resourceName}/`
    let postx : string = `${domain}/mock/${resourceName}/`
    let deleteAndPutx : string = `${domain}/mock/${resourceName}/:id`

    let paginateX : string = `${domain}/mock/${resourceName}/paginate?page=1&limit=10`
    let searchX : string = `${domain}/mock/${resourceName}/search/?search=fullTextSearchAgainstString`
    let filterX : string = `${domain}/mock/${resourceName}/filter/?name=name&value=value`
    let validateX : string = `${domain}/mock/${resourceName}/validate`

    let getFunctionURL = (name : string) => `${domain}/${resourceName}/edge/${name}`

    if (features.getx) endpoint.push({method: "GET", url: getx, type: "Generic"});
    if(features.postx) endpoint.push({method: "POST", url: postx, type: "Generic"});
    if (features.putx) endpoint.push({method: "PUT", url: deleteAndPutx, type: "Generic"});
    if (features.deletex) endpoint.push({method: "DELETE", url: deleteAndPutx, params: ["id"], type: "Generic"});
    if (features.pagination) endpoint.push({method: "GET", url: paginateX, params: ["page", "limit"], type: "Generic"});
    if (features.search) endpoint.push({method: "GET", url: searchX, params: ["search"], type: "Generic"});
    if (features.filter) endpoint.push({method: "GET", url: filterX, params: ["name", "value"], type: "Generic"});
    if (features.validation) endpoint.push({method: "POST", url: validateX, type: "Generic"});
    if (features.validation) endpoint.push({method: "PUT", url: validateX, type: "Generic"});

    if (features.functions) {

      let functions  : any = await this.edgeService.findEdgeFunctionsBYResourceName(
        resourceName);

        functions.forEach((func : any) => {
        endpoint.push({method: func.method, url: getFunctionURL(func.name), type: "Edge Function"});
      })
    }
  
    return endpoint
  }
}

export default EndpointService;
