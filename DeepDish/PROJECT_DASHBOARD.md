# 🍽️ DeepDish - Project Setup Complete ✅

## 📊 Project Overview

**DeepDish** is a multi-platform food discovery and delivery system with 4 integrated applications:

```
┌─────────────────────────────────────────────────────────────────┐
│                     🍽️ DeepDish Platform                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PHASE 1: WEBSITE          PHASE 2: CUSTOMER APP               │
│  React.js Customer Web     React Native Mobile                 │
│  ✅ Homepage Done          (Real-time tracking, notifications)  │
│  🔄 Features Building                                           │
│                            PHASE 3: CHEF APP                    │
│  PHASE 4: ADMIN            React Native Chef Mgmt              │
│  React.js Dashboard        (Order management, real-time)        │
│  (Analytics & Controls)                                         │
│                                                                 │
│           ↓ ↓ ↓ All Connect Via Shared API ↓ ↓ ↓             │
│                                                                 │
│              🔌 Express.js REST API (Node.js)                   │
│              ✅ Basic Setup Done                                │
│              🔄 Routes & Features Building                      │
│                                                                 │
│                     ↓ ↓ ↓                                       │
│                                                                 │
│                 🗄️ MongoDB Database                             │
│              (users, restaurants, menus, orders, reviews)       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
c:\DeepDish\
├── deepdish-backend/          ✅ Express.js API (Basic structure)
│   ├── config/                (Database, environment config)
│   ├── controllers/           (Business logic)
│   ├── middleware/            (Auth, validation, error handling)
│   ├── models/                (User, Restaurant, Order, etc.)
│   ├── routes/                (API endpoints)
│   └── server.js              (Express setup)
│
├── deepdish-frontend/         ✅ React.js Website (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── vite.config.js
│
├── deepdish-customer-app/     📦 Phase 2 (To Create)
│   └── React Native (Expo)
│
├── deepdish-chef-app/         📦 Phase 3 (To Create)
│   └── React Native (Expo)
│
├── deepdish-admin-app/        📦 Phase 4 (To Create)
│   └── React.js (Vite)
│
├── App.js                     ✅ Homepage component reference
├── README.md                  ✅ Main documentation
└── PROJECT_SETUP.md           ✅ Detailed setup guide
```

---

## 🎯 Quick Status

| Component | Status | Details |
|-----------|--------|---------|
| **Backend API** | 🟡 Setup | Express server structure ready, needs models & routes |
| **Website UI** | 🟢 Partial | Homepage & components done, needs full integration |
| **Database** | 🔴 Pending | MongoDB connection & models needed |
| **Authentication** | 🔴 Pending | JWT system needed |
| **Payment** | 🔴 Pending | Stripe/Razorpay integration needed |
| **Mobile App** | 🔴 Pending | Phase 2 - Not started |
| **Chef App** | 🔴 Pending | Phase 3 - Not started |
| **Admin Dashboard** | 🔴 Pending | Phase 4 - Not started |

### Legend
- 🟢 Complete
- 🟡 In Progress / Partially Done
- 🔴 Not Started
- 📦 Planned

---

## 🚀 Immediate Next Steps (Priority Order)

### 1️⃣ Backend Foundation (Critical Path)
```bash
cd deepdish-backend
npm install  # Ensure dependencies installed
```

**Tasks:**
- ✅ Set up MongoDB connection in `config/database.js`
- ✅ Create User model with schema
- ✅ Create Restaurant, Menu, Order models
- ✅ Implement JWT authentication middleware
- ✅ Create auth routes (register, login, logout)
- ✅ Create restaurant listing routes with filters

**Blockers:** MongoDB connection must be working first

---

### 2️⃣ Frontend Integration
```bash
cd deepdish-frontend
npm install  # Ensure dependencies installed
npm run dev   # Start dev server on localhost:5173
```

**Tasks:**
- ✅ Create API service layer (axios)
- ✅ Build login/signup pages
- ✅ Connect restaurant search to API
- ✅ Implement cart functionality
- ✅ Build checkout with payment

**Blockers:** Backend API endpoints must be ready

---

### 3️⃣ Payment Integration
- ✅ Add Stripe API keys to `.env`
- ✅ Implement Stripe payment endpoint
- ✅ Add Razorpay as alternative
- ✅ Payment verification logic

**Blockers:** Stripe/Razorpay accounts & keys needed

---

### 4️⃣ Phase 2-4: Mobile & Admin Apps
Will start after Phase 1 MVP is complete

---

## 🔧 Environment Setup Needed

### Backend `.env` (create in `deepdish-backend/.env`)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/deepdish
MONGODB_NAME=deepdish

# Authentication
JWT_SECRET=your_super_secret_key_min_32_characters
JWT_EXPIRE=7d
REFRESH_TOKEN_EXPIRE=30d

# Payment Gateway
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=key_...
RAZORPAY_KEY_SECRET=secret_...

# External APIs
GOOGLE_MAPS_API_KEY=...
FIREBASE_CONFIG=...

# Server
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173,http://localhost:8081

# Email (for notifications)
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASS=
```

### Frontend `.env` (create in `deepdish-frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_GOOGLE_MAPS_KEY=...
VITE_APP_NAME=DeepDish
VITE_APP_VERSION=1.0.0
```

---

## 📊 MongoDB Collections Schema

### users
```javascript
{
  _id: ObjectId,
  email: String,           // unique, indexed
  password: String,        // hashed with bcrypt
  name: String,
  phone: String,
  profilePic: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {type: "Point", coordinates: [lng, lat]}
  },
  role: String,           // 'customer', 'chef', 'admin', 'partner', 'delivery'
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### restaurants
```javascript
{
  _id: ObjectId,
  name: String,
  cuisine: [String],        // ['North Indian', 'Pizza']
  description: String,
  owner: ObjectId,          // ref to User
  address: String,
  location: {type: "Point", coordinates: [lng, lat]},
  phone: String,
  website: String,
  operatingHours: {
    monday: {open: "10:00", close: "22:00"},
    // ...
  },
  menu: [ObjectId],         // ref to Menu
  photos: [String],         // URLs
  rating: Number,           // avg rating
  totalReviews: Number,
  priceRange: Number,       // 1-4 (₹, ₹₹, ₹₹₹, ₹₹₹₹)
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### menus
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId,   // ref to Restaurant
  categoryName: String,     // 'Appetizers', 'Main Course'
  items: [{
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String,
    vegetarian: Boolean,
    availability: Boolean,
    spiceLevel: Number      // 0-5
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### orders
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,     // ref to User
  restaurantId: ObjectId,   // ref to Restaurant
  items: [{
    menuItemId: ObjectId,
    name: String,
    quantity: Number,
    price: Number,
    specialInstructions: String
  }],
  totalPrice: Number,
  tax: Number,
  deliveryFee: Number,
  status: String,           // 'pending', 'accepted', 'cooking', 'ready', 'out for delivery', 'delivered', 'cancelled'
  paymentMethod: String,    // 'card', 'upi', 'wallet'
  paymentStatus: String,    // 'pending', 'completed', 'failed'
  address: {
    street: String,
    city: String,
    coordinates: [lng, lat]
  },
  deliveryPartnerId: ObjectId,  // ref to User
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  notes: String,
  rating: Number,           // 1-5 (if reviewed)
  createdAt: Date,
  updatedAt: Date
}
```

### reviews
```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // ref to User
  restaurantId: ObjectId,   // ref to Restaurant
  orderId: ObjectId,        // ref to Order
  rating: Number,           // 1-5
  comment: String,
  photos: [String],         // URLs
  helpful: Number,          // upvotes
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Design System (Already Configured)

### Brand Colors
```css
/* Primary */
--primary-red: #EF4444;      /* rgb(239, 68, 68) */
--primary-orange: #F97316;   /* rgb(249, 115, 22) */

/* Secondary */
--dark-gray: #1F2937;        /* rgb(31, 41, 55) */
--neutral-gray: #F3F4F6;     /* rgb(243, 244, 246) */

/* Status */
--success: #10B981;          /* green-500 */
--warning: #F59E0B;          /* amber-500 */
--error: #EF4444;            /* red-500 */
```

### Typography
- **Font Family:** Inter, system sans-serif
- **Hero Heading:** Bold, 48-64px
- **Page Heading:** Bold, 32px
- **Section Heading:** Bold, 24px
- **Body:** Regular, 14-16px
- **Small:** Regular, 12px

### Spacing (Tailwind Scale)
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px...
```

### Icons Library
- **lucide-react** already in use
- Common: Search, MapPin, Star, ChevronRight, Utensils, Award, Truck, QrCode

---

## 📞 Key API Endpoints (To Be Implemented)

### Authentication
```
POST   /api/v1/auth/register           Create user account
POST   /api/v1/auth/login              Login user
POST   /api/v1/auth/logout             Logout user
POST   /api/v1/auth/refresh-token      Refresh JWT token
POST   /api/v1/auth/verify-email       Verify email
```

### Restaurants
```
GET    /api/v1/restaurants             Get all restaurants (filters, pagination)
GET    /api/v1/restaurants/:id         Get restaurant details
GET    /api/v1/restaurants/:id/menu    Get restaurant menu
POST   /api/v1/restaurants             Create restaurant (admin)
PUT    /api/v1/restaurants/:id         Update restaurant (admin)
DELETE /api/v1/restaurants/:id         Delete restaurant (admin)
```

### Menus
```
GET    /api/v1/menus/:restaurantId     Get menu items
POST   /api/v1/menus                   Create menu (admin)
PUT    /api/v1/menus/:id/items/:itemId Update menu item
```

### Orders
```
POST   /api/v1/orders                  Create order
GET    /api/v1/orders                  Get user's orders
GET    /api/v1/orders/:id              Get order details
PUT    /api/v1/orders/:id/status       Update order status (chef/admin)
PUT    /api/v1/orders/:id/cancel       Cancel order
```

### Reviews
```
POST   /api/v1/reviews                 Create review
GET    /api/v1/restaurants/:id/reviews Get restaurant reviews
PUT    /api/v1/reviews/:id             Update review
DELETE /api/v1/reviews/:id             Delete review
```

### Payments
```
POST   /api/v1/payments/stripe/create  Create Stripe payment intent
POST   /api/v1/payments/stripe/verify  Verify Stripe payment
POST   /api/v1/payments/razorpay/create Create Razorpay order
POST   /api/v1/payments/razorpay/verify Verify Razorpay payment
```

---

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for models & controllers
- Integration tests for API endpoints
- Payment gateway mocking

### Frontend Testing
- Component testing (React Testing Library)
- Integration tests with mock API
- E2E tests for user flows

### Mobile Testing
- Platform-specific testing (iOS/Android)
- Real device testing

---

## 📈 Development Milestones

### MVP (Phase 1) - Weeks 1-4
- [ ] Week 1: Backend models & authentication
- [ ] Week 2: Backend API routes
- [ ] Week 3: Frontend authentication & search
- [ ] Week 4: Checkout & payment integration

### Phase 2 - Weeks 5-6
- [ ] React Native setup
- [ ] Core mobile features
- [ ] Real-time tracking

### Phase 3 - Week 7
- [ ] Chef app setup
- [ ] Order management

### Phase 4 - Week 8
- [ ] Admin dashboard
- [ ] Analytics & controls

### Launch - Week 9+
- [ ] Performance optimization
- [ ] Security review
- [ ] Testing & bugfixes
- [ ] Production deployment

---

## ✨ Feature Highlights

### Customer Website
✅ Search & discovery
✅ Restaurant browsing
✅ Real-time menu
✅ Secure checkout
✅ Order tracking
✅ Reviews & ratings
✅ Payment options (Stripe/Razorpay)

### Customer Mobile
✅ All website features
✅ Push notifications
✅ Favorites
✅ Order history
✅ Real-time tracking

### Chef App
✅ Live order notifications
✅ Order management
✅ Menu management
✅ Daily reports
✅ Chat support

### Admin Dashboard
✅ Sales analytics
✅ Active orders
✅ Restaurant management
✅ Chef management
✅ Promotions
✅ User management
✅ Reports & exports

---

## 🎓 Learning Resources

- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/
- React.js: https://react.dev/
- React Native: https://reactnative.dev/
- JWT Auth: https://jwt.io/
- Stripe Docs: https://stripe.com/docs
- TailwindCSS: https://tailwindcss.com/

---

## 🤝 Team Structure (Future)

- **Backend Developers** (1-2): API, database, payments
- **Frontend Developers** (1-2): Website UI, integration
- **Mobile Developers** (1-2): React Native apps
- **DevOps/Deployment** (1): Infrastructure, hosting
- **QA/Testing** (1): Testing, bug tracking

---

## 📞 Support & Documentation

All documentation is in:
- `README.md` - Project overview
- `PROJECT_SETUP.md` - Detailed setup
- `plan.md` - Development roadmap (session workspace)

---

**🚀 Ready to start building DeepDish! Begin with Backend Foundation tasks.**

Last Updated: 2026-05-28
