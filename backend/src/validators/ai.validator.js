import { z } from 'zod';

export const recommendationSchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    limit: z.number().int().min(1).max(24).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const chatbotSchema = z.object({
  body: z.object({
    message: z.string().min(2)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const productContentSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    keyPoints: z.array(z.string().min(1)).default([])
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});
