import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/admin/Sidebar.jsx';
import { Topbar } from '../../components/admin/Topbar.jsx';
import { fetchCustomers } from '../../api/customers.js';
import { Users, Search, RefreshCw } from 'lucide-react';
import { formatINR } from '../../utils/currency.js';

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data.customers || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar title="CUSTOMER ROSTER & ANALYTICS" />

        <div className="admin-content">
          <div className="table-container">
            <div className="table-header-tools">
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-search-input"
              />

              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#AAA' }}>
                TOTAL REGISTERED OPERATORS: <strong>{customers.length}</strong>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'JetBrains Mono' }}>
                <RefreshCw size={24} className="spin" style={{ marginBottom: '8px' }} />
                <div>FETCHING CUSTOMER ROSTER...</div>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'JetBrains Mono', color: '#888' }}>
                NO CUSTOMER RECORDS MATCHING SEARCH QUERY.
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Email Address</th>
                    <th>Mobile Phone</th>
                    <th>Orders Completed</th>
                    <th>Total Spent</th>
                    <th>Account Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((cust) => (
                    <tr key={cust._id}>
                      <td style={{ fontWeight: 'bold', color: 'white' }}>{cust.name}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--color-factory-yellow)' }}>
                        {cust.email}
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                        {cust.phone || 'N/A'}
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}>
                        {cust.orderCount || 1} order(s)
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 'bold', color: '#4CAF50' }}>
                        {formatINR(cust.totalSpent || 0)}
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#888' }}>
                        {new Date(cust.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
