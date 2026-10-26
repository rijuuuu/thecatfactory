import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, Heart, X } from 'lucide-react';
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
        <div className="container header-container">
          <div className="header-inner">
<<<<<<< HEAD
            <Link to="/" className="brand-logo" aria-label="The Cat Factory home">
              <span className="brand-wordmark">THE CAT FACTORY</span>
            </Link>

            <nav className="main-nav" aria-label="Main navigation">
              <NavLink to="/shop" className="nav-link">SHOP ALL</NavLink>
              <NavLink to="/shop?category=Tees" className="nav-link">DROPS</NavLink>
              <NavLink to="/about" className="nav-link">ABOUT</NavLink>
=======
            {/* Brand Logo */}
            <Link to="/" className="brand-logo">
              <CatMascot width={38} height={38} expression="cool" fillColor="var(--color-text)" accentColor="var(--color-accent)" />
              <div className="brand-wordmark">
                THE CAT FACTORY
                <span className="subtext">HEAVYWEIGHT INDUSTRIAL APPAREL</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="main-nav">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Shop</NavLink>
              <NavLink to="/shop?category=Hoodies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Hoodies</NavLink>
              <NavLink to="/shop?category=Tees" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Tees</NavLink>
              <NavLink to="/shop?category=Bottoms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Bottoms</NavLink>
              <NavLink to="/shop?category=Outerwear" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Outerwear</NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
>>>>>>> a32e243 (hello)
            </nav>

            <div className="header-actions">
<<<<<<< HEAD
              <button className="header-icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
                <Search size={21} strokeWidth={1.8} />
=======
              <button
                className="icon-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle Search"
                id="search-toggle-btn"
              >
                {isSearchOpen ? <X size={18} /> : <Search size={18} />}
>>>>>>> a32e243 (hello)
              </button>
              <Link to="/account" className="header-icon-btn" aria-label="Wishlist and account">
                <Heart size={21} strokeWidth={1.8} />
              </Link>
<<<<<<< HEAD
              <Link to="/account" className="header-icon-btn" aria-label="Account">
                <User size={21} strokeWidth={1.8} />
              </Link>
              <button className="header-icon-btn cart-icon" onClick={openCart} aria-label="Shopping bag">
                <ShoppingBag size={21} strokeWidth={1.8} />
                {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
              </button>
              <button className="header-icon-btn mobile-hamburger" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <Menu size={22} strokeWidth={1.8} />
=======

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
>>>>>>> a32e243 (hello)
              </button>
            </div>
          </div>

          {isSearchOpen && (
<<<<<<< HEAD
            <div className="editorial-search">
              <form onSubmit={handleSearchSubmit}>
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search products"
=======
            <div className="header-search-bar">
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Search by name, category..."
>>>>>>> a32e243 (hello)
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
<<<<<<< HEAD
                <button type="button" onClick={() => setIsSearchOpen(false)} aria-label="Close search">
                  <X size={18} />
=======
                <button type="submit" className="btn-primary" style={{ padding: '0 24px', whiteSpace: 'nowrap' }}>
                  Search
>>>>>>> a32e243 (hello)
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      <MobileNavDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
