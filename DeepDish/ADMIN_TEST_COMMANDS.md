# 🎮 Admin Dashboard - Quick Test Commands

## 🚀 Start Services

### Option 1: Individual Terminals
```bash
# Terminal 1 - Backend
cd C:\DeepDish\deepdish-backend
npm run dev

# Terminal 2 - Frontend  
cd C:\DeepDish\deepdish-frontend
npm run dev
```

### Option 2: Check if Already Running
```bash
# Check if port 5000 is in use (Backend)
netstat -ano | findstr :5000

# Check if port 5173 is in use (Frontend)
netstat -ano | findstr :5173
```

---

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Website UI |
| Backend | http://localhost:5000 | API Server |
| Admin Dashboard | http://localhost:5173/admin | Admin Panel |
| API Docs | http://localhost:5000/api/v1 | API Endpoints |

---

## 🔑 Create Admin Account

### Using MongoDB Command Line

```bash
# Start MongoDB shell
mongosh

# Connect to database
use deepdish

# Find your user
db.users.find({ email: "your_email@example.com" })

# Update to admin
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)

# Verify
db.users.find({ email: "your_email@example.com" })
```

### Alternative: Register First
1. Go to http://localhost:5173/signup
2. Sign up with: `admin@example.com` / `Admin@123`
3. Then run MongoDB command above to set role to admin
4. Logout and login again

---

## 🧪 Test Scenarios

### Scenario 1: Add a New User

```bash
# Step 1: Go to Admin Dashboard
http://localhost:5173/admin

# Step 2: Navigate to Users Tab
Click "Users" in sidebar

# Step 3: Add User
Click "➕ Add New User"

# Step 4: Fill Form
Email:     testuser@deepdish.com
First:     John
Last:      Doe
Phone:     +919876543210
Role:      Customer

# Step 5: Create
Click "Create User"
→ Alert shows temp password (e.g., "x7k2m9a1")

# Step 6: Verify
User appears in table below
```

### Scenario 2: Give Discount to User

```bash
# Step 1: Go to Discounts Tab
Click "🏷️ Discounts" in sidebar

# Step 2: Open Form
Click "Give Discount"

# Step 3: Fill Form
Select User:    John Doe (testuser@deepdish.com)
Amount:         500
Percentage:     20
Description:    Birthday offer

# Step 4: Apply
Click "Apply Discount"
→ Success alert

# Step 5: Verify in MongoDB
db.users.find({ 
  email: "testuser@deepdish.com" 
}).pretty()
→ Should show discounts array with entry
```

### Scenario 3: Verify a Chef

```bash
# Step 1: Go to Chefs Tab
Click "👨‍🍳 Chefs" in sidebar

# Step 2: Find Unverified Chef
Look for chef with "⏳ Pending" status

# Step 3: Verify
Click "Verify" button
→ Status changes to "✓ Verified"

# Step 4: Alternatively Reject
Click "Reject" to deactivate chef
→ Status updates
```

### Scenario 4: Add Menu Item

```bash
# Step 1: Go to Menus Tab
Click "📋 Menus" in sidebar

# Step 2: Open Form
Click "Add Menu Item"

# Step 3: Select Restaurant
Select Restaurant:  Taj Express

# Step 4: Fill Item Details
Name:               Garlic Naan
Price:              80
Category:           Main Course
Description:        Butter roasted garlic naan
Image URL:          https://unsplash.com/...
Vegetarian:         ✓ (checked)
Prep Time:          10 (minutes)

# Step 5: Add
Click "Add Item"
→ Success alert

# Step 6: Verify
Restaurant card should show item in database
```

### Scenario 5: View All Restaurants

```bash
# Step 1: Go to Restaurants Tab
Click "🏪 Restaurants" in sidebar

# Step 2: See Restaurant Grid
View 5 restaurants in card format:
  - Taj Express
  - Pizzeria Napoli
  - Spice Dragon
  - Burger Junction
  - Sweet Cravings Bakery

# Step 3: Check Details
Each card shows:
  - Restaurant image
  - Name
  - Cuisines
  - Rating (⭐)
  - Delivery time & fee
```

---

## 🔌 API Testing with curl

### Test User Creation
```bash
curl -X POST http://localhost:5000/api/v1/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "phone": "+91987654321",
    "role": "customer"
  }'
```

### Test Get All Users
```bash
curl -X GET http://localhost:5000/api/v1/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Give Discount
```bash
curl -X POST http://localhost:5000/api/v1/admin/discount \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "discountAmount": 500,
    "discountPercentage": 20,
    "description": "Special offer"
  }'
```

### Test Add Menu Item
```bash
curl -X POST http://localhost:5000/api/v1/admin/menu/RESTAURANT_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Item Name",
    "price": 200,
    "category": "main",
    "description": "Item description",
    "image": "https://...",
    "isVeg": true,
    "preparationTime": 20
  }'
```

---

## 🐛 Debugging Commands

### Check Backend Logs
```bash
# Watch backend console for errors
# Terminal should show all API calls with timestamps
```

### Check Frontend Logs
```bash
# Open browser console
F12  →  Console Tab

# Look for:
- API response errors
- State changes
- Form submission logs
```

### Check Database
```bash
mongosh
use deepdish

# Count users
db.users.countDocuments()

# View all users
db.users.find().pretty()

# View restaurants
db.restaurants.find().pretty()

# Check discounts on user
db.users.findOne(
  { email: "testuser@deepdish.com" },
  { discounts: 1 }
)
```

---

## ✅ Quick Verification Checklist

### Backend Running?
```bash
# Should show:
# ✓ DeepDish API Server Running
# ✓ MongoDB Connected
# ✓ Port 5000

curl http://localhost:5000/health
# Should return: {"success": true, "message": "Server is running"}
```

### Frontend Running?
```bash
# Should show:
# VITE v8.0.14 ready in XXXms
# ➜ Local: http://localhost:5173/

# Visit http://localhost:5173
# Should see homepage with restaurants
```

### Admin Account?
```bash
mongosh
use deepdish
db.users.find({ role: "admin" })
# Should return at least 1 user with role: "admin"
```

### Can Access Admin Dashboard?
```
1. Login at http://localhost:5173/login
2. Go to http://localhost:5173/admin
3. Should see sidebar with tabs
4. Should not see "Unauthorized" page
```

---

## 🚨 Common Issues & Fixes

### Issue: "Cannot GET /admin"
```
Fix: Login first at /login
     Make sure you have admin role
     Check browser localStorage for token
```

### Issue: "Authorization failed"
```
Fix: Check Authorization header
     Token might be expired
     Try logging out and in again
```

### Issue: 404 Restaurant Not Found
```
Fix: Make sure restaurants are seeded
     Run: node scripts/seedRestaurants.js
```

### Issue: Form not submitting
```
Fix: Check browser console for errors
     Verify all required fields filled
     Check API response in Network tab
```

### Issue: Backend not starting
```
Fix: Check port 5000 is free
     Run: npm install
     Check .env file exists
     Verify MongoDB is running
```

---

## 📊 Expected Behavior

### After Adding User
- ✅ Alert shows temp password
- ✅ User appears in table
- ✅ Form clears
- ✅ User can login with temp password
- ✅ Should change password on first login

### After Giving Discount
- ✅ Success alert
- ✅ Discount saved to user document
- ✅ Database shows discount in array
- ✅ Can apply multiple discounts to same user

### After Verifying Chef
- ✅ Status changes from ⏳ to ✓
- ✅ isVerified flag set to true
- ✅ Chef can now see dashboard

### After Adding Menu Item
- ✅ Success alert
- ✅ Item appears in restaurant menu
- ✅ Can be viewed on restaurant page
- ✅ Can be edited/deleted later

---

## 🎯 Success Indicators

✅ All tabs load without errors
✅ Forms submit successfully  
✅ Data appears in tables
✅ API calls show in Network tab
✅ No 401/403 errors
✅ No console errors
✅ Responsive on mobile
✅ Fast page load (<3s)

---

## 📞 Support

If something breaks:

1. **Check Errors**
   - Backend console
   - Frontend console (F12)
   - MongoDB logs

2. **Restart Services**
   - Stop backend (Ctrl+C)
   - Stop frontend (Ctrl+C)
   - Restart both

3. **Clear Cache**
   - Clear browser cache
   - localStorage.clear() in console
   - Delete node_modules, run npm install

4. **Reset Database**
   - mongosh
   - use deepdish
   - db.dropDatabase()
   - Run seed script again

---

**Admin Dashboard v1.0** ✅
**Ready for Production Testing!**
