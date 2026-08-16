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
            <Link to="/" className="brand-logo" aria-label="The Cat Factory home">
              <span className="brand-wordmark">THE CAT FACTORY</span>
            </Link>

            <nav className="main-nav" aria-label="Main navigation">
              <NavLink to="/shop" className="nav-link">SHOP ALL</NavLink>
              <NavLink to="/shop?category=Tees" className="nav-link">DROPS</NavLink>
              <NavLink to="/about" className="nav-link">ABOUT</NavLink>
            </nav>

            <div className="header-actions">
              <button className="header-icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
                <Search size={21} strokeWidth={1.8} />
              </button>
              <Link to="/account" className="header-icon-btn" aria-label="Wishlist and account">
                <Heart size={21} strokeWidth={1.8} />
              </Link>
              <Link to="/account" className="header-icon-btn" aria-label="Account">
                <User size={21} strokeWidth={1.8} />
              </Link>
              <button className="header-icon-btn cart-icon" onClick={openCart} aria-label="Shopping bag">
                <ShoppingBag size={21} strokeWidth={1.8} />
                {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
              </button>
              <button className="header-icon-btn mobile-hamburger" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <Menu size={22} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="editorial-search">
              <form onSubmit={handleSearchSubmit}>
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} aria-label="Close search">
                  <X size={18} />
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
