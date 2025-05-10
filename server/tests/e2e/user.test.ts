import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, USER_ROUTE } from "../../config/routes";
import {
  SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_PSWD,
  DATABASE_URL,
} from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";

const mockUserData = {
  username: "testUser",
  password: "testPassword",
  email: "tko@tko2.com",
  role: "user",
};

describe("end-to-end tests user endpoint", () => {
  let token: string;
  let createdUser: any;
  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
  });

  test("should create user", async () => {
    const response = await request
      .agent(app)
      .post(`${USER_ROUTE}`)
      .send({
        ...mockUserData,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.username).toBe(mockUserData.username);

    // set created user for next tests
    createdUser = response.body.data;
  });

  test("should get users", async () => {
    const response = await request
      .agent(app)
      .get(`${USER_ROUTE}`)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test("should edit user", async () => {
    const response = await request
      .agent(app)
      .put(`${USER_ROUTE}`)
      .send({
        ...createdUser,
        username: "newUsername",
      })
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.username).toBe("newUsername");
  });

  test("should delete users", async () => {
    const response = await request
      .agent(app)
      .delete(`${USER_ROUTE}/?id=${createdUser._id}`)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.username).toBe("newUsername");
  });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
