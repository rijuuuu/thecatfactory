import api from './client.js';

export const fetchCustomers = async () => {
  const response = await api.get('/customers');
  return response.data;
};

export const signupCustomerApi = async (customerData) => {
  const response = await api.post('/customers/signup', customerData);
  return response.data;
};

export const loginCustomerApi = async (credentials) => {
  const response = await api.post('/customers/login', credentials);
  return response.data;
};
