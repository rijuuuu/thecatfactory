import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ShieldCheck, Check, Key } from 'lucide-react';
import { signupCustomerApi, loginCustomerApi } from '../../api/customers.js';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { formatINR } from '../../utils/currency.js';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

export const Account = ({ onToast }) => {
  const navigate = useNavigate();
  const { loginWithPassword } = useAdminAuth();

  const [activeTab, setActiveTab] = useState('login');
  const [customer, setCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem('tcf_customer');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [formData, setFormData] = useState({ 
    userId: '', 
    name: '', 
    email: '', 
    password: '', 
    phone: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        const res = await loginCustomerApi({ 
          userId: formData.userId, 
          password: formData.password 
        });

        if (res.success) {
          if (res.role === 'admin' && res.token) {
            // Admin user detected! Auto-route to Admin Dashboard
            localStorage.setItem('cat_admin_token', res.token);
            localStorage.setItem('cat_admin_user', JSON.stringify(res.admin));
            if (onToast) onToast('Admin credentials verified! Entering Control Center...', 'success');
            navigate('/admin/dashboard');
          } else if (res.customer) {
            setCustomer(res.customer);
            localStorage.setItem('tcf_customer', JSON.stringify(res.customer));
            if (onToast) onToast(`Welcome back, ${res.customer.name}!`, 'success');
          }
        } else {
          throw new Error(res.message || 'Login failed');
        }
      } else {
        const res = await signupCustomerApi(formData);
        if (res.success && res.customer) {
          setCustomer(res.customer);
          localStorage.setItem('tcf_customer', JSON.stringify(res.customer));
          if (onToast) onToast('Account created successfully!', 'success');
        } else {
          throw new Error(res.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCustomer(null);
    localStorage.removeItem('tcf_customer');
    if (onToast) onToast('Logged out of account', 'info');
  };

  if (customer) {
    return (
      <div className="account-page" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-sm)',
            textAlign: 'center',
          }}>
            <CatMascot width={80} height={80} fillColor="var(--color-text)" accentColor="var(--color-accent)" expression="cool" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 300, letterSpacing: '0.04em', marginTop: '16px' }}>Customer Account Hub</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 500, marginTop: '4px' }}>
              @{customer.userId || customer.name.toLowerCase().replace(/\s+/g, '_')}
            </p>

            <div className="account-grid">
              <div style={{ backgroundColor: 'var(--color-surface-soft)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Full Name & Email
                </span>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text)' }}>{customer.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{customer.email}</div>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface-soft)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Total Orders Value
                </span>
                <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--color-accent)', marginTop: '4px' }}>
                  {formatINR(customer.totalSpent || 0)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/track" className="btn-primary">
                Track Active Orders
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {/* Tab Switcher */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '0.9rem',
                fontWeight: activeTab === 'login' ? 600 : 400,
                color: activeTab === 'login' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'login' ? '2px solid var(--color-accent)' : 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '0.9rem',
                fontWeight: activeTab === 'signup' ? 600 : 400,
                color: activeTab === 'signup' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'signup' ? '2px solid var(--color-accent)' : 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(196, 114, 90, 0.12)',
              color: 'var(--color-rust)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(196, 114, 90, 0.3)',
              fontSize: '0.82rem',
              marginBottom: '16px',
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeTab === 'login' ? (
              /* LOGIN FORM */
              <>
                <div className="form-group">
                  <label className="form-label">User ID / Email / Phone</label>
                  <input
                    type="text"
                    name="userId"
                    required
                    value={formData.userId}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter User ID or email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>
              </>
            ) : (
              /* CREATE ACCOUNT FORM */
              <>
                <div className="form-group">
                  <label className="form-label">Choose User ID</label>
                  <input
                    type="text"
                    name="userId"
                    required
                    value={formData.userId}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. catlover99"
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-faint)', marginTop: '4px', display: 'block' }}>
                    Used for logging into your account.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Aarav Sharma"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="aarav@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
              {loading ? 'Please wait…' : activeTab === 'login' ? 'Sign In' : 'Register Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
