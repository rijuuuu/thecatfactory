import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, trend, trendType = 'positive', note }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && <Icon size={18} color="var(--color-factory-yellow)" />}
      </div>
      <div className="stat-card-value">{value}</div>
      {(trend || note) && (
        <div className={`stat-card-trend ${trendType}`}>
          {trendType === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trend}</span>
          {note && <span style={{ color: '#888', fontWeight: 400, marginLeft: '4px' }}>{note}</span>}
        </div>
      )}
    </div>
  );
};
