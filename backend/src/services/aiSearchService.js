import { Product } from '../models/Product.js';

const buildKeywordRegex = (keyword = '') => {
  const tokens = keyword
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);

  return tokens.map((token) => new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
};

export const smartProductSearch = async (query = {}) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const filter = { isActive: true };
  const regexes = buildKeywordRegex(query.q || query.search || '');

  if (regexes.length) {
    filter.$or = regexes.flatMap((regex) => [
      { name: regex },
      { slug: regex },
      { description: regex },
      { shortDescription: regex },
      { category: regex },
      { brand: regex },
      { tags: regex }
    ]);
  }

  if (query.category) filter.category = new RegExp(query.category, 'i');
  if (query.brand) filter.brand = new RegExp(query.brand, 'i');
  if (query.tag) filter.tags = new RegExp(query.tag, 'i');

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ isFeatured: -1, 'ratings.average': -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter)
  ]);

  return {
    query: query.q || query.search || '',
    languageSupport: ['bangla', 'english', 'partial-keyword'],
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};
