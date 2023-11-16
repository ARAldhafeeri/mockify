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

    const endpoint = await EndpointService.create(mockData.features, mockData.project, mockData.resourceName);
    expect(endpoint).toBeDefined();
    expect(endpoint).toHaveLength(4);

    let getx = endpoint.find((e : any) => e.method === "GET");
    let postx = endpoint.find((e : any) => e.method === "POST");
    let putx = endpoint.find((e : any) => e.method === "PUT");
    let deletex = endpoint.find((e : any) => e.method === "DELETE");

    expect(getx).toBeDefined();
    expect(postx).toBeDefined();
    expect(putx).toBeDefined();
    expect(deletex).toBeDefined();
  });
});