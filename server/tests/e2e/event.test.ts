import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, EVENT_ROUTE  } from '../../config/routes';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import TestUtils from './TestUtils';
import ResourceService from '../../services/resource';
import events from '../../events';

const mockEvent = {
  "resource": "string",
  "name": TestUtils.genRandomName(),
  "handler": "edgeTest",
}

const resourceService = new ResourceService();

describe('end-to-end tests resource event', () => {
  let token : string;
  let createdResource : any;
  let eventObj : any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });
  

  test('should create resource event', async () => {

    eventObj = await resourceService.find({resourceName: 'default'});
    mockEvent.resource =  eventObj[0]._id;

    const response = await request.agent(app).post(`${API_ROUTE}${EVENT_ROUTE}`).send({
      ...mockEvent
    })
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data?.resource).toBeDefined();
    expect(response.body.data?.name).toBeDefined();

    createdResource = response.body.data;

    // should dynamically create event
    const found =  events.listeners(createdResource.name);
    expect(found.length).toBeGreaterThan(0);


  });

  test('should get resource event', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}${EVENT_ROUTE}/?resourceName=default`)
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);

  });

  test('should edit resource event', async () => {
    createdResource.name = 'newName';
    const response = await request.agent(app).put(`${API_ROUTE}${EVENT_ROUTE}`).send({
      ...createdResource,
      })
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.name).toBe("newName");

    const found =  events.listeners('newName');
    expect(found.length).toBeGreaterThan(0);


  });

  test('should delete resource event', async () => {
    const response = await request.agent(app).delete(`${API_ROUTE}${EVENT_ROUTE}/?id=${createdResource._id}`)
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);

    // event should be deleted from runtime
    const found =  events.listeners('newName');
    expect(found.length).toBe(0);

  });


 /* Closing eventbase connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});