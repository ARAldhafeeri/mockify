import request, {Request} from 'supertest';
import app from '../../app';
import { API_ROUTE, PROJECT_ROUTE, USER_ROUTE  } from '../../config/routes';
import { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PSWD, DATABASE_URL} from '../../getEnv';
import mongoose from 'mongoose';
import { DefaultData } from '../../defaultData';
import TestUtils from './TestUtils';


const mockUserData = {
  name: 'testUser',
  apiKey: 'secret',
  user: 'userID',
}



describe('end-to-end tests project endpoint', () => {
  let token : string;
  let createdProject : any;
  beforeAll(async () => {
    await mongoose.connect(DATABASE_URL);
    DefaultData
    token = await TestUtils.login();
  });
  

  test('should create user', async () => {
    const response = await request.agent(app).post(`${API_ROUTE}${PROJECT_ROUTE}`).send({
      ...mockUserData
    })
    .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.name).toBe(mockUserData.name);
    expect(response.body.data.apiKey).toBe(mockUserData.apiKey);
    expect(response.body.data.user).toBe(mockUserData.user);

    createdProject = response.body.data;
  });

  test('should get users', async () => {

    const response = await request.agent(app).get(`${API_ROUTE}${USER_ROUTE}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

  });

  test('should edit user', async () => {

    const response = await request.agent(app).put(`${API_ROUTE}${USER_ROUTE}`).send({
      ...createdProject,
      name: 'newName'
    })
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.username).toBe('newName');

  });

  test('should delete users', async () => {
    console.log('createdUser', createdProject)
    const response = await request.agent(app).delete(`${API_ROUTE}${USER_ROUTE}/?id=${createdProject._id}`)
    .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });


 /* Closing database connection after each test. */
 afterAll(async () => {
  await mongoose.connection.close();
});

});