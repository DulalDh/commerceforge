import { Router } from 'express';
import {
  chatWithAssistant,
  generateAdminProductContent,
  getAiStatus,
  getRecommendations,
  searchProductsWithAi
} from '../../controllers/ai.controller.js';
import { ROLES } from '../../constants/roles.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { authorize } from '../../middlewares/authorize.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import {
  chatbotSchema,
  productContentSchema,
  recommendationSchema
} from '../../validators/ai.validator.js';

export const aiRoutes = Router();

aiRoutes.get('/status', getAiStatus);
aiRoutes.get('/search', searchProductsWithAi);
aiRoutes.post(
  '/recommendations',
  authenticate,
  validateRequest(recommendationSchema),
  getRecommendations
);
aiRoutes.post('/chatbot', authenticate, validateRequest(chatbotSchema), chatWithAssistant);
aiRoutes.post(
  '/admin/product-content',
  authenticate,
  authorize(ROLES.ADMIN),
  validateRequest(productContentSchema),
  generateAdminProductContent
);
