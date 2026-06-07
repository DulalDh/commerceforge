import mongoose from 'mongoose';
import { ROLES } from '../constants/roles.js';

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: 'Home' },
    fullName: { type: String, trim: true },
    phone: { type: String, trim: true },
    division: { type: String, trim: true },
    district: { type: String, trim: true },
    upazila: { type: String, trim: true },
    area: { type: String, trim: true },
    addressLine: { type: String, trim: true },
    isDefault: { type: Boolean, default: false }
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true, select: false },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER
    },
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { sparse: true });
userSchema.index({ role: 1 });
userSchema.index({ wishlist: 1 });

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();
  delete user.password;
  delete user.passwordHash;
  return user;
};

export const User = mongoose.model('User', userSchema);
