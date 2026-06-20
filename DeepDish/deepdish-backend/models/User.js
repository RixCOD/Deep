const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: [/^\+?\d[\d\s]{7,15}\d$/, 'Please provide a valid phone number'],
    },
    role: {
      type: String,
      enum: ['customer', 'chef', 'admin', 'delivery'],
      default: 'customer',
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      latitude: Number,
      longitude: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profileImage: String,
    refreshToken: String,
    // Password Reset OTP
    resetOTP: String,
    resetOTPExpiry: Date,
    // 2FA Fields
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorOTP: String,
    twoFactorOTPExpiry: Date,
    twoFactorVerified: {
      type: Boolean,
      default: false,
    },
    // Discounts
    discounts: [
      {
        amount: Number,
        percentage: Number,
        description: String,
        createdAt: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Method to get safe user data (without password)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
};

module.exports = mongoose.model('User', userSchema);