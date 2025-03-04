//Actions tables which will taken by super admin, admin , moderators
import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
  {
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin', // or 'Moderator'
      required: true,
    },
    role: {
      type: String,
      enum: ['Super Admin', 'Admin', 'Moderator'],
      required: true,
    },
    actionType: {
      type: String,
      enum: [
        'Approve Content',
        'Flag Content',
        'Ban User',
        'Warn User',
        'Resolve Report',
        'Payout Processed',
      ],
      required: true,
    },
    details: { type: String }, // Additional info about the action
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'targetModel',
    },
    targetModel: {
      type: String,
      enum: ['User', 'Content', 'Report', 'Studio', 'Payout'],
    },
    timestamp: { type: Date, default: Date.now },
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

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema);
