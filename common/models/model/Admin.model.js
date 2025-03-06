import mongoose from 'mongoose';
import { enums } from '../index.js';
import bcrypt from 'bcrypt';
const { Role } = enums;

// Admin Schema
const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    permissions: [
      {
        module: { type: String, required: true }, // e.g., 'userManagement', 'financeSettings'
        actions: [{ type: String }], // e.g., ['create', 'read', 'update', 'delete']
      },
    ],
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

AdminSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const saltRounds = parseInt(process.env.BCRYPT_ITERATIONS, 10) || 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
  } catch (e) {
    next(e);
  }
});

AdminSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return false;
  }
};

export const Admin = mongoose.model('Admin', AdminSchema);

/*

// ** Default Permissions based on Role **
AdminSchema.pre('save', function (next) {
  if (!this.permissions || this.permissions.length === 0) {
    if (this.role === 'super_admin') {
      this.permissions = [
        { module: 'all', actions: ['create', 'read', 'update', 'delete'] },
      ]; // Super Admin gets all permissions
    } else if (this.role === 'admin') {
      this.permissions = [
        { module: 'userManagement', actions: ['read', 'update', 'delete'] },
        { module: 'contentModeration', actions: ['read', 'update'] },
        { module: 'financeSettings', actions: ['read'] },
      ];
    } else if (this.role === 'moderator') {
      this.permissions = [
        { module: 'contentModeration', actions: ['read', 'update'] },
      ];
    }
  }
  next();
});
*/
