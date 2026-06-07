import { z } from 'zod';

export const addCartItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
    quantity: z.number().int().min(1).default(1),
    variant: z
      .object({
        size: z.string().optional(),
        color: z.string().optional()
      })
      .optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().min(1)
  }),
  params: z.object({ itemId: z.string().min(1) }),
  query: z.object({}).optional()
});
