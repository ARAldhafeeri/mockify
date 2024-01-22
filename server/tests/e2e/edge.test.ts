import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, EDGE_ROUTE  } from '../../config/routes';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import TestUtils from './TestUtils';
import ResourceService from '../../services/resource';
import EdgeService from '../../services/Edge';
import { apiKeyHeader } from '../../config/headers';
import { IEdge } from '../../types/Edge';
import redisClient from '../../redis';
const edgeService = new EdgeService();
const genRandomName = () => {
  return Math.random().toString(36).substring(7);
}
const mockEdge = {
  "resource": "string",
  "name": genRandomName(),
  "code": "string",
  "method": "string", // GET | POST | PUT | DELETE
}

const resourceService = new ResourceService();

describe('end-to-end tests curd edge functions', () => {
  let token : string;
  let createdResource : any;
  let dataObj : any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
    redisClient.connect();
  });
  

  test('should create resource edge', async () => {

    dataObj = await resourceService.find({resourceName: 'default'});
    mockEdge.resource =  dataObj[0]._id;

    const response = await request.agent(app).post(`${API_ROUTE}${EDGE_ROUTE}`).send({
      ...mockEdge
    })
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data?.resource).toBeDefined();
    expect(response.body.data).toBeDefined();

    createdResource = response.body.data;

  });

  test('should get resource edge', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}/default/edge`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);

  });

  test('should edit resource edge', async () => {
    let rand = genRandomName();
    const response = await request.agent(app).put(`${API_ROUTE}/default/edge`).send({
      ...createdResource,
      name: rand
      })
    .set('Authorization', 'bearer ' + token)
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.name).toBe(rand);

  });

  test('should delete resource edge', async () => {
    const response = await request.agent(app).delete(`${API_ROUTE}/default/edge?id=${createdResource._id}`)
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });


 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});


describe('end-to-end tests running  functions with post, get, delete, put requests', () => {

  let token : string;
  let createdResource : any;
  let apiKey : string;
  

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
    apiKey = await TestUtils.getAPiKey();
  });

  test('should run getx function', async () => {
    const f = await resourceService.findOne({resourceName: 'default'});
    createdResource = f;
    const edge = await edgeService.findOne(
      {resource: f._id, method: 'GET', name: 'edgeTest'}
      );
    const response = await request.agent(app).get(`${API_ROUTE}/${createdResource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();

  });


  test('should run postx function', async () => {
    const f = await resourceService.findOne({resourceName: 'default'});
    createdResource = f;
    const edge = await edgeService.findOne(
      {resource: f._id, method: 'POST', name: 'edgeTest1'}
      );
    const response = await request.agent(app).post(`${API_ROUTE}/${createdResource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();

  });

  test('should run delete function', async () => {
    const f = await resourceService.findOne({resourceName: 'default'});
    createdResource = f;
    const edge = await edgeService.findOne(
      {resource: f._id, method: 'DELETE', name: 'edgeTest3'}
      );
    const response = await request.agent(app).delete(`${API_ROUTE}/${createdResource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();

  });


  test('should run put function', async () => {
    const f = await resourceService.findOne({resourceName: 'default'});
    createdResource = f;
    const edge = await edgeService.findOne(
      {resource: f._id, method: 'PUT', name: 'edgeTest2'}
      );
    const response = await request.agent(app).put(`${API_ROUTE}/${createdResource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();

  });

  test("should run edge function wtih faker contenxt", async () => {
  let code = "data = faker.person.firstName('female')";
  let resource = await resourceService.findOne({resourceName: 'default'});
  const edge = {
    resource: resource._id,
    name: genRandomName(),
    code,
    method: "GET"
  }
  await edgeService.create(edge as IEdge);
  const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)
  .set(apiKeyHeader, apiKey);
  expect(response.status).toBe(200);
  expect(response.body.status).toBe(true);
  expect(response.body.data).toBeDefined();
  });


  test("should run edge function with gatewatch context", async () => {
    
    let code = `
    const project = await ProjectModel.findOne({name: 'default'});
    const policy =  await PolicyModel.findOne({project: project._id});
    var ac = new AccessControl(policy);
    var enforcedPolicy = ac.enforce();
    const grant = new GrantQuery(policy).role('user').can(['getx']).on(['default']).grant();
    data = grant
    `

    let resource = await resourceService.findOne({resourceName: 'default'});
    const edge = {
      resource: resource._id,
      name: genRandomName(),
      code,
      method: "GET"
    }
    await edgeService.create(edge as IEdge);
    const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toBe(true);
  });

  test("user should be able to set headers, status, message backward compatiable", async () => {

    let code = `
      safeRes.httpStatus = 201;
      safeRes.message = 'custom message';
      safeRes.headers = {
        'x-custom-header': 'custom header value'
       }
      safeRes.status = true;
      data = { test : 'test' }
    `
    const resource = await resourceService.findOne({resourceName: 'default'});
    const edge = {
      resource: resource._id,
      name: genRandomName(),
      code,
      method: "GET"
    }
    await edgeService.create(edge as IEdge);
    const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.test).toBe('test');
    expect(response.body.message).toBe('custom message');
    expect(response.headers['x-custom-header']).toBe('custom header value');
  });

  test("default safeRes should be set if user does not set it", async () => {
      
      let code = `
        data = { test : 'test' }
      `
      const resource = await resourceService.findOne({resourceName: 'default'});
      const edge = {
        resource: resource._id,
        name: genRandomName(),
        code,
        method: "GET"
      }
      await edgeService.create(edge as IEdge);
      const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)
      .set(apiKeyHeader, apiKey);
  
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.test).toBe('test');
      expect(response.body.message).toBe('fetching data was successful');
      expect(response.headers['x-custom-header']).toBeUndefined();
    });

  test("access control should fail if no  api key provided", async () => {

    let code = "data = { test : 'test' }";
    const resource = await resourceService.findOne({resourceName: 'default'});
    const edge = {
      resource: resource._id,
      name: genRandomName(),
      code,
      method: "GET"
    }
    await edgeService.create(edge as IEdge);
    const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)

    expect(response.status).toBe(403);
  });

  test("invlid api key should fail", async () => { 

    let code = "data = { test : 'test' }";
    const resource = await resourceService.findOne({resourceName: 'default'});
    const edge = {
      resource: resource._id,
      name: genRandomName(),
      code,
      method: "GET"
    }
    await edgeService.create(edge as IEdge);
    const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, 'invalid api key')

    expect(response.status).toBe(403);
  });


  test("user can set, get from cache with ttl", async () => {
    let code = `
    await CacheSet('test:test', 'test', 1000);
    data = await CacheGet('test:test');
    `
    const resource = await resourceService.findOne({resourceName: 'default'});
    const edge = {
      resource: resource._id,
      name: genRandomName(),
      code,
      method: "GET"
    }
    await edgeService.create(edge as IEdge);
    const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);

    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toBe('test');
  });

  test("user can emit events and event should be catched", async () => {
    let code = `
    Emit('eventTest', 'eventTest');
    `
    const resource = await resourceService.findOne({resourceName: 'default'});
    const edge = {
      resource: resource._id,
      name: genRandomName(),
      code,
      method: "GET"
    }
    await edgeService.create(edge as IEdge);
    const response = await request.agent(app).get(`${API_ROUTE}/${resource.resourceName}/edge/${edge.name}`)
    .set(apiKeyHeader, apiKey);

    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();
  });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
    redisClient.disconnect();
  });

  });
