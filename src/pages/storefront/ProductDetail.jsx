import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { fetchProductById } from '../../api/products.js';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { formatINR } from '../../utils/currency.js';
import { useCart } from '../../context/CartContext.jsx';
import { ProductCard } from '../../components/storefront/ProductCard.jsx';

export const ProductDetail = ({ onToast }) => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('fabric');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        if (data.success && data.product) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);
          setSelectedSize((data.product.sizes && data.product.sizes[0]) || 'M');
          setSelectedColor((data.product.colors && data.product.colors[0]) || { name: 'Standard', hex: '#141414' });
          setActiveImageIndex(0);
        } else {
          throw new Error('Product details not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--color-text-muted)' }}>
        Loading garment specifications…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 400, marginBottom: '12px' }}>Product not found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '16px 0 24px' }}>{error}</p>
        <Link to="/shop" className="btn-primary">Return to catalog</Link>
      </div>
    );
  }

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const hasUploadedImages = product.images && product.images.length > 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, qty);
    setAddedToast(true);
    if (onToast) onToast(`Added ${qty}x ${product.name} to cart!`, 'success');
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="product-detail-page" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-xl)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--color-text-muted)' }}>Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} style={{ color: 'var(--color-text-muted)' }}>
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{product.name}</span>
        </div>

        {/* Detail Main Layout (Responsive: 2-column desktop, 1-column mobile) */}
        <div className="product-detail-layout">
          {/* Left Visual Presentation Frame */}
          <div>
            <div style={{
              backgroundColor: product.cardBgColor || 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: hasUploadedImages ? '0' : 'var(--space-3xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '380px',
              height: '460px',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
            }}>
              {/* Uploaded Image or Fallback SVG Mascot */}
              {hasUploadedImages ? (
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <CatMascot 
                  width={240} 
                  height={240} 
                  fillColor={selectedColor?.bgStyle || product.printColor || 'var(--color-text)'} 
                  accentColor="var(--color-accent)"
                  expression="cool"
                  showHardhat={product.category === 'Outerwear'}
                />
              )}

              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '16px',
                fontSize: '0.72rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(4px)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                zIndex: 3,
                boxShadow: 'var(--shadow-xs)',
              }}>
                {product.qcStatus || 'QC PASSED · STAMPED'}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {hasUploadedImages && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                {product.images.map((img, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: '64px',
                        height: '64px',
                        border: isActive ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                        padding: 0,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Info & Buying Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <span className="subtitle" style={{ fontSize: '0.78rem' }}>{product.category}</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 300, letterSpacing: '0.03em', marginTop: '4px' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#D4A373' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D4A373" stroke="none" />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {product.rating || 4.9} ({product.reviewCount || 42} verified reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              padding: '14px 18px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-text)' }}>
                {formatINR(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--color-text-faint)' }}>
                    {formatINR(product.mrp)}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-accent)',
                    backgroundColor: 'var(--color-accent-dim)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 600,
                  }}>
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="form-label" style={{ marginBottom: '8px' }}>
                  Color Shade: <strong style={{ color: 'var(--color-text)' }}>{selectedColor?.name || 'Standard'}</strong>
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.colors.map((col, idx) => {
                    const isSel = selectedColor?.name === col.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(col)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          border: isSel ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                          backgroundColor: isSel ? 'var(--color-accent-dim)' : 'var(--color-surface)',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.82rem',
                          fontWeight: isSel ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          color: 'var(--color-text)',
                        }}
                      >
                        <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: col.hex, border: '1px solid rgba(0,0,0,0.1)' }} />
                        {col.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Select Size</label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 500 }}>
                    Oversized Fit Guide
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((sz) => {
                    const isSel = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          width: '46px',
                          height: '42px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.88rem',
                          fontWeight: isSel ? 600 : 400,
                          border: isSel ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                          backgroundColor: isSel ? 'var(--color-accent)' : 'var(--color-surface)',
                          color: isSel ? 'white' : 'var(--color-text)',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart Button */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
              <div className="cart-qty-stepper" style={{ height: '46px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '36px', height: '46px', fontSize: '1.2rem' }}>-</button>
                <span style={{ fontSize: '0.95rem', padding: '0 16px' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '36px', height: '46px', fontSize: '1.2rem' }}>+</button>
              </div>

              <button 
                className="btn-primary" 
                onClick={handleAddToCart}
                style={{ flexGrow: 1, height: '46px', fontSize: '0.92rem', minWidth: '200px' }}
                id="pdp-add-to-cart-btn"
              >
                {addedToast ? (
                  <>
                    <Check size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Guarantees Box */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '16px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              marginTop: '12px',
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={16} style={{ color: 'var(--color-accent)' }} />
                <span>Express Dispatch: Order within 4 hrs for same-day dispatch.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={16} style={{ color: 'var(--color-accent)' }} />
                <span>7-Day Hassle-Free Exchange & Return Policy.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
                <span>100% Quality Inspected before dispatch.</span>
              </div>
            </div>

            {/* Spec Accordions */}
            <div style={{ marginTop: '12px', borderTop: '1px solid var(--color-border)' }}>
              <div 
                onClick={() => setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')}
                style={{
                  padding: '14px 0',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  color: 'var(--color-text)',
                }}
              >
                <span>Fabric & Craftsmanship Specifications</span>
                {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {openAccordion === 'fabric' && (
                <div style={{ padding: '14px 0', fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                  <p><strong style={{ color: 'var(--color-text)' }}>Fabric:</strong> {product.fabric}</p>
                  <p style={{ marginTop: '6px' }}><strong style={{ color: 'var(--color-text)' }}>Fit Silhouette:</strong> {product.fit}</p>
                  {product.details && product.details.length > 0 && (
                    <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                      {product.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-2xl)', borderTop: '1px solid var(--color-border)' }}>
            <div className="section-header">
              <div>
                <span className="subtitle">Curated</span>
                <h2>Related Garments</h2>
              </div>
            </div>

            <div className="product-grid">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} onToast={onToast} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
