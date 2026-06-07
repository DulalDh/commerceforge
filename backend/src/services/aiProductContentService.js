import { runAiCompletion } from './aiProvider.service.js';

const normalizeTags = (title, keyPoints = []) => {
  const words = `${title} ${keyPoints.join(' ')}`
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09FF\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return [...new Set(words)].slice(0, 10);
};

export const generateProductContent = async ({ title, keyPoints = [] }) => {
  const tags = normalizeTags(title, keyPoints);
  const pointSentence = keyPoints.length ? keyPoints.join(', ') : 'quality materials and everyday value';
  const fallback = {
    shortDescription: `${title} with ${pointSentence}.`,
    description: `${title} is designed for ecommerce customers who want reliable quality, practical features, and good value. Key highlights include ${pointSentence}.`,
    tags,
    seoMetaDescription: `Shop ${title} online in Bangladesh. ${pointSentence}.`
  };

  return runAiCompletion({
    system: 'Generate ecommerce product copy for a Bangladesh online store.',
    prompt: JSON.stringify({ title, keyPoints }),
    fallback
  });
};
