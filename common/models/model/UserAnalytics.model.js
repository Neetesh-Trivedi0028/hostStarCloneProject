import mongoose from 'mongoose';
const UserAnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    watchHours: { type: Number, default: 0 },
    favoriteGenres: [{ type: String }],
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

export const UserAnalytics = mongoose.model(
  'UserAnalytics',
  UserAnalyticsSchema
);
