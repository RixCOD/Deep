const User = require('../models/User');
const emailService = require('../services/emailService');

// Generate random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;
    await user.save();

    await emailService.sendPasswordResetOTP(email, otp);

    res.status(200).json({
      message: 'OTP sent to your email',
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2')
    });
  } catch (error) {
    console.error('[Forgot Password Error]', error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

const verifyOTPAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > user.resetOTPExpiry) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    user.password = newPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('[Reset Password Error]', error);
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};

// 2FA related endpoints
const enable2FA = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    user.twoFactorEnabled = true;
    await user.save();

    res.status(200).json({ message: '2FA enabled successfully' });
  } catch (error) {
    console.error('[Enable 2FA Error]', error);
    res.status(500).json({ message: 'Error enabling 2FA', error: error.message });
  }
};

const send2FAOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA not enabled for this account' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.twoFactorOTP = otp;
    user.twoFactorOTPExpiry = otpExpiry;
    await user.save();

    await emailService.send2FAOTP(email, otp);

    res.status(200).json({
      message: '2FA OTP sent to your email',
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2')
    });
  } catch (error) {
    console.error('[Send 2FA OTP Error]', error);
    res.status(500).json({ message: 'Error sending 2FA OTP', error: error.message });
  }
};

const verify2FAOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.twoFactorOTP !== otp) {
      return res.status(400).json({ message: 'Invalid 2FA OTP' });
    }

    if (new Date() > user.twoFactorOTPExpiry) {
      return res.status(400).json({ message: '2FA OTP expired' });
    }

    user.twoFactorOTP = null;
    user.twoFactorOTPExpiry = null;
    user.twoFactorVerified = true;
    await user.save();

    res.status(200).json({ message: '2FA verification successful' });
  } catch (error) {
    console.error('[Verify 2FA OTP Error]', error);
    res.status(500).json({ message: 'Error verifying 2FA OTP', error: error.message });
  }
};

module.exports = {
  forgotPassword,
  verifyOTPAndResetPassword,
  enable2FA,
  send2FAOTP,
  verify2FAOTP
};
