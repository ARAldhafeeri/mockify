import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, RESOURCE_ROUTE  } from '../../config/routes';
import { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PSWD, DATABASE_URL} from '../../getEnv';
import mongoose from 'mongoose';
import { DefaultData } from '../../defaultData';
import TestUtils from './TestUtils';
import ProjectService from '../../services/project';


const mockData = {
  "project": "string",
  "resourceName": "SampleResource",
  "endpoint": "/api/sample",
  "filter": true,
  "pagination": true,
  "search": true,
  "validation": true,
  "webhook": true,
  "sse": false,
  "wss": true,
  "getx": true,
  "postx": true,
  "putx": true,
  "deletex": true,
  "consumer": true,
  "producer": true,
  "filterFunc": "filterFunction",
  "paginationFunc": "paginationFunction",
  "searchFunc": "searchFunction",
  "validationFunc": "validationFunction",
  "webhookFunc": "webhookFunction",
  "sseFunc": "sseFunction",
  "wssFunc": "wssFunction",
  "consumerFunc": "consumerFunction",
  "producerFunc": "producerFunction"
}

const projectService = new ProjectService();



describe('end-to-end tests project endpoint', () => {
  let token : string;
  let createdResource : any;
  let projectObj : any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    DefaultData
    token = await TestUtils.login();
  });
  

  test('should create resource', async () => {

    projectObj = await projectService.find({});
    mockData.project =  projectObj[0]._id;
    const response = await request.agent(app).post(`${API_ROUTE}${RESOURCE_ROUTE}`).send({
      ...mockData
    })
    .set('Authorization', 'bearer ' + token)

    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data.resourceName).toBeDefined();
    expect(response.body.data.endpoint).toBeDefined();
    expect(response.body.data.filter).toBeDefined();
    expect(response.body.data.pagination).toBeDefined();
    expect(response.body.data.search).toBeDefined();
    expect(response.body.data.validation).toBeDefined();
    expect(response.body.data.webhook).toBeDefined();
    expect(response.body.data.sse).toBeDefined();
    expect(response.body.data.wss).toBeDefined();
    expect(response.body.data.consumer).toBeDefined();
    expect(response.body.data.producer).toBeDefined();
    expect(response.body.data.getx).toBeDefined();
    expect(response.body.data.postx).toBeDefined();
    expect(response.body.data.putx).toBeDefined();
    expect(response.body.data.deletex).toBeDefined();
    expect(response.body.data.filterFunc).toBeDefined();
    expect(response.body.data.paginationFunc).toBeDefined();
    expect(response.body.data.searchFunc).toBeDefined();
    expect(response.body.data.validationFunc).toBeDefined();
    expect(response.body.data.webhookFunc).toBeDefined();
    expect(response.body.data.sseFunc).toBeDefined();
    expect(response.body.data.wssFunc).toBeDefined();
    expect(response.body.data.consumerFunc).toBeDefined();
    expect(response.body.data.producerFunc).toBeDefined();

    createdResource = response.body.data;

  });

  test('should get resources', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}${RESOURCE_ROUTE}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

  });

  test('should edit resource', async () => {

    delete createdResource.apiKey;
    const response = await request.agent(app).put(`${API_ROUTE}${RESOURCE_ROUTE}`).send({
      ...createdResource,
      resourceName: 'newName'
    })
    .set('Authorization', 'bearer ' + token)

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.resourceName).toBe('newName');

  });

  test('should delete resource', async () => {
    const response = await request.agent(app).delete(`${API_ROUTE}${RESOURCE_ROUTE}/?id=${createdResource._id}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });


 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});