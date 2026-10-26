import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { createOrder } from '../../api/orders.js';
import { formatINR } from '../../utils/currency.js';

export const Checkout = ({ onToast }) => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'UPI'
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const shippingFee = subtotal >= 1999 || subtotal === 0 ? 0 : 149;
  const totalAmount = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 400, marginBottom: '12px' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '12px 0 24px' }}>Add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn-primary">Explore catalog</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const orderPayload = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: cartItems.map(item => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          size: item.size,
          color: item.color,
          qty: item.qty,
          cardBgColor: item.cardBgColor,
          printColor: item.printColor
        })),
        subtotal,
        shippingFee,
        totalAmount,
        paymentMethod: formData.paymentMethod
      };

      const res = await createOrder(orderPayload);

      if (res.success && res.order) {
        clearCart();
        if (onToast) onToast('Order submitted successfully! QC verification started.', 'success');
        navigate(`/order-confirmation?orderNumber=${res.order.orderNumber}`);
      } else {
        throw new Error(res.message || 'Failed to place order');
      }
    } catch (err) {
      setSubmitting(false);
      setError(err.response?.data?.message || err.message || 'Error processing your checkout.');
    }
  };

  return (
    <div className="checkout-page" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="subtitle">Secure Order</span>
            <h2>Checkout & Delivery</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="checkout-layout">
            {/* Left Form Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              {error && (
                <div style={{
                  backgroundColor: 'rgba(196, 114, 90, 0.12)',
                  color: 'var(--color-rust)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(196, 114, 90, 0.3)',
                  fontSize: '0.88rem',
                }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Step 1: Customer Contact */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-xl)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}>
                    1
                  </span>
                  Contact Information
                </h3>

                <div className="form-row-2col">
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="form-input" 
                      placeholder="e.g. Aarav Sharma"
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
                    <label className="form-label">Mobile Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="form-input" 
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-xl)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}>
                    2
                  </span>
                  Delivery Address
                </h3>

                <div className="form-row-2col">
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Street Address & Flat / Building</label>
                    <input 
                      type="text" 
                      name="street" 
                      required 
                      value={formData.street} 
                      onChange={handleChange} 
                      className="form-input" 
                      placeholder="Flat 402, Sunshine Towers, Lower Parel"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input 
                      type="text" 
                      name="city" 
                      required 
                      value={formData.city} 
                      onChange={handleChange} 
                      className="form-input" 
                      placeholder="Mumbai"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State</label>
                    <select 
                      name="state" 
                      value={formData.state} 
                      onChange={handleChange} 
                      className="form-select"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pincode</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      required 
                      value={formData.pincode} 
                      onChange={handleChange} 
                      className="form-input" 
                      placeholder="400013"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-xl)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}>
                    3
                  </span>
                  Payment Method
                </h3>

                <div className="form-row-2col" style={{ gap: '12px' }}>
                  {[
                    { id: 'UPI', label: 'Instant UPI (GPay / PhonePe / Paytm)' },
                    { id: 'COD', label: 'Cash on Delivery (+₹0)' },
                    { id: 'Card', label: 'Credit or Debit Card' },
                    { id: 'NetBanking', label: 'Net Banking' }
                  ].map((method) => {
                    const isSel = formData.paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                        style={{
                          padding: '14px 16px',
                          border: isSel ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                          backgroundColor: isSel ? 'var(--color-accent-dim)' : 'var(--color-surface)',
                          borderRadius: 'var(--radius-lg)',
                          fontSize: '0.88rem',
                          fontWeight: isSel ? 600 : 400,
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          color: 'var(--color-text)',
                        }}
                      >
                        <span>{method.label}</span>
                        {isSel && <CheckCircle2 size={18} style={{ color: 'var(--color-accent)' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-xl)',
              boxShadow: 'var(--shadow-sm)',
              position: 'sticky',
              top: '90px'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                Order Summary ({cartItems.length} items)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '16px' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <div>
                      <div style={{ fontWeight: 500, color: 'var(--color-text)' }}>{item.product.name}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                        Size: {item.size} · Qty: {item.qty}
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                      {formatINR(item.product.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>Express Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatINR(shippingFee)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '14px',
                  marginTop: '6px',
                  color: 'var(--color-text)'
                }}>
                  <span>Total</span>
                  <span>{formatINR(totalAmount)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting} 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '20px', height: '48px', justifyContent: 'center' }}
                id="place-order-btn"
              >
                {submitting ? 'Submitting order…' : `Confirm Order (${formatINR(totalAmount)})`} <ArrowRight size={18} />
              </button>

              <div style={{
                marginTop: '16px',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <ShieldCheck size={15} style={{ color: 'var(--color-accent)' }} /> 256-bit encrypted secure checkout
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
