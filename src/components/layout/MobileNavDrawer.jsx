import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';

export const MobileNavDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay open" onClick={onClose}>
      <div 
        className="cart-drawer open" 
        onClick={(e) => e.stopPropagation()}
        style={{ left: 0, right: 'auto', borderRight: 'var(--border-thick)', borderLeft: 'none' }}
      >
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CatMascot width={32} height={32} />
            <h2>NAV MENU</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close Mobile Nav">
            <X size={18} />
          </button>
        </div>

        <div className="cart-items-list" style={{ gap: '12px', padding: '24px' }}>
          <Link to="/" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            Home Catalog <ArrowRight size={16} />
          </Link>
          <Link to="/shop" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            All Shop Products <ArrowRight size={16} />
          </Link>
          <Link to="/shop?category=Hoodies" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            Hoodies & Fleece <ArrowRight size={16} />
          </Link>
          <Link to="/shop?category=Tees" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            Heavyweight Tees <ArrowRight size={16} />
          </Link>
          <Link to="/shop?category=Bottoms" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            Cargoes & Shorts <ArrowRight size={16} />
          </Link>
          <Link to="/shop?category=Outerwear" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            Workwear Outerwear <ArrowRight size={16} />
          </Link>
          <Link to="/about" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            About Factory <ArrowRight size={16} />
          </Link>
          <Link to="/contact" onClick={onClose} className="btn-secondary" style={{ justifyContent: 'space-between' }}>
            Contact & FAQ <ArrowRight size={16} />
          </Link>

          <div style={{ marginTop: '20px', borderTop: 'var(--border-dashed)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/track" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} color="var(--color-rust)" />
              Track Package Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
