import api from './client.js';

export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const sendOtpApi = async (phone) => {
  const response = await api.post('/admin/send-otp', { phone });
  return response.data;
};

export const verifyOtpApi = async (phone, otp) => {
  const response = await api.post('/admin/verify-otp', { phone, otp });
  return response.data;
};
