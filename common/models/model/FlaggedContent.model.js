import mongoose from 'mongoose';
const FlaggedContentSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    reports: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reason: { type: String, required: true },
      },
    ],
    actionTaken: {
      type: String,
      enum: ['Removed', 'Restricted', 'Warned'],
      default: 'Pending',
    },
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

export const FlaggedContent = mongoose.model(
  'FlaggedContent',
  FlaggedContentSchema
);
