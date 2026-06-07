import { Router } from 'express';
import {
  addCartItem,
  clearMyCart,
  deleteCartItem,
  getMyCart,
  updateCartItemQuantity
} from '../../controllers/cart.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { addCartItemSchema, updateCartItemSchema } from '../../validators/cart.validator.js';
import { idParamSchema } from '../../validators/common.validator.js';

export const cartRoutes = Router();

cartRoutes.use(authenticate);

cartRoutes.get('/', getMyCart);
cartRoutes.post('/items', validateRequest(addCartItemSchema), addCartItem);
cartRoutes.patch('/items/:itemId', validateRequest(updateCartItemSchema), updateCartItemQuantity);
cartRoutes.delete('/items/:itemId', validateRequest(idParamSchema('itemId')), deleteCartItem);
cartRoutes.delete('/', clearMyCart);
