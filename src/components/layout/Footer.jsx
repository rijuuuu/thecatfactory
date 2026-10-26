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
              <CatMascot width={40} height={40} fillColor="var(--color-dark-text)" accentColor="var(--color-accent)" />
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 300,
                  letterSpacing: '0.14em',
                  color: 'var(--color-dark-text)',
                  lineHeight: 1,
                }}>
                  THE CAT FACTORY
                </h3>
                <span style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-dark-muted)',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                }}>
                  INDUSTRIAL APPAREL & QC STAMPED GEAR
                </span>
              </div>
            </div>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--color-dark-muted)',
              marginBottom: '20px',
              maxWidth: '320px',
              lineHeight: 1.65,
            }}>
              Built around an industrial factory motif. Every garment is crafted in small batches,
              pre-shrunk, and quality inspected before dispatch.
            </p>
            <QCBadge text="100% QC PASSED" batch="UNIT #04 MUMBAI DOCKS" rotate={-2} />
          </div>

          {/* Shop Links */}
          <div className="footer-col">
            <h4>Shop Catalog</h4>
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
            <h4>Factory Nav</h4>
            <ul className="footer-links">
              <li><Link to="/about">About The Factory</Link></li>
              <li><Link to="/track">Track Package</Link></li>
              <li><Link to="/contact">Contact & FAQ</Link></li>
              <li><Link to="/account">My Account</Link></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="footer-col">
            <h4>QC Guarantee</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--color-dark-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={15} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>Express Pan-India Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={15} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>7-Day No-Hassle Returns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={15} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>QC Stamp Verified Items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The Cat Factory Apparel Co. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Secured via UPI / Cards / COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
