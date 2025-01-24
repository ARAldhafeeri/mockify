import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, RESOURCE_ROUTE } from "../../config/routes";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import ProjectService from "../../services/project";
import { makeRandomString } from "../utils";
import { projectService } from "../../services";

const mockData = {
  project: "string",
  name: makeRandomString(10),
  features: {
    filter: true,
    pagination: true,
    search: true,
    validation: true,
    getx: true,
    postx: true,
    putx: true,
    deletex: true,
    functions: true,
  },
  fields: [
    { name: "name", type: "string", required: true },
    { name: "age", type: "number", required: true },
  ],
};

describe("end-to-end tests project endpoint", () => {
  let token: string;
  let createdResource: any;
  let projectObj: any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });

  test("should create resource", async () => {
    projectObj = await projectService.findOne({ name: "default" });

    mockData.project = projectObj._id;

    const response = await request
      .agent(app)
      .post(`${RESOURCE_ROUTE}`)
      .send({
        ...mockData,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data?.name).toBeDefined();
    expect(response.body.data?.features).toBeDefined();
    expect(response.body.data?.fields).toBeDefined();
    createdResource = response.body.data;
  });

  test("should get resources related to user projects", async () => {
    let projectId = projectObj._id.toString();
    const response = await request
      .agent(app)
      .get(`${RESOURCE_ROUTE}?projectId=${projectId}`)
      .set("Authorization", "bearer " + token);

    // check all resources are related to the project
    const resources = response.body.data;

    for (const resource of resources) {
      expect(resource.project.toString()).toBe(projectId);
    }

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);
  });

  test("should edit resource", async () => {
    delete createdResource.apiKey;
    const response = await request
      .agent(app)
      .put(`${RESOURCE_ROUTE}`)
      .send({
        ...createdResource,
        name: "newName",
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.name).toBe("newName");
  });

  test("should delete resource", async () => {
    const response = await request
      .agent(app)
      .delete(`${RESOURCE_ROUTE}/?id=${createdResource._id}`)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
