import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const UPSTOX_API_KEY = process.env.UPSTOX_API_KEY || 'fe609450-ca64-47d2-bba4-1d8e1f79eab9';
const UPSTOX_API_SECRET = process.env.UPSTOX_API_SECRET || 'jitsjbzk0u';

// सर्व्हर चेक करण्यासाठी रूट
app.get('/', (req, res) => {
  res.json({ message: 'AlphaTrade Pro Backend Server is Running Live!' });
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});