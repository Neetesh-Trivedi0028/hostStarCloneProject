import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const TestSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

TestSchema.pre('save', async function (next) {
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

TestSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (e) {
    return false;
  }
};

export const Test = mongoose.model('Test', TestSchema);
