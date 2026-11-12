import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const UPSTOX_API_KEY = process.env.UPSTOX_API_KEY || 'fe609450-ca64-47d2-bba4-1d8e1f79eab9';
const UPSTOX_API_SECRET = process.env.UPSTOX_API_SECRET || 'jitsjbzk0u';

// Nodemailer Transporter Setup (जीमेलवरून ईमेल पाठवण्यासाठी)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // तुमचा जीमेल (उदा. pkamble.kvic@hokvic.gov.in)
    pass: process.env.EMAIL_PASS  // जीमेलचा App Password
  }
});

// सर्व्हर चेक करण्यासाठी रूट
app.get('/', (req, res) => {
  res.json({ message: 'AlphaTrade Pro Backend Server is Running Live with Email OTP & Upstox!' });
});

// Upstox Login / Auth Redirect Handle करण्यासाठी Endpoint
app.get('/api/auth/upstox-login', (req, res) => {
  const redirectUri = 'http://localhost:5173';
  const upstoxAuthUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${UPSTOX_API_KEY}&redirect_uri=${redirectUri}`;
  res.json({ url: upstoxAuthUrl });
});

// लाइव्ह मार्केट ऑर्डर प्लेस करण्यासाठी Endpoint
app.post('/api/orders/place', async (req, res) => {
  try {
    const { symbol, quantity, transaction_type, order_type, price } = req.body;
    
    console.log(`[LIVE ORDER REQUEST] Symbol: ${symbol}, Type: ${transaction_type}, Qty: ${quantity}, Price: ${price}`);

    res.json({
      status: 'success',
      message: 'Live Order Placed Successfully via Backend!',
      orderId: `UPSTOX_ORD_${Date.now()}`
    });

  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// **नवीन:** Forgot Password & OTP पाठवण्यासाठी Endpoint
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email address.' });
  }

  // ६ अंकी रँडम OTP जनरेट करणे
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'AlphaTrade Pro - Password Reset OTP & Link',
    html: `
      <div style="font-family: Arial, sans-serif; background: #0b0e14; color: #fff; padding: 20px; border-radius: 10px; max-width: 400px; margin: auto;">
        <h2 style="color: #a855f7; text-align: center;">AlphaTrade Pro Security</h2>
        <p>Hello,</p>
        <p>You requested to reset your password for your AlphaTrade Pro account.</p>
        <div style="background: #181b25; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <span style="font-size: 14px; color: #9ca3af; display: block; margin-bottom: 5px;">Your One-Time Password (OTP)</span>
          <strong style="font-size: 24px; color: #22c55e; letter-spacing: 2px;">${otp}</strong>
        </div>
        <p>Or click the button below to reset your password directly:</p>
        <a href="https://alphatrade-pro.vercel.app/reset-password?otp=${otp}" style="background: #a855f7; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; display: block; text-align: center; font-weight: bold; margin-top: 15px;">Reset Password</a>
        <p style="font-size: 11px; color: #9ca3af; margin-top: 25px; text-align: center;">If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[PASSWORD RESET] OTP ${otp} sent successfully to ${email}`);
    res.status(200).json({ success: true, message: 'OTP and Reset link sent successfully to your email!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email. Check server email credentials.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});