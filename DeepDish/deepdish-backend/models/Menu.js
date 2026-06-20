const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  category: String,
  isVeg: Boolean,
  isActive: {
    type: Boolean,
    default: true,
  },
  preparationTime: Number,
});

const menuSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    items: [menuItemSchema],
    categories: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);
