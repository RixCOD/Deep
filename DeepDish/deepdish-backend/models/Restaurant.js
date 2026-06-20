const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true,
    },
    description: String,
    cuisines: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    priceRange: {
      type: String,
      enum: ['₹', '₹₹', '₹₹₹', '₹₹₹₹'],
      default: '₹₹',
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      latitude: Number,
      longitude: Number,
    },
    phone: String,
    email: String,
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    deliveryTime: {
      type: Number,
      default: 30,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },
    cuisineType: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Geospatial index for location-based queries
restaurantSchema.index({ 'address.latitude': 1, 'address.longitude': 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);
