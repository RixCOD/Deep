# DeepDish - Multi-Platform Food Discovery & Delivery

A comprehensive food discovery and delivery platform built with React, Node.js, and MongoDB.

## 📁 Project Structure

```
DeepDish/
├── deepdish-backend/          # Shared REST API (Express.js + MongoDB)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── deepdish-frontend/         # Phase 1: Customer Website (React.js)
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── deepdish-customer-app/     # Phase 2: Mobile App (React Native)
│   ├── src/
│   ├── app.json
│   └── package.json
│
├── deepdish-chef-app/         # Phase 3: Chef Management (React Native)
│   ├── src/
│   ├── app.json
│   └── package.json
│
└── deepdish-admin-app/        # Phase 4: Admin Dashboard (React.js)
    ├── src/
    ├── public/
    ├── vite.config.js
    └── package.json
```

## 🚀 Phases

### Phase 1: Website (React.js + Node.js + MongoDB)
- Homepage with search and discovery
- Restaurant listings with filters
- Restaurant detail pages with menus & reviews
- JWT authentication
- Stripe/Razorpay payment integration
- **Status:** ✅ **COMPLETE - MVP Ready**

### Phase 2: Customer App (React Native)
- Cross-platform mobile app (iOS/Android)
- Real-time order tracking
- Push notifications
- Favorites & order history
- **Status:** Pending

### Phase 3: Chef App (React Native)
- Order management for chefs
- Real-time order updates (WebSockets)
- Menu availability management
- Order fulfillment tracking
- **Status:** Pending

### Phase 4: Admin App (React.js/React Native)
- Analytics dashboard
- Restaurant & chef management
- Promotions & discounts
- User management
- **Status:** Pending

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, React Native, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT, OAuth |
| **Payments** | Stripe, Razorpay |
| **Hosting** | Vercel (frontend), Render/AWS (backend) |
| **Real-time** | WebSockets, Firebase Cloud Messaging |

## 📦 MongoDB Collections

```
users
├── id, email, password, name, phone, location
├── role (customer, chef, admin, partner)
└── verified, createdAt

restaurants
├── id, name, cuisine, rating, priceRange
├── owner, address, location (geo)
├── menu (array), photos, reviews
└── operatingHours

menus
├── restaurantId, items
├── item: {name, description, price, availability}
└── categories

orders
├── id, customerId, restaurantId, items
├── totalPrice, status, orderTime, deliveryTime
├── address, paymentMethod
└── deliveryPartnerId

reviews
├── id, userId, restaurantId, rating, comment
└── createdAt

admin_analytics
├── totalRevenue, activeOrders, topRestaurants
└── dailyMetrics
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn
- Expo CLI (for React Native)

### Backend Setup
```bash
cd deepdish-backend
npm install
npm run dev  # Starts on http://localhost:5000
```

### Frontend Setup
```bash
cd deepdish-frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

## 🔄 API Architecture

All apps connect via shared REST APIs:
```
Frontend/Mobile Apps → Express API → MongoDB
```

### Core Endpoints (to be implemented)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/restaurants` - Get restaurants with filters
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order status
- `POST /api/reviews` - Submit review

## 📱 Environment Variables

Create `.env` files in both backend and frontend:

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/deepdish
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_key
RAZORPAY_KEY=your_razorpay_key
NODE_ENV=development
PORT=5000
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_KEY=your_stripe_public_key
```

## 🎯 Next Steps

1. ✅ Initialize backend with Express.js
2. ✅ Set up MongoDB connection
3. ✅ Create authentication middleware
4. ✅ Build API routes for Phase 1
5. ✅ Implement payment integration
6. ⏳ Phase 2: Customer mobile app
7. ⏳ Phase 3: Chef management app
8. ⏳ Phase 4: Admin dashboard

## 📄 License

DeepDish © 2026. All rights reserved.
