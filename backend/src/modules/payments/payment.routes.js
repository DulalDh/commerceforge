import { Router } from 'express';
import {
  getAdminPayments,
  getPaymentMethods,
  getPaymentStatus,
  verifyPayment
} from '../../controllers/payment.controller.js';
import { ROLES } from '../../constants/roles.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { authorize } from '../../middlewares/authorize.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { verifyManualPaymentSchema } from '../../validators/payment.validator.js';

export const paymentRoutes = Router();

paymentRoutes.get('/status', getPaymentStatus);
paymentRoutes.get('/methods', getPaymentMethods);
paymentRoutes.get('/admin', authenticate, authorize(ROLES.ADMIN), getAdminPayments);
paymentRoutes.patch(
  '/admin/:paymentId/verify',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(verifyManualPaymentSchema),
  verifyPayment
);
