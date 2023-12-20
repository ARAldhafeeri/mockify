import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, MOCK_ROUTE, MOCK_ROUTE_FILTER, MOCK_ROUTE_PAGINATE  } from '../../config/routes';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import TestUtils from './TestUtils';
import ResourceService from '../../services/resource';
import { apiKeyHeader } from '../../config/headers';


const mockData = {
  "resource": "string",
  "data": {
  }
}

const resourceService = new ResourceService();

describe('end-to-end tests mock endpoints on data entity', () => {
  let token : string;
  let dataObj : any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.getAPiKey();
  });
  

  test('should get mock endpoint data with generic GET request without any extra features', async () => {

    dataObj = await resourceService.find({resourceName: 'default'});
    mockData.resource =  dataObj[0]._id;
    let fields = dataObj[0].fields;
    fields.forEach((field: any) => {
      mockData.data = { ...mockData.data, [field.name] : "value" + field.name}
    });

    const response = await request.agent(app).get(`${API_ROUTE}${MOCK_ROUTE}/${dataObj[0].resourceName}`)
    .set(apiKeyHeader, token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data).toBeDefined();

  });

  test("should get mock endpoint data with GET request with pagination query params", async () => {
      
      const response = await request.agent(app).get(`${API_ROUTE}${MOCK_ROUTE}/${dataObj[0].resourceName}${MOCK_ROUTE_PAGINATE}?page=1&limit=10`)
      .set(apiKeyHeader, token);

      let data = response.body.data;
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      // check all properties are defined
      expect(data).toBeDefined();
      expect(data.limit).toBeDefined();
      expect(data.page).toBeDefined();
      expect(data.total).toBeDefined();

  });

  test("should get mock endpoint data with GET request with filteration", async () => {
    const response = await request.agent(app).get(
      `${API_ROUTE}${MOCK_ROUTE}/${dataObj[0].resourceName}${MOCK_ROUTE_FILTER}?name=name&value=a`)
    .set(apiKeyHeader, token);

    console.log(response.body)
    let data = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);

  })


 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});