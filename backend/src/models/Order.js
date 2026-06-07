import mongoose from 'mongoose';
import { PAYMENT_METHODS, PAYMENT_STATUS } from '../constants/payments.js';

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
};

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    variant: {
      size: { type: String, trim: true },
      color: { type: String, trim: true }
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      division: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
      upazila: { type: String, trim: true },
      area: { type: String, trim: true },
      addressLine: { type: String, required: true, trim: true }
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      default: PAYMENT_METHODS.CASH_ON_DELIVERY
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true
    },
    paymentDetails: {
      transactionId: { type: String, trim: true },
      senderNumber: { type: String, trim: true },
      gatewayTransactionId: { type: String, trim: true },
      verificationNote: { type: String, trim: true },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      verifiedAt: { type: Date }
    },
    orderStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true
    },
    deliveryArea: {
      type: String,
      enum: ['inside_dhaka', 'outside_dhaka'],
      required: true,
      index: true
    },
    courierName: { type: String, trim: true },
    deliveryStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true
    },
    estimatedDeliveryDate: { type: Date },
    statusTimeline: [
      {
        status: { type: String, enum: Object.values(ORDER_STATUS), required: true },
        note: { type: String, trim: true },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        changedAt: { type: Date, default: Date.now }
      }
    ],
    subtotal: { type: Number, required: true, min: 0 },
    shippingCharge: { type: Number, required: true, min: 0, default: 0 },
    deliveryCharge: { type: Number, required: true, min: 0, default: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    trackingId: { type: String, trim: true }
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, createdAt: -1 });
orderSchema.index({ deliveryStatus: 1, createdAt: -1 });
orderSchema.index({ courierName: 1 });
orderSchema.index({ paymentMethod: 1 });
orderSchema.index({ 'paymentDetails.transactionId': 1 }, { sparse: true });
orderSchema.index({ trackingId: 1 }, { sparse: true });
orderSchema.index({ createdAt: -1 });

export const Order = mongoose.model('Order', orderSchema);
