import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, USER_LOGIN_ROUTE  } from '../../config/routes';
import { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PSWD, DATABASE_URL} from '../../getEnv';
import ProjectService from '../../services/project';

const projectService = new ProjectService();
class TestUtils {

  async login() {
    // login logic
        const response = await request.agent(app).post(`${API_ROUTE}${USER_LOGIN_ROUTE}`).send({
      username: `${SUPER_ADMIN_USERNAME}`,
      password: `${SUPER_ADMIN_PSWD}`,
    })

    return response.body.token;

  }

  async getAPiKey() {
    const project =  await projectService.findOne({name: 'default'}); 
    return project.apiKey;
  }
}

export default new TestUtils();