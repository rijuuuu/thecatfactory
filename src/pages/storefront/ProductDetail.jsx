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
  Heart 
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
      <div style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'JetBrains Mono' }}>
        FETCHING GARMENT SPECIFICATIONS & QC SHEET...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>GARMENT NOT FOUND</h2>
        <p style={{ fontFamily: 'JetBrains Mono', margin: '16px 0 24px' }}>{error}</p>
        <Link to="/shop" className="btn-primary">RETURN TO SHOP CATALOG</Link>
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
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'var(--color-gray-subtle)', marginBottom: 'var(--space-lg)' }}>
          <Link to="/">HOME</Link> / <Link to="/shop">SHOP</Link> / <Link to={`/shop?category=${product.category}`}>{product.category.toUpperCase()}</Link> / <span style={{ color: 'var(--color-ink-black)', fontWeight: 700 }}>{product.name}</span>
        </div>

        {/* Detail Main Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-3xl)',
          alignItems: 'start'
        }}>
          {/* Left Visual Presentation Frame */}
          <div>
            <div style={{
              backgroundColor: product.cardBgColor || '#EAE5DB',
              border: 'var(--border-thick)',
              padding: hasUploadedImages ? '0' : 'var(--space-3xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '480px',
              height: '480px',
              boxShadow: 'var(--shadow-flat)',
              overflow: 'hidden'
            }}>
              {/* Uploaded Image or Fallback SVG Mascot */}
              {hasUploadedImages ? (
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <CatMascot 
                  width={260} 
                  height={260} 
                  fillColor={selectedColor?.bgStyle || product.printColor || '#141414'} 
                  accentColor="#E8B923"
                  expression="cool"
                  showHardhat={product.category === 'Outerwear'}
                />
              )}

              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '16px',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.7rem',
                color: 'var(--color-rust)',
                fontWeight: 700,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 6px',
                zIndex: 3
              }}>
                SPECIFICATION // {product.qcStatus || 'QC PASSED — STAMPED'}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {hasUploadedImages && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                {product.images.map((img, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: '70px',
                        height: '70px',
                        border: isActive ? '3px solid var(--color-factory-yellow)' : '1px solid var(--color-hairline)',
                        boxShadow: isActive ? 'var(--shadow-flat)' : 'none',
                        padding: 0,
                        overflow: 'hidden',
                        backgroundColor: '#000'
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
              <span className="batch-spec" style={{ fontSize: '0.8rem' }}>{product.category}</span>
              <h1 style={{ fontSize: '2.5rem', marginTop: '4px' }}>{product.name}</h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '2px', color: 'var(--color-factory-yellow)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-factory-yellow)" stroke="none" />
                  ))}
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', fontWeight: 700 }}>
                  {product.rating || 4.9} ({product.reviewCount || 42} VERIFIED REVIEWS)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--color-off-white)',
              border: 'var(--border-thick)'
            }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '1.8rem', fontWeight: 800 }}>
                {formatINR(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '1.1rem', textDecoration: 'line-through', color: 'var(--color-gray-subtle)' }}>
                    {formatINR(product.mrp)}
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--color-rust)', fontWeight: 800 }}>
                    SAVE {discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p style={{ fontFamily: 'Archivo', fontSize: '0.95rem', color: '#333' }}>
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="form-label" style={{ marginBottom: '6px' }}>
                  COLOR SHADE: <strong>{selectedColor?.name || 'Standard'}</strong>
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
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
                          padding: '6px 12px',
                          border: isSel ? '2px solid var(--color-ink-black)' : '1px solid var(--color-hairline)',
                          backgroundColor: isSel ? 'var(--color-factory-yellow)' : 'white',
                          fontFamily: 'JetBrains Mono',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        <span style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: col.hex, border: '1px solid #141414' }} />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label">SELECT GARMENT SIZE:</label>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--color-rust)', cursor: 'pointer' }}>
                    📐 OVERSIZED FIT GUIDE
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.sizes.map((sz) => {
                    const isSel = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          width: '48px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'JetBrains Mono',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          border: isSel ? '2px solid var(--color-ink-black)' : '1px solid var(--color-hairline)',
                          backgroundColor: isSel ? 'var(--color-factory-yellow)' : 'white',
                          boxShadow: isSel ? '2px 2px 0px var(--color-ink-black)' : 'none'
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
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
              <div className="cart-qty-stepper" style={{ height: '48px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '36px', height: '48px', fontSize: '1.2rem' }}>-</button>
                <span style={{ fontSize: '1rem', padding: '0 16px' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '36px', height: '48px', fontSize: '1.2rem' }}>+</button>
              </div>

              <button 
                className="btn-primary" 
                onClick={handleAddToCart}
                style={{ flexGrow: 1, height: '48px', fontSize: '1rem' }}
                id="pdp-add-to-cart-btn"
              >
                {addedToast ? (
                  <>
                    <Check size={18} /> STAGED TO CART!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> ADD TO STAGE CART
                  </>
                )}
              </button>
            </div>

            {/* Guarantees Box */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              backgroundColor: 'var(--color-off-white)',
              border: 'var(--border-thick)',
              marginTop: '12px',
              fontFamily: 'JetBrains Mono',
              fontSize: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--color-rust)" />
                <span>Express Dispatch: Order within 4 hrs for same-day dispatch.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={16} color="var(--color-rust)" />
                <span>7-Day No-Hassle Exchange & Return Guarantee.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--color-rust)" />
                <span>100% Quality Inspected before dispatch.</span>
              </div>
            </div>

            {/* Spec Accordions */}
            <div style={{ marginTop: '16px', borderTop: 'var(--border-thick)' }}>
              <div 
                onClick={() => setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')}
                style={{
                  padding: '12px 0',
                  borderBottom: 'var(--border-hairline)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}
              >
                <span>FABRIC & CRAFTSMANSHIP SPECS</span>
                {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {openAccordion === 'fabric' && (
                <div style={{ padding: '12px 0', fontSize: '0.9rem', color: '#444' }}>
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p style={{ marginTop: '4px' }}><strong>Fit Silhouette:</strong> {product.fit}</p>
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
          <section style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-2xl)', borderTop: 'var(--border-thick)' }}>
            <div className="section-header">
              <div>
                <span className="subtitle">CROSS DISPATCH</span>
                <h2>RELATED FACTORY GARMENTS</h2>
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
