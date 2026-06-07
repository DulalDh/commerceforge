import { Cart } from '../models/Cart.js';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { AppError } from '../utils/AppError.js';
import { createPaymentForOrder } from './payment.service.js';
import {
  calculateEstimatedDeliveryDate,
  calculateShippingCharge,
  resolveDeliveryArea
} from './shipping.service.js';

export const createOrderFromCart = async (userId, payload) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  const orderItems = [];
  let subtotal = 0;

  for (const item of cart.items) {
    const product = item.product;

    if (!product || !product.isActive) {
      throw new AppError('One or more cart products are unavailable', 400);
    }

    if (product.stock < item.quantity) {
      throw new AppError(`Insufficient stock for ${product.name}`, 400);
    }

    subtotal += product.price * item.quantity;
    orderItems.push({
      product: product.id,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
      variant: item.variant
    });
  }

  const deliveryArea = payload.deliveryArea || resolveDeliveryArea(payload.shippingAddress);
  const shippingCharge =
    payload.shippingCharge ?? payload.deliveryCharge ?? calculateShippingCharge(deliveryArea);
  const estimatedDeliveryDate = calculateEstimatedDeliveryDate(deliveryArea);
  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress: payload.shippingAddress,
    paymentMethod: payload.paymentMethod,
    deliveryArea,
    deliveryStatus: 'pending',
    estimatedDeliveryDate,
    subtotal,
    shippingCharge,
    deliveryCharge: shippingCharge,
    totalAmount: subtotal + shippingCharge,
    total: subtotal + shippingCharge,
    paymentDetails: payload.paymentDetails,
    statusTimeline: [
      {
        status: 'pending',
        note: 'Order placed'
      }
    ]
  });

  await createPaymentForOrder({
    order,
    user: { id: userId },
    paymentDetails: payload.paymentDetails
  });

  await Promise.all(
    cart.items.map((item) =>
      Product.findByIdAndUpdate(item.product.id, { $inc: { stock: -item.quantity } })
    )
  );

  cart.items = [];
  await cart.save();

  return order;
};

export const getUserOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

export const getOrderForUser = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  return order;
};

export const listAllOrders = async (query) => {
  const filter = {};
  if (query.status) filter.orderStatus = query.status;
  if (query.orderStatus) filter.orderStatus = query.orderStatus;
  if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;

  return Order.find(filter).populate('user', 'name email phone').sort({ createdAt: -1 });
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.orderStatus = status;
  order.deliveryStatus = status;
  order.statusTimeline.push({ status, note: `Order marked as ${status}` });
  await order.save();

  return order;
};

export const updateCourierInfo = async (orderId, payload, adminId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (payload.courierName !== undefined) order.courierName = payload.courierName;
  if (payload.trackingId !== undefined) order.trackingId = payload.trackingId;
  if (payload.estimatedDeliveryDate !== undefined) {
    order.estimatedDeliveryDate = payload.estimatedDeliveryDate;
  }

  order.statusTimeline.push({
    status: order.deliveryStatus,
    note: 'Courier information updated',
    changedBy: adminId
  });
  await order.save();

  return order;
};

export const updateDeliveryStatus = async (orderId, status, note, adminId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.deliveryStatus = status;
  order.orderStatus = status;
  order.statusTimeline.push({
    status,
    note: note || `Delivery marked as ${status}`,
    changedBy: adminId
  });
  await order.save();

  return order;
};
