import { z } from 'zod';
import { PAYMENT_METHODS, PAYMENT_STATUS } from '../constants/payments.js';

export const listPaymentsSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    status: z.enum(Object.values(PAYMENT_STATUS)).optional(),
    method: z.enum(Object.values(PAYMENT_METHODS)).optional()
  })
});

export const verifyManualPaymentSchema = z.object({
  body: z.object({
    status: z.enum([PAYMENT_STATUS.PAID, PAYMENT_STATUS.FAILED, PAYMENT_STATUS.REFUNDED]),
    note: z.string().optional()
  }),
  params: z.object({ paymentId: z.string().min(1) }),
  query: z.object({}).optional()
});
