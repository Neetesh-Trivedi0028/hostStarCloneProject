import mongoose from 'mongoose';

// Admin Schema
const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Super Admin', 'Admin'], required: true },
    permissions: [{ type: String }],
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    reportsTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // References Super Admin(s) if this admin is under them
      },
    ],
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

export const Admin = mongoose.model('Admin', AdminSchema);
