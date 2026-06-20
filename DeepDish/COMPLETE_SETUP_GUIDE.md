# DeepDish Phase 1 - Complete Setup Guide

This guide will get your DeepDish website running locally with full backend and frontend integration over WiFi.

---

## 📋 Prerequisites

Before starting, you need:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (Community Edition) - [Download](https://www.mongodb.com/try/download/community)
3. **Git** (optional, for version control)
4. **Code Editor** (VS Code recommended)
5. **Postman** (optional, for testing API) - [Download](https://www.postman.com/downloads/)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Start MongoDB

**On Windows:**
```bash
# MongoDB should auto-start as a service if installed with default settings
# If not, open Command Prompt and run:
mongod --dbpath="C:\data\db"

# Or use MongoDB Compass GUI to verify MongoDB is running
```

**On Mac/Linux:**
```bash
brew services start mongodb-community
# Or
mongod
```

### Step 2: Start Backend

```bash
cd c:\DeepDish\deepdish-backend

# Install dependencies (first time only)
npm install

# Seed the database with sample restaurants
node seed.js

# Start the server
npm start
```

**Expected output:**
```
✓ MongoDB ✓ Connected successfully
✓ DeepDish API Server Running
  Host: 0.0.0.0
  Port: 5000
  Local: http://localhost:5000
```

### Step 3: Get Your Local Machine IP

**On Windows (Command Prompt):**
```bash
ipconfig
```
Look for "IPv4 Address" (usually `192.168.x.x`)

**On Mac/Linux:**
```bash
ifconfig
```
Look for "inet" address

### Step 4: Update Frontend .env

Edit `c:\DeepDish\deepdish-frontend\.env.local`:

```
VITE_API_URL=http://192.168.X.X:5000
```

Replace `192.168.X.X` with your actual machine IP.

### Step 5: Start Frontend

```bash
cd c:\DeepDish\deepdish-frontend

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

**Expected output:**
```
  VITE v8.0.12  local:   http://localhost:5173/
                network: http://192.168.X.X:5173/
```

---

## 🧪 Testing

### From Your Machine (Localhost)

Open browser: `http://localhost:5173/`

### From Another Device on WiFi

1. Get your machine's IP: `192.168.X.X`
2. On another device, open: `http://192.168.X.X:5173/`
3. Test signup/login with different devices!

### API Testing with Postman

#### 1. Register a User

```
POST http://192.168.X.X:5000/api/v1/auth/register

Body (JSON):
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": { ... }
  }
}
```

#### 2. Login

```
POST http://192.168.X.X:5000/api/v1/auth/login

Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Get All Restaurants

```
GET http://192.168.X.X:5000/api/v1/restaurants
```

#### 4. Search Restaurants

```
GET http://192.168.X.X:5000/api/v1/restaurants/search?q=pizza
```

#### 5. Get Restaurant Detail

```
GET http://192.168.X.X:5000/api/v1/restaurants/{restaurantId}
```

---

## 📁 Project Structure

```
deepdish-backend/
├── config/
│   ├── database.js          ← MongoDB connection
│   └── constants.js         ← API config & constants
├── models/
│   ├── User.js              ← User schema with auth
│   ├── Restaurant.js        ← Restaurant listings
│   ├── Menu.js              ← Restaurant menus
│   ├── Order.js             ← Order tracking
│   └── Review.js            ← Reviews
├── middleware/
│   ├── auth.js              ← JWT verification
│   └── errorHandler.js      ← Error handling
├── controllers/
│   ├── authController.js    ← Auth logic
│   └── restaurantController.js ← Restaurant logic
├── routes/
│   ├── auth.js              ← Auth endpoints
│   └── restaurants.js       ← Restaurant endpoints
├── server.js                ← Main entry point
├── seed.js                  ← Database seeding
├── .env                     ← Environment variables
└── package.json

deepdish-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx         ← Homepage with restaurant list
│   │   ├── Login.jsx        ← Login page (connected to backend)
│   │   ├── Signup.jsx       ← Signup page (connected to backend)
│   │   └── ...
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── RestaurantCard.jsx
│   │   └── ...
│   ├── services/
│   │   ├── apiClient.js     ← Axios instance with JWT
│   │   └── api.js           ← API endpoints wrapper
│   ├── AuthContext.jsx      ← Auth state management
│   ├── App.jsx              ← Route definitions
│   └── main.jsx
├── .env.local               ← Frontend config (API_URL)
└── package.json
```

---

## 🔑 Key Features Implemented

### Backend ✅
- **MongoDB Connection**: Local database accessible over WiFi
- **User Authentication**: JWT tokens with bcrypt password hashing
- **Restaurant Listings**: Search, filter, and detail endpoints
- **Menu System**: Dynamic menus with items, prices, categories
- **Database Seeding**: 8 sample restaurants with menus pre-loaded

### Frontend ✅
- **Auth Context**: Global state management for user sessions
- **Login/Signup Pages**: Connected to backend with validation
- **Restaurant Discovery**: Live data from MongoDB
- **Search Functionality**: Real-time restaurant search
- **Responsive Design**: TailwindCSS styling

---

## 🛠️ Common Issues & Fixes

### Issue: "MongoDB connection failed"
```
Solution:
1. Ensure MongoDB is running (check Services or Terminal)
2. Verify MONGODB_URI in .env: mongodb://127.0.0.1:27017/deepdish
3. On Windows, check: net start MongoDB
```

### Issue: "Cannot access from other devices"
```
Solution:
1. Verify backend is listening on 0.0.0.0 (not just localhost)
2. Update frontend .env.local with correct machine IP
3. Ensure both devices are on same WiFi network
4. Check Windows Firewall: Allow Node.js/npm through
```

### Issue: "API returns 401 Unauthorized"
```
Solution:
1. Token expired - Re-login
2. Token not sent - Check localStorage for token
3. Invalid JWT_SECRET - Regenerate and restart backend
```

### Issue: "CORS errors"
```
Solution:
Backend CORS is already configured for all origins:
app.use(cors({ origin: '*' }));
No action needed unless you want to restrict origins.
```

---

## 📝 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String,
  role: "customer" | "chef" | "admin",
  address: {
    street, city, state, zipCode, latitude, longitude
  },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Restaurants Collection
```javascript
{
  _id: ObjectId,
  name: String,
  cuisines: [String],
  rating: Number,
  priceRange: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹",
  image: String,
  address: { street, city, state, zipCode, latitude, longitude },
  deliveryTime: Number (minutes),
  deliveryFee: Number,
  minOrderValue: Number,
  createdAt: Date
}
```

### Menus Collection
```javascript
{
  _id: ObjectId,
  restaurant: ObjectId (ref: Restaurant),
  categories: [String],
  items: [
    {
      name: String,
      description: String,
      price: Number,
      category: String,
      isVeg: Boolean,
      preparationTime: Number
    }
  ],
  createdAt: Date
}
```

---

## 🔐 Authentication Flow

1. **Signup**: User creates account → Password hashed → JWT token generated → Stored in localStorage
2. **Login**: User enters email/password → Verified against database → JWT token created → Stored in localStorage
3. **Protected Routes**: Request includes `Authorization: Bearer {token}` → Backend validates → Allows access
4. **Token Refresh**: Expired token → Use refresh token → New token generated
5. **Logout**: Clear localStorage → Token invalidated

---

## 📞 API Endpoints Reference

### Authentication
- `POST /api/v1/auth/register` - Create new account
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout (protected)
- `POST /api/v1/auth/refresh-token` - Refresh JWT

### Restaurants
- `GET /api/v1/restaurants` - List all with pagination
- `GET /api/v1/restaurants/{id}` - Get detail with menu
- `GET /api/v1/restaurants/search?q=pizza` - Search restaurants
- `GET /api/v1/restaurants/city/{city}` - Filter by city

---

## 📋 Next Steps (Phase 2)

- [ ] Shopping cart persistence
- [ ] Checkout flow with Stripe/Razorpay
- [ ] Order creation and tracking
- [ ] Real-time order status (WebSockets)
- [ ] Reviews and ratings system
- [ ] User profile management
- [ ] Address management
- [ ] Favorite restaurants
- [ ] Push notifications
- [ ] Analytics dashboard

---

## 📞 Support

For issues or questions:
1. Check the "Common Issues & Fixes" section
2. Verify all environment variables
3. Check browser console for errors
4. Check backend server logs
5. Ensure MongoDB is running
6. Test API endpoints with Postman

---

## 🎉 You're All Set!

Your DeepDish website is now running! 🚀

- 🏠 Homepage: http://localhost:5173/
- 🔑 Login: http://localhost:5173/login
- 📝 Signup: http://localhost:5173/signup
- 🍽️ API Docs: See "API Endpoints Reference" above

Happy coding! 🍕
