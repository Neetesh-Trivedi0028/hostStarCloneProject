import mongoose from 'mongoose';
const ModeratorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    assignedStudios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Studio' }],
    isActive: { type: Boolean, default: true },
    performanceScore: { type: Number, default: 0 },
    reportsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin', // Admin ID if this moderator is under an Admin
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

export const Moderator = mongoose.model('Moderator', ModeratorSchema);
