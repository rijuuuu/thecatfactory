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
        {/* Card Image Area with Image or SVG Print */}
        <div 
          className="product-card-image" 
          style={{ backgroundColor: product.cardBgColor || '#EAE5DB' }}
        >
          {/* Card Tag */}
          {product.isBestseller && <span className="card-tag bestseller">BESTSELLER</span>}
          {!product.isBestseller && product.isNewArrival && <span className="card-tag new">NEW DROP</span>}
          {product.stock <= 5 && <span className="card-tag" style={{ backgroundColor: 'var(--color-rust)', color: 'white' }}>ONLY {product.stock} LEFT</span>}

          {/* Wishlist Button */}
          <button 
            className="wishlist-btn" 
            onClick={handleWishlistToggle}
            aria-label="Wishlist Item"
          >
            <Heart size={16} fill={isWishlisted ? 'var(--color-rust)' : 'none'} color={isWishlisted ? 'var(--color-rust)' : '#141414'} />
          </button>

          {/* Uploaded Product Image or Cat Mascot Graphic Fallback */}
          {hasUploadedImage ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <CatMascot 
              width={160} 
              height={160} 
              fillColor={product.printColor || '#141414'} 
              accentColor="#E8B923"
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
                  <span className="discount-tag">{discountPercent}% OFF</span>
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
                  <Check size={16} /> ADDED TO STAGE
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> ADD TO CART
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
