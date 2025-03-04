import mongoose from 'mongoose';
const RevenueSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Subscription', 'Ads', 'Commission'],
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
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

export const Revenue = mongoose.model('Revenue', RevenueSchema);
