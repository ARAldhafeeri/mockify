import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, CLIENT_ROUTE } from "../../config/routes";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import { makeRandomString } from "../utils";
import { cryptoService, projectService } from "../../services";

cryptoService.generateAPIKey();

describe("end-to-end tests project endpoint", () => {
  let token: string;
  let created: any;
  let projectObj: any;
  let projectId: any;
  let mockData: any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);

    token = await TestUtils.login();
    mockData = {
      project: "string",
      name: makeRandomString(10),
      id: await cryptoService.generateAPIKey(),
      secret: await cryptoService.generateAPIKey(),
    };
  });

  test("should create client", async () => {
    projectObj = await projectService.findOne({ name: "default" });

    projectId = projectObj._id.toString();
    const response = await request
      .agent(app)
      .post(`${CLIENT_ROUTE}`)
      .send({
        ...mockData,
        project: projectId,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data?.name).toBeDefined();
    expect(response.body.data?.id).toBeDefined();
    expect(response.body.data?.secret).toBeDefined();
    created = response.body.data;
  });

  test("should get clients related to user projects", async () => {
    const response = await request
      .agent(app)
      .get(`${CLIENT_ROUTE}?projectId=${projectId}`)
      .set("Authorization", "bearer " + token);

    // check all clients are related to the project
    const clients = response.body.data;

    for (const client of clients) {
      expect(client.project).toBe(projectId);
    }

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);
  });

  test("should edit client", async () => {
    delete created.apiKey;
    const response = await request
      .agent(app)
      .put(`${CLIENT_ROUTE}`)
      .send({
        _id: created._id,
        name: "newName",
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.name).toBe("newName");
  });

  test("should delete client", async () => {
    const response = await request
      .agent(app)
      .delete(`${CLIENT_ROUTE}/?id=${created._id}`)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
