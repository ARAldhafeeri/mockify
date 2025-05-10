import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, DATA_ROUTE } from "../../config/routes";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import { resourceService } from "../../services";

const mockData = {
  resource: "string",
  data: {},
};

describe("end-to-end tests resource data", () => {
  let token: string;
  let createdResource: any;
  let dataObj: any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });

  test("should create resource data", async () => {
    dataObj = await resourceService.find({ name: "default" });
    mockData.resource = dataObj[0]._id?.toString();
    let fields = dataObj[0].fields;
    fields.forEach((field: any) => {
      mockData.data = { ...mockData.data, [field.name]: "value" + field.name };
    });

    const response = await request
      .agent(app)
      .post(`${DATA_ROUTE}`)
      .send({
        ...mockData,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data).toBeDefined();

    createdResource = response.body.data;
  });

  test("should get resource data", async () => {
    const response = await request
      .agent(app)
      .get(`${DATA_ROUTE}/?resourceId=${createdResource.resource}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);
  });

  test("should edit resource data", async () => {
    const response = await request
      .agent(app)
      .put(`${DATA_ROUTE}`)
      .send({
        ...createdResource,
        data: {
          field3: "value333",
        },
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.data?.field3).toBe("value333");
  });

  test("should delete resource data", async () => {
    const response = await request
      .agent(app)
      .delete(`${DATA_ROUTE}/?id=${createdResource._id}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
