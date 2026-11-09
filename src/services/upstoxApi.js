// Upstox API Live Integration Service for TRADEX
const API_KEY = "YOUR_API_KEY"; // तुमच्या Upstox ॲपची Key इथे टाका
const API_SECRET = "YOUR_API_SECRET"; // API Secret इथे टाका
const REDIRECT_URI = "http://localhost:5174";

export const getUpstoxLoginUrl = () => {
  return `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}`;
};

// लाइव्ह मार्केट डेटा फेच करण्यासाठी फंक्शन
export const fetchLiveMarketData = async (symbol) => {
  try {
    // Upstox Live Market Feed API Integration
    const response = await fetch(`https://api-v2.upstox.com/feed/market-data/${symbol}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('upstox_access_token')}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Live Data Fetch Error:", error);
    return null;
  }
};