import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Package, SlidersHorizontal } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';

export const MobileNavDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'All Products' },
    { to: '/shop?openFilter=1', label: 'Filter & Search Products', icon: <SlidersHorizontal size={15} style={{ color: 'var(--color-accent)' }} /> },
    { to: '/shop?category=Hoodies', label: 'Hoodies & Fleece' },
    { to: '/shop?category=Tees', label: 'Heavyweight Tees' },
    { to: '/shop?category=Bottoms', label: 'Cargoes & Bottoms' },
    { to: '/shop?category=Outerwear', label: 'Outerwear' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact & FAQ' },
    { to: '/track', label: 'Track Order' },
  ];

  return (
    <div
      className="cart-drawer-overlay open"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '85%',
          maxWidth: '320px',
          height: '100vh',
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: 'var(--space-lg)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-surface)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CatMascot width={30} height={30} fillColor="var(--color-text)" accentColor="var(--color-accent)" />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Navigation
            </span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close Mobile Nav">
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px var(--space-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                fontWeight: 400,
                color: 'var(--color-text)',
                transition: 'background-color var(--transition-fast)',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {link.icon}
                {link.label}
              </span>
              <ArrowRight size={14} style={{ color: 'var(--color-text-faint)' }} />
            </Link>
          ))}
        </nav>

        {/* Footer tag */}
        <div style={{
          padding: 'var(--space-md) var(--space-lg)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Package size={14} style={{ color: 'var(--color-accent)' }} />
          <span style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-faint)',
            letterSpacing: '0.06em',
          }}>
            FREE SHIPPING OVER ₹1,999
          </span>
        </div>
      </div>
    </div>
  );
};
