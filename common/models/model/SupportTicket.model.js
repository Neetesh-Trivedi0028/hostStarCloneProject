import mongoose from 'mongoose';
const SupportTicketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issue: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    resolutionTime: { type: Number },
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

export const SupportTicket = mongoose.model(
  'SupportTicket',
  SupportTicketSchema
);
