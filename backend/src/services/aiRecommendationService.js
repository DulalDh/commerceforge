import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

const buildPriceFilter = (prices) => {
  if (prices.length === 0) return {};

  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  return {
    price: {
      $gte: Math.max(0, average * 0.6),
      $lte: average * 1.4
    }
  };
};

export const recommendProducts = async ({ userId, productId, limit = 8 }) => {
  const [user, cart, baseProduct] = await Promise.all([
    userId ? User.findById(userId).populate('wishlist') : null,
    userId ? Cart.findOne({ user: userId }).populate('items.product') : null,
    productId ? Product.findById(productId) : null
  ]);

  const sourceProducts = [
    ...(baseProduct ? [baseProduct] : []),
    ...(user?.wishlist || []),
    ...(cart?.items?.map((item) => item.product).filter(Boolean) || [])
  ];

  const categories = [...new Set(sourceProducts.map((product) => product.category).filter(Boolean))];
  const brands = [...new Set(sourceProducts.map((product) => product.brand).filter(Boolean))];
  const tags = [...new Set(sourceProducts.flatMap((product) => product.tags || []))];
  const prices = sourceProducts.map((product) => product.price).filter((price) => Number.isFinite(price));
  const excludeIds = sourceProducts.map((product) => product._id);

  const filter = {
    isActive: true,
    ...(excludeIds.length ? { _id: { $nin: excludeIds } } : {}),
    ...buildPriceFilter(prices)
  };

  const relevance = [];
  if (categories.length) relevance.push({ category: { $in: categories } });
  if (brands.length) relevance.push({ brand: { $in: brands } });
  if (tags.length) relevance.push({ tags: { $in: tags } });
  if (relevance.length) filter.$or = relevance;

  const products = await Product.find(filter)
    .sort({ isFeatured: -1, 'ratings.average': -1, createdAt: -1 })
    .limit(Number(limit));

  return {
    strategy: 'category_tags_brand_price_wishlist_cart',
    products
  };
};
