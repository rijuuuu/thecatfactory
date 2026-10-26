import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RefreshCw, X, ArrowRight, Check } from 'lucide-react';
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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if search params change or if opened with openFilter=1
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
    if (searchParams.get('openFilter') === '1') {
      setIsMobileFilterOpen(true);
      // Clean up the URL parameter without reloading
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('openFilter');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams]);

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  const apiParams = {
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    size: selectedSize || undefined,
    color: selectedColor || undefined,
    search: searchQuery || undefined,
    sort: sortBy,
    maxPrice: maxPrice < 6000 ? maxPrice : undefined,
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

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (maxPrice < 6000 ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const categories = ['All', 'Hoodies', 'Tees', 'Bottoms', 'Outerwear'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="shop-page" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="container">
        {/* Page Title & Desktop Sort Header */}
        <div className="section-header">
          <div>
            <span className="subtitle">Catalog</span>
            <h2>All Streetwear Products</h2>
          </div>

          {/* Desktop Sort Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="desktop-sort-wrapper">
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em',
            }}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleFilterChange('sort', e.target.value);
              }}
              className="form-select"
              style={{ width: 'auto', padding: '8px 14px', fontSize: '0.88rem' }}
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* ── Mobile Control Bar (Shown on phone screens) ── */}
        <div className="mobile-filter-bar">
          <button
            type="button"
            className="mobile-filter-trigger-btn"
            onClick={() => setIsMobileFilterOpen(true)}
            id="mobile-filter-toggle-btn"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="filter-count-badge">{activeFilterCount}</span>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleFilterChange('sort', e.target.value);
              }}
              className="form-select"
              style={{ width: 'auto', padding: '6px 10px', fontSize: '0.82rem' }}
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* ── Active Filter Chips (Easy 1-tap removal) ── */}
        {hasActiveFilters && (
          <div className="active-filter-chips">
            {selectedCategory !== 'All' && (
              <button
                className="filter-chip"
                onClick={() => {
                  setSelectedCategory('All');
                  handleFilterChange('category', 'All');
                }}
              >
                <span>Category: {selectedCategory}</span>
                <X size={12} />
              </button>
            )}

            {selectedSize && (
              <button
                className="filter-chip"
                onClick={() => {
                  setSelectedSize('');
                  handleFilterChange('size', '');
                }}
              >
                <span>Size: {selectedSize}</span>
                <X size={12} />
              </button>
            )}

            {searchQuery && (
              <button
                className="filter-chip"
                onClick={() => {
                  setSearchQuery('');
                  handleFilterChange('search', '');
                }}
              >
                <span>Search: "{searchQuery}"</span>
                <X size={12} />
              </button>
            )}

            {maxPrice < 6000 && (
              <button
                className="filter-chip"
                onClick={() => setMaxPrice(6000)}
              >
                <span>Max: ₹{maxPrice.toLocaleString()}</span>
                <X size={12} />
              </button>
            )}

            <button
              className="filter-chip-clear-all"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
          </div>
        )}

        {/* ── Main Layout: Sidebar on Desktop, Collapsed on Mobile ── */}
        <div className="shop-layout">
          {/* ── Desktop Filter Sidebar ── */}
          <aside className="shop-sidebar-desktop">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-md)',
              paddingBottom: 'var(--space-sm)',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <span style={{
                fontWeight: 600,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-text)',
                letterSpacing: '0.04em',
              }}>
                <SlidersHorizontal size={15} /> Filters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    transition: 'opacity var(--transition-fast)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="form-group">
              <label className="form-label">Search</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Hoodie, cargo…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange('search', e.target.value);
                  }}
                  className="form-input"
                  style={{ paddingRight: '36px', fontSize: '0.88rem' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      handleFilterChange('search', '');
                    }}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-faint)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Category</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      handleFilterChange('category', cat);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '9px 12px',
                      fontSize: '0.88rem',
                      fontWeight: selectedCategory === cat ? 600 : 400,
                      backgroundColor: selectedCategory === cat ? 'var(--color-accent-dim)' : 'transparent',
                      color: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      transition: 'all 0.15s ease',
                      cursor: 'pointer',
                    }}
                  >
                    {cat === 'All' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Size</label>
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
                        padding: '8px 4px',
                        fontSize: '0.8rem',
                        fontWeight: isSel ? 600 : 400,
                        backgroundColor: isSel ? 'var(--color-accent)' : 'var(--color-surface-soft)',
                        color: isSel ? 'white' : 'var(--color-text-muted)',
                        border: `1.5px solid ${isSel ? 'var(--color-accent)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                        minHeight: '36px',
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Max Price: ₹{maxPrice.toLocaleString()}</label>
              <input
                type="range"
                min="1000"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-accent)', marginTop: '6px' }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                color: 'var(--color-text-faint)',
                marginTop: '4px',
              }}>
                <span>₹1,000</span>
                <span>₹6,000</span>
              </div>
            </div>
          </aside>

          {/* ── Product Grid Container ── */}
          <div style={{ minWidth: 0 }}>
            {loading ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 0',
                color: 'var(--color-text-muted)',
              }}>
                <RefreshCw size={22} className="spin" style={{ marginBottom: '12px', color: 'var(--color-accent)' }} />
                <p style={{ fontSize: '0.9rem' }}>Loading products…</p>
              </div>
            ) : products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 24px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '10px' }}>
                  No matching products
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                  No items match your current filters.
                </p>
                <button onClick={clearAllFilters} className="btn-primary">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-muted)',
                }}>
                  <span>{products.length} products</span>
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

      {/* ── Mobile Filter Drawer / Page (Slides in on tap) ── */}
      {isMobileFilterOpen && (
        <div
          className="mobile-filter-overlay"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="mobile-filter-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="mobile-filter-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={18} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--color-text)' }}>
                  Filters & Search
                </span>
                {hasActiveFilters && (
                  <span className="filter-count-badge">{activeFilterCount}</span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-accent)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Reset
                  </button>
                )}
                <button
                  className="icon-btn"
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="mobile-filter-drawer-body">
              {/* Search */}
              <div>
                <label className="form-label" style={{ marginBottom: '8px' }}>Search products</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search by keywords, tags…"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleFilterChange('search', e.target.value);
                    }}
                    className="form-input"
                    style={{ paddingRight: '36px' }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        handleFilterChange('search', '');
                      }}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-faint)',
                        background: 'none',
                        border: 'none',
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="form-label" style={{ marginBottom: '10px' }}>Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categories.map((cat) => {
                    const isSel = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          handleFilterChange('category', cat);
                        }}
                        style={{
                          padding: '8px 14px',
                          fontSize: '0.85rem',
                          borderRadius: 'var(--radius-pill)',
                          backgroundColor: isSel ? 'var(--color-accent)' : 'var(--color-surface-soft)',
                          color: isSel ? 'white' : 'var(--color-text)',
                          border: `1.5px solid ${isSel ? 'var(--color-accent)' : 'var(--color-border)'}`,
                          fontWeight: isSel ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {cat === 'All' ? 'All Categories' : cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="form-label" style={{ marginBottom: '10px' }}>Sizes</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
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
                          padding: '10px 6px',
                          fontSize: '0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSel ? 'var(--color-accent)' : 'var(--color-surface-soft)',
                          color: isSel ? 'white' : 'var(--color-text)',
                          border: `1.5px solid ${isSel ? 'var(--color-accent)' : 'var(--color-border)'}`,
                          fontWeight: isSel ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          textAlign: 'center',
                        }}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Max Price</label>
                  <span style={{ fontWeight: 600, color: 'var(--color-accent)', fontSize: '0.88rem' }}>
                    ₹{maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  color: 'var(--color-text-faint)',
                  marginTop: '4px',
                }}>
                  <span>₹1,000</span>
                  <span>₹6,000</span>
                </div>
              </div>

              {/* Sort by */}
              <div>
                <label className="form-label" style={{ marginBottom: '8px' }}>Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    handleFilterChange('sort', e.target.value);
                  }}
                  className="form-select"
                  style={{ width: '100%' }}
                >
                  <option value="newest">Newest first</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="mobile-filter-drawer-footer">
              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={clearAllFilters}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsMobileFilterOpen(false)}
                style={{ flex: hasActiveFilters ? 2 : 1, justifyContent: 'center' }}
              >
                <span>View {products.length} Products</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
