import {
  createOrderFromCart,
  getOrderForUser,
  getUserOrders,
  listAllOrders,
  updateCourierInfo,
  updateDeliveryStatus,
  updateOrderStatus
} from '../services/order.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const order = await createOrderFromCart(req.user.id, req.validated.body);
  res.status(201).json({ success: true, data: { order } });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await getUserOrders(req.user.id);
  res.json({ success: true, data: { orders } });
});

export const getMyOrder = asyncHandler(async (req, res) => {
  const order = await getOrderForUser(req.user.id, req.params.orderId);
  res.json({ success: true, data: { order } });
});

export const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await listAllOrders(req.query);
  res.json({ success: true, data: { orders } });
});

export const updateAdminOrderStatus = asyncHandler(async (req, res) => {
  const order = await updateOrderStatus(req.validated.params.orderId, req.validated.body.status);
  res.json({ success: true, data: { order } });
});

export const updateAdminCourierInfo = asyncHandler(async (req, res) => {
  const order = await updateCourierInfo(
    req.validated.params.orderId,
    req.validated.body,
    req.user.id
  );
  res.json({ success: true, data: { order } });
});

export const updateAdminDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await updateDeliveryStatus(
    req.validated.params.orderId,
    req.validated.body.status,
    req.validated.body.note,
    req.user.id
  );
  res.json({ success: true, data: { order } });
});

export const getOrderStatus = (_req, res) => {
  res.json({ success: true, module: 'orders', status: 'ready' });
};
