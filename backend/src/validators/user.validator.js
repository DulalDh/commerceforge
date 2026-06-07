import { z } from 'zod';

const addressSchema = z.object({
  label: z.string().optional(),
  fullName: z.string().min(2),
  phone: z.string().min(6),
  division: z.string().min(2),
  district: z.string().min(2),
  upazila: z.string().optional(),
  area: z.string().optional(),
  addressLine: z.string().min(5),
  isDefault: z.boolean().optional()
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(6).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const addAddressSchema = z.object({
  body: addressSchema,
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const updateAddressSchema = z.object({
  body: addressSchema.partial(),
  params: z.object({ addressId: z.string().min(1) }),
  query: z.object({}).optional()
});
