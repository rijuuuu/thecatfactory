import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { MobileNavDrawer } from './MobileNavDrawer.jsx';

export const Header = () => {
  const { totalItemCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            {/* Brand Logo */}
            <Link to="/" className="brand-logo">
              <CatMascot width={44} height={44} expression="cool" fillColor="#141414" accentColor="#E8B923" />
              <div className="brand-wordmark">
                THE CAT FACTORY
                <span className="subtext">HEAVYWEIGHT INDUSTRIAL APPAREL</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="main-nav">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Shop Catalog</NavLink>
              <NavLink to="/shop?category=Hoodies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Hoodies</NavLink>
              <NavLink to="/shop?category=Tees" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Tees</NavLink>
              <NavLink to="/shop?category=Bottoms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Bottoms</NavLink>
              <NavLink to="/shop?category=Outerwear" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Outerwear</NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
            </nav>

            {/* Right Action Icons */}
            <div className="header-actions">
              <button 
                className="icon-btn" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle Search"
                id="search-toggle-btn"
              >
                <Search size={18} />
              </button>

              <Link to="/account" className="icon-btn" aria-label="Customer Account">
                <User size={18} />
              </Link>

              <button 
                className="icon-btn" 
                onClick={openCart}
                aria-label="Open Shopping Cart"
                id="cart-drawer-trigger-btn"
              >
                <ShoppingBag size={18} />
                {totalItemCount > 0 && (
                  <span className="cart-badge">{totalItemCount}</span>
                )}
              </button>

              <button 
                className="icon-btn mobile-hamburger" 
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Navigation Drawer"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Expandable Search Input Bar */}
          {isSearchOpen && (
            <div style={{
              padding: '12px 0',
              borderTop: '1px solid var(--color-hairline)',
              backgroundColor: 'var(--color-warehouse-cream)'
            }}>
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Search catalog by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  autoFocus
                  style={{ borderRadius: 0 }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0 20px' }}>
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
