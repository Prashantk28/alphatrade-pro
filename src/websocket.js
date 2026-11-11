// src/websocket.js

class WebSocketService {
  constructor() {
    this.socket = null;
    this.subscribers = [];
  }

  connect(url) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Live WebSocket Connected Successfully to Backend!');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.subscribers.forEach(callback => callback(data));
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket Disconnected. Reconnecting in 3 seconds...');
      setTimeout(() => this.connect(url), 3000);
    };
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
  }
}

export default new WebSocketService();