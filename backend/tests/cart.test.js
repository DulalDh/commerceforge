import request from 'supertest';
import { Product } from '../src/models/Product.js';
import { app, registerCustomer } from './helpers/auth.js';

describe('Cart API', () => {
  it('adds, updates, removes, and clears cart items', async () => {
    const { token } = await registerCustomer();
    const product = await Product.create({
      name: 'Bluetooth Earbuds',
      slug: 'bluetooth-earbuds',
      category: 'Electronics',
      brand: 'TechBangla',
      price: 2200,
      stock: 10
    });

    const addResponse = await request(app)
      .post('/api/v1/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product.id, quantity: 2 });

    expect(addResponse.status).toBe(201);
    const itemId = addResponse.body.data.cart.items[0]._id;

    const updateResponse = await request(app)
      .patch(`/api/v1/cart/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 3 });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.cart.items[0].quantity).toBe(3);

    const removeResponse = await request(app)
      .delete(`/api/v1/cart/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(removeResponse.status).toBe(200);
    expect(removeResponse.body.data.cart.items).toHaveLength(0);

    const clearResponse = await request(app).delete('/api/v1/cart').set('Authorization', `Bearer ${token}`);
    expect(clearResponse.status).toBe(200);
  });
});
