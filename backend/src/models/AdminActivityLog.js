import mongoose from 'mongoose';

const adminActivityLogSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    method: { type: String, required: true },
    path: { type: String, required: true },
    statusCode: { type: Number, required: true },
    ip: { type: String },
    userAgent: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

adminActivityLogSchema.index({ createdAt: -1 });
adminActivityLogSchema.index({ method: 1, path: 1 });

export const AdminActivityLog = mongoose.model('AdminActivityLog', adminActivityLogSchema);
