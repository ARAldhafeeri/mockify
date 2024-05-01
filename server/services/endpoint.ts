import { domain } from "../getEnv";
import { IEdge, IEdgeService } from "../types/Edge";
import { IEndpointService } from "../types/Endpoint";
import { IEndpointFeatures, IResource } from "../types/Resource";
import { IClientService } from "../types/client";
import EdgeService from "./Edge";
import ClientService from "./client";



class EndpointService implements IEndpointService {

  edgeService : IEdgeService;
  clientService : IClientService;
  endpoint : Array<Object>;

  constructor() {
    this.edgeService = new EdgeService();
    this.clientService = new ClientService();
    this.endpoint = [];
  }

  addWssEndpoints = async (projectId : any) => {
    let projectClientCredentials = await this.clientService.findClientsByPorjectId(projectId);
    projectClientCredentials.forEach((client : any) => {
      this.endpoint.push({url: this.urlConstructor(domain, "wss",`/${client.id}`), type: "WebSocket", headers: ["id", "secret"]});
    });
  };

  getFunctionURL(name : string, resourceId : string) {
    return this.urlConstructor(domain, "https", `${resourceId}/edge/${name}`);
  }

  getFunctionPath(name : string, resourceId : string) {
    return `/${resourceId}/edge/${name}`;
  }

  addEdgeEndpoints = async (resourceId : string) => {
    let functions  : any = await this.edgeService.findEdgeFunctionsBYresourceId(
      resourceId);

      functions.forEach((func : any) => {
      if (func.method === "POST" || func.method === "PUT") {
        this.endpoint.push({method: func.method, url: this.getFunctionURL(func.name, resourceId), path: this.getFunctionPath(func.name, resourceId), body: {}, type: "Edge Function"});
      } else {
        this.endpoint.push({method: func.method, url: this.getFunctionURL(func.name, resourceId), path: this.getFunctionPath(func.name, resourceId), type: "Edge Function"});
      }
    })
  }

  urlConstructor = (domain : string, protocol: string, path: string) => {
    return `${protocol}://${domain}${path}`
  }

  addGenericEndpoints = async (resource : IResource) => {
    let resourceId = resource._id;
    let features : IEndpointFeatures = resource.features;
    let getx : string = this.urlConstructor(domain, "https", `/mock/${resourceId}/`);
    let postx : string = this.urlConstructor(domain, "https", `/mock/${resourceId}/`);
    let deleteAndPutx : string = this.urlConstructor(domain, "https", `/mock/${resourceId}/{id}`);

    let paginateX : string = this.urlConstructor(domain, "https",`/mock/${resourceId}/paginate?page=1&limit=10`)
    let searchX : string = this.urlConstructor(domain, "https",`/mock/${resourceId}/search/?search=fullTextSearchAgainstString`)
    let filterX : string = this.urlConstructor(domain, "https",`/mock/${resourceId}/filter/?name=name&value=value`)
    let validateX : string = this.urlConstructor(domain, "https",`/mock/${resourceId}/validate`)

    // paths for swagger  docs 
    let getxPath : string = `/mock/${resourceId}/{id}`
    let postxPath : string = `/mock/${resourceId}/`
    let deleteAndPutxPath : string = `/mock/${resourceId}/{id}`
    let paginateXPath : string = `/mock/${resourceId}/paginate`
    let searchXPath : string = `/mock/${resourceId}/search`
    let filterXPath : string = `/mock/${resourceId}/filter`
    let validateXPath : string = `/mock/${resourceId}/validate`

    if (features.getx) this.endpoint.push(
      {method: "GET", url: getx, type: "Generic", path: getxPath, params: ["id"]}
      );
    if(features.postx) this.endpoint.push(
      {method: "POST", url: postx, type: "Generic", body: resource.fields, path: postxPath}
      );
    if (features.putx) this.endpoint.push(
      {method: "PUT", url: deleteAndPutx, type: "Generic", body: resource.fields, path: deleteAndPutxPath}
      );
    if (features.deletex) this.endpoint.push(
      {method: "DELETE", url: deleteAndPutx, params: ["id"], type: "Generic", path: deleteAndPutxPath}
      );
    if (features.pagination) this.endpoint.push(
      {method: "GET", url: paginateX, query: ["page", "limit"], type: "Generic", path: paginateXPath}
      );
    if (features.search) this.endpoint.push(
      {method: "GET", url: searchX, query: ["search"], type: "Generic", paath: searchXPath}
      );
    if (features.filter) this.endpoint.push(
      {method: "GET", url: filterX, query: ["name", "value"], type: "Generic", path: filterXPath}
      );
    if (features.validation) this.endpoint.push(
      {method: "POST", url: validateX, type: "Generic", body: resource.fields, path: validateXPath}
      );
    if (features.validation) this.endpoint.push(
      {method: "PUT", url: validateX, type: "Generic", body: resource.fields, path: validateXPath}
      );
  }

  async create(resource : IResource) : Promise<Array<Object>>{
    // clean this.endpoint
    this.endpoint = [];
    let resourceId = resource._id;
    let features : IEndpointFeatures = resource.features;
    
    // add generic endpoints
    await this.addGenericEndpoints(resource);

    if (features.functions) {
      //  add edge endpoints
      await this.addEdgeEndpoints(resourceId);
    }
    
    // add headers to all resource endpoints except wss
    this.endpoint.forEach((end : any) => {
      end.headers = ["x-api-key"];
    })

    // add wss endpoints for resource project 
    let projectId = resource.project;
    await this.addWssEndpoints(projectId);
  
    return this.endpoint
  }
}

export default EndpointService;
