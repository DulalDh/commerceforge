import request from 'supertest';
import { app, createAdminToken, registerCustomer } from './helpers/auth.js';

const productPayload = {
  name: 'Test Panjabi',
  category: 'Fashion',
  brand: 'Dhaka Wear',
  price: 1500,
  stock: 20,
  images: [],
  variants: []
};

describe('Product API', () => {
  it('allows admin to create and list products', async () => {
    const adminToken = await createAdminToken();

    const createResponse = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(productPayload);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.data.product.name).toBe(productPayload.name);

    const listResponse = await request(app).get('/api/v1/products').query({ search: 'Panjabi' });
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data.items).toHaveLength(1);
  });

  it('rejects customer product creation', async () => {
    const { token } = await registerCustomer();

    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productPayload);

    expect(response.status).toBe(403);
  });
});
