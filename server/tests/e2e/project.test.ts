import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, PROJECT_ROUTE, USER_ROUTE  } from '../../config/routes';
import { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PSWD, DATABASE_URL} from '../../getEnv';
import mongoose from 'mongoose';
import TestUtils from './TestUtils';
import UserService from '../../services/user';
import { makeRandomString } from '../utils';


const mockUserData = {
  name: makeRandomString(10),
  apiKey: 'secret',
  user: 'userID',
}

const userService = new UserService();



describe('end-to-end tests project endpoint', () => {
  let token : string;
  let createdProject : any;
  let userObj : any;
  let regAdminToken : string;

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    token = await TestUtils.login();
    regAdminToken = await TestUtils.regAdminLogin();
  });
  

  test('should create project', async () => {

    userObj = await userService.findAll({});
    mockUserData.user =  userObj[0]._id;
    const response = await request.agent(app).post(`${API_ROUTE}${PROJECT_ROUTE}`).send({
      ...mockUserData
    })
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.name).toBe(mockUserData.name);
    expect(response.body.data?.apiKey).toBeDefined();
    expect(response.body.data?.user).toBeDefined();

    createdProject = response.body.data;
  });

  test('should get projects', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}${PROJECT_ROUTE}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.length).toBeGreaterThan(0);

  });

  test('should edit project', async () => {

    delete createdProject.apiKey;
    const response = await request.agent(app).put(`${API_ROUTE}${PROJECT_ROUTE}`).send({
      ...createdProject,
      name: 'newName'
    })
    .set('Authorization', 'bearer ' + token)
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data?.name).toBe('newName');

  });

  test('should delete project', async () => {
    const response = await request.agent(app).delete(`${API_ROUTE}${PROJECT_ROUTE}/?id=${createdProject._id}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test("super admin should be able to view default, default2 he's owner of all projects", async () => {
    const response = await request.agent(app).get(`${API_ROUTE}${PROJECT_ROUTE}`)
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    
    const defaultProject = response.body.data?.find((project : any) => project.name === 'default');
    const default2Project = response.body.data?.find((project : any) => project.name === 'default2');
    expect(defaultProject).toBeDefined();
    expect(default2Project).toBeDefined();
  });

  test("admin, user should only be able to view default2 he's owner of default2", async () => {
    const response = await request.agent(app).get(`${API_ROUTE}${PROJECT_ROUTE}`)
    .set('Authorization', 'bearer ' + regAdminToken)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    const defaultProject = response.body.data?.find((project : any) => project.name === 'default');
    const default2Project = response.body.data?.find((project : any) => project.name === 'default2');

    expect(defaultProject).toBeUndefined();
    expect(default2Project).toBeDefined();
  });



 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});