import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award, PackageCheck } from 'lucide-react';

export const MarqueeStrip = () => {
  const items = [
    { icon: <Truck size={16} />, text: "FREE EXPRESS SHIPPING OVER ₹1,999" },
    { icon: <PackageCheck size={16} />, text: "QUALITY INSPECTED BEFORE DISPATCH" },
    { icon: <RotateCcw size={16} />, text: "7-DAY EASY RETURNS" },
    { icon: <Award size={16} />, text: "400 GSM HEAVYWEIGHT COTTON" },
    { icon: <ShieldCheck size={16} />, text: "100% AUTHENTIC INDUSTRIAL STREETWEAR" }
  ];

  return (
    <div className="marquee-strip">
      <div className="marquee-content">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="highlight">{item.icon}</span>
            <span>{item.text}</span>
            <span style={{ color: 'var(--color-rust)', margin: '0 8px' }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
