import React, { useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar.jsx';
import { Topbar } from '../../components/admin/Topbar.jsx';
import { ProductFormModal } from '../../components/admin/ProductFormModal.jsx';
import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts.js';
import { deleteProduct } from '../../api/products.js';
import { formatINR } from '../../utils/currency.js';

export const Products = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const { products, loading, refetch } = useProducts({
    search: search || undefined,
    category: categoryFilter !== 'All' ? categoryFilter : undefined
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (prod) => {
    setSelectedProduct(prod);
    setIsFormOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} from the catalog?`)) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        alert('Failed to delete product: ' + (err.message || 'Error occurred'));
      }
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar title="PRODUCT CATALOG MANAGEMENT" />

        <div className="admin-content">
          <div className="table-container">
            {/* Header Control Bar */}
            <div className="table-header-tools">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search by product name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="admin-search-input"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="form-select"
                  style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333', padding: '8px 12px', fontSize: '0.85rem', width: 'auto' }}
                >
                  <option value="All">All Categories</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Tees">Tees</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Outerwear">Outerwear</option>
                </select>
              </div>

              <button onClick={handleAddNew} className="btn-primary" id="admin-add-product-btn">
                <Plus size={16} /> STAGE NEW PRODUCT
              </button>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'JetBrains Mono' }}>
                <RefreshCw size={24} className="spin" style={{ marginBottom: '8px' }} />
                <div>FETCHING PRODUCT STAGING DATA...</div>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product Spec</th>
                    <th>Category</th>
                    <th>Price / MRP</th>
                    <th>Stock Units</th>
                    <th>Flags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod._id}>
                      <td>
                        <div style={{ fontWeight: 'bold', color: 'white' }}>{prod.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'JetBrains Mono' }}>{prod.slug}</div>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'var(--color-factory-yellow)' }}>
                          {prod.category}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono' }}>
                        <div style={{ fontWeight: 'bold' }}>{formatINR(prod.price)}</div>
                        <div style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#777' }}>{formatINR(prod.mrp)}</div>
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono' }}>
                        <span style={{
                          fontWeight: 'bold',
                          color: prod.stock <= 5 ? '#FF5252' : '#4CAF50'
                        }}>
                          {prod.stock} units
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {prod.isBestseller && <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--color-factory-yellow)', color: '#141414', padding: '2px 4px', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}>BEST</span>}
                          {prod.isNewArrival && <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--color-rust)', color: 'white', padding: '2px 4px', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}>NEW</span>}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(prod)}
                            style={{ color: 'var(--color-factory-yellow)' }}
                            title="Edit Product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(prod._id, prod.name)}
                            style={{ color: '#FF5252' }}
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={selectedProduct}
        onSuccess={refetch}
      />
    </div>
  );
};
