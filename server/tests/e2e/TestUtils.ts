import request, { Request } from "supertest";
import app from "../../app";
import { API_ROUTE, USER_LOGIN_ROUTE } from "../../config/routes";
import {
  SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_PSWD,
  DATABASE_URL,
  ADMIN_USERNAME,
  ADMIN_PSWD,
} from "../../getEnv";
import { projectService } from "../../services";

class TestUtils {
  async login() {
    // login logic
    const response = await request
      .agent(app)
      .post(`${API_ROUTE}${USER_LOGIN_ROUTE}`)
      .send({
        username: `${SUPER_ADMIN_USERNAME}`,
        password: `${SUPER_ADMIN_PSWD}`,
      });

    return response.body.token;
  }

  async regAdminLogin() {
    // login logic
    const response = await request
      .agent(app)
      .post(`${USER_LOGIN_ROUTE}`)
      .send({
        username: `${ADMIN_USERNAME}`,
        password: `${ADMIN_PSWD}`,
      });

    return response.body.token;
  }

  async getAPiKey() {
    const project = await projectService.findOne({ name: "default" });
    return project.apiKey;
  }

  genRandomName = () => {
    return Math.random().toString(36).substring(7);
  };
}

export default new TestUtils();
