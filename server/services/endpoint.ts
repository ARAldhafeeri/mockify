import { domain } from "../getEnv";
import { IEndpointFeatures } from "../types/Resource";

class EndpointService {
  static async create(features : IEndpointFeatures, projectName : string,  resourceName : string) : Promise<Array<Object>>{
    let endpoint : Array<Object> = [];
    let getx : string = `${domain}/mock/${projectName}/${resourceName}?filter=filterValue&sort=sortValue&search=searchValue&page=pageNumber&size=pageSize`
    let postx : string = `${domain}/mock/${projectName}/${resourceName}`
    let deleteAndPutx : string = `${domain}/mock/${projectName}/${resourceName}/:id`

    if (features.getx) endpoint.push({method: "GET", url: getx, params: ["filter", "sort", "search", "page", "size"]});
    if(features.postx) endpoint.push({method: "POST", url: postx});
    if (features.putx) endpoint.push({method: "PUT", url: deleteAndPutx});
    if (features.deletex) endpoint.push({method: "DELETE", url: deleteAndPutx, params: ["id"]});
    return endpoint
  }
}

export default EndpointService;