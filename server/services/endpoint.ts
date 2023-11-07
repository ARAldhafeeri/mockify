import { domain } from "../getEnv";

interface IEndpointFeatures {
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  webhook: boolean;
  sse: boolean;
  wss: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
  consumer: boolean;
  producer: boolean;
}
class EndpointService {
  static async create(features : IEndpointFeatures, resourceName : string) : Promise<Array<Object>>{
    let endpoint : Array<Object> = [];
    let getx : string = `${domain}/mock/${resourceName}?filter=filterValue&sort=sortValue&search=searchValue&page=pageNumber&size=pageSize`
    let postx : string = `${domain}/mock/${resourceName}`
    let deleteAndPutx : string = `${domain}/mock/${resourceName}/:id`

    if (features.getx) endpoint.push({method: "GET", url: getx, params: ["filter", "sort", "search", "page", "size"]});
    if(features.postx) endpoint.push({method: "POST", url: postx});
    if (features.putx) endpoint.push({method: "PUT", url: deleteAndPutx});
    if (features.deletex) endpoint.push({method: "DELETE", url: deleteAndPutx, params: ["id"]});
    return endpoint
  }
}

export default EndpointService;