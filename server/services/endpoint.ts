import { domain } from "../getEnv";
import { IEdge, IEdgeService } from "../types/Edge";
import { IEndpointService } from "../types/Endpoint";
import { IEndpointFeatures, IResource } from "../types/Resource";
import EdgeService from "./Edge";



class EndpointService implements IEndpointService {

  edgeService : IEdgeService;

  constructor() {
    this.edgeService = new EdgeService();
  }

  async create(resource : IResource) : Promise<Array<Object>>{
    let endpoint : Array<Object> = [];
    let resourceName = resource.resourceName;
    let features : IEndpointFeatures = resource.features;
    // full urls
    let getx : string = `${domain}/mock/${resourceName}/`
    let postx : string = `${domain}/mock/${resourceName}/`
    let deleteAndPutx : string = `${domain}/mock/${resourceName}/{id}`

    let paginateX : string = `${domain}/mock/${resourceName}/paginate?page=1&limit=10`
    let searchX : string = `${domain}/mock/${resourceName}/search/?search=fullTextSearchAgainstString`
    let filterX : string = `${domain}/mock/${resourceName}/filter/?name=name&value=value`
    let validateX : string = `${domain}/mock/${resourceName}/validate`

    // paths for swagger  docs 
    let getxPath : string = `/mock/${resourceName}/{id}`
    let postxPath : string = `/mock/${resourceName}/`
    let deleteAndPutxPath : string = `/mock/${resourceName}/{id}`
    let paginateXPath : string = `/mock/${resourceName}/paginate`
    let searchXPath : string = `/mock/${resourceName}/search`
    let filterXPath : string = `/mock/${resourceName}/filter`
    let validateXPath : string = `/mock/${resourceName}/validate`

    let getFunctionURL = (name : string) => `${domain}/${resourceName}/edge/${name}`
    let getFunctionPath = (name : string) => `/${resourceName}/edge/${name}`
    if (features.getx) endpoint.push(
      {method: "GET", url: getx, type: "Generic", path: getxPath, params: ["id"]}
      );
    if(features.postx) endpoint.push(
      {method: "POST", url: postx, type: "Generic", body: resource.fields, path: postxPath}
      );
    if (features.putx) endpoint.push(
      {method: "PUT", url: deleteAndPutx, type: "Generic", body: resource.fields, path: deleteAndPutxPath}
      );
    if (features.deletex) endpoint.push(
      {method: "DELETE", url: deleteAndPutx, params: ["id"], type: "Generic", path: deleteAndPutxPath}
      );
    if (features.pagination) endpoint.push(
      {method: "GET", url: paginateX, query: ["page", "limit"], type: "Generic", path: paginateXPath}
      );
    if (features.search) endpoint.push(
      {method: "GET", url: searchX, query: ["search"], type: "Generic", paath: searchXPath}
      );
    if (features.filter) endpoint.push(
      {method: "GET", url: filterX, query: ["name", "value"], type: "Generic", path: filterXPath}
      );
    if (features.validation) endpoint.push(
      {method: "POST", url: validateX, type: "Generic", body: resource.fields, path: validateXPath}
      );
    if (features.validation) endpoint.push(
      {method: "PUT", url: validateX, type: "Generic", body: resource.fields, path: validateXPath}
      );

    if (features.functions) {

      let functions  : any = await this.edgeService.findEdgeFunctionsBYResourceName(
        resourceName);

        functions.forEach((func : any) => {
        if (func.method === "POST" || func.method === "PUT") {
          endpoint.push({method: func.method, url: getFunctionURL(func.name), path: getFunctionPath(func.name), body: resource.fields, type: "Edge Function"});
        } else {
          endpoint.push({method: func.method, url: getFunctionURL(func.name), path: getFunctionPath(func.name), type: "Edge Function"});
        }
      })
    }
    
    // add headers to all endpoints
    endpoint.forEach((end : any) => {
      end.headers = ["x-api-key"];
    })
  
    return endpoint
  }
}

export default EndpointService;
