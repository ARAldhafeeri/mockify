import { domain } from '../../getEnv';
import EndpointService from '../../services/endpoint';

const mockData = {
  "project": "mock",
  "resourceName": "mock",
  "endpoint": "/api/sample",
  "features": {
    "filter": true,
    "pagination": true,
    "search": true,
    "validation": true,
    "webhook": false,
    "sse": false,
    "wss": true,
    "getx": true,
    "postx": true,
    "putx": true,
    "deletex": true,
    "consumer": false,
    "producer": false,
  },
  "funcs": [
    "string"
  ],
  "fields": [
    {name: "name", type: "string", required: true},
    {name: "age", type: "number", required: true},
  ]
}


describe('EndpointService', () => {
  test('should create curd endpoints for resource', async () => {

    const endpoint = await EndpointService.create(mockData.features, mockData.resourceName);
    expect(endpoint).toBeDefined();
    expect(endpoint).toHaveLength(3);
    expect(endpoint.includes(`${domain}/${mockData.resourceName}`)).toBe(true);
    expect(endpoint.includes(`${domain}/${mockData.resourceName}/:id`)).toBe(true);
    expect(endpoint.includes(`${domain}/${mockData.resourceName}?filter=filterValue&sort=sortValue&search=searchValue&page=pageNumber&size=pageSize`)).toBe(true);
  });
});