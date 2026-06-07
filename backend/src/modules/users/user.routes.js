import { Router } from 'express';
import {
  addAddress,
  deleteAddress,
  getProfile,
  getUserStatus,
  updateAddress,
  updateProfile
} from '../../controllers/user.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import {
  addAddressSchema,
  updateAddressSchema,
  updateProfileSchema
} from '../../validators/user.validator.js';
import { idParamSchema } from '../../validators/common.validator.js';

export const userRoutes = Router();

userRoutes.get('/status', getUserStatus);
userRoutes.get('/me', authenticate, getProfile);
userRoutes.patch('/me', authenticate, validateRequest(updateProfileSchema), updateProfile);
userRoutes.post('/me/addresses', authenticate, validateRequest(addAddressSchema), addAddress);
userRoutes.patch(
  '/me/addresses/:addressId',
  authenticate,
  validateRequest(updateAddressSchema),
  updateAddress
);
userRoutes.delete(
  '/me/addresses/:addressId',
  authenticate,
  validateRequest(idParamSchema('addressId')),
  deleteAddress
);
