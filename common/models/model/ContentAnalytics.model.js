import mongoose from 'mongoose';
const ContentAnalyticsSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    views: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
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

export const ContentAnalytics = mongoose.model(
  'ContentAnalytics',
  ContentAnalyticsSchema
);
