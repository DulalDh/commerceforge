import { Product } from '../models/Product.js';
import { AppError } from '../utils/AppError.js';
import { createSlug } from '../utils/slug.js';

export const createProduct = async (payload) => {
  const slug = createSlug(payload.name);
  const existingProduct = await Product.findOne({ slug });

  if (existingProduct) {
    throw new AppError('A product with this name already exists', 409);
  }

  return Product.create({ ...payload, slug });
};

export const listProducts = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const filter = {};

  if (query.search) {
    filter.$text = { $search: query.search };
  }

  if (query.category) filter.category = query.category;
  if (query.brand) filter.brand = query.brand;
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  if (query.inStock === 'true') filter.stock = { $gt: 0 };
  if (query.isActive !== undefined) filter.isActive = query.isActive === 'true';

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter)
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export const getProductById = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
};

export const updateProduct = async (productId, payload) => {
  const update = { ...payload };

  if (payload.name) {
    update.slug = createSlug(payload.name);
  }

  const product = await Product.findByIdAndUpdate(productId, update, {
    new: true,
    runValidators: true
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
};
