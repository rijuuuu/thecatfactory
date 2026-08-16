import React, { useState } from 'react';
import { X, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { formatINR } from '../../utils/currency.js';
import { updateOrderStatus } from '../../api/orders.js';

export const OrderDetailModal = ({ isOpen, onClose, order, onStatusUpdated }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [note, setNote] = useState('');
  const [updating, setUpdating] = useState(false);

  if (!isOpen || !order) return null;

  const handleStatusChange = async (e) => {
    e.preventDefault();
    const newStatus = selectedStatus || order.status;
    setUpdating(true);

    try {
      await updateOrderStatus(order._id, { status: newStatus, note });
      setUpdating(false);
      if (onStatusUpdated) onStatusUpdated();
      onClose();
    } catch (err) {
      setUpdating(false);
      alert('Failed to update status: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        <div className="admin-modal-header">
          <div>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--color-factory-yellow)' }}>
              ORDER SPECIFICATION SHEET
            </span>
            <h2 style={{ fontSize: '1.6rem', color: 'white' }}>{order.orderNumber}</h2>
          </div>
          <button onClick={onClose} style={{ color: '#AAA' }} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#141414',
            padding: '12px 16px',
            border: '1px solid #333'
          }}>
            <div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#888' }}>CURRENT STATUS: </span>
              <StatusBadge status={order.status} />
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#AAA' }}>
              PLACED: {new Date(order.createdAt).toLocaleString('en-IN')}
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: '#141414', padding: '16px', border: '1px solid #333' }}>
              <h4 style={{ color: 'var(--color-factory-yellow)', fontSize: '0.9rem', marginBottom: '8px' }}>
                CUSTOMER CONTACT
              </h4>
              <p style={{ fontWeight: 'bold' }}>{order.customerInfo?.name}</p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#AAA' }}>{order.customerInfo?.email}</p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#AAA' }}>{order.customerInfo?.phone}</p>
            </div>

            <div style={{ backgroundColor: '#141414', padding: '16px', border: '1px solid #333' }}>
              <h4 style={{ color: 'var(--color-factory-yellow)', fontSize: '0.9rem', marginBottom: '8px' }}>
                SHIPPING DISPATCH DESTINATION
              </h4>
              <p style={{ fontSize: '0.85rem' }}>{order.shippingAddress?.street}</p>
              <p style={{ fontSize: '0.85rem', color: '#AAA' }}>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '8px' }}>ORDER LINE ITEMS</h4>
            <div style={{ border: '1px solid #333' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Size / Color</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 'bold' }}>{item.name}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{item.size} / {item.color}</td>
                      <td>{item.qty}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}>{formatINR(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment & Status Form */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '16px',
            backgroundColor: '#141414',
            padding: '16px',
            border: '1px solid #333'
          }}>
            <div>
              <h4 style={{ color: 'var(--color-factory-yellow)', fontSize: '0.9rem', marginBottom: '8px' }}>
                PAYMENT SUMMARY
              </h4>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                Method: <strong>{order.paymentMethod}</strong>
              </p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                Payment Status: <strong style={{ color: order.paymentStatus === 'Paid' ? '#4CAF50' : '#FF9800' }}>{order.paymentStatus}</strong>
              </p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '1.2rem', fontWeight: 800, marginTop: '8px', color: 'white' }}>
                Total: {formatINR(order.totalAmount)}
              </p>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleStatusChange} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label" style={{ color: 'white' }}>UPDATE PACKAGE STATUS</label>
              <select
                value={selectedStatus || order.status}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-select"
                style={{ backgroundColor: '#1E1E1E', color: 'white', borderColor: '#444' }}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <input
                type="text"
                placeholder="Log note (e.g. Dispatched via BlueDart AWB #9482)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="form-input"
                style={{ backgroundColor: '#1E1E1E', color: 'white', borderColor: '#444', fontSize: '0.8rem' }}
              />

              <button type="submit" disabled={updating} className="btn-primary" style={{ marginTop: '4px' }}>
                <RefreshCw size={14} /> {updating ? 'UPDATING...' : 'UPDATE ORDER STATUS'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
