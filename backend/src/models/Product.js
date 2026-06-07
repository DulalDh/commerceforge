import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    isApproved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, trim: true },
    color: { type: String, trim: true },
    sku: { type: String, trim: true },
    price: { type: Number, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stock: { type: Number, min: 0, default: 0 },
    images: [{ type: String, trim: true }]
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    shortDescription: { type: String, trim: true, maxlength: 300 },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    category: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      index: true
    },
    brand: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: [{ type: String, trim: true }],
    variants: [variantSchema],
    ratings: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, min: 0, default: 0 }
    },
    reviews: [reviewSchema],
    tags: [{ type: String, trim: true, lowercase: true }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ name: 'text', description: 'text', shortDescription: 'text', brand: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ brand: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ stock: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });

export const Product = mongoose.model('Product', productSchema);
