const express = require('express');
const {
  forgotPassword,
  verifyOTPAndResetPassword,
  enable2FA,
  send2FAOTP,
  verify2FAOTP
} = require('../controllers/passwordController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Forgot Password - No auth required
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyOTPAndResetPassword);

// 2FA - Auth required
router.post('/enable-2fa', authMiddleware, enable2FA);
router.post('/send-2fa-otp', send2FAOTP);
router.post('/verify-2fa-otp', verify2FAOTP);

module.exports = router;
