import { request } from 'supertest';
import app from '../../index';
import { API_ROUTE, USER_ROUTE  } from '../../config/routes';
import { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PSW } from '../../config/credentials';

describe('end-to-end tests user endpoint', () => {

  test('should return 200 status code', async () => {
    const response = await request(app).post(`${API_ROUTE}${USER_ROUTE}`).send({
      username: `${SUPER_ADMIN_USERNAME}`,
      password: `${SUPER_ADMIN_PSW}`,
    })
    expect(response.status).toBe(200);
  });

  test('should validate incorrect username', async () => {
    const response = await request(app).post(`${API_ROUTE}${USER_ROUTE}`).send({
      username: 'incorrect_username',
      password: `${SUPER_ADMIN_PSW}`,
    })
    expect(response.status).toBe(401);
  });

  test('should validate incorrect password', async () => {
    const response = await request(app).post(`${API_ROUTE}${USER_ROUTE}`).send({
      username: `${SUPER_ADMIN_USERNAME}`,
      password: 'incorrect_password',
    })
    expect(response.status).toBe(401);
  });


});