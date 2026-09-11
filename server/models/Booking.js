import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    model: { type: String, default: '', trim: true },
    message: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: {
        values: ['pending', 'contacted', 'completed'],
        message: '{VALUE} is not a supported status',
      },
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

// High-traffic index for admin dashboard pipeline and recent enquiries
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Booking', bookingSchema);
