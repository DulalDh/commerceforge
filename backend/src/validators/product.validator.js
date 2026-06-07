import { z } from 'zod';

const variantSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().min(0).optional(),
  discountPrice: z.number().min(0).optional(),
  images: z.array(z.string().url()).optional(),
  stock: z.number().int().min(0).optional()
});

const reviewSchema = z.object({
  user: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  isApproved: z.boolean().optional()
});

const productBodySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  shortDescription: z.string().max(300).optional(),
  category: z.union([z.string().min(1), z.record(z.any())]),
  brand: z.string().optional(),
  price: z.number().min(0),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0),
  images: z.array(z.string().url()).optional(),
  variants: z.array(variantSchema).optional(),
  ratings: z
    .object({
      average: z.number().min(0).max(5).optional(),
      count: z.number().int().min(0).optional()
    })
    .optional(),
  reviews: z.array(reviewSchema).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional()
});

export const createProductSchema = z.object({
  body: productBodySchema,
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const updateProductSchema = z.object({
  body: productBodySchema.partial(),
  params: z.object({ productId: z.string().min(1) }),
  query: z.object({}).optional()
});
