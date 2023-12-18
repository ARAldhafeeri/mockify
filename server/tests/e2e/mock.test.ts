import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, MOCK_ROUTE  } from '../../config/routes';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import TestUtils from './TestUtils';
import ResourceService from '../../services/resource';


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
    token = await TestUtils.login();
  });
  

  test('should get mock endpoint data', async () => {

    dataObj = await resourceService.find({resourceName: 'default'});
    mockData.resource =  dataObj[0]._id;
    let fields = dataObj[0].fields;
    fields.forEach((field: any) => {
      mockData.data = { ...mockData.data, [field.name] : "value" + field.name}
    });

    const response = await request.agent(app).get(`${API_ROUTE}${MOCK_ROUTE}/${dataObj[0].resourceName}`)
    .set('Authorization', 'bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data).toBeDefined();

  });


 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});