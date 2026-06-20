# DeepDish Project Setup Guide

## 🎯 Project Initialized

The DeepDish multi-platform food delivery system is ready for development!

### ✅ Current Status

**Existing:**
- ✅ `deepdish-backend/` - Express.js API with basic structure
  - Contains: config/, controllers/, middleware/, models/, routes/, server.js
  
- ✅ `deepdish-frontend/` - React.js website
  - Contains: src/, public/, vite.config.js
  - Has homepage component with search, restaurant cards, and promotions
  
- ✅ `App.js` - Homepage component reference

**To Be Created:**
- 📦 `deepdish-customer-app/` - React Native mobile app (Phase 2)
- 📦 `deepdish-chef-app/` - React Native chef management (Phase 3)  
- 📦 `deepdish-admin-app/` - React.js admin dashboard (Phase 4)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  DeepDish System                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Website (React.js)  │  Mobile Apps (React Native) │
│  Customer Web UI     │  - Customer App             │
│  Admin Dashboard     │  - Chef App                 │
│                      │  - Admin App (mobile)       │
│                                                     │
│  ↓ ↓ ↓ All connect via ↓ ↓ ↓                      │
│                                                     │
│         Express.js REST API (Node.js)               │
│         • Authentication (JWT/OAuth)                │
│         • Restaurant & Menu Management              │
│         • Orders & Order Tracking                   │
│         • Reviews & Ratings                         │
│         • Payments (Stripe/Razorpay)               │
│                                                     │
│              ↓ ↓ ↓                                  │
│                                                     │
│         MongoDB Database                            │
│         • users, restaurants, menus                 │
│         • orders, reviews, analytics                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📋 Next Actions

### 1️⃣ Backend (Node.js + Express)
Review and complete:
- [ ] Database connection (MongoDB)
- [ ] Models: User, Restaurant, Menu, Order, Review
- [ ] Auth routes: register, login, logout
- [ ] Restaurant routes: GET restaurants, GET restaurant/:id
- [ ] Menu routes
- [ ] Order routes: POST order, GET order status
- [ ] Payment integration
- [ ] Error handling & validation middleware

### 2️⃣ Frontend Website (React.js)
Build out:
- [ ] Homepage (already has hero section)
- [ ] Restaurant search & filter
- [ ] Restaurant detail page
- [ ] Authentication pages (login/signup)
- [ ] Shopping cart
- [ ] Checkout & payment flow
- [ ] Order tracking
- [ ] User profile & order history
- [ ] Review system

### 3️⃣ Customer Mobile App (React Native - Phase 2)
- [ ] App navigation structure
- [ ] Home screen with discovery
- [ ] Restaurant browsing & search
- [ ] Cart & checkout
- [ ] Real-time order tracking
- [ ] Push notifications setup
- [ ] Favorites & history

### 4️⃣ Chef App (React Native - Phase 3)
- [ ] App navigation
- [ ] Real-time order notifications
- [ ] Order management dashboard
- [ ] Status updates (accepted → cooking → ready)
- [ ] Menu management
- [ ] Daily summary

### 5️⃣ Admin Dashboard (React.js - Phase 4)
- [ ] Analytics dashboard
- [ ] Restaurant management (CRUD)
- [ ] Chef management
- [ ] User management
- [ ] Promotions & campaigns
- [ ] Reports & insights

---

## 🔧 Environment Setup

### Backend Environment Variables (.env)
```
MONGODB_URI=mongodb://localhost:27017/deepdish
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

RAZORPAY_KEY_ID=key_...
RAZORPAY_KEY_SECRET=secret_...

GOOGLE_MAPS_API_KEY=your_key_here
FIREBASE_CONFIG=...

NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173,http://localhost:8081
```

### Frontend Environment Variables (.env)
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_GOOGLE_MAPS_KEY=your_key_here
VITE_APP_NAME=DeepDish
```

---

## 🚀 Quick Start Commands

```bash
# Backend
cd deepdish-backend
npm install
npm run dev

# Frontend
cd deepdish-frontend
npm install
npm run dev

# Eventually: Customer App
cd deepdish-customer-app
npm install
npm start

# Eventually: Chef App
cd deepdish-chef-app
npm install
npm start
```

---

## 📊 Database Schema (MongoDB)

### Collections to Create:

**users**
```javascript
{
  _id, email, password, name, phone, 
  profilePic, location, address, 
  role: 'customer'|'chef'|'admin'|'partner'|'delivery',
  verified, createdAt, updatedAt
}
```

**restaurants**
```javascript
{
  _id, name, cuisine, description, rating, 
  totalReviews, priceRange, owner,
  address, location: {type, coordinates},
  phone, website, operatingHours,
  menu: [{...}], photos: [],
  verified, createdAt, updatedAt
}
```

**menus**
```javascript
{
  _id, restaurantId, categoryName,
  items: [{
    id, name, description, price,
    image, vegetarian, availability
  }],
  createdAt, updatedAt
}
```

**orders**
```javascript
{
  _id, customerId, restaurantId, 
  items: [{menuItemId, quantity, price}],
  totalPrice, status: 'pending'|'accepted'|'cooking'|'ready'|'out for delivery'|'delivered',
  address, paymentMethod, paymentStatus,
  estimatedDeliveryTime, actualDeliveryTime,
  deliveryPartnerId, reviews,
  createdAt, updatedAt
}
```

**reviews**
```javascript
{
  _id, userId, restaurantId, orderId,
  rating: 1-5, comment, photos: [],
  createdAt, updatedAt
}
```

---

## 🎨 Design System

### Colors
- Primary Red: `#EF4444` (red-500)
- Primary Orange: `#F97316` (orange-500)
- Secondary Dark: `#1F2937` (gray-800)
- Neutral Gray: `#F3F4F6` (gray-100)

### Typography
- Font: Inter / System Default
- Hero: Bold, 48-64px
- Heading: Bold, 24-32px
- Body: Regular, 14-16px

### Spacing
- Using Tailwind CSS grid: 4, 8, 16, 24, 32...

---

## ✨ Feature Roadmap

### MVP (Phase 1)
- [x] Homepage design
- [ ] Restaurant discovery & search
- [ ] Restaurant details
- [ ] Basic authentication
- [ ] Checkout & payment

### Phase 2 (Mobile)
- [ ] React Native app setup
- [ ] Order tracking
- [ ] Push notifications

### Phase 3 (Chef)
- [ ] Chef app setup
- [ ] Real-time order management
- [ ] WebSocket integration

### Phase 4 (Admin)
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Content management

### Future
- [ ] Loyalty program (DeepDish Prime)
- [ ] Delivery partner app
- [ ] Advanced analytics
- [ ] AI recommendations

---

## 📞 API Endpoints (To Be Implemented)

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh` - Refresh JWT token

### Restaurants
- `GET /api/v1/restaurants` - Get all with filters
- `GET /api/v1/restaurants/:id` - Get details
- `GET /api/v1/restaurants/:id/menu` - Get menu

### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/:id` - Get order details
- `GET /api/v1/orders` - Get user's orders
- `PUT /api/v1/orders/:id/status` - Update order status

### Reviews
- `POST /api/v1/reviews` - Create review
- `GET /api/v1/restaurants/:id/reviews` - Get reviews

### Payments
- `POST /api/v1/payments/create` - Create payment
- `POST /api/v1/payments/verify` - Verify payment

---

**Ready to start building!** 🚀
