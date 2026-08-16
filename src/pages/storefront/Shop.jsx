import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RefreshCw, X } from 'lucide-react';
import { ProductCard } from '../../components/storefront/ProductCard.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export const Shop = ({ onToast }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Query parameters state
  const categoryParam = searchParams.get('category') || 'All';
  const sizeParam = searchParams.get('size') || '';
  const colorParam = searchParams.get('color') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'newest';

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSize, setSelectedSize] = useState(sizeParam);
  const [selectedColor, setSelectedColor] = useState(colorParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [maxPrice, setMaxPrice] = useState(6000);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const apiParams = {
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    size: selectedSize || undefined,
    color: selectedColor || undefined,
    search: searchQuery || undefined,
    sort: sortBy,
    maxPrice: maxPrice < 6000 ? maxPrice : undefined
  };

  const { products, loading, refetch } = useProducts(apiParams);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('');
    setSelectedColor('');
    setSearchQuery('');
    setMaxPrice(6000);
    setSortBy('newest');
    setSearchParams({});
  };

  const categories = ['All', 'Hoodies', 'Tees', 'Bottoms', 'Outerwear'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'Cream', 'Yellow', 'Rust', 'Charcoal', 'Olive'];

  return (
    <div className="shop-page" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div className="section-header">
          <div>
            <span className="subtitle">THE CAT FACTORY // CATALOG STAGING</span>
            <h2>ALL STREETWEAR PRODUCTS</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', fontWeight: 700 }}>
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleFilterChange('sort', e.target.value);
              }}
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              <option value="newest">Newest Staging</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Main Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'start'
        }}>
          {/* Left Filter Sidebar */}
          <aside style={{
            backgroundColor: 'var(--color-off-white)',
            border: 'var(--border-thick)',
            padding: 'var(--space-lg)',
            boxShadow: 'var(--shadow-flat)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-md)',
              paddingBottom: 'var(--space-sm)',
              borderBottom: 'var(--border-thick)'
            }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={16} /> FILTERS
              </span>
              {(selectedCategory !== 'All' || selectedSize || selectedColor || searchQuery) && (
                <button 
                  onClick={clearAllFilters}
                  style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--color-rust)', fontWeight: 700 }}
                >
                  RESET
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="form-group">
              <label className="form-label">Search Query</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Hoodie, QC..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange('search', e.target.value);
                  }}
                  className="form-input"
                  style={{ paddingRight: '32px', fontSize: '0.85rem' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      handleFilterChange('search', '');
                    }}
                    style={{ position: 'absolute', right: '8px', top: '10px' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Category Division</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      handleFilterChange('category', cat);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.8rem',
                      fontWeight: selectedCategory === cat ? 800 : 400,
                      backgroundColor: selectedCategory === cat ? 'var(--color-ink-black)' : 'transparent',
                      color: selectedCategory === cat ? 'var(--color-factory-yellow)' : 'var(--color-ink-black)',
                      border: '1px solid var(--color-hairline)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat === 'All' ? 'ALL DEPARTMENTS' : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Garment Size</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {sizes.map((sz) => {
                  const isSel = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => {
                        const val = isSel ? '' : sz;
                        setSelectedSize(val);
                        handleFilterChange('size', val);
                      }}
                      style={{
                        padding: '6px',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        backgroundColor: isSel ? 'var(--color-factory-yellow)' : 'white',
                        border: '1px solid var(--color-ink-black)'
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Max Price: ₹{maxPrice}</label>
              <input
                type="range"
                min="1000"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-rust)' }}
              />
            </div>
          </aside>

          {/* Right Product Grid */}
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'JetBrains Mono' }}>
                <RefreshCw size={24} className="spin" style={{ marginBottom: '12px' }} />
                <p>LOADING QC CATALOG STAGING DATA...</p>
              </div>
            ) : products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: 'var(--color-off-white)',
                border: 'var(--border-thick)'
              }}>
                <h3 style={{ fontSize: '1.6rem' }}>NO MATCHING ITEMS FOUND</h3>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--color-gray-subtle)', margin: '12px 0 20px' }}>
                  No garments staged matching your current filter specifications.
                </p>
                <button onClick={clearAllFilters} className="btn-primary">
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.8rem',
                  color: 'var(--color-gray-subtle)'
                }}>
                  <span>SHOWING {products.length} QC INSPECTED GARMENTS</span>
                </div>

                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} onToast={onToast} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
