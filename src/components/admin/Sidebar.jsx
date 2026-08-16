import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings as SettingsIcon, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

export const Sidebar = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <div>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <CatMascot width={36} height={36} fillColor="#E8B923" accentColor="#141414" />
            <div>
              <h2>CAT FACTORY</h2>
              <span>ADMIN HQ</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Package size={18} /> Products Catalog
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <ShoppingBag size={18} /> Customer Orders
          </NavLink>
          <NavLink to="/admin/customers" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Users size={18} /> Customer Roster
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <SettingsIcon size={18} /> Store Settings
          </NavLink>
        </nav>
      </div>

      {/* Footer Profile & Exit */}
      <div className="sidebar-footer">
        <div className="admin-user-info">
          <span className="admin-user-name">{admin?.name || 'Chief Inspector'}</span>
          <span className="admin-user-role">{admin?.email || 'admin@catfactory.com'}</span>
        </div>
        <button 
          onClick={handleLogout} 
          style={{ color: '#FF5252', padding: '6px' }}
          title="Sign Out of Admin"
          aria-label="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};
