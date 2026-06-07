import { Router } from 'express';
import {
  createOrder,
  getAdminOrders,
  getMyOrder,
  getMyOrders,
  getOrderStatus,
  updateAdminCourierInfo,
  updateAdminDeliveryStatus,
  updateAdminOrderStatus
} from '../../controllers/order.controller.js';
import { ROLES } from '../../constants/roles.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { authorize } from '../../middlewares/authorize.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import {
  createOrderSchema,
  updateCourierInfoSchema,
  updateDeliveryStatusSchema,
  updateOrderStatusSchema
} from '../../validators/order.validator.js';

export const orderRoutes = Router();

orderRoutes.get('/status', getOrderStatus);
orderRoutes.post('/', authenticate, validateRequest(createOrderSchema), createOrder);
orderRoutes.get('/me', authenticate, getMyOrders);
orderRoutes.get('/me/:orderId', authenticate, getMyOrder);
orderRoutes.get('/admin', authenticate, authorize(ROLES.ADMIN), getAdminOrders);
orderRoutes.patch(
  '/admin/:orderId/status',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(updateOrderStatusSchema),
  updateAdminOrderStatus
);
orderRoutes.patch(
  '/admin/:orderId/courier',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(updateCourierInfoSchema),
  updateAdminCourierInfo
);
orderRoutes.patch(
  '/admin/:orderId/delivery-status',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(updateDeliveryStatusSchema),
  updateAdminDeliveryStatus
);
