import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Car name is required'], trim: true },
    brand: { type: String, required: [true, 'Brand is required'], trim: true, index: true },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] },
    engine: { type: String, required: [true, 'Engine specification is required'], trim: true }, // e.g. "5.2L V12"
    horsepower: { type: Number, required: [true, 'Horsepower is required'], min: [1, 'Horsepower must be at least 1'] },
    seats: { type: Number, required: [true, 'Seats count is required'], min: [1, 'Seats must be at least 1'] },
    image: { type: String, required: [true, 'Image URL is required'], trim: true },
    featured: { type: Boolean, default: false, index: true },
    description: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

// Indexes for high performance querying & sorting
carSchema.index({ price: 1 });
carSchema.index({ brand: 1, price: 1 });
carSchema.index({ featured: 1, price: 1 });

// Virtual: price formatted like "$214,000"
carSchema.virtual('priceLabel').get(function () {
  return '$' + Number(this.price || 0).toLocaleString('en-US');
});

carSchema.set('toJSON', { virtuals: true });
carSchema.set('toObject', { virtuals: true });

export default mongoose.model('Car', carSchema);
