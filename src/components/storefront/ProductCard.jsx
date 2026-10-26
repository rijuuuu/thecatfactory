import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { formatINR } from '../../utils/currency.js';
import { useCart } from '../../context/CartContext.jsx';

export const ProductCard = ({ product, onToast }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const hasUploadedImage = product.images && product.images.length > 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = (product.sizes && product.sizes[0]) || 'M';
    const defaultColor = (product.colors && product.colors[0]) || { name: 'Standard', hex: '#141414' };

    addToCart(product, defaultSize, defaultColor, 1);
    setAddedAnimation(true);
    if (onToast) onToast(`Added ${product.name} to your cart!`, 'success');

    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onToast) {
      onToast(
        !isWishlisted ? `Added ${product.name} to wishlist!` : `Removed ${product.name} from wishlist`,
        'info'
      );
    }
  };

  return (
    <div className="product-card">
      <Link to={`/shop/${product.slug || product._id}`}>
        {/* Card Image Area */}
        <div
          className="product-card-image"
          style={{ backgroundColor: product.cardBgColor || 'var(--color-surface-soft)' }}
        >
          {/* Card Tags */}
          {product.isBestseller && (
            <span className="card-tag bestseller">Bestseller</span>
          )}
          {!product.isBestseller && product.isNewArrival && (
            <span className="card-tag new">New Drop</span>
          )}
          {product.stock <= 5 && (
            <span className="card-tag" style={{
              backgroundColor: 'rgba(181, 147, 106, 0.12)',
              color: 'var(--color-earth)',
            }}>
              Only {product.stock} left
            </span>
          )}

          {/* Wishlist Button */}
          <button
            className="wishlist-btn"
            onClick={handleWishlistToggle}
            aria-label="Wishlist Item"
          >
            <Heart
              size={15}
              fill={isWishlisted ? 'var(--color-earth)' : 'none'}
              color={isWishlisted ? 'var(--color-earth)' : 'var(--color-text-muted)'}
            />
          </button>

          {/* Product Image or Cat Mascot fallback */}
          {hasUploadedImage ? (
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <CatMascot
              width={150}
              height={150}
              fillColor={product.printColor || 'var(--color-text)'}
              accentColor="var(--color-accent)"
              expression={product.isBestseller ? 'cool' : 'sharp'}
            />
          )}
        </div>

        {/* Card Body */}
        <div className="product-card-body">
          <div>
            <div className="product-meta-row">
              <span className="product-category">{product.category}</span>
            </div>

            <h3 className="product-title">{product.name}</h3>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-colors-swatch">
                {product.colors.map((c, idx) => (
                  <span
                    key={idx}
                    className="color-dot"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="product-price-row">
              <span className="current-price">{formatINR(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span className="mrp-price">{formatINR(product.mrp)}</span>
                  <span className="discount-tag">{discountPercent}% off</span>
                </>
              )}
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleQuickAdd}
              id={`add-cart-btn-${product._id}`}
            >
              {addedAnimation ? (
                <>
                  <Check size={15} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={15} /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
