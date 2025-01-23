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

  async addWssEndpoints(projectId: any, endpoint: any[]) {
    const projectClientCredentials =
      await this.clientService.findClientsByPorjectId(projectId);

    if (!projectClientCredentials?.length) {
      return endpoint;
    }

    projectClientCredentials.forEach((client: any) => {
      endpoint.push({
        url: this.urlConstructor(domain, "wss", `/${client.id}`),
        type: "WebSocket",
        headers: ["id", "secret"],
      });
    });

    return endpoint;
  }

  getFunctionURL(name: string, resourceId: string) {
    return this.urlConstructor(domain, "https", `${resourceId}/edge/${name}`);
  }

  getFunctionPath(name: string, resourceId: string) {
    return `/${resourceId}/edge/${name}`;
  }

  async addEdgeEndpoints(resourceId: any, endpoint: any[]) {
    const functions = await this.edgeService.findEdgeFunctionsBYresourceId(
      resourceId
    );

    if (!functions?.length) {
      return endpoint;
    }

    functions.forEach((func: any) => {
      const baseEndpoint = {
        method: func.method,
        url: this.getFunctionURL(func._id, resourceId),
        path: this.getFunctionPath(func._id, resourceId),
        type: "Edge Function",
      };

      if (func.method === "POST" || func.method === "PUT") {
        endpoint.push({
          ...baseEndpoint,
          body: {},
        });
      } else {
        endpoint.push(baseEndpoint);
      }
    });

    return endpoint;
  }

  urlConstructor(domain: string, protocol: string, path: string) {
    return `${protocol}://${domain}${path}`;
  }

  async addGenericEndpoints(resource: IResource, endpoint: any[]) {
    const { _id: resourceId, features } = resource;

    if (!features) {
      return endpoint;
    }

    const baseUrls = {
      get: this.urlConstructor(domain, "https", `/mock/${resourceId}/`),
      post: this.urlConstructor(domain, "https", `/mock/${resourceId}/`),
      putDelete: this.urlConstructor(
        domain,
        "https",
        `/mock/${resourceId}/{id}`
      ),
      paginate: this.urlConstructor(
        domain,
        "https",
        `/mock/${resourceId}/paginate?page=1&limit=10`
      ),
      search: this.urlConstructor(
        domain,
        "https",
        `/mock/${resourceId}/search/?search=fullTextSearchAgainstString`
      ),
      filter: this.urlConstructor(
        domain,
        "https",
        `/mock/${resourceId}/filter/?name=name&value=value`
      ),
      validate: this.urlConstructor(
        domain,
        "https",
        `/mock/${resourceId}/validate`
      ),
    };

    const paths = {
      get: `/mock/${resourceId}/{id}`,
      post: `/mock/${resourceId}/`,
      putDelete: `/mock/${resourceId}/{id}`,
      paginate: `/mock/${resourceId}/paginate`,
      search: `/mock/${resourceId}/search`,
      filter: `/mock/${resourceId}/filter`,
      validate: `/mock/${resourceId}/validate`,
    };

    const addEndpoint = (
      method: string,
      url: string,
      path: string,
      additionalProps = {}
    ) => {
      endpoint.push({
        method,
        url,
        path,
        type: "Generic",
        ...additionalProps,
      });
    };

    if (features.getx)
      addEndpoint("GET", baseUrls.get, paths.get, { params: ["id"] });
    if (features.postx)
      addEndpoint("POST", baseUrls.post, paths.post, { body: resource.fields });
    if (features.putx)
      addEndpoint("PUT", baseUrls.putDelete, paths.putDelete, {
        params: ["id"],
        body: resource.fields,
      });
    if (features.deletex)
      addEndpoint("DELETE", baseUrls.putDelete, paths.putDelete, {
        params: ["id"],
      });
    if (features.pagination)
      addEndpoint("GET", baseUrls.paginate, paths.paginate, {
        query: ["page", "limit"],
      });
    if (features.search)
      addEndpoint("GET", baseUrls.search, paths.search, { query: ["search"] });
    if (features.filter)
      addEndpoint("GET", baseUrls.filter, paths.filter, {
        query: ["name", "value"],
      });
    if (features.validation) {
      addEndpoint("POST", baseUrls.validate, paths.validate, {
        body: resource.fields,
      });
      addEndpoint("PUT", baseUrls.validate, paths.validate, {
        body: resource.fields,
      });
    }

    return endpoint;
  }

  async create(resource: IResource): Promise<Array<Object>> {
    let endpoint: any[] = [];

    endpoint = await this.addGenericEndpoints(resource, endpoint);

    if (resource.features.functions) {
      endpoint = await this.addEdgeEndpoints(
        resource._id?.toString(),
        endpoint
      );
    }

    endpoint.forEach((end: any) => {
      if (end.type !== "WebSocket") {
        end.headers = ["x-api-key"];
      }
    });

    endpoint = await this.addWssEndpoints(resource.project, endpoint);

    return endpoint;
  }
}

export default EndpointService;
