import request from 'supertest';
import { createApp } from '../../src/app.js';
import { ROLES } from '../../src/constants/roles.js';
import { User } from '../../src/models/User.js';
import bcrypt from 'bcryptjs';

export const app = createApp();

export const registerCustomer = async (overrides = {}) => {
  const payload = {
    name: 'Test Customer',
    email: 'customer@example.com',
    password: 'Password123',
    ...overrides
  };

  const response = await request(app).post('/api/v1/auth/register').send(payload);
  return { response, token: response.body.data.accessToken, user: response.body.data.user };
};

export const createAdminToken = async () => {
  const passwordHash = await bcrypt.hash('Admin12345', 12);
  await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: passwordHash,
    passwordHash,
    role: ROLES.ADMIN
  });

  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'Admin12345' });

  return response.body.data.accessToken;
};
