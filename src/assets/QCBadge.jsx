import React from 'react';

export const QCBadge = ({ text = "QC PASSED", batch = "BATCH #04", rotate = -8 }) => {
  return (
    <div 
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid #8B3A2E',
        color: '#8B3A2E',
        backgroundColor: 'rgba(250, 247, 240, 0.95)',
        padding: '4px 10px',
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: '800',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '2px 2px 0px rgba(139, 58, 46, 0.3)',
        userSelect: 'none',
        lineHeight: 1.1
      }}
    >
      <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        ✓ {text}
      </span>
      <span style={{ fontSize: '0.6rem', color: '#141414', opacity: 0.8 }}>
        {batch}
      </span>
    </div>
  );
};
