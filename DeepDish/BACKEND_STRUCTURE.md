# Backend Architecture Guide

## 📁 Directory Structure

```
deepdish-backend/
├── config/
│   ├── database.js              (MongoDB connection)
│   └── environment.js           (Environment variables)
│
├── controllers/
│   ├── authController.js        (Register, Login, Auth logic)
│   ├── restaurantController.js  (Restaurant CRUD & queries)
│   ├── menuController.js        (Menu management)
│   ├── orderController.js       (Order management)
│   ├── reviewController.js      (Review management)
│   └── paymentController.js     (Stripe/Razorpay)
│
├── middleware/
│   ├── auth.js                  (JWT verification)
│   ├── validation.js            (Input validation)
│   ├── errorHandler.js          (Error handling)
│   └── cors.js                  (CORS setup)
│
├── models/
│   ├── User.js                  (User schema)
│   ├── Restaurant.js            (Restaurant schema)
│   ├── Menu.js                  (Menu schema)
│   ├── Order.js                 (Order schema)
│   ├── Review.js                (Review schema)
│   └── index.js                 (Export all models)
│
├── routes/
│   ├── auth.js                  (Auth endpoints)
│   ├── restaurants.js           (Restaurant endpoints)
│   ├── menus.js                 (Menu endpoints)
│   ├── orders.js                (Order endpoints)
│   ├── reviews.js               (Review endpoints)
│   ├── payments.js              (Payment endpoints)
│   └── index.js                 (Main router)
│
├── utils/
│   ├── jwt.js                   (JWT helpers)
│   ├── password.js              (Password hashing)
│   └── validators.js            (Validation helpers)
│
├── .env                         (Environment variables)
├── .env.example                 (Example env file)
├── server.js                    (Express app entry point)
├── package.json
└── README.md
```

---

## 🔧 Implementation Order

### Step 1: Server Setup
Create `server.js`:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/restaurants', require('./routes/restaurants'));
app.use('/api/v1/menus', require('./routes/menus'));
app.use('/api/v1/orders', require('./routes/orders'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/payments', require('./routes/payments'));

// Error handling
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
```

### Step 2: Database Connection
Create `config/database.js`:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Step 3: User Model
Create `models/User.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true
  },
  phone: String,
  profilePic: String,
  role: {
    type: String,
    enum: ['customer', 'chef', 'admin', 'partner', 'delivery'],
    default: 'customer'
  },
  verified: {
    type: Boolean,
    default: false
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Step 4: Authentication Routes
Create `routes/auth.js`:
```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    
    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = new User({ email, password, name, phone });
    await user.save();
    
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
    
    res.json({
      message: 'Logged in successfully',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### Step 5: Auth Middleware
Create `middleware/auth.js`:
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
```

### Step 6: Restaurant Model
Create `models/Restaurant.js`:
```javascript
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: [String], // ['North Indian', 'Pizza']
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  phone: String,
  website: String,
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  photos: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  priceRange: {
    type: Number,
    enum: [1, 2, 3, 4], // ₹, ₹₹, ₹₹₹, ₹₹₹₹
    default: 2
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Geospatial index for location queries
restaurantSchema.index({ 'location': '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
```

### Step 7: Restaurant Routes
Create `routes/restaurants.js`:
```javascript
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

// Get all restaurants (with filters)
router.get('/', async (req, res) => {
  try {
    const { cuisine, priceRange, search, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (cuisine) filter.cuisine = cuisine;
    if (priceRange) filter.priceRange = priceRange;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const restaurants = await Restaurant.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('menu');
    
    const total = await Restaurant.countDocuments(filter);
    
    res.json({
      restaurants,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('menu');
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create restaurant (admin/partner only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, cuisine, address, phone, operatingHours } = req.body;
    
    const restaurant = new Restaurant({
      name,
      cuisine,
      address,
      phone,
      operatingHours,
      owner: req.userId
    });
    
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

---

## 🚀 Package Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.0.3",
    "cors": "^2.8.5",
    "stripe": "^12.0.0",
    "razorpay": "^2.8.0",
    "joi": "^17.9.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

Install with: `npm install`

---

## 🛠️ Development Workflow

1. **Start MongoDB** (local or cloud)
2. **Create `.env` file** with credentials
3. **Run backend**: `npm run dev`
4. **Backend should start** on http://localhost:5000
5. **Test endpoints** with Postman/curl
6. **Build frontend** next, connecting to this API

---

## 📝 Error Response Format

```javascript
{
  "message": "Error description",
  "status": 400,
  "error": "Detailed error info"
}
```

---

## ✅ Testing Endpoints

### Register User
```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "9876543210"
}
```

### Login
```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Restaurants
```bash
GET http://localhost:5000/api/v1/restaurants?cuisine=Pizza&page=1&limit=10
```

---

## 🔐 Security Best Practices

✅ Hash passwords with bcrypt
✅ Use JWT for authentication
✅ Validate all inputs
✅ Use environment variables for secrets
✅ Implement rate limiting
✅ Use HTTPS in production
✅ Add request logging
✅ Sanitize database queries

---

This structure is modular, scalable, and follows Express.js best practices!
