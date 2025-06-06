import request, { Request } from "supertest";
import app from "../../app";
import { ENDPOINT_ROUTE } from "../../config/routes";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import { resourceService } from "../../services";

describe("end-to-end tests project endpoint", () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });

  test("should return endpoints", async () => {
    const resource = await resourceService.findOne({ name: "default" });
    const response = await request
      .agent(app)
      .post(`${ENDPOINT_ROUTE}`)
      .send({
        features: resource?.features,
        _id: resource?._id,
        name: resource?.name,
        project: resource?.project,
        fields: resource?.fields,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);
  });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
