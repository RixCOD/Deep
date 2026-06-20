const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/auth.js');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// ========================
// USER MANAGEMENT
// ========================
router.get('/users', authMiddleware, isAdmin, adminController.getAllUsers);
router.post('/users', authMiddleware, isAdmin, adminController.addUser);
router.delete('/users/:userId', authMiddleware, isAdmin, adminController.deleteUser);
router.put('/users/:userId', authMiddleware, isAdmin, adminController.updateUser);

// ========================
// DISCOUNT MANAGEMENT
// ========================
router.post('/discount', authMiddleware, isAdmin, adminController.giveDiscount);

// ========================
// CHEF VERIFICATION
// ========================
router.get('/chefs', authMiddleware, isAdmin, adminController.getChefs);
router.post('/chefs/:chefId/verify', authMiddleware, isAdmin, adminController.verifyChef);
router.post('/chefs/:chefId/reject', authMiddleware, isAdmin, adminController.rejectChef);

// ========================
// MENU MANAGEMENT
// ========================
router.post('/menu/:restaurantId', authMiddleware, isAdmin, adminController.addMenuItem);
router.delete('/menu/:restaurantId/:itemId', authMiddleware, isAdmin, adminController.deleteMenuItem);
router.put('/menu/:restaurantId/:itemId', authMiddleware, isAdmin, adminController.updateMenuItem);
router.get('/menu/:restaurantId', authMiddleware, isAdmin, adminController.getRestaurantMenu);

module.exports = router;
