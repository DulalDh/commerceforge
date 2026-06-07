import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { calculateShippingCharge } from './shipping.service.js';
import { DELIVERY_AREAS } from '../constants/shipping.js';

const policyAnswer = () =>
  'Return requests can be reviewed by support after delivery. Returned orders are tracked with the returned delivery status.';

const deliveryChargeAnswer = () =>
  `Delivery charge is ${calculateShippingCharge(DELIVERY_AREAS.INSIDE_DHAKA)} BDT inside Dhaka and ${calculateShippingCharge(DELIVERY_AREAS.OUTSIDE_DHAKA)} BDT outside Dhaka.`;

export const answerCustomerQuestion = async ({ message, userId }) => {
  const text = message.toLowerCase();

  if (text.includes('delivery') || text.includes('charge') || text.includes('shipping')) {
    return { answer: deliveryChargeAnswer(), source: 'shipping_policy' };
  }

  if (text.includes('return') || text.includes('refund')) {
    return { answer: policyAnswer(), source: 'return_policy' };
  }

  if (text.includes('order') || text.includes('track')) {
    const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!order) {
      return { answer: 'I could not find an order for your account yet.', source: 'orders' };
    }

    return {
      answer: `Your latest order is ${order.deliveryStatus || order.orderStatus}. Tracking ID: ${order.trackingId || 'not assigned yet'}.`,
      source: 'orders',
      order
    };
  }

  const products = await Product.find({
    isActive: true,
    $or: [
      { name: new RegExp(message, 'i') },
      { category: new RegExp(message, 'i') },
      { brand: new RegExp(message, 'i') },
      { tags: new RegExp(message, 'i') }
    ]
  }).limit(5);

  if (products.length) {
    return {
      answer: `I found ${products.length} matching products. You can compare price, stock, and ratings from the product list.`,
      source: 'products',
      products
    };
  }

  return {
    answer: 'I can help with products, order status, return policy, and delivery charge. Please ask with a product name, order question, or delivery topic.',
    source: 'fallback'
  };
};
