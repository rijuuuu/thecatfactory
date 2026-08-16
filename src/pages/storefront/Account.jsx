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
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{
            backgroundColor: 'var(--color-off-white)',
            border: 'var(--border-thick)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-flat)',
            textAlign: 'center'
          }}>
            <CatMascot width={90} height={90} fillColor="#141414" accentColor="#E8B923" expression="cool" />
            <h2 style={{ fontSize: '2.2rem', marginTop: '12px' }}>CUSTOMER ACCOUNT HUB</h2>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--color-rust)', fontWeight: 800 }}>
              USER ID: @{customer.userId || customer.name.toLowerCase().replace(/\s+/g, '_')}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              margin: '24px 0',
              textAlign: 'left'
            }}>
              <div style={{ backgroundColor: 'var(--color-warehouse-cream)', padding: '16px', border: 'var(--border-thick)' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#666' }}>FULL NAME & EMAIL</span>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{customer.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#555' }}>{customer.email}</div>
              </div>

              <div style={{ backgroundColor: 'var(--color-warehouse-cream)', padding: '16px', border: 'var(--border-thick)' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#666' }}>TOTAL SPENT IN FACTORY</span>
                <div style={{ fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '1.1rem', color: 'var(--color-rust)' }}>
                  {formatINR(customer.totalSpent || 0)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/track" className="btn-primary">
                TRACK ACTIVE ORDERS
              </Link>
              <button onClick={handleLogout} className="btn-secondary" style={{ color: 'var(--color-rust)' }}>
                LOG OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '540px' }}>
        <div style={{
          backgroundColor: 'var(--color-off-white)',
          border: 'var(--border-thick)',
          padding: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-flat)'
        }}>
          {/* Tab Switcher */}
          <div style={{ display: 'flex', borderBottom: 'var(--border-thick)', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                flex: 1,
                padding: '12px',
                fontFamily: 'JetBrains Mono',
                fontWeight: 800,
                fontSize: '0.9rem',
                borderBottom: activeTab === 'login' ? '3px solid var(--color-factory-yellow)' : 'none',
                backgroundColor: activeTab === 'login' ? 'var(--color-warehouse-cream)' : 'transparent'
              }}
            >
              LOGIN
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              style={{
                flex: 1,
                padding: '12px',
                fontFamily: 'JetBrains Mono',
                fontWeight: 800,
                fontSize: '0.9rem',
                borderBottom: activeTab === 'signup' ? '3px solid var(--color-factory-yellow)' : 'none',
                backgroundColor: activeTab === 'signup' ? 'var(--color-warehouse-cream)' : 'transparent'
              }}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {error && (
            <div style={{ backgroundColor: '#3A1515', color: '#FF7777', padding: '10px', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', marginBottom: '16px' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeTab === 'login' ? (
              /* LOGIN FORM */
              <>
                <div className="form-group">
                  <label className="form-label">USER ID / EMAIL / PHONE</label>
                  <input
                    type="text"
                    name="userId"
                    required
                    value={formData.userId}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter UserID or email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">PASSWORD</label>
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
                  <label className="form-label">SET UNIQUE USER ID</label>
                  <input
                    type="text"
                    name="userId"
                    required
                    value={formData.userId}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. catlover99"
                  />
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#777' }}>
                    Used for logging into your account in the future.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">FULL NAME</label>
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
                  <label className="form-label">EMAIL ADDRESS</label>
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
                  <label className="form-label">PASSWORD</label>
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
                  <label className="form-label">MOBILE NUMBER</label>
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

            <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '12px', width: '100%' }}>
              {loading ? 'PROCESSING...' : activeTab === 'login' ? 'SIGN IN TO ACCOUNT' : 'REGISTER ACCOUNT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
