import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';

export const NewsletterBlock = ({ onToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      if (onToast) onToast('Subscribed to Cat Factory drop alerts!', 'success');
      setEmail('');
    }
  };

  return (
    <section style={{
      backgroundColor: 'var(--color-ink-black)',
      color: 'var(--color-warehouse-cream)',
      padding: 'var(--space-3xl) 0',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '0.75rem',
              color: 'var(--color-factory-yellow)',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}>
              DROP DISPATCH ALERTS
            </span>
            <h2 style={{ fontSize: '2.8rem', marginTop: '6px', color: 'white' }}>
              NEVER MISS A LIMITED QC DROP
            </h2>
            <p style={{ fontFamily: 'Archivo', fontSize: '1rem', color: '#A0A0A0', marginTop: '12px' }}>
              Subscribe to receive instant SMS/email dispatches when new small-batch heavyweights drop. Early access for members + 10% off your first order with code <strong>FACTORY10</strong>.
            </p>
          </div>

          <div style={{
            backgroundColor: '#1E1E1E',
            border: '2px solid var(--color-factory-yellow)',
            padding: 'var(--space-xl)',
            boxShadow: 'var(--shadow-yellow)'
          }}>
            {subscribed ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <Check size={40} color="var(--color-factory-yellow)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.4rem', color: 'white' }}>DISPATCH SUBSCRIBED!</h3>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: '#A0A0A0', marginTop: '6px' }}>
                  Use promo code <strong style={{ color: 'var(--color-factory-yellow)' }}>FACTORY10</strong> at checkout for 10% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label className="form-label" style={{ color: 'var(--color-factory-yellow)' }}>
                  ENTER YOUR DISPATCH EMAIL ADDRESS:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    required
                    placeholder="operator@catfactory.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{ backgroundColor: '#141414', color: 'white', borderColor: '#333' }}
                  />
                  <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    JOIN LIST
                  </button>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#777' }}>
                  Zero spam. Unsubscribe anytime with 1 click.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
