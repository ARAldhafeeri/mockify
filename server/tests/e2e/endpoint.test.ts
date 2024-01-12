import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, ENDPOINT_ROUTE  } from '../../config/routes';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import TestUtils from './TestUtils';
import ResourceService from '../../services/resource';


const resourceService = new ResourceService();

describe('end-to-end tests project endpoint', () => {
  let token : string;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });
  

  test('should return endpoints', async () => {

    let resource = await resourceService.find({resourceName: 'default'});
    resource = resource[0];
    const response = await request.agent(app).post(`${API_ROUTE}${ENDPOINT_ROUTE}`)
    .send({ ...resource })
    .set('Authorization', 'bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);

  });

 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});