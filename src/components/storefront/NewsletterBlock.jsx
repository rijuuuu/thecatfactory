import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

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
      backgroundColor: 'var(--color-dark)',
      color: 'var(--color-dark-text)',
      padding: 'var(--space-3xl) 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-3xl)',
          alignItems: 'center',
        }}>
          {/* Left copy */}
          <div>
            <span style={{
              display: 'block',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-light)',
              marginBottom: '10px',
            }}>
              Drop Dispatch Alerts
            </span>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontWeight: 300,
              color: 'var(--color-dark-text)',
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              marginBottom: '14px',
            }}>
              Never miss a limited drop
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-dark-muted)',
              lineHeight: 1.7,
              maxWidth: '400px',
            }}>
              Subscribe for instant alerts when new small-batch heavyweights drop.
              Early access for members + 10% off your first order with code{' '}
              <strong style={{ color: 'var(--color-accent-light)' }}>FACTORY10</strong>.
            </p>
          </div>

          {/* Right form panel */}
          <div style={{
            backgroundColor: 'var(--color-dark-surface)',
            border: '1px solid var(--color-border-dark)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-xl)',
          }}>
            {subscribed ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <Check size={22} color="var(--color-accent)" />
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 400,
                  color: 'var(--color-dark-text)',
                  letterSpacing: '0.04em',
                }}>
                  You're subscribed!
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-dark-muted)',
                  marginTop: '8px',
                  lineHeight: 1.6,
                }}>
                  Use promo code{' '}
                  <strong style={{ color: 'var(--color-accent-light)' }}>FACTORY10</strong>{' '}
                  at checkout for 10% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-dark-muted)',
                }}>
                  Your email address
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{
                      flex: '1 1 200px',
                      backgroundColor: 'var(--color-dark)',
                      color: 'var(--color-dark-text)',
                      borderColor: 'var(--color-border-dark)',
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ whiteSpace: 'nowrap', flex: '0 0 auto' }}
                  >
                    <Mail size={15} /> Join list
                  </button>
                </div>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-dark-muted)',
                  lineHeight: 1.5,
                }}>
                  Zero spam. Unsubscribe anytime with one click.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
