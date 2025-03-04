import mongoose from 'mongoose';
const PayoutSchema = new mongoose.Schema(
  {
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Studio',
      required: true,
    },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
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

export const Payout = mongoose.model('Payout', PayoutSchema);
