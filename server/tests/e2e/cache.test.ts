import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, CAACHE_ROUTE_ONLY } from "../../config/routes";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import redisClient from "../../config/redis";

const mockKey = "testKey";
const mockValue = "testValue";
describe("end-to-end tests project cache", () => {
  let token: string;
  let createdCache: any;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
    redisClient.connect();
  });

  test("should set key for  project cache", async () => {
    const response = await request
      .agent(app)
      .post(`${API_ROUTE}${CAACHE_ROUTE_ONLY}/default?key=${mockKey}`)
      .send({
        value: mockValue,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("Cache updated");
    // check all properties are defined
  });

  test("should get key cache", async () => {
    const response = await request
      .agent(app)
      .get(`${API_ROUTE}${CAACHE_ROUTE_ONLY}/default?key=${mockKey}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBe(mockValue);
    expect(response.body.message).toBe("Cache key retrieved");
  });

  test("should delete key from project cache", async () => {
    const response = await request
      .agent(app)
      .delete(`${API_ROUTE}${CAACHE_ROUTE_ONLY}/default?key=${mockKey}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test("should list all k,v  for project", async () => {
    const response = await request
      .agent(app)
      .get(`${API_ROUTE}${CAACHE_ROUTE_ONLY}/default`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toBeDefined();
  });

  /* Closing cachebase connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
    redisClient.quit();
  });
});
