import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscriptionStatus: {
      type: String,
      enum: ['Free', 'Premium', 'Cancelled'],
      default: 'Free',
    },
    watchHistory: [
      {
        contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
        watchedAt: { type: Date },
      },
    ],
    isBanned: { type: Boolean, default: false },
    banReason: { type: String },
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

export const User = mongoose.model('User', UserSchema);
