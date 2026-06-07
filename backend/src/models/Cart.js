import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    variant: {
      size: { type: String, trim: true },
      color: { type: String, trim: true }
    },
    priceSnapshot: { type: Number, required: true, min: 0 }
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

cartSchema.index({ 'items.product': 1 });
cartSchema.index({ updatedAt: -1 });

export const Cart = mongoose.model('Cart', cartSchema);
