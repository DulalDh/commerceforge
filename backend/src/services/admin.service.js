import { Category } from '../models/Category.js';
import { Coupon } from '../models/Coupon.js';
import { AdminActivityLog } from '../models/AdminActivityLog.js';
import { Order, ORDER_STATUS } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { createSlug } from '../utils/slug.js';

export const getDashboardStats = async () => {
  const [
    totalOrders,
    pendingOrders,
    lowStockProducts,
    totalCustomers,
    totalProducts,
    paidSales
  ] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ orderStatus: ORDER_STATUS.PENDING }),
    Product.countDocuments({ stock: { $lte: 10 } }),
    User.countDocuments({ role: 'customer' }),
    Product.countDocuments(),
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])
  ]);

  return {
    totalSales: paidSales[0]?.total || 0,
    totalOrders,
    pendingOrders,
    lowStockProducts,
    totalCustomers,
    totalProducts
  };
};

export const listCustomers = async (query = {}) => {
  const filter = { role: 'customer' };
  if (query.search) {
    const search = new RegExp(query.search, 'i');
    filter.$or = [{ name: search }, { email: search }, { phone: search }];
  }

  return User.find(filter).select('-passwordHash -password').sort({ createdAt: -1 });
};

export const listAdminActivityLogs = async (query = {}) => {
  const filter = {};
  if (query.admin) filter.admin = query.admin;
  if (query.method) filter.method = query.method.toUpperCase();

  return AdminActivityLog.find(filter)
    .populate('admin', 'name email role')
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(query.limit) || 100, 500));
};

export const listCategories = async (query = {}) => {
  const filter = {};
  if (query.search) {
    const search = new RegExp(query.search, 'i');
    filter.$or = [{ name: search }, { slug: search }];
  }

  return Category.find(filter).populate('parentCategory', 'name slug').sort({ createdAt: -1 });
};

export const createCategory = async (payload) => {
  const parentCategory = payload.parentCategory || null;
  return Category.create({
    ...payload,
    parentCategory,
    slug: payload.slug || createSlug(payload.name)
  });
};

export const updateCategory = async (categoryId, payload) => {
  const update = { ...payload };
  if (payload.name && !payload.slug) update.slug = createSlug(payload.name);
  if (payload.parentCategory === '') update.parentCategory = null;

  const category = await Category.findByIdAndUpdate(categoryId, update, {
    new: true,
    runValidators: true
  });

  if (!category) throw new AppError('Category not found', 404);
  return category;
};

export const deleteCategory = async (categoryId) => {
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) throw new AppError('Category not found', 404);
};

export const listCoupons = async (query = {}) => {
  const filter = {};
  if (query.search) filter.code = new RegExp(query.search, 'i');
  if (query.isActive !== undefined) filter.isActive = query.isActive === 'true';

  return Coupon.find(filter).sort({ createdAt: -1 });
};

export const createCoupon = async (payload) => {
  return Coupon.create(payload);
};

export const updateCoupon = async (couponId, payload) => {
  const coupon = await Coupon.findByIdAndUpdate(couponId, payload, {
    new: true,
    runValidators: true
  });

  if (!coupon) throw new AppError('Coupon not found', 404);
  return coupon;
};

export const deleteCoupon = async (couponId) => {
  const coupon = await Coupon.findByIdAndDelete(couponId);
  if (!coupon) throw new AppError('Coupon not found', 404);
};

export const listReviews = async (query = {}) => {
  const approvalFilter =
    query.isApproved === undefined ? undefined : query.isApproved === 'true';
  const match = {};
  if (query.isApproved !== undefined) {
    match['reviews.isApproved'] = approvalFilter;
  }

  const products = await Product.find({ reviews: { $exists: true, $ne: [] }, ...match }).select(
    'name reviews'
  );

  return products.flatMap((product) =>
    product.reviews
      .filter((review) =>
        approvalFilter === undefined ? true : review.isApproved === approvalFilter
      )
      .map((review) => ({
        ...review.toObject(),
        product: { _id: product._id, name: product.name }
      }))
  );
};

export const moderateReview = async (productId, reviewId, isApproved) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);

  const review = product.reviews.id(reviewId);
  if (!review) throw new AppError('Review not found', 404);

  review.isApproved = isApproved;
  await product.save();
  return review;
};

export const listAdminPayments = async (query = {}) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.method) filter.method = query.method;

  return Payment.find(filter)
    .populate('order', 'orderStatus totalAmount trackingId')
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 });
};
