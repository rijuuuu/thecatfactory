import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck } from 'lucide-react';

export const TopUtilityBar = () => {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-promo">
          <Truck size={13} />
          <span>Free express shipping on all orders over ₹1,999 · Quality inspected</span>
        </div>
        <div className="top-bar-links">
          <Link to="/track" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={13} />
            Track Order
          </Link>
          <Link to="/contact">Help & FAQ</Link>
        </div>
      </div>
    </div>
  );
};
