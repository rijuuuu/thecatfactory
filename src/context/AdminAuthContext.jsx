import React, { createContext, useContext, useState } from 'react';
import { adminLogin as apiAdminLogin, sendOtpApi, verifyOtpApi } from '../api/auth.js';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('cat_admin_token') || null);
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('cat_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithPassword = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiAdminLogin({ email, password });
      if (data.success && data.token) {
        setToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem('cat_admin_token', data.token);
        localStorage.setItem('cat_admin_user', JSON.stringify(data.admin));
        setLoading(false);
        return { success: true };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Authentication failed';
      setError(msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  const requestOtp = async (phone) => {
    setLoading(true);
    setError(null);
    try {
      const data = await sendOtpApi(phone);
      setLoading(false);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to send OTP';
      setError(msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  const verifyOtp = async (phone, otp) => {
    setLoading(true);
    setError(null);
    try {
      const data = await verifyOtpApi(phone, otp);
      if (data.success && data.token) {
        setToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem('cat_admin_token', data.token);
        localStorage.setItem('cat_admin_user', JSON.stringify(data.admin));
        setLoading(false);
        return { success: true };
      } else {
        throw new Error(data.message || 'OTP verification failed');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'OTP Verification failed';
      setError(msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('cat_admin_token');
    localStorage.removeItem('cat_admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{
      token,
      admin,
      isAuthenticated: !!token,
      loading,
      error,
      loginWithPassword,
      requestOtp,
      verifyOtp,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
