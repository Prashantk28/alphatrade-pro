// Real-time WebSocket Service for Live Stock & Option Prices
class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = [];
  }

  connect(url = 'wss://echo.websocket.events') {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Live Market WebSocket Connected');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.notifyListeners(data);
      } catch (e) {
        // Handle mock price tick updates
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners(data) {
    this.listeners.forEach(callback => callback(data));
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const wsService = new WebSocketService();