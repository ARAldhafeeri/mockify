import { domain } from "../getEnv";
import { IEdge, IEdgeService } from "../entities/edge";
import { IEndpointService } from "../entities/endpoint";
import { IEndpointFeatures, IResource } from "../entities/resource";
import { IClientService } from "../entities/client";
class EndpointService implements IEndpointService {
  edgeService: IEdgeService;
  clientService: IClientService;

  constructor(edgeService: IEdgeService, clientService: IClientService) {
    this.edgeService = edgeService;
    this.clientService = clientService;
  }

  addWssEndpoints = async (projectId: any, endpoint: any) => {
    let projectClientCredentials =
      await this.clientService.findClientsByPorjectId(projectId);
    projectClientCredentials.forEach((client: any) => {
      endpoint.push({
        url: this.urlConstructor(domain, "wss", `/${client.id}`),
        type: "WebSocket",
        headers: ["id", "secret"],
      });
    });
    return endpoint;
  };

  getFunctionURL(name: string, resourceId: string) {
    return this.urlConstructor(domain, "https", `${resourceId}/edge/${name}`);
  }

  getFunctionPath(name: string, resourceId: string) {
    return `/${resourceId}/edge/${name}`;
  }

  addEdgeEndpoints = async (resourceId: any, endpoint: any) => {
    let functions: any = await this.edgeService.findEdgeFunctionsBYresourceId(
      resourceId
    );

    functions.forEach((func: any) => {
      if (func.method === "POST" || func.method === "PUT") {
        endpoint.push({
          method: func.method,
          url: this.getFunctionURL(func._id, resourceId),
          path: this.getFunctionPath(func._id, resourceId),
          body: {},
          type: "Edge Function",
        });
      } else {
        endpoint.push({
          method: func.method,
          url: this.getFunctionURL(func._id, resourceId),
          path: this.getFunctionPath(func._id, resourceId),
          type: "Edge Function",
        });
      }
    });
  };

  urlConstructor = (domain: string, protocol: string, path: string) => {
    return `${protocol}://${domain}${path}`;
  };

  addGenericEndpoints = async (resource: IResource, endpoint: any) => {
    let resourceId = resource._id;
    let features: IEndpointFeatures = resource.features;
    let getx: string = this.urlConstructor(
      domain,
      "https",
      `/mock/${resourceId}/`
    );
    let postx: string = this.urlConstructor(
      domain,
      "https",
      `/mock/${resourceId}/`
    );
    let deleteAndPutx: string = this.urlConstructor(
      domain,
      "https",
      `/mock/${resourceId}/{id}`
    );

    let paginateX: string = this.urlConstructor(
      domain,
      "https",
      `/mock/${resourceId}/paginate?page=1&limit=10`
    );
    let searchX: string = this.urlConstructor(
      domain,
      "https",
      `/mock/${resourceId}/search/?search=fullTextSearchAgainstString`
    );
    let filterX: string = this.urlConstructor(
      domain,
      "https",
      `/mock/${resourceId}/filter/?name=name&value=value`
    );
    let validateX: string = this.urlConstructor(
      domain,
      "https",
      `/mock/${resourceId}/validate`
    );

    // paths for swagger  docs
    let getxPath: string = `/mock/${resourceId}/{id}`;
    let postxPath: string = `/mock/${resourceId}/`;
    let deleteAndPutxPath: string = `/mock/${resourceId}/{id}`;
    let paginateXPath: string = `/mock/${resourceId}/paginate`;
    let searchXPath: string = `/mock/${resourceId}/search`;
    let filterXPath: string = `/mock/${resourceId}/filter`;
    let validateXPath: string = `/mock/${resourceId}/validate`;

    if (features.getx)
      endpoint.push({
        method: "GET",
        url: getx,
        type: "Generic",
        path: getxPath,
        params: ["id"],
      });
    if (features.postx)
      endpoint.push({
        method: "POST",
        url: postx,
        type: "Generic",
        body: resource.fields,
        path: postxPath,
      });
    if (features.putx)
      endpoint.push({
        method: "PUT",
        url: deleteAndPutx,
        params: ["id"],
        type: "Generic",
        body: resource.fields,
        path: deleteAndPutxPath,
      });
    if (features.deletex)
      endpoint.push({
        method: "DELETE",
        url: deleteAndPutx,
        params: ["id"],
        type: "Generic",
        path: deleteAndPutxPath,
      });
    if (features.pagination)
      endpoint.push({
        method: "GET",
        url: paginateX,
        query: ["page", "limit"],
        type: "Generic",
        path: paginateXPath,
      });
    if (features.search)
      endpoint.push({
        method: "GET",
        url: searchX,
        query: ["search"],
        type: "Generic",
        paath: searchXPath,
      });
    if (features.filter)
      endpoint.push({
        method: "GET",
        url: filterX,
        query: ["name", "value"],
        type: "Generic",
        path: filterXPath,
      });
    if (features.validation)
      endpoint.push({
        method: "POST",
        url: validateX,
        type: "Generic",
        body: resource.fields,
        path: validateXPath,
      });
    if (features.validation)
      endpoint.push({
        method: "PUT",
        url: validateX,
        type: "Generic",
        body: resource.fields,
        path: validateXPath,
      });

    return endpoint;
  };

  async create(resource: IResource): Promise<Array<Object>> {
    // clean this.endpoint
    let endpoint: any = [];
    let features: IEndpointFeatures = resource.features;

    // add generic endpoints
    endpoint = await this.addGenericEndpoints(resource, endpoint);

    if (features.functions) {
      //  add edge endpoints
      endpoint = await this.addEdgeEndpoints(
        resource?._id?.toString(),
        endpoint
      );
    }

    // add headers to all resource endpoints except wss
    endpoint.forEach((end: any) => {
      end.headers = ["x-api-key"];
    });

    // add wss endpoints for resource project
    let projectId = resource.project;
    endpoint = await this.addWssEndpoints(projectId, endpoint);

    return endpoint;
  }
}

export default EndpointService;
