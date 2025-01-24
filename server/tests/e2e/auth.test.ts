import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, USER_LOGIN_ROUTE } from "../../config/routes";
import {
  SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_PSWD,
  DATABASE_URL,
} from "../../getEnv";
import mongoose from "mongoose";

describe("end-to-end tests user endpoint", () => {
  beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
  });

  test("should return 200 status code", async () => {
    const response = await request
      .agent(app)
      .post(`${USER_LOGIN_ROUTE}`)
      .send({
        username: `${SUPER_ADMIN_USERNAME}`,
        password: `${SUPER_ADMIN_PSWD}`,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("uid");
  });

  test("should validate incorrect username", async () => {
    const response = await request
      .agent(app)
      .post(`${USER_LOGIN_ROUTE}`)
      .send({
        username: "incorrect_username",
        password: `${SUPER_ADMIN_PSWD}`,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "user or password is wrong",
      status: false,
    });
  });

  test("should validate incorrect password", async () => {
    const response = await request
      .agent(app)
      .post(`${USER_LOGIN_ROUTE}`)
      .send({
        username: `${SUPER_ADMIN_USERNAME}`,
        password: "incorrect_password",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "user or password is wrong",
      status: false,
    });
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });
});
