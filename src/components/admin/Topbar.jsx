import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const Topbar = ({ title }) => {
  return (
    <div className="admin-topbar">
      <h1>{title}</h1>
      <div className="admin-topbar-actions">
        <span style={{ 
          fontFamily: 'JetBrains Mono', 
          fontSize: '0.75rem', 
          color: '#4CAF50', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px' 
        }}>
          <ShieldCheck size={14} /> LIVE API CONNECTED
        </span>
        <Link 
          to="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary" 
          style={{ 
            padding: '6px 14px', 
            fontSize: '0.75rem',
            backgroundColor: '#1E1E1E',
            color: 'white',
            borderColor: '#333'
          }}
        >
          VIEW STOREFRONT <ExternalLink size={13} />
        </Link>
      </div>
    </div>
  );
};
