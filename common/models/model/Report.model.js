import mongoose from 'mongoose';
const ReportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
    id: false,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

export const Report = mongoose.model('Report', ReportSchema);
