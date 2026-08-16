import api from './client.js';

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const fetchOrders = async (params = {}) => {
  const response = await api.get('/orders', { params });
  return response.data;
};

export const fetchCurrentOrders = async (email) => {
  const response = await api.get('/orders/current', { params: { email } });
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const trackOrderApi = async (orderId, email) => {
  const response = await api.get('/orders/track', { params: { orderId, email } });
  return response.data;
};

export const updateOrderStatus = async (id, statusData) => {
  const response = await api.patch(`/orders/${id}/status`, statusData);
  return response.data;
};
