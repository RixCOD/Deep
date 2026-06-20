# Quick Admin Dashboard Reference

## 🚀 Start Services

```bash
# Terminal 1 - Backend
cd C:\DeepDish\deepdish-backend
npm run dev

# Terminal 2 - Frontend
cd C:\DeepDish\deepdish-frontend
npm run dev
```

## 🌐 Access Points

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/v1
- **Admin Dashboard:** http://localhost:5173/admin

## 👤 Login Credentials

To access admin dashboard, you need an admin account. You can create one by:

1. Register at `/signup`
2. Update user role to `admin` in MongoDB:
```javascript
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)
```

## 📋 Admin Features Cheat Sheet

| Feature | Tab | Action | API Endpoint |
|---------|-----|--------|-------------|
| Add User | Users | Fill form → Click "Add New User" | POST /admin/users |
| Delete User | Users | Click "Delete" button | DELETE /admin/users/{id} |
| View Users | Users | Auto-loads on page | GET /admin/users |
| Verify Chef | Chefs | Click "Verify" button | POST /admin/chefs/{id}/verify |
| Reject Chef | Chefs | Click "Reject" button | POST /admin/chefs/{id}/reject |
| Give Discount | Discounts | Fill form → Click "Apply Discount" | POST /admin/discount |
| Add Menu Item | Menus | Select restaurant → Fill form | POST /admin/menu/{restaurantId} |
| Delete Menu Item | Menus | Click delete on item | DELETE /admin/menu/{restaurantId}/{itemId} |
| Update Menu Item | Menus | Edit and save | PUT /admin/menu/{restaurantId}/{itemId} |
| View Restaurants | Restaurants | Auto-loads cards | GET /restaurants |

## 🔑 Key Files

| File | Purpose | Location |
|------|---------|----------|
| AdminDashboard.jsx | Main UI component | `deepdish-frontend/src/pages/` |
| adminController.js | Backend logic | `deepdish-backend/controllers/` |
| admin.js | API routes | `deepdish-backend/routes/` |
| User.js | User model | `deepdish-backend/models/` |

## 🧪 Test Workflow

### 1. Add a Test User
- Go to Users tab
- Click "Add New User"
- Email: testuser@example.com
- Name: Test User
- Role: Customer
- Save temp password
- Click "Create User"

### 2. Give Discount to User
- Go to Discounts tab
- Click "Give Discount"
- Select the test user
- Amount: $50
- Description: Test Discount
- Click "Apply Discount"

### 3. Add Menu Item
- Go to Menus tab
- Click "Add Menu Item"
- Select "Taj Express"
- Name: Garlic Naan
- Price: 80
- Category: Main Course
- Veg: Checked
- Prep Time: 10
- Click "Add Item"

## 🛠️ Troubleshooting

### Backend Not Running
```
Error: Cannot find module
→ Run: npm install
```

### Frontend Errors
```
Module not found
→ Clear browser cache and refresh
→ npm install
```

### API 401 Unauthorized
```
→ Make sure token is in localStorage
→ Login first at /login
```

### API 403 Forbidden
```
→ User role must be 'admin'
→ Update in MongoDB or create new admin user
```

## 📊 Data Models

### User Document
```javascript
{
  _id: ObjectId,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  role: 'admin' | 'chef' | 'customer' | 'delivery',
  isActive: Boolean,
  isVerified: Boolean,
  discounts: [{
    amount: Number,
    percentage: Number,
    description: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Menu Document
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId,
  items: [{
    _id: ObjectId,
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String,
    isVeg: Boolean,
    preparationTime: Number
  }]
}
```

## 🎯 Important Notes

✅ All admin operations require valid JWT token
✅ User must have role: 'admin'
✅ Passwords auto-generated when adding users
✅ Discounts applied to user record, not individual orders
✅ Menu items are stored per restaurant
✅ All forms validate before submission
✅ Errors show in alert boxes
✅ Success operations refresh data automatically

## 🔐 Security Headers

All admin API calls should include:
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

The token is automatically sent by the frontend from localStorage.

## 📞 Support

If something breaks:
1. Check backend console for errors
2. Check browser console (F12)
3. Verify token in localStorage
4. Restart services
5. Clear database and reseed if needed

---

**Admin Dashboard v1.0** ✅ Ready to Use!
