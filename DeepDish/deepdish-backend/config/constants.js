module.exports = {
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-min-32-chars-change-in-production',
  JWT_EXPIRE: '7d',
  JWT_REFRESH_EXPIRE: '30d',

  // API Configuration
  API_PORT: process.env.PORT || 5000,
  API_HOST: process.env.HOST || '0.0.0.0', // Listen on all interfaces for WiFi access

  // User Roles
  USER_ROLES: {
    CUSTOMER: 'customer',
    CHEF: 'chef',
    ADMIN: 'admin',
    DELIVERY: 'delivery',
  },

  // Order Status
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    READY: 'ready',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },

  // API Endpoints
  API_V1: '/api/v1',
};
