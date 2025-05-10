import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, PROJECT_ROUTE, USER_ROUTE } from "../../config/routes";
import {
  SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_PSWD,
  DATABASE_URL,
  ADMIN_USERNAME,
} from "../../getEnv";
import mongoose from "mongoose";
import TestUtils from "./TestUtils";
import UserService from "../../services/user";
import { makeRandomString } from "../utils";
import { userService } from "../../services";

const mockUserData = {
  name: makeRandomString(10),
  apiKey: "secret",
  userUID: "userID",
};

describe("end-to-end tests project endpoint", () => {
  let token: string;
  let createdProject: any;
  let userObj: any;
  let regAdminToken: string;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
    regAdminToken = await TestUtils.regAdminLogin();
  });

  test("should create project", async () => {
    userObj = await userService.findOne({ username: ADMIN_USERNAME });
    mockUserData.userUID = userObj._id;
    const response = await request
      .agent(app)
      .post(`${PROJECT_ROUTE}`)
      .send({
        ...mockUserData,
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.name).toBe(mockUserData.name);
    expect(response.body.data?.apiKey).toBeDefined();
    expect(response.body.data?.userUID).toBeDefined();

    createdProject = response.body.data;
  });

  test("should get projects", async () => {
    const response = await request
      .agent(app)
      .get(`${PROJECT_ROUTE}`)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);
  });

  test("should edit project", async () => {
    delete createdProject.apiKey;
    const response = await request
      .agent(app)
      .put(`${PROJECT_ROUTE}`)
      .send({
        ...createdProject,
        name: "newName",
      })
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.name).toBe("newName");
  });

  test("should delete project", async () => {
    const response = await request
      .agent(app)
      .delete(`${PROJECT_ROUTE}/?id=${createdProject._id}`)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test("super admin should be able to view default, default2 he's owner of all projects", async () => {
    const response = await request
      .agent(app)
      .get(`${PROJECT_ROUTE}`)
      .set("Authorization", "bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);

    const defaultProject = response.body.data?.find(
      (project: any) => project.name === "default"
    );
    const default2Project = response.body.data?.find(
      (project: any) => project.name === "default2"
    );
    expect(defaultProject).toBeDefined();
    expect(default2Project).toBeDefined();
  });

  // test("admin, user should only be able to view default2 he's owner of default2", async () => {
  //   const response = await request
  //     .agent(app)
  //     .get(`${PROJECT_ROUTE}`)
  //     .set("Authorization", "bearer " + regAdminToken);

  //   expect(response.status).toBe(200);
  //   expect(response.body.status).toBe(true);
  //   const defaultProject = response.body.data?.find(
  //     (project: any) => project.name === "default"
  //   );
  //   const default2Project = response.body.data?.find(
  //     (project: any) => project.name === "default2"
  //   );

  //   expect(defaultProject).toBeUndefined();
  //   expect(default2Project).toBeDefined();
  // });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
