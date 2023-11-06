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
  static async create(features : IEndpointFeatures, resourceName : string) {
    let endpoint : Array<string> = [];
    let getx : string = `${domain}/${resourceName}?filter=filterValue&sort=sortValue&search=searchValue&page=pageNumber&size=pageSize`
    let postx : string = `${domain}/${resourceName}`
    let deleteAndPutx : string = `${domain}/${resourceName}/:id`

    if (features.getx) endpoint.push(getx);
    if(features.postx) endpoint.push(postx);
    if (features.putx || features.deletex) endpoint.push(deleteAndPutx);
    return endpoint
  }
}

export default EndpointService;