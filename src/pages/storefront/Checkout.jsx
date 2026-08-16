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
        <h2>YOUR CART IS EMPTY</h2>
        <p style={{ fontFamily: 'JetBrains Mono', margin: '12px 0 24px' }}>Add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn-primary">EXPLORE CATALOG</Link>
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
        if (onToast) onToast('Order submitted successfully! QC Verification started.', 'success');
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
            <span className="subtitle">FINAL DISPATCH STAGING</span>
            <h2>CHECKOUT & DISPATCH FORM</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: 'var(--space-2xl)',
            alignItems: 'start'
          }}>
            {/* Left Form Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              {error && (
                <div style={{ backgroundColor: '#3A1515', color: '#FF7777', padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Step 1: Customer Contact */}
              <div style={{
                backgroundColor: 'var(--color-off-white)',
                border: 'var(--border-thick)',
                padding: 'var(--space-lg)',
                boxShadow: 'var(--shadow-flat)'
              }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ backgroundColor: 'var(--color-ink-black)', color: 'var(--color-factory-yellow)', padding: '2px 8px', fontSize: '1rem' }}>1</span>
                  CONTACT DISPATCH DETAILS
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
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
                backgroundColor: 'var(--color-off-white)',
                border: 'var(--border-thick)',
                padding: 'var(--space-lg)',
                boxShadow: 'var(--shadow-flat)'
              }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ backgroundColor: 'var(--color-ink-black)', color: 'var(--color-factory-yellow)', padding: '2px 8px', fontSize: '1rem' }}>2</span>
                  SHIPPING DISPATCH DESTINATION
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Street Address & Flat / House No.</label>
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
                backgroundColor: 'var(--color-off-white)',
                border: 'var(--border-thick)',
                padding: 'var(--space-lg)',
                boxShadow: 'var(--shadow-flat)'
              }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ backgroundColor: 'var(--color-ink-black)', color: 'var(--color-factory-yellow)', padding: '2px 8px', fontSize: '1rem' }}>3</span>
                  SELECT PAYMENT METHOD
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {['UPI', 'COD', 'Card', 'NetBanking'].map((method) => {
                    const isSel = formData.paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                        style={{
                          padding: '14px',
                          border: isSel ? '2px solid var(--color-ink-black)' : '1px solid var(--color-hairline)',
                          backgroundColor: isSel ? 'var(--color-factory-yellow)' : 'white',
                          fontFamily: 'JetBrains Mono',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{method === 'UPI' ? '⚡ Instant UPI (GPay / PhonePe)' : method === 'COD' ? '💵 Cash on Delivery (+₹0)' : method === 'Card' ? '💳 Credit / Debit Card' : '🏦 Net Banking'}</span>
                        {isSel && <CheckCircle2 size={16} color="#141414" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div style={{
              backgroundColor: 'var(--color-off-white)',
              border: 'var(--border-thick)',
              padding: 'var(--space-lg)',
              boxShadow: 'var(--shadow-flat)',
              position: 'sticky',
              top: '90px'
            }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', borderBottom: 'var(--border-thick)', paddingBottom: '8px' }}>
                ORDER MANIFEST ({cartItems.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '16px' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontFamily: 'JetBrains Mono' }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{item.product.name}</div>
                      <div style={{ color: 'var(--color-gray-subtle)', fontSize: '0.75rem' }}>
                        SIZE: {item.size} | QTY: {item.qty}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800 }}>
                      {formatINR(item.product.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: 'var(--border-dashed)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Express Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  borderTop: 'var(--border-thick)',
                  paddingTop: '12px',
                  marginTop: '4px'
                }}>
                  <span>TOTAL AMOUNT</span>
                  <span>{formatINR(totalAmount)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting} 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '24px' }}
                id="place-order-btn"
              >
                {submitting ? 'STAGING ORDER...' : `CONFIRM ORDER (${formatINR(totalAmount)})`} <ArrowRight size={18} />
              </button>

              <div style={{
                marginTop: '16px',
                textAlign: 'center',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.7rem',
                color: 'var(--color-rust)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={14} /> 256-BIT ENCRYPTED FACTORY CHECKOUT
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
