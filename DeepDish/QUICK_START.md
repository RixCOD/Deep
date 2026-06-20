# 🚀 Quick Start Guide - DeepDish Website MVP

## 60-Second Setup (if you have Node.js & MongoDB already)

### Terminal 1 - Backend
```bash
cd deepdish-backend
npm install
node seed.js
npm start
```

### Terminal 2 - Frontend  
```bash
cd deepdish-frontend
npm install
npm run dev
```

### Browser
Open: **http://localhost:5173**

---

## What's Ready to Use

✅ **Backend API** running on `http://localhost:5000`
✅ **Frontend Website** running on `http://localhost:5173`
✅ **10+ API Endpoints** for auth, restaurants, orders, reviews
✅ **6 Frontend Pages**: Home, Login, Signup, Restaurant Detail, Checkout, Orders
✅ **Full Authentication** with JWT and refresh tokens
✅ **Shopping Cart** with add/remove/update quantity
✅ **Order Management** - Create, track, cancel orders
✅ **Reviews System** - Rate and review restaurants
✅ **Sample Data** - 9 restaurants, 50+ menu items pre-seeded

---

## Test Account

After running seed.js:
- **Email**: test@example.com
- **Password**: Test@123

---

## Key Files Changed/Created

### Backend
- ✨ `controllers/orderController.js` - Order CRUD operations
- ✨ `controllers/reviewController.js` - Review management
- ✨ `routes/orders.js` - Order API routes
- ✨ `routes/reviews.js` - Review API routes
- 📝 `server.js` - Updated with new routes

### Frontend
- ✨ `pages/RestaurantDetail.jsx` - Menu browsing and cart
- ✨ `pages/Checkout.jsx` - Order placement with delivery options
- ✨ `pages/OrderHistory.jsx` - Track and manage orders
- 📝 `App.jsx` - Updated with new routes
- 📝 `services/api.js` - Added order and review services

### Documentation
- 📖 `DEPLOYMENT_GUIDE.md` - Full setup and deployment guide
- 📖 `QUICK_START.md` - This file

---

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads on http://localhost:5173
- [ ] Can create new account (Signup)
- [ ] Can login with test@example.com / Test@123
- [ ] Homepage loads restaurants
- [ ] Can search restaurants
- [ ] Can click restaurant and see menu
- [ ] Can add items to cart
- [ ] Can proceed to checkout
- [ ] Can see order in Order History
- [ ] Can see reviews section

---

## Useful Commands

```bash
# Backend
npm start          # Start server
npm run dev        # Start with nodemon (hot reload)
node seed.js       # Populate database

# Frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build

# Database
mongod             # Start MongoDB
mongosh            # Connect to MongoDB CLI
```

---

## API Endpoints (Quick Reference)

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/restaurants
GET    /api/v1/restaurants/:id
POST   /api/v1/orders (auth required)
GET    /api/v1/orders (auth required)
POST   /api/v1/reviews (auth required)
GET    /api/v1/reviews/restaurant/:restaurantId
```

---

## Common Issues & Fixes

**Port 5000 already in use?**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**MongoDB not running?**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**VITE_API_URL not set?**
Create `.env.local` in frontend folder:
```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## What's Included vs. What's Not

### ✅ Included
- User authentication
- Restaurant search & filtering
- Menu browsing
- Shopping cart
- Order placement
- Order tracking
- Reviews system
- Responsive design
- Error handling

### ⏳ Not Yet Included (Next Phase)
- Payment gateway (Stripe/Razorpay)
- Real-time order tracking (WebSockets)
- Delivery tracking
- Chat with support
- Loyalty program
- Admin dashboard
- Chef app
- Customer mobile app

---

## Next Steps

1. **Test locally** - Run both servers and test all features
2. **Test on WiFi** - Use DEPLOYMENT_GUIDE.md for network setup
3. **Add payments** - Integrate Stripe or Razorpay
4. **Deploy** - Push to Vercel/Render
5. **Mobile** - Build React Native apps

---

**Ready to build food delivery? You're all set! 🎉**
