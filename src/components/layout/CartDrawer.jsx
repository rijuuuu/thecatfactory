import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { formatINR } from '../../utils/currency.js';

export const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQty, subtotal } = useCart();
  const navigate = useNavigate();

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
      />
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={18} style={{ color: 'var(--color-text-muted)' }} />
            <h2>Cart ({cartItems.length})</h2>
          </div>
          <button className="icon-btn" onClick={closeCart} aria-label="Close Cart">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{
          backgroundColor: 'var(--color-surface-soft)',
          padding: '10px 16px',
          borderBottom: '1px solid var(--color-border)',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
        }}>
          {remainingForFreeShipping > 0 ? (
            <span>
              Add <strong style={{ color: 'var(--color-text)' }}>{formatINR(remainingForFreeShipping)}</strong> more for{' '}
              <strong style={{ color: 'var(--color-accent)' }}>free express shipping</strong>
            </span>
          ) : (
            <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              ✓ You've unlocked free express shipping!
            </span>
          )}
          <div style={{
            height: '3px',
            backgroundColor: 'var(--color-border)',
            marginTop: '8px',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: 'var(--color-accent)',
              borderRadius: '999px',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* Cart Items List */}
        {cartItems.length === 0 ? (
          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 32px',
            textAlign: 'center',
          }}>
            <CatMascot width={80} height={80} expression="sharp" fillColor="var(--color-text-faint)" accentColor="var(--color-accent)" />
            <h3 style={{ marginTop: '20px', fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.04em' }}>
              Your cart is empty
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '8px 0 24px', lineHeight: 1.6 }}>
              No items staged in your dispatch queue yet.
            </p>
            <Link to="/shop" onClick={closeCart} className="btn-primary">
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={`${item.product._id}-${item.size}-${item.color}-${index}`} className="cart-item">
                <div
                  className="cart-item-img"
                  style={{ backgroundColor: item.cardBgColor || 'var(--color-surface-warm)' }}
                >
                  <CatMascot
                    width={46}
                    height={46}
                    fillColor={item.printColor || 'var(--color-text)'}
                    accentColor="var(--color-accent)"
                  />
                </div>
                <div className="cart-item-info">
                  <span className="cart-item-title">{item.product.name}</span>
                  <span className="cart-item-spec">
                    {item.size} · {item.color}
                  </span>
                  <div className="cart-qty-stepper">
                    <button onClick={() => updateQty(index, -1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(index, 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-text)' }}>
                    {formatINR(item.product.price * item.qty)}
                  </span>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{ color: 'var(--color-text-faint)', transition: 'color var(--transition-fast)' }}
                    aria-label="Remove item"
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-danger)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-faint)'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span style={{ color: remainingForFreeShipping === 0 ? 'var(--color-accent)' : 'inherit' }}>
                {remainingForFreeShipping === 0 ? 'Free' : formatINR(149)}
              </span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>{formatINR(subtotal + (remainingForFreeShipping === 0 ? 0 : 149))}</span>
            </div>
            <button
              className="btn-primary"
              onClick={handleCheckoutClick}
              style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
              id="cart-checkout-cta"
            >
              Proceed to Checkout <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
