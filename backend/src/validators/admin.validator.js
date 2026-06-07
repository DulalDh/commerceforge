import { z } from 'zod';
import { DISCOUNT_TYPES } from '../models/Coupon.js';

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().optional(),
    image: z.string().url().optional().or(z.literal('')),
    parentCategory: z.string().optional().or(z.literal('')).nullable()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const updateCategorySchema = categorySchema.extend({
  body: categorySchema.shape.body.partial(),
  params: z.object({ categoryId: z.string().min(1) })
});

export const couponSchema = z.object({
  body: z.object({
    code: z.string().min(2),
    discountType: z.enum(Object.values(DISCOUNT_TYPES)),
    discountValue: z.number().min(0),
    expiryDate: z.coerce.date(),
    minimumOrderAmount: z.number().min(0).optional(),
    isActive: z.boolean().optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const updateCouponSchema = couponSchema.extend({
  body: couponSchema.shape.body.partial(),
  params: z.object({ couponId: z.string().min(1) })
});

export const moderateReviewSchema = z.object({
  body: z.object({
    isApproved: z.boolean()
  }),
  params: z.object({
    productId: z.string().min(1),
    reviewId: z.string().min(1)
  }),
  query: z.object({}).optional()
});
