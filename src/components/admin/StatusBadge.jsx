import React from 'react';

export const StatusBadge = ({ status }) => {
  const normalize = (status || 'Processing').toLowerCase();
  
  let badgeClass = 'processing';
  if (normalize === 'shipped' || normalize === 'out for delivery') badgeClass = 'shipped';
  if (normalize === 'delivered') badgeClass = 'delivered';
  if (normalize === 'cancelled') badgeClass = 'cancelled';

  return (
    <span className={`status-badge ${badgeClass}`}>
      • {status}
    </span>
  );
};
