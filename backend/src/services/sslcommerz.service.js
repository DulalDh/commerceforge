import { env } from '../config/env.js';

export const createSslCommerzSession = async ({ order, user }) => {
  return {
    provider: 'sslcommerz',
    mode: env.SSLCOMMERZ_IS_LIVE ? 'live' : 'sandbox',
    status: 'placeholder',
    orderId: order.id,
    amount: order.totalAmount,
    customer: {
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    message: 'SSLCommerz credentials and hosted checkout call can be added here later.'
  };
};
