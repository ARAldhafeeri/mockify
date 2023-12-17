import { domain } from "../getEnv";
import { IEndpointFeatures } from "../types/Resource";

class EndpointService {
  static async create(features : IEndpointFeatures, projectName : string,  resourceName : string) : Promise<Array<Object>>{
    let endpoint : Array<Object> = [];
    let getx : string = `${domain}/mock/${projectName}/${resourceName}`
    let postx : string = `${domain}/mock/${projectName}/${resourceName}`
    let deleteAndPutx : string = `${domain}/mock/${projectName}/${resourceName}/:id`

    let paginateX : string = `${domain}/mock/${projectName}/paginate/${resourceName}?page=1&limit=10`
    let searchX : string = `${domain}/mock/${projectName}/search/${resourceName}?search=fullTextSearchAgainstString`
    let filterX : string = `${domain}/mock/${projectName}/filter/${resourceName}?filterName=filterValue`
    let validateX : string = `${domain}/mock/${projectName}/validate/${resourceName}?validate=true`

    if (features.getx) endpoint.push({method: "GET", url: getx});
    if(features.postx) endpoint.push({method: "POST", url: postx});
    if (features.putx) endpoint.push({method: "PUT", url: deleteAndPutx});
    if (features.deletex) endpoint.push({method: "DELETE", url: deleteAndPutx, params: ["id"]});
    if (features.pagination) endpoint.push({method: "GET", url: paginateX, params: ["page", "limit"]});
    if (features.search) endpoint.push({method: "GET", url: searchX, params: ["search"]});
    if (features.filter) endpoint.push({method: "GET", url: filterX, params: ["filterName", "filterValue"]});
    if (features.validation) endpoint.push({method: "POST", url: validateX, params: ["validate"]});
    if (features.validation) endpoint.push({method: "PUT", url: validateX, params: ["validate"]});
    return endpoint
  }
}

export default EndpointService;