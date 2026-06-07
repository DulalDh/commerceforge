import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  CORS_ORIGINS: z.string().optional(),
  MONGODB_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_ISSUER: z.string().default('bd-ai-ecommerce-api'),
  JWT_AUDIENCE: z.string().default('bd-ai-ecommerce-client'),
  BKASH_MERCHANT_NUMBER: z.string().optional(),
  NAGAD_MERCHANT_NUMBER: z.string().optional(),
  SSLCOMMERZ_STORE_ID: z.string().optional(),
  SSLCOMMERZ_STORE_PASSWORD: z.string().optional(),
  SSLCOMMERZ_IS_LIVE: z.coerce.boolean().default(false),
  AI_PROVIDER: z.string().optional(),
  AI_API_KEY: z.string().optional()
});

export const env = envSchema.parse(process.env);

export const corsOrigins = [
  env.CLIENT_URL,
  ...(env.CORS_ORIGINS ? env.CORS_ORIGINS.split(',').map((origin) => origin.trim()) : [])
].filter(Boolean);
