import React, { useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar.jsx';
import { Topbar } from '../../components/admin/Topbar.jsx';
import { StatCard } from '../../components/admin/StatCard.jsx';
import { StatusBadge } from '../../components/admin/StatusBadge.jsx';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal.jsx';
import { DollarSign, ShoppingBag, Package, AlertTriangle, Eye, ArrowUpRight } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders.js';
import { useProducts } from '../../hooks/useProducts.js';
import { formatINR } from '../../utils/currency.js';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { orders, loading: ordersLoading, refetch: refetchOrders } = useOrders();
  const { products, loading: productsLoading } = useProducts();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalRevenue = orders.reduce((acc, ord) => acc + (ord.totalAmount || 0), 0);
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const handleViewOrder = (ord) => {
    setSelectedOrder(ord);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar title="OVERVIEW DASHBOARD" />

        <div className="admin-content">
          {/* Stat Cards Grid */}
          <div className="stat-cards-grid">
            <StatCard
              title="TOTAL STORE REVENUE"
              value={formatINR(totalRevenue)}
              icon={DollarSign}
              trend="+18.4%"
              note="vs last week"
            />
            <StatCard
              title="TOTAL DISPATCH ORDERS"
              value={orders.length}
              icon={ShoppingBag}
              trend="+12 new"
              note="today"
            />
            <StatCard
              title="CATALOG PRODUCTS"
              value={products.length}
              icon={Package}
              trend="All Staged"
              note="QC verified"
            />
            <StatCard
              title="LOW STOCK WATCHLIST"
              value={lowStockProducts.length}
              icon={AlertTriangle}
              trend={lowStockProducts.length > 0 ? "Action Req" : "Optimal"}
              trendType={lowStockProducts.length > 0 ? "warning" : "positive"}
              note="<= 5 units remaining"
            />
          </div>

          {/* Grid Layout: Recent Orders & Low Stock Watchlist */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
            {/* Recent Orders Table */}
            <div className="table-container">
              <div className="table-header-tools">
                <h3 style={{ fontSize: '1.2rem', color: 'white' }}>RECENT CUSTOMER DISPATCH ORDERS</h3>
                <Link to="/admin/orders" style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--color-factory-yellow)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  VIEW ALL ORDERS <ArrowUpRight size={14} />
                </Link>
              </div>

              {ordersLoading ? (
                <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'JetBrains Mono' }}>LOADING DISPATCH ORDERS...</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord._id}>
                        <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 'bold', color: 'var(--color-factory-yellow)' }}>
                          {ord.orderNumber}
                        </td>
                        <td>
                          <div>{ord.customerInfo?.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'JetBrains Mono' }}>{ord.customerInfo?.email}</div>
                        </td>
                        <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}>{formatINR(ord.totalAmount)}</td>
                        <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{ord.paymentMethod}</td>
                        <td><StatusBadge status={ord.status} /></td>
                        <td>
                          <button
                            onClick={() => handleViewOrder(ord)}
                            style={{ color: 'var(--color-factory-yellow)', padding: '4px' }}
                            title="Inspect Order Specification Sheet"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Low Stock Watchlist Widget */}
            <div style={{ backgroundColor: '#1E1E1E', border: '1px solid #2D2D2D', padding: 'var(--space-lg)' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={18} color="#FF9800" /> LOW STOCK WATCHLIST
              </h3>

              {lowStockProducts.length === 0 ? (
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#888' }}>
                  All garment inventories are optimally stocked above 5 units.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {lowStockProducts.map((p) => (
                    <div key={p._id} style={{
                      padding: '10px',
                      backgroundColor: '#141414',
                      border: '1px solid #333',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.8rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: 'white' }}>{p.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-rust)' }}>{p.batchNumber}</div>
                      </div>
                      <span style={{
                        backgroundColor: '#3A1515',
                        color: '#FF5252',
                        padding: '2px 8px',
                        fontWeight: 'bold',
                        border: '1px solid #FF5252'
                      }}>
                        {p.stock} LEFT
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onStatusUpdated={refetchOrders}
      />
    </div>
  );
};
