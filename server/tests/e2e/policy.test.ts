import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, POLICY_ROUTE } from "../../config/routes";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import { policyService, projectService } from "../../services";

const mockPolicy = {
  project: "default",
  resources: ["resource1", "resource2"],
  actions: ["action1", "action2"],
  roles: ["role1", "role2"],
  policies: [
    {
      role: "role1",
      can: ["action1", "action2"],
      on: ["resource1", "resource2"],
    },
  ],
};

describe("end-to-end tests project policy", () => {
  let token: string;
  let createdPolicy: any;
  let policyObj: any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });

  test("should create project policy", async () => {
    policyObj = await projectService.find({ name: "default2" });
    mockPolicy.project = policyObj[0]._id;

    const policyExists = await policyService.find({
      project: mockPolicy.project,
    });

    if (policyExists.length > 0) {
      await policyService.delete(policyExists[0]._id);
    }

    const response = await request
      .agent(app)
      .post(`${POLICY_ROUTE}`)
      .send({
        ...mockPolicy,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    // check all properties are defined
    expect(response.body.data?.resources).toBeDefined();

    createdPolicy = response.body.data;
  });

  test("should get project policy", async () => {
    const response = await request
      .agent(app)
      .get(`${POLICY_ROUTE}/?projectID=${createdPolicy.project}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);
  });

  test("should edit project policy", async () => {
    const response = await request
      .agent(app)
      .put(`${POLICY_ROUTE}`)
      .send({
        ...createdPolicy,
        actions: ["action1", "action2", "action3"],
      })
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.actions[0]).toBe("action1");
    createdPolicy = response.body.data;
  });

  test("should delete project policy", async () => {
    const response = await request
      .agent(app)
      .delete(`${POLICY_ROUTE}/?id=${createdPolicy._id}`)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  /* Closing policybase connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
