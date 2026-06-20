const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

// ========================
// USER MANAGEMENT
// ========================

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new user
const addUser = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, role, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    const user = new User({
      email,
      firstName,
      lastName,
      phone,
      role,
      address,
      password: tempPassword,
      isVerified: true,
      isActive: true
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
      tempPassword: tempPassword
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, phone, role, address, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phone, role, address, isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================
// DISCOUNT MANAGEMENT
// ========================

// Give discount to user
const giveDiscount = async (req, res) => {
  try {
    const { userId, discountAmount, discountPercentage, description } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Add discount to user (you can extend User model with discounts array if needed)
    if (!user.discounts) user.discounts = [];

    user.discounts.push({
      amount: discountAmount,
      percentage: discountPercentage,
      description,
      createdAt: new Date()
    });

    await user.save();

    res.json({
      success: true,
      message: 'Discount applied successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================
// CHEF VERIFICATION
// ========================

// Get all chefs (unverified)
const getChefs = async (req, res) => {
  try {
    const chefs = await User.find({ role: 'chef' }).select('-password -refreshToken');
    res.json({
      success: true,
      data: chefs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify chef
const verifyChef = async (req, res) => {
  try {
    const { chefId } = req.params;

    const chef = await User.findByIdAndUpdate(
      chefId,
      { isVerified: true },
      { new: true }
    );

    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }

    res.json({
      success: true,
      message: 'Chef verified successfully',
      data: chef
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject chef
const rejectChef = async (req, res) => {
  try {
    const { chefId } = req.params;

    const chef = await User.findByIdAndUpdate(
      chefId,
      { isActive: false },
      { new: true }
    );

    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }

    res.json({
      success: true,
      message: 'Chef rejected',
      data: chef
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================
// MENU MANAGEMENT
// ========================

// Add menu item
const addMenuItem = async (req, res) => {
  try {
    const { restaurantId, name, price, category, description, image, isVeg, preparationTime } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    let menu = await Menu.findOne({ restaurantId });
    if (!menu) {
      menu = new Menu({ restaurantId, items: [] });
    }

    menu.items.push({
      name,
      price,
      category,
      description,
      image,
      isVeg,
      preparationTime
    });

    await menu.save();

    res.status(201).json({
      success: true,
      message: 'Menu item added successfully',
      data: menu
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;

    const menu = await Menu.findOne({ restaurantId });
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }

    menu.items = menu.items.filter(item => item._id.toString() !== itemId);
    await menu.save();

    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const { name, price, category, description, image, isVeg, preparationTime } = req.body;

    const menu = await Menu.findOne({ restaurantId });
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }

    const item = menu.items.id(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    Object.assign(item, { name, price, category, description, image, isVeg, preparationTime });
    await menu.save();

    res.json({ success: true, message: 'Menu item updated', data: menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get menu by restaurant
const getRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }

    res.json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  // Users
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  // Discounts
  giveDiscount,
  // Chef verification
  getChefs,
  verifyChef,
  rejectChef,
  // Menu
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getRestaurantMenu
};
