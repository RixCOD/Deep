const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'chattingapp4@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '@@@###anshuA123'
  }
});

const emailService = {
  // Send OTP for forgot password
  sendPasswordResetOTP: async (email, otp) => {
    const mailOptions = {
      from: 'chattingapp4@gmail.com',
      to: email,
      subject: '🔐 DeepDish - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); color: white; padding: 40px; text-align: center; border-radius: 10px;">
            <h1 style="margin: 0; font-size: 32px;">🍕 DeepDish</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Password Reset Request</p>
          </div>
          
          <div style="padding: 40px; background: #f8f9fa;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi ${email.split('@')[0]},</p>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
              We received a request to reset your DeepDish password. Use this OTP to verify your identity:
            </p>
            
            <div style="background: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; border: 2px solid #ff6b6b;">
              <p style="font-size: 12px; color: #999; margin: 0 0 15px 0; text-transform: uppercase;">Your OTP Code</p>
              <p style="font-size: 48px; font-weight: bold; color: #ff6b6b; margin: 0; letter-spacing: 10px;">${otp}</p>
              <p style="font-size: 12px; color: #999; margin: 15px 0 0 0;">Valid for 10 minutes</p>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
              If you didn't request this, please ignore this email. Your account will remain secure.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; margin: 20px 0 0 0; text-align: center;">
              © 2026 DeepDish. All rights reserved. | 🍕 Order your favorite food now!
            </p>
          </div>
        </div>
      `
    };

    return transporter.sendMail(mailOptions);
  },

  // Send 2FA OTP
  send2FAOTP: async (email, otp) => {
    const mailOptions = {
      from: 'chattingapp4@gmail.com',
      to: email,
      subject: '🔐 DeepDish - Your 2FA Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px;">
            <h1 style="margin: 0; font-size: 32px;">🍕 DeepDish</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Two-Factor Authentication</p>
          </div>
          
          <div style="padding: 40px; background: #f8f9fa;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi ${email.split('@')[0]},</p>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
              Someone is trying to sign into your DeepDish account. Enter this code to verify it's you:
            </p>
            
            <div style="background: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; border: 2px solid #667eea;">
              <p style="font-size: 12px; color: #999; margin: 0 0 15px 0; text-transform: uppercase;">Your 2FA Code</p>
              <p style="font-size: 48px; font-weight: bold; color: #667eea; margin: 0; letter-spacing: 10px;">${otp}</p>
              <p style="font-size: 12px; color: #999; margin: 15px 0 0 0;">Valid for 5 minutes</p>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
              <strong>Security tip:</strong> Never share this code with anyone. We'll never ask you for it.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; margin: 20px 0 0 0; text-align: center;">
              © 2026 DeepDish. All rights reserved. | 🍕 Order your favorite food now!
            </p>
          </div>
        </div>
      `
    };

    return transporter.sendMail(mailOptions);
  },

  // Send verification email
  sendVerificationEmail: async (email, verificationLink) => {
    const mailOptions = {
      from: 'chattingapp4@gmail.com',
      to: email,
      subject: '✅ DeepDish - Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 40px; text-align: center; border-radius: 10px;">
            <h1 style="margin: 0; font-size: 32px;">🍕 DeepDish</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Welcome to DeepDish!</p>
          </div>
          
          <div style="padding: 40px; background: #f8f9fa;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Welcome to DeepDish, ${email.split('@')[0]}!</p>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
              Verify your email address to start ordering delicious food. Click the button below to confirm your email:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="display: inline-block; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                ✓ Verify Email
              </a>
            </div>
            
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              Or copy this link: <br>
              <span style="color: #666; word-break: break-all;">${verificationLink}</span>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; margin: 20px 0 0 0; text-align: center;">
              © 2026 DeepDish. All rights reserved. | 🍕 Order your favorite food now!
            </p>
          </div>
        </div>
      `
    };

    return transporter.sendMail(mailOptions);
  }
};

module.exports = emailService;
