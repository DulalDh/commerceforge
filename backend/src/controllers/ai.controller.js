import { recommendProducts } from '../services/aiRecommendationService.js';
import { smartProductSearch } from '../services/aiSearchService.js';
import { answerCustomerQuestion } from '../services/aiChatbotService.js';
import { generateProductContent } from '../services/aiProductContentService.js';
import { getAiProviderConfig } from '../services/aiProvider.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAiStatus = (_req, res) => {
  res.json({
    success: true,
    module: 'ai',
    capabilities: ['recommendations', 'search', 'chatbot', 'description-generator'],
    provider: getAiProviderConfig(),
    status: 'ready'
  });
};

export const getRecommendations = asyncHandler(async (req, res) => {
  const result = await recommendProducts({
    userId: req.user?.id,
    productId: req.validated.body.productId,
    limit: req.validated.body.limit
  });

  res.json({ success: true, data: result });
});

export const searchProductsWithAi = asyncHandler(async (req, res) => {
  const result = await smartProductSearch(req.query);
  res.json({ success: true, data: result });
});

export const chatWithAssistant = asyncHandler(async (req, res) => {
  const result = await answerCustomerQuestion({
    message: req.validated.body.message,
    userId: req.user.id
  });

  res.json({ success: true, data: result });
});

export const generateAdminProductContent = asyncHandler(async (req, res) => {
  const result = await generateProductContent(req.validated.body);
  res.json({ success: true, data: result });
});
