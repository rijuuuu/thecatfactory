import axios from 'axios';

const api = axios.create({
  baseURL: 'https://thecatfactorybackend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to inject JWT token for admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cat_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
