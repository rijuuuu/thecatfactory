import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { QCBadge } from '../../assets/QCBadge.jsx';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <CatMascot width={48} height={48} fillColor="#FAF7F0" accentColor="#E8B923" />
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--color-factory-yellow)', lineHeight: 0.9 }}>
                  THE CAT FACTORY
                </h3>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'var(--color-rust)', fontWeight: 'bold' }}>
                  INDUSTRIAL APPAREL & QC STAMPED GEAR
                </span>
              </div>
            </div>
            <p style={{ fontFamily: 'Archivo', fontSize: '0.9rem', color: '#A0A0A0', marginBottom: '20px', maxWidth: '360px' }}>
              Built around an industrial factory motif. Every garment is crafted in small batches, pre-shrunk, and quality inspected before dispatch.
            </p>
            <QCBadge text="100% QC PASSED" batch="UNIT #04 MUMBAI DOCKS" rotate={-2} />
          </div>

          {/* Shop Links */}
          <div className="footer-col">
            <h4>SHOP CATALOG</h4>
            <ul className="footer-links">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=Hoodies">Fleece & Hoodies</Link></li>
              <li><Link to="/shop?category=Tees">Heavyweight Tees</Link></li>
              <li><Link to="/shop?category=Bottoms">Utility Cargoes</Link></li>
              <li><Link to="/shop?category=Outerwear">Chore Jackets</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>FACTORY NAV</h4>
            <ul className="footer-links">
              <li><Link to="/about">About The Factory</Link></li>
              <li><Link to="/track">Track Package Status</Link></li>
              <li><Link to="/contact">Contact & Help FAQ</Link></li>
              <li><Link to="/account">Customer Account</Link></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="footer-col">
            <h4>QC GUARANTEE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#C0C0C0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--color-factory-yellow)" />
                <span>Express Pan-India Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={16} color="var(--color-factory-yellow)" />
                <span>7-Day No-Hassle Returns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--color-factory-yellow)" />
                <span>QC Stamp Verified Items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} THE CAT FACTORY APPAREL CO. ALL RIGHTS RESERVED.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>PAYMENT SECURED VIA UPI / CARDS / COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
