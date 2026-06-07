import mongoose from 'mongoose';

export const DISCOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed'
};

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true, uppercase: true },
    discountType: {
      type: String,
      enum: Object.values(DISCOUNT_TYPES),
      required: true
    },
    discountValue: { type: Number, required: true, min: 0 },
    expiryDate: { type: Date, required: true },
    minimumOrderAmount: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ expiryDate: 1 });
couponSchema.index({ isActive: 1, expiryDate: 1 });
couponSchema.index({ minimumOrderAmount: 1 });

export const Coupon = mongoose.model('Coupon', couponSchema);
