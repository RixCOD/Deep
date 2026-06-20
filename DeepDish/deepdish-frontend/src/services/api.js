import apiClient from './apiClient';

// Auth Services
export const authService = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: (refreshToken) =>
    apiClient.post('/auth/refresh-token', { refreshToken }),
};

// Restaurant Services
export const restaurantService = {
  getAllRestaurants: (page = 1, limit = 10) =>
    apiClient.get(`/restaurants?page=${page}&limit=${limit}`),
  searchRestaurants: (query) =>
    apiClient.get(`/restaurants/search?q=${query}`),
  getRestaurantById: (id) => apiClient.get(`/restaurants/${id}`),
  getRestaurantsByCity: (city) =>
    apiClient.get(`/restaurants/city/${city}`),
};

// Order Services
export const orderService = {
  createOrder: (data) => apiClient.post('/orders', data),
  getUserOrders: () => apiClient.get('/orders'),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => apiClient.put(`/orders/${id}/status`, { status }),
  cancelOrder: (id) => apiClient.put(`/orders/${id}/cancel`, {}),
};

// Review Services
export const reviewService = {
  createReview: (data) => apiClient.post('/reviews', data),
  getRestaurantReviews: (restaurantId, page = 1) =>
    apiClient.get(`/reviews/restaurant/${restaurantId}?page=${page}`),
  updateReview: (id, data) => apiClient.put(`/reviews/${id}`, data),
  deleteReview: (id) => apiClient.delete(`/reviews/${id}`),
};
