import mongoose from 'mongoose';
import { PAYMENT_METHODS, PAYMENT_STATUS } from '../constants/payments.js';

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    method: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true
    },
    amount: { type: Number, required: true, min: 0 },
    transactionId: { type: String, trim: true },
    senderNumber: { type: String, trim: true },
    gatewayTransactionId: { type: String, trim: true },
    gatewayPayload: { type: mongoose.Schema.Types.Mixed },
    verificationNote: { type: String, trim: true },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date }
  },
  { timestamps: true }
);

paymentSchema.index({ transactionId: 1, method: 1 }, { sparse: true });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ order: 1, method: 1 });

export const Payment = mongoose.model('Payment', paymentSchema);
