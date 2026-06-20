# 🚀 DeepDish Website MVP - Complete Setup & Deployment Guide

## Overview

Your complete food delivery website is now ready! This MVP includes:
- ✅ **Backend**: Node.js + Express + MongoDB with full REST APIs
- ✅ **Frontend**: React.js + Vite + TailwindCSS with modern UI
- ✅ **Authentication**: JWT-based secure login/signup
- ✅ **Restaurant Discovery**: Search, filter, and browse restaurants
- ✅ **Orders System**: Create, track, and manage orders
- ✅ **Reviews System**: Rate and review restaurants
- ✅ **Cart Management**: Add items, adjust quantities, checkout

---

## 📋 Project Structure

```
deepdish-backend/
├── config/
│   ├── database.js (MongoDB connection)
│   └── constants.js (API constants)
├── models/
│   ├── User.js (users)
│   ├── Restaurant.js (restaurants)
│   ├── Menu.js (menu items)
│   ├── Order.js (orders)
│   └── Review.js (reviews)
├── controllers/
│   ├── authController.js (auth logic)
│   ├── restaurantController.js (restaurant logic)
│   ├── orderController.js (order logic)
│   └── reviewController.js (review logic)
├── routes/
│   ├── auth.js
│   ├── restaurants.js
│   ├── orders.js
│   └── reviews.js
├── middleware/
│   ├── auth.js (JWT verification)
│   └── errorHandler.js
├── server.js (main server)
├── seed.js (sample data)
└── package.json

deepdish-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx (homepage with restaurant listing)
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── RestaurantDetail.jsx (menu, reviews, cart)
│   │   ├── Checkout.jsx (order placement)
│   │   └── OrderHistory.jsx (order tracking)
│   ├── services/
│   │   ├── apiClient.js (axios config)
│   │   └── api.js (API endpoints)
│   ├── AuthContext.jsx (global auth state)
│   ├── App.jsx (router)
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

---

## 🔧 Prerequisites

### Required Software
- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **MongoDB Community** - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn**

### Optional (for mobile testing)
- Same WiFi network as your development machine
- Mobile browser or Postman app

---

## 📦 Installation & Setup

### Step 1: Install MongoDB

#### Windows
1. Download MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the steps
3. MongoDB will start automatically as a service
4. Verify it's running: `mongod --version`

#### macOS (Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update
apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd deepdish-backend

# Install dependencies
npm install

# Create .env file (optional - defaults are provided)
# MONGODB_URI=mongodb://127.0.0.1:27017/deepdish
# JWT_SECRET=your_jwt_secret_key
# NODE_ENV=development
# API_PORT=5000
# API_HOST=0.0.0.0

# Seed sample restaurants and menus
node seed.js

# Start the backend server
npm start
```

**Expected Output:**
```
✓ DeepDish API Server Running
  Host: 0.0.0.0
  Port: 5000
  Local: http://localhost:5000
  Network: http://<your-machine-ip>:5000
```

### Step 3: Setup Frontend

```bash
# Navigate to frontend directory
cd deepdish-frontend

# Install dependencies
npm install

# Create .env.local file
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env.local

# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v8.0.12  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🌐 Local Testing (Single Device)

1. **Backend**: http://localhost:5000
2. **Frontend**: http://localhost:5173
3. **MongoDB**: mongodb://localhost:27017/deepdish

### Quick Test Flow
1. Open http://localhost:5173 in browser
2. Click "Sign Up" and create account
3. Login with your credentials
4. Browse restaurants on homepage
5. Click restaurant to view menu
6. Add items to cart
7. Checkout and place order
8. View order in "Your Orders"

---

## 🔌 WiFi Testing (Multiple Devices)

### Step 1: Get Your Machine IP

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" (usually 192.168.x.x or 10.x.x.x)

**macOS/Linux:**
```bash
ifconfig
```
Look for "inet" address

### Step 2: Update Frontend .env.local

Replace `VITE_API_URL` with your machine IP:
```
VITE_API_URL=http://192.168.1.100:5000/api/v1
```
(Replace 192.168.1.100 with your actual IP)

### Step 3: Configure MongoDB for Network Access (Windows)

1. Open MongoDB config file: `C:\Program Files\MongoDB\Server\6.0\mongod.cfg`
2. Find the `net:` section and update:
```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
```
3. Restart MongoDB service

### Step 4: Configure Firewall (Windows)

1. Open **Windows Defender Firewall with Advanced Security**
2. Click **Inbound Rules** → **New Rule**
3. Port rule → Next
4. TCP, Port: 5000 → Next
5. Allow connection → Next → Finish
6. Repeat for Port 27017 (MongoDB) if needed

### Step 5: Test from Another Device

On mobile/other computer on same WiFi:
```
Frontend: http://192.168.1.100:5173
API: http://192.168.1.100:5000/api/v1
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout (requires token)
- `POST /api/v1/auth/refresh-token` - Refresh JWT

### Restaurants
- `GET /api/v1/restaurants?page=1&limit=10` - List restaurants
- `GET /api/v1/restaurants/search?q=pizza` - Search restaurants
- `GET /api/v1/restaurants/:id` - Get restaurant details + menu

### Orders
- `POST /api/v1/orders` - Create order (requires auth)
- `GET /api/v1/orders` - Get user's orders (requires auth)
- `GET /api/v1/orders/:id` - Get order details (requires auth)
- `PUT /api/v1/orders/:id/status` - Update order status
- `PUT /api/v1/orders/:id/cancel` - Cancel order

### Reviews
- `POST /api/v1/reviews` - Create review (requires auth)
- `GET /api/v1/reviews/restaurant/:restaurantId` - Get restaurant reviews
- `PUT /api/v1/reviews/:id` - Update review (requires auth)
- `DELETE /api/v1/reviews/:id` - Delete review (requires auth)

---

## 🎨 Frontend Pages & Features

### Home Page (`/`)
- Search bar for restaurants and cuisines
- Restaurant cards with ratings, cuisines, prices
- Click restaurant to view details
- Login/Signup buttons if not authenticated

### Restaurant Detail (`/restaurant/:id`)
- Restaurant header with rating and info
- Menu items organized by category
- Add to cart functionality
- Shopping cart sidebar
- Reviews section with submission form
- Restaurant info tab

### Checkout (`/checkout/:restaurantId`)
- Delivery address entry
- Phone number
- Delivery time options (Express/Standard)
- Payment method (COD, Prime)
- Order summary
- Place order button

### Order History (`/orders`)
- Filter orders by status
- View order details
- Track order status in real-time
- Cancel pending orders
- Reorder from delivered restaurants

### Login/Signup
- Email-based authentication
- Password validation
- JWT token management
- Auto-redirect to home on success

---

## 🗄️ Database

### Collections

#### Users
```javascript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  role: "customer|chef|admin",
  createdAt: Date,
  updatedAt: Date,
  refreshToken: string
}
```

#### Restaurants
```javascript
{
  _id: ObjectId,
  name: string,
  address: string,
  phone: string,
  email: string,
  cuisines: [string],
  priceRange: string,
  rating: number,
  deliveryTime: number,
  image: string,
  menu: [ObjectId], // refs to Menu
  createdAt: Date
}
```

#### Menu Items
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId,
  name: string,
  description: string,
  category: string,
  price: number,
  image: string,
  availability: boolean,
  createdAt: Date
}
```

#### Orders
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  restaurantId: ObjectId,
  items: [{
    menuItemId: ObjectId,
    name: string,
    price: number,
    quantity: number
  }],
  totalPrice: number,
  deliveryAddress: string,
  deliveryTime: Date,
  status: string, // pending|confirmed|preparing|ready|out_for_delivery|delivered|cancelled
  paymentMethod: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Reviews
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  restaurantId: ObjectId,
  rating: number, // 1-5
  comment: string,
  images: [string],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

- ✅ **Passwords**: Hashed with bcryptjs
- ✅ **Authentication**: JWT tokens with 24-hour expiry
- ✅ **Refresh Tokens**: Extended sessions without re-login
- ✅ **Protected Routes**: Auth middleware on protected endpoints
- ✅ **CORS**: Configured for local development
- ✅ **Error Handling**: Standardized error responses

### For Production:

1. **Update CORS**:
```javascript
app.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true
}));
```

2. **Environment Variables**:
```
NODE_ENV=production
JWT_SECRET=very_secure_random_string_32_chars_min
MONGODB_URI=production_mongodb_connection_string
```

3. **Use HTTPS** with Let's Encrypt
4. **Add Rate Limiting**
5. **Input Validation** with libraries like `joi` or `yup`
6. **Database Backups** scheduled daily

---

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)

**Frontend (Vercel):**
1. Push code to GitHub
2. Connect Vercel to GitHub repo
3. Set `VITE_API_URL` to your Render backend URL
4. Deploy

**Backend (Render):**
1. Push backend code to GitHub
2. Connect Render to repository
3. Set environment variables
4. Deploy

### Option 2: Railway

- Simple GitHub integration
- Automatic deployments
- Built-in MongoDB database option
- Custom domains

### Option 3: Self-Hosted (VPS)

Use DigitalOcean, Linode, or AWS EC2:
1. Install Node.js and MongoDB
2. Clone repository
3. Run with PM2 for process management
4. Use Nginx as reverse proxy

---

## 📱 Mobile App (Phase 2)

After website is stable, build React Native apps:
- **deepdish-customer-app** - Customer mobile ordering
- **deepdish-chef-app** - Chef order management
- **deepdish-admin-app** - Admin dashboard

Same backend APIs work for all platforms!

---

## 🐛 Troubleshooting

### MongoDB Connection Fails
```
[MongoDB] Connection failed: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Kill process using port or change port in constants.js
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: 
- Ensure `VITE_API_URL` matches your backend URL
- Check backend CORS configuration
- Clear browser cache

### Cannot Login
- Check MongoDB has seeded users
- Verify JWT_SECRET is set
- Check browser console for errors

---

## 📊 Sample Test Data

After running `npm seed.js`, database includes:
- **9 Restaurants**: Pizza, Burger, Sushi, Biryani, Chinese, Indian, Dessert, Cafe, BBQ
- **50+ Menu Items**: Various cuisines with prices ₹100-₹500
- **Sample User**: email: test@example.com, password: Test@123

---

## 🎯 Next Steps

1. ✅ **Test locally** with single device
2. ✅ **Test on WiFi** with multiple devices
3. 🔄 **Add payment gateway** (Stripe/Razorpay)
4. 🔄 **Add real-time tracking** (WebSockets/Socket.io)
5. 🔄 **Deploy frontend** to Vercel
6. 🔄 **Deploy backend** to Render/Railway
7. 🔄 **Build mobile apps** (React Native)
8. 🔄 **Add admin dashboard** for analytics

---

## 📞 Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Guide**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **Vite Guide**: https://vitejs.dev/
- **TailwindCSS**: https://tailwindcss.com/

---

## 📄 License

This project is created for DeepDish Technologies. All rights reserved.

**Build with ❤️ using Node.js, React, and MongoDB**
