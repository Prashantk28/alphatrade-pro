// Upstox Live WebSocket Feed Service for AlphaTrade Pro

class UpstoxWebSocketService {
  constructor() {
    this.ws = null;
    this.subscribers = new Set();
  }

  // 1. Upstox WebSocket सर्व्हरशी संपर्क
  connect(accessToken, instrumentKeys = []) {
    if (!accessToken) {
      console.warn("Upstox Access Token missing.");
      return;
    }

    // Upstox V2 Direct Market Feed WebSocket URL
    const wsUrl = `wss://api-v2.upstox.com/feed/market-data-feed`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("🟢 Upstox WebSocket Connected!");
        if (instrumentKeys.length > 0) {
          this.subscribe(instrumentKeys);
        }
      };

      this.ws.onmessage = (event) => {
        try {
          // JSON Feed Parsing
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
          // सर्व सबस्क्रायबर्सना टिक पास करणे
          this.subscribers.forEach((callback) => callback(data));
        } catch (err) {
          // जर बायनरी फीड असेल किंवा एरर आला तर सायलंटली हँडल करणे
        }
      };

      this.ws.onerror = (error) => {
        console.error("🔴 WebSocket Error:", error);
      };

      this.ws.onclose = () => {
        console.log("🟠 WebSocket Disconnected.");
      };
    } catch (error) {
      console.error("WebSocket initiation failed:", error);
    }
  }

  // 2. स्टॉक्स किंवा इंडेक्स सबस्क्राईब करणे
  subscribe(instrumentKeys) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const payload = {
        guid: "alphatrade-live",
        method: "sub",
        data: {
          mode: "full",
          instrumentKeys: instrumentKeys
        }
      };
      this.ws.send(JSON.stringify(payload));
    }
  }

  // 3. डेटा लिसनर
  onMarketUpdate(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const upstoxWS = new UpstoxWebSocketService();