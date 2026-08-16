import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.type === 'success' && <CheckCircle2 size={18} color="var(--color-factory-yellow)" />}
          {toast.type === 'error' && <AlertCircle size={18} color="var(--color-rust)" />}
          {toast.type === 'info' && <Info size={18} color="var(--color-factory-yellow)" />}
          <span>{toast.message}</span>
          <button 
            onClick={() => removeToast(toast.id)}
            style={{ color: '#AAA', marginLeft: 'auto' }}
            aria-label="Dismiss Notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
