import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, Package, ArrowRight } from 'lucide-react';
import { fetchOrderById } from '../../api/orders.js';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { QCBadge } from '../../assets/QCBadge.jsx';
import { formatINR } from '../../utils/currency.js';

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (orderNumber) {
        try {
          const res = await fetchOrderById(orderNumber);
          if (res.success && res.order) {
            setOrder(res.order);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderNumber]);

  return (
    <div className="order-confirmation-page" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{
          backgroundColor: 'var(--color-off-white)',
          border: 'var(--border-thick)',
          padding: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-flat)',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Top Stamp */}
          <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
            <QCBadge text="ORDER DISPATCHED" batch={orderNumber || 'TCF-PASSED'} rotate={-4} />
          </div>

          <CatMascot width={90} height={90} fillColor="#141414" accentColor="#E8B923" expression="cool" />

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2E7D32', fontFamily: 'JetBrains Mono', fontWeight: 800, marginTop: '16px' }}>
            <CheckCircle2 size={20} /> QC VERIFICATION & DISPATCH APPROVED
          </div>

          <h1 style={{ fontSize: '2.5rem', marginTop: '8px' }}>
            THANK YOU FOR YOUR ORDER!
          </h1>

          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--color-rust)', fontWeight: 800, margin: '8px 0 24px' }}>
            ORDER DISPATCH NUMBER: {orderNumber || 'TCF-948201'}
          </p>

          <p style={{ fontFamily: 'Archivo', fontSize: '0.95rem', color: '#444', maxWidth: '560px', margin: '0 auto 32px' }}>
            Your order has been staged at our Mumbai Warehouse Hub #04. Every item in your dispatch has passed quality control inspection.
          </p>

          {/* Status Stepper */}
          <div style={{
            backgroundColor: 'var(--color-warehouse-cream)',
            border: 'var(--border-thick)',
            padding: 'var(--space-lg)',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: 'var(--color-ink-black)', fontSize: '1rem', marginBottom: '16px' }}>
              DISPATCH STATUS TIMELINE
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-factory-yellow)', border: '2px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>1</div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 800, marginTop: '6px' }}>Order Placed</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#666' }}>QC Approved</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FFF', border: '2px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>2</div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 800, marginTop: '6px' }}>Packing</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#666' }}>Stamped #04</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FFF', border: '2px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>3</div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 800, marginTop: '6px' }}>In Transit</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#666' }}>Express AWB</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FFF', border: '2px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>4</div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 800, marginTop: '6px' }}>Delivered</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#666' }}>Doorstep</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/track" className="btn-primary">
              TRACK PACKAGE LIVE <Truck size={16} />
            </Link>
            <Link to="/shop" className="btn-secondary">
              CONTINUE SHOPPING <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
