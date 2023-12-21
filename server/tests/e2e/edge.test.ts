import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, EDGE_ROUTE  } from '../../config/routes';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import TestUtils from './TestUtils';
import ResourceService from '../../services/resource';


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
  });
  

  test('should create resource edge', async () => {

    dataObj = await resourceService.find({resourceName: 'default'});
    mockEdge.resource =  dataObj[0]._id;

    const response = await request.agent(app).post(`${API_ROUTE}${EDGE_ROUTE}`).send({
      ...mockEdge
    })
    .set('Authorization', 'bearer ' + token)

    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data.resource).toBeDefined();
    expect(response.body.data).toBeDefined();

    createdResource = response.body.data;

  });

  test('should get resource edge', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}${EDGE_ROUTE}/?resourceName=${"default"}`)
    .set('Authorization', 'bearer ' + token)
    console.log(response.body)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

  });

  test('should edit resource edge', async () => {

    const response = await request.agent(app).put(`${API_ROUTE}${EDGE_ROUTE}`).send({
      ...createdResource,
      name: 'newName'
      })
    .set('Authorization', 'bearer ' + token)
    console.log(response.body)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.name).toBe('newName');

  });

  test('should delete resource edge', async () => {
    const response = await request.agent(app).delete(`${API_ROUTE}${EDGE_ROUTE}/?id=${createdResource._id}`)
    .set('Authorization', 'bearer ' + token)
    console.log(response.body)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });


 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});