import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext.jsx';
import { useToast } from './hooks/useToast.js';

import { TopUtilityBar } from './components/layout/TopUtilityBar.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CartDrawer } from './components/layout/CartDrawer.jsx';
import { Toast } from './components/storefront/Toast.jsx';

// Storefront Pages
import { Home } from './pages/storefront/Home.jsx';
import { Shop } from './pages/storefront/Shop.jsx';
import { ProductDetail } from './pages/storefront/ProductDetail.jsx';
import { Checkout } from './pages/storefront/Checkout.jsx';
import { OrderConfirmation } from './pages/storefront/OrderConfirmation.jsx';
import { About } from './pages/storefront/About.jsx';
import { Contact } from './pages/storefront/Contact.jsx';
import { Track } from './pages/storefront/Track.jsx';
import { Account } from './pages/storefront/Account.jsx';

// Admin Pages
import { Login as AdminLogin } from './pages/admin/Login.jsx';
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard.jsx';
import { Products as AdminProducts } from './pages/admin/Products.jsx';
import { Orders as AdminOrders } from './pages/admin/Orders.jsx';
import { Customers as AdminCustomers } from './pages/admin/Customers.jsx';
import { Settings as AdminSettings } from './pages/admin/Settings.jsx';

// Route Guard for Admin Pages
const PrivateAdminRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

// Storefront Layout Wrapper
const StorefrontLayout = ({ children, onToast }) => {
  return (
    <>
      <TopUtilityBar />
      <Header />
      <main style={{ minHeight: 'calc(100vh - 350px)' }}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
};

export const AppContent = () => {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />
      <Routes>
        {/* Storefront Routes */}
        <Route path="/" element={<StorefrontLayout onToast={addToast}><Home onToast={addToast} /></StorefrontLayout>} />
        <Route path="/shop" element={<StorefrontLayout onToast={addToast}><Shop onToast={addToast} /></StorefrontLayout>} />
        <Route path="/shop/:id" element={<StorefrontLayout onToast={addToast}><ProductDetail onToast={addToast} /></StorefrontLayout>} />
        <Route path="/checkout" element={<StorefrontLayout onToast={addToast}><Checkout onToast={addToast} /></StorefrontLayout>} />
        <Route path="/order-confirmation" element={<StorefrontLayout onToast={addToast}><OrderConfirmation /></StorefrontLayout>} />
        <Route path="/about" element={<StorefrontLayout onToast={addToast}><About /></StorefrontLayout>} />
        <Route path="/contact" element={<StorefrontLayout onToast={addToast}><Contact onToast={addToast} /></StorefrontLayout>} />
        <Route path="/track" element={<StorefrontLayout onToast={addToast}><Track /></StorefrontLayout>} />
        <Route path="/account" element={<StorefrontLayout onToast={addToast}><Account onToast={addToast} /></StorefrontLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<PrivateAdminRoute><AdminDashboard /></PrivateAdminRoute>} />
        <Route path="/admin/products" element={<PrivateAdminRoute><AdminProducts /></PrivateAdminRoute>} />
        <Route path="/admin/orders" element={<PrivateAdminRoute><AdminOrders /></PrivateAdminRoute>} />
        <Route path="/admin/customers" element={<PrivateAdminRoute><AdminCustomers /></PrivateAdminRoute>} />
        <Route path="/admin/settings" element={<PrivateAdminRoute><AdminSettings /></PrivateAdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
