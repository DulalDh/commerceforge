import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ name: 'text', slug: 'text' });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ createdAt: -1 });

export const Category = mongoose.model('Category', categorySchema);
