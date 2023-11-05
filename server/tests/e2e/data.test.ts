import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, RESOURCE_ROUTE  } from '../../config/routes';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import { DefaultData } from '../../defaultData';
import TestUtils from './TestUtils';
import DataService from '../../services/data';
import ResourceService from '../../services/resource';


const mockData = {
  "resource": "string",
  "data": {
    field: 'value',
    field2: 'value2'
  }
}

const dataService = new DataService();
const resourceService = new ResourceService();

describe('end-to-end tests data endpoint', () => {
  let token : string;
  let createdResource : any;
  let dataObj : any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    DefaultData
    token = await TestUtils.login();
  });
  

  test('should create resource data', async () => {

    dataObj = await resourceService.find({});
    mockData.resource =  dataObj[0]._id;
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
    expect(response.body.data.features).toBeDefined();
    expect(response.body.data.funcs).toBeDefined();

    createdResource = response.body.data;

  });

  test('should get resource data', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}${RESOURCE_ROUTE}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

  });

  test('should edit resource data', async () => {

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

  test('should delete resource data', async () => {
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