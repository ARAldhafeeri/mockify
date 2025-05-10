import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, EVENT_ROUTE } from "../../config/routes";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import events from "../../events";
import { resourceService } from "../../services";

const mockEvent = {
  resource: "string",
  name: TestUtils.genRandomName(),
  handler: "edgeTest",
};

describe("end-to-end tests resource event", () => {
  let token: string;
  let createdResource: any;
  let eventObj: any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });

  test("should create resource event", async () => {
    eventObj = await resourceService.findOne({ name: "default" });
    mockEvent.resource = eventObj._id;

    const response = await request
      .agent(app)
      .post(`${EVENT_ROUTE}`)
      .send({
        ...mockEvent,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data?.resource).toBeDefined();
    expect(response.body.data?.name).toBeDefined();

    createdResource = response.body.data;
  });

  test("should get resource event", async () => {
    const response = await request
      .agent(app)
      .get(`${EVENT_ROUTE}/?resourceId=${createdResource.resource}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test("should edit resource event", async () => {
    createdResource.name = "newName";
    const response = await request
      .agent(app)
      .put(`${EVENT_ROUTE}`)
      .send({
        ...createdResource,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.name).toBe("newName");
  });

  test("should delete resource event", async () => {
    const response = await request
      .agent(app)
      .delete(`${EVENT_ROUTE}/?id=${createdResource._id}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  /* Closing eventbase connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
