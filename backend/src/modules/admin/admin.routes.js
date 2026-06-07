import { Router } from 'express';
import {
  getCategories,
  getActivityLogs,
  getCoupons,
  getCustomers,
  getReviews,
  getStats,
  patchCategory,
  patchCoupon,
  patchReview,
  postCategory,
  postCoupon,
  removeCategory,
  removeCoupon
} from '../../controllers/admin.controller.js';
import { ROLES } from '../../constants/roles.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { authorize } from '../../middlewares/authorize.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import {
  categorySchema,
  couponSchema,
  moderateReviewSchema,
  updateCategorySchema,
  updateCouponSchema
} from '../../validators/admin.validator.js';
import { idParamSchema } from '../../validators/common.validator.js';

export const adminRoutes = Router();

adminRoutes.use(authenticate, authorize(ROLES.ADMIN));

adminRoutes.get('/stats', getStats);
adminRoutes.get('/activity-logs', getActivityLogs);
adminRoutes.get('/customers', getCustomers);
adminRoutes.get('/categories', getCategories);
adminRoutes.post('/categories', validateRequest(categorySchema), postCategory);
adminRoutes.patch('/categories/:categoryId', validateRequest(updateCategorySchema), patchCategory);
adminRoutes.delete('/categories/:categoryId', validateRequest(idParamSchema('categoryId')), removeCategory);
adminRoutes.get('/coupons', getCoupons);
adminRoutes.post('/coupons', validateRequest(couponSchema), postCoupon);
adminRoutes.patch('/coupons/:couponId', validateRequest(updateCouponSchema), patchCoupon);
adminRoutes.delete('/coupons/:couponId', validateRequest(idParamSchema('couponId')), removeCoupon);
adminRoutes.get('/reviews', getReviews);
adminRoutes.patch('/products/:productId/reviews/:reviewId', validateRequest(moderateReviewSchema), patchReview);
