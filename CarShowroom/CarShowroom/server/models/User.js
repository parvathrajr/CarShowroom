import mongoose from 'mongoose';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
      index: true,
    },
  },
  { timestamps: true }
);

// Static helper to hash a plain password
userSchema.statics.hashPassword = function (password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

// Instance method to verify password
userSchema.methods.verifyPassword = function (password) {
  const [salt, key] = (this.passwordHash || '').split(':');
  if (!salt || !key) return false;
  const hashBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  return timingSafeEqual(hashBuffer, keyBuffer);
};

// Sanitize user object for JSON response (exclude passwordHash)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export default mongoose.model('User', userSchema);
