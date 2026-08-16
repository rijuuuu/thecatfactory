import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Key, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { QCBadge } from '../../assets/QCBadge.jsx';

export const Login = () => {
  const { loginWithPassword, isAuthenticated, loading, error: authError } = useAdminAuth();
  const navigate = useNavigate();

  const [userId, setUserId] = useState('catadmin');
  const [password, setPassword] = useState('factory123');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginWithPassword(userId, password);
    if (res.success) {
      navigate('/admin/dashboard');
    }
  };

  const handleFillDemo = () => {
    setUserId('catadmin');
    setPassword('factory123');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      backgroundColor: '#121212',
      color: 'white',
      fontFamily: 'Archivo, sans-serif'
    }}>
      {/* Left Branded Panel */}
      <div style={{
        backgroundColor: '#1A1A1A',
        borderRight: '2px solid var(--color-factory-yellow)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '40px', right: '40px' }}>
          <QCBadge text="ADMIN CONTROL HQ" batch="UNIT #04 MUMBAI DOCKS" rotate={-4} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <CatMascot width={54} height={54} fillColor="#E8B923" accentColor="#141414" expression="cool" showHardhat={true} />
            <div>
              <h1 style={{ fontFamily: 'Anton', fontSize: '2.4rem', color: 'var(--color-factory-yellow)', lineHeight: 0.9 }}>
                THE CAT FACTORY
              </h1>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--color-rust)', fontWeight: 800 }}>
                ADMIN CONTROL CENTER & DISPATCH PORTAL
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: '2.8rem', fontFamily: 'Anton', marginTop: '40px', color: 'white' }}>
            CONTROL CENTER SIGN-IN
          </h2>
          <p style={{ fontFamily: 'Archivo', fontSize: '1.05rem', color: '#A0A0A0', marginTop: '12px', maxWidth: '480px' }}>
            Enter your admin UserID and password to access product staging, QC inspection orders, and store operational settings.
          </p>
        </div>

        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#666' }}>
          🔒 RESTRICTED PORTAL — AUTHORIZED CAT FACTORY INSPECTORS ONLY
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#1E1E1E',
          border: '2px solid #333',
          padding: '36px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'white' }}>ADMIN SIGN-IN</h3>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#888' }}>
              Authenticate with UserID & Password
            </span>
          </div>

          {/* Demo Admin Banner */}
          <div 
            onClick={handleFillDemo}
            style={{
              backgroundColor: '#141414',
              border: '1px dashed var(--color-factory-yellow)',
              padding: '12px',
              marginBottom: '20px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-factory-yellow)', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 800 }}>
              <Key size={14} /> DEMO ADMIN CREDENTIALS (CLICK TO AUTO-FILL)
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#CCC', marginTop: '4px' }}>
              UserID: <strong>catadmin</strong>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#CCC' }}>
              Password: <strong>factory123</strong>
            </div>
          </div>

          {authError && (
            <div style={{ backgroundColor: '#3A1515', color: '#FF7777', padding: '10px', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', marginBottom: '16px' }}>
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ color: '#CCC' }}>ADMIN USER ID / EMAIL</label>
              <input
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="form-input"
                style={{ backgroundColor: '#141414', color: 'white', borderColor: '#333' }}
                placeholder="catadmin"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: '#CCC' }}>PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ backgroundColor: '#141414', color: 'white', borderColor: '#333' }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: '8px', width: '100%' }}
              id="admin-login-submit-btn"
            >
              <Lock size={16} /> {loading ? 'AUTHENTICATING...' : 'ENTER CONTROL CENTER'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
