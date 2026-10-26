import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award, PackageCheck } from 'lucide-react';

export const MarqueeStrip = () => {
  const items = [
    { icon: <Truck size={14} />, text: "Free express shipping over ₹1,999" },
    { icon: <PackageCheck size={14} />, text: "Quality inspected before dispatch" },
    { icon: <RotateCcw size={14} />, text: "7-day easy returns" },
    { icon: <Award size={14} />, text: "400 GSM heavyweight cotton" },
    { icon: <ShieldCheck size={14} />, text: "100% authentic industrial streetwear" },
  ];

  return (
    <div className="marquee-strip">
      <div className="marquee-content">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="highlight">{item.icon}</span>
            <span>{item.text}</span>
            <span style={{ color: 'var(--color-border-strong)', margin: '0 6px' }}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
};
