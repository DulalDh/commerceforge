import request from 'supertest';
import { app } from './helpers/auth.js';

describe('Auth API', () => {
  it('registers a customer and returns JWT tokens', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      name: 'Rahim Uddin',
      email: 'rahim@example.com',
      password: 'Password123'
    });

    expect(response.status).toBe(201);
    expect(response.body.data.user.email).toBe('rahim@example.com');
    expect(response.body.data.user.role).toBe('customer');
    expect(response.body.data.accessToken).toBeTruthy();
    expect(response.body.data.refreshToken).toBeTruthy();
  });

  it('logs in an existing customer', async () => {
    await request(app).post('/api/v1/auth/register').send({
      name: 'Karim Uddin',
      email: 'karim@example.com',
      password: 'Password123'
    });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'karim@example.com',
      password: 'Password123'
    });

    expect(response.status).toBe(200);
    expect(response.body.data.accessToken).toBeTruthy();
  });

  it('rejects invalid login credentials', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'missing@example.com',
      password: 'wrong'
    });

    expect(response.status).toBe(401);
  });
});
