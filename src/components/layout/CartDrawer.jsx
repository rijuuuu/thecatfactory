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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} />
            <h2>FACTORY CART ({cartItems.length})</h2>
          </div>
          <button className="icon-btn" onClick={closeCart} aria-label="Close Cart">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{
          backgroundColor: 'var(--color-ink-black)',
          color: 'white',
          padding: '10px 16px',
          fontFamily: 'JetBrains Mono',
          fontSize: '0.75rem'
        }}>
          {remainingForFreeShipping > 0 ? (
            <span>Add <strong>{formatINR(remainingForFreeShipping)}</strong> more for <strong>FREE EXPRESS SHIPPING</strong></span>
          ) : (
            <span style={{ color: 'var(--color-factory-yellow)' }}>🎉 CONGRATS! YOU UNLOCKED FREE EXPRESS SHIPPING</span>
          )}
          <div style={{
            height: '4px',
            backgroundColor: '#333',
            marginTop: '6px',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: 'var(--color-factory-yellow)',
              transition: 'width 0.3s ease'
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
            padding: '32px',
            textAlign: 'center'
          }}>
            <CatMascot width={90} height={90} expression="sharp" fillColor="#8E8A81" />
            <h3 style={{ marginTop: '16px', fontSize: '1.4rem' }}>YOUR CART IS EMPTY</h3>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'var(--color-gray-subtle)', margin: '8px 0 24px' }}>
              No apparel staged in your dispatch queue.
            </p>
            <Link to="/shop" onClick={closeCart} className="btn-primary">
              EXPLORE CATALOG
            </Link>
          </div>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={`${item.product._id}-${item.size}-${item.color}-${index}`} className="cart-item">
                <div 
                  className="cart-item-img" 
                  style={{ backgroundColor: item.cardBgColor || '#EAE5DB' }}
                >
                  <CatMascot 
                    width={50} 
                    height={50} 
                    fillColor={item.printColor || '#141414'} 
                    accentColor="#E8B923"
                  />
                </div>
                <div className="cart-item-info">
                  <span className="cart-item-title">{item.product.name}</span>
                  <span className="cart-item-spec">
                    SIZE: <strong>{item.size}</strong> | COLOR: <strong>{item.color}</strong>
                  </span>
                  <div className="cart-qty-stepper">
                    <button onClick={() => updateQty(index, -1)} aria-label="Decrease quantity">-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(index, 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '0.95rem' }}>
                    {formatINR(item.product.price * item.qty)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(index)}
                    style={{ color: 'var(--color-rust)', opacity: 0.8 }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
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
              <span>Estimated Shipping</span>
              <span>{remainingForFreeShipping === 0 ? 'FREE' : formatINR(149)}</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>{formatINR(subtotal + (remainingForFreeShipping === 0 ? 0 : 149))}</span>
            </div>
            <button 
              className="btn-primary" 
              onClick={handleCheckoutClick}
              style={{ width: '100%', marginTop: '16px' }}
              id="cart-checkout-cta"
            >
              PROCEED TO CHECKOUT <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
