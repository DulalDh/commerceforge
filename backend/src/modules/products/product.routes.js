import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProduct,
  getProducts,
  getProductStatus,
  updateProductController
} from '../../controllers/product.controller.js';
import { ROLES } from '../../constants/roles.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { authorize } from '../../middlewares/authorize.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { createProductSchema, updateProductSchema } from '../../validators/product.validator.js';
import { idParamSchema } from '../../validators/common.validator.js';

export const productRoutes = Router();

productRoutes.get('/status', getProductStatus);
productRoutes.get('/', getProducts);
productRoutes.get('/:productId', getProduct);
productRoutes.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(createProductSchema),
  createProductController
);
productRoutes.patch(
  '/:productId',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(updateProductSchema),
  updateProductController
);
productRoutes.delete(
  '/:productId',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(idParamSchema('productId')),
  deleteProductController
);
