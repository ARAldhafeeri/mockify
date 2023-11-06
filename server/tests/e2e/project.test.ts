import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, PROJECT_ROUTE, USER_ROUTE  } from '../../config/routes';
import { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PSWD, DATABASE_URL} from '../../getEnv';
import mongoose from 'mongoose';
import { DefaultData } from '../../defaultData';
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

  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    DefaultData
    token = await TestUtils.login();
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
    expect(response.body.data.name).toBe(mockUserData.name);
    expect(response.body.data.apiKey).toBeDefined();
    expect(response.body.data.user).toBeDefined();

    createdProject = response.body.data;
  });

  test('should get projects', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}${PROJECT_ROUTE}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

  });

  test('should edit project', async () => {

    delete createdProject.apiKey;
    const response = await request.agent(app).put(`${API_ROUTE}${PROJECT_ROUTE}`).send({
      ...createdProject,
      name: 'newName'
    })
    .set('Authorization', 'bearer ' + token)

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.name).toBe('newName');

  });

  test('should delete project', async () => {
    const response = await request.agent(app).delete(`${API_ROUTE}${PROJECT_ROUTE}/?id=${createdProject._id}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });


 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});