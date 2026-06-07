import { z } from 'zod';
import { ORDER_STATUS } from '../models/Order.js';
import { PAYMENT_METHODS } from '../constants/payments.js';
import { DELIVERY_AREAS } from '../constants/shipping.js';

const shippingAddressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(6),
  division: z.string().min(2),
  district: z.string().min(2),
  upazila: z.string().optional(),
  area: z.string().optional(),
  addressLine: z.string().min(5)
});

export const createOrderSchema = z.object({
  body: z.object({
    shippingAddress: shippingAddressSchema,
    paymentMethod: z.enum(Object.values(PAYMENT_METHODS)).optional(),
    deliveryArea: z.enum(Object.values(DELIVERY_AREAS)).optional(),
    paymentDetails: z
      .object({
        transactionId: z.string().min(3).optional(),
        senderNumber: z.string().min(6).optional()
      })
      .optional(),
    shippingCharge: z.number().min(0).optional(),
    deliveryCharge: z.number().min(0).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(ORDER_STATUS))
  }),
  params: z.object({ orderId: z.string().min(1) }),
  query: z.object({}).optional()
});

export const updateCourierInfoSchema = z.object({
  body: z.object({
    courierName: z.string().min(2).optional(),
    trackingId: z.string().min(2).optional(),
    estimatedDeliveryDate: z.coerce.date().optional()
  }),
  params: z.object({ orderId: z.string().min(1) }),
  query: z.object({}).optional()
});

export const updateDeliveryStatusSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(ORDER_STATUS)),
    note: z.string().optional()
  }),
  params: z.object({ orderId: z.string().min(1) }),
  query: z.object({}).optional()
});
