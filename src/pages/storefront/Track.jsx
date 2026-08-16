import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock, MapPin, Package, RefreshCw, Truck } from 'lucide-react';
import { fetchCurrentOrders } from '../../api/orders.js';
import { StatusBadge } from '../../components/admin/StatusBadge.jsx';
import { formatINR } from '../../utils/currency.js';

const TRACKING_STEPS = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

const getStepIndex = (status) => {
  if (status === 'Cancelled') return -1;
  const index = TRACKING_STEPS.indexOf(status);
  return index >= 0 ? index : 0;
};

const OrderTimeline = ({ status }) => {
  const currentIndex = getStepIndex(status);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', textAlign: 'center', maxWidth: '620px', margin: '0 auto' }}>
      {TRACKING_STEPS.map((step, idx) => {
        const isCompleted = currentIndex >= idx;
        return (
          <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: isCompleted ? 'var(--color-factory-yellow)' : 'white',
              border: '2px solid #141414',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: 'JetBrains Mono',
              fontSize: '0.85rem'
            }}>
              {idx + 1}
            </div>
            <span style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '0.72rem',
              fontWeight: 800,
              marginTop: '8px',
              color: isCompleted ? '#141414' : '#888',
              lineHeight: 1.2
            }}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const Track = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Read logged-in customer from localStorage
  const customer = (() => {
    try {
      const saved = localStorage.getItem('tcf_customer');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  })();

  const loadOrders = async () => {
    if (!customer?.email) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetchCurrentOrders(customer.email);
      if (res.success) {
        setOrders(res.orders || []);
      } else {
        throw new Error(res.message || 'Unable to load current orders.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to load current orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customer?.email) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="track-page" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="section-header">
          <div>
            <span className="subtitle">LIVE LOGISTICS DISPATCH TRACKER</span>
            <h2>CURRENT PACKAGE DISPATCHES</h2>
          </div>
          <button type="button" onClick={loadOrders} disabled={loading} className="btn-secondary">
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> REFRESH
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#3A1515',
            color: '#FF7777',
            padding: '16px',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.85rem',
            border: '2px solid #C62828',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {loading ? (
          <div style={{
            backgroundColor: 'var(--color-off-white)',
            border: 'var(--border-thick)',
            padding: '40px',
            boxShadow: 'var(--shadow-flat)',
            textAlign: 'center',
            fontFamily: 'JetBrains Mono',
            fontWeight: 800
          }}>
            <RefreshCw size={24} className="spin" style={{ marginBottom: '10px' }} />
            <div>FETCHING CURRENT DISPATCHES...</div>
          </div>
        ) : !customer ? (
          <div style={{
            backgroundColor: 'var(--color-off-white)',
            border: 'var(--border-thick)',
            padding: '48px 40px',
            boxShadow: 'var(--shadow-flat)',
            textAlign: 'center'
          }}>
            <Package size={42} color="var(--color-rust)" />
            <h3 style={{ fontSize: '1.6rem', marginTop: '12px' }}>LOGIN TO TRACK YOUR ORDERS</h3>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: '#666', marginTop: '8px', marginBottom: '24px' }}>
              Sign in to your account to see your personal package dispatches.
            </p>
            <a href="/account" className="btn-primary">SIGN IN TO ACCOUNT</a>
          </div>
        ) : orders.length === 0 ? (
          <div style={{
            backgroundColor: 'var(--color-off-white)',
            border: 'var(--border-thick)',
            padding: '40px',
            boxShadow: 'var(--shadow-flat)',
            textAlign: 'center'
          }}>
            <Package size={42} color="var(--color-rust)" />
            <h3 style={{ fontSize: '1.6rem', marginTop: '12px' }}>NO CURRENT ORDERS FOUND</h3>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: '#666', marginTop: '6px' }}>
              New package dispatches will appear here automatically.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {orders.map((order) => (
              <div key={order._id || order.orderNumber} style={{
                backgroundColor: 'var(--color-off-white)',
                border: 'var(--border-thick)',
                padding: 'var(--space-xl)',
                boxShadow: 'var(--shadow-flat)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  alignItems: 'flex-start',
                  borderBottom: 'var(--border-thick)',
                  paddingBottom: '16px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--color-rust)', fontWeight: 800 }}>
                      ORDER # {order.orderNumber}
                    </span>
                    <h3 style={{ fontSize: '1.7rem', marginTop: '4px' }}>
                      PACKAGE STATUS: <StatusBadge status={order.status} />
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#666' }}>
                      <span><Clock size={13} style={{ verticalAlign: '-2px' }} /> {new Date(order.createdAt).toLocaleString('en-IN')}</span>
                      {order.shippingAddress?.city && (
                        <span><MapPin size={13} style={{ verticalAlign: '-2px' }} /> {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                      )}
                    </div>
                  </div>

                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div>Total: <strong>{formatINR(order.totalAmount)}</strong></div>
                    <div style={{ color: '#666', fontSize: '0.75rem' }}>{order.paymentMethod} • {order.paymentStatus}</div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--color-warehouse-cream)',
                  border: 'var(--border-thick)',
                  padding: 'var(--space-lg)',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <OrderTimeline status={order.status} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '10px' }}>ITEMS IN DISPATCH</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items?.map((item, idx) => (
                        <div key={`${item.name}-${idx}`} style={{
                          padding: '10px',
                          backgroundColor: 'white',
                          border: '1px solid var(--color-hairline)',
                          fontFamily: 'JetBrains Mono',
                          fontSize: '0.78rem'
                        }}>
                          <strong>{item.qty}x {item.name}</strong>
                          <div style={{ color: '#666', marginTop: '2px' }}>Size {item.size} • {item.color}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '10px' }}>LATEST TRACKING HISTORY</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(order.trackingHistory || []).slice(-3).reverse().map((log, idx) => (
                        <div key={idx} style={{
                          padding: '10px',
                          backgroundColor: 'white',
                          border: '1px solid var(--color-hairline)',
                          fontFamily: 'JetBrains Mono',
                          fontSize: '0.78rem'
                        }}>
                          <div style={{ fontWeight: 800 }}>{log.status}</div>
                          <div style={{ color: '#666', fontSize: '0.72rem', marginTop: '2px' }}>{log.note}</div>
                          <div style={{ color: 'var(--color-rust)', fontSize: '0.68rem', marginTop: '4px' }}>
                            <Truck size={12} style={{ verticalAlign: '-2px' }} /> {log.location} • {new Date(log.timestamp).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
