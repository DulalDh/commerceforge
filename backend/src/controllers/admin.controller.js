import {
  createCategory,
  createCoupon,
  deleteCategory,
  deleteCoupon,
  getDashboardStats,
  listAdminActivityLogs,
  listCategories,
  listCoupons,
  listCustomers,
  listReviews,
  moderateReview,
  updateCategory,
  updateCoupon
} from '../services/admin.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getStats = asyncHandler(async (_req, res) => {
  const stats = await getDashboardStats();
  res.json({ success: true, data: { stats } });
});

export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await listCustomers(req.query);
  res.json({ success: true, data: { customers } });
});

export const getActivityLogs = asyncHandler(async (req, res) => {
  const logs = await listAdminActivityLogs(req.query);
  res.json({ success: true, data: { logs } });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await listCategories(req.query);
  res.json({ success: true, data: { categories } });
});

export const postCategory = asyncHandler(async (req, res) => {
  const category = await createCategory(req.validated.body);
  res.status(201).json({ success: true, data: { category } });
});

export const patchCategory = asyncHandler(async (req, res) => {
  const category = await updateCategory(req.validated.params.categoryId, req.validated.body);
  res.json({ success: true, data: { category } });
});

export const removeCategory = asyncHandler(async (req, res) => {
  await deleteCategory(req.params.categoryId);
  res.status(204).send();
});

export const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await listCoupons(req.query);
  res.json({ success: true, data: { coupons } });
});

export const postCoupon = asyncHandler(async (req, res) => {
  const coupon = await createCoupon(req.validated.body);
  res.status(201).json({ success: true, data: { coupon } });
});

export const patchCoupon = asyncHandler(async (req, res) => {
  const coupon = await updateCoupon(req.validated.params.couponId, req.validated.body);
  res.json({ success: true, data: { coupon } });
});

export const removeCoupon = asyncHandler(async (req, res) => {
  await deleteCoupon(req.params.couponId);
  res.status(204).send();
});

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await listReviews(req.query);
  res.json({ success: true, data: { reviews } });
});

export const patchReview = asyncHandler(async (req, res) => {
  const review = await moderateReview(
    req.validated.params.productId,
    req.validated.params.reviewId,
    req.validated.body.isApproved
  );
  res.json({ success: true, data: { review } });
});
