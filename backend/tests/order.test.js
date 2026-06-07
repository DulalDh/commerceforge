import request from 'supertest';
import { Product } from '../src/models/Product.js';
import { app, createAdminToken, registerCustomer } from './helpers/auth.js';

const shippingAddress = {
  fullName: 'Rahim Uddin',
  phone: '01700000000',
  division: 'Dhaka',
  district: 'Dhaka',
  addressLine: 'Mirpur, Dhaka'
};

describe('Order API', () => {
  it('creates an order from cart and returns order history', async () => {
    const { token } = await registerCustomer();
    const product = await Product.create({
      name: 'Cooking Set',
      slug: 'cooking-set',
      category: 'Home Essentials',
      price: 3500,
      stock: 5
    });

    await request(app)
      .post('/api/v1/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product.id, quantity: 1 });

    const orderResponse = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ shippingAddress, paymentMethod: 'cash_on_delivery', deliveryArea: 'inside_dhaka' });

    expect(orderResponse.status).toBe(201);
    expect(orderResponse.body.data.order.shippingCharge).toBe(80);

    const historyResponse = await request(app).get('/api/v1/orders/me').set('Authorization', `Bearer ${token}`);
    expect(historyResponse.status).toBe(200);
    expect(historyResponse.body.data.orders).toHaveLength(1);
  });

  it('allows admin to update order status', async () => {
    const { token } = await registerCustomer();
    const adminToken = await createAdminToken();
    const product = await Product.create({
      name: 'Cotton Sharee',
      slug: 'cotton-sharee',
      category: 'Fashion',
      price: 2500,
      stock: 5
    });

    await request(app)
      .post('/api/v1/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product.id, quantity: 1 });

    const orderResponse = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ shippingAddress, paymentMethod: 'cash_on_delivery' });

    const orderId = orderResponse.body.data.order._id;
    const statusResponse = await request(app)
      .patch(`/api/v1/orders/admin/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'confirmed' });

    expect(statusResponse.status).toBe(200);
    expect(statusResponse.body.data.order.orderStatus).toBe('confirmed');
  });
});
