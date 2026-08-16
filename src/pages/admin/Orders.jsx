import React, { useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar.jsx';
import { Topbar } from '../../components/admin/Topbar.jsx';
import { StatusBadge } from '../../components/admin/StatusBadge.jsx';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal.jsx';
import { Eye, Search, Filter, RefreshCw } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders.js';
import { formatINR } from '../../utils/currency.js';

export const Orders = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const { orders, loading, refetch } = useOrders({
    search: search || undefined,
    status: statusFilter !== 'All' ? statusFilter : undefined
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewOrder = (ord) => {
    setSelectedOrder(ord);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar title="CUSTOMER ORDER DISPATCHES" />

        <div className="admin-content">
          <div className="table-container">
            {/* Table Header Filter Tools */}
            <div className="table-header-tools">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search order ID, email, name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="admin-search-input"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select"
                  style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333', padding: '8px 12px', fontSize: '0.85rem', width: 'auto' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#AAA' }}>
                TOTAL ORDERS: <strong>{orders.length}</strong>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'JetBrains Mono' }}>
                <RefreshCw size={24} className="spin" style={{ marginBottom: '8px' }} />
                <div>FETCHING ORDER DISPATCH LIST...</div>
              </div>
            ) : orders.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'JetBrains Mono', color: '#888' }}>
                NO ORDERS FOUND MATCHING FILTER SPECIFICATIONS.
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Customer Info</th>
                    <th>Items Staged</th>
                    <th>Total Amount</th>
                    <th>Payment</th>
                    <th>Dispatch Status</th>
                    <th>Timestamp</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord._id}>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 'bold', color: 'var(--color-factory-yellow)' }}>
                        {ord.orderNumber}
                      </td>
                      <td>
                        <div style={{ fontWeight: 'bold' }}>{ord.customerInfo?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'JetBrains Mono' }}>{ord.customerInfo?.email}</div>
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
                        {ord.items?.length || 0} line item(s)
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}>
                        {formatINR(ord.totalAmount)}
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
                        <div>{ord.paymentMethod}</div>
                        <div style={{ fontSize: '0.7rem', color: ord.paymentStatus === 'Paid' ? '#4CAF50' : '#FF9800' }}>
                          {ord.paymentStatus}
                        </div>
                      </td>
                      <td>
                        <StatusBadge status={ord.status} />
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#888' }}>
                        {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewOrder(ord)}
                          style={{ color: 'var(--color-factory-yellow)', padding: '6px', border: '1px solid #333', backgroundColor: '#141414' }}
                          title="Inspect Order Details"
                        >
                          <Eye size={16} /> Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Order Specification Modal */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onStatusUpdated={refetch}
      />
    </div>
  );
};
