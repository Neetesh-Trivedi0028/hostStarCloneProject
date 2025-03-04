import mongoose from 'mongoose';
const ContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['Movie', 'Series', 'Show', 'Live Stream'],
      required: true,
    },
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Studio',
      required: true,
    },
    status: {
      type: String,
      enum: ['Approved', 'Pending', 'Flagged'],
      default: 'Pending',
    },
    flaggedReports: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reason: { type: String },
      },
    ],
    genres: [{ type: String }],
    tags: [{ type: String }],
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

export const Content = mongoose.model('Content', ContentSchema);
