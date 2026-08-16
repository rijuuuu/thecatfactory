import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Zap, Package } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { QCBadge } from '../../assets/QCBadge.jsx';
import { MarqueeStrip } from '../../components/storefront/MarqueeStrip.jsx';
import { CategoryTile } from '../../components/storefront/CategoryTile.jsx';
import { ProductCard } from '../../components/storefront/ProductCard.jsx';
import { ReviewsStrip } from '../../components/storefront/ReviewsStrip.jsx';
import { NewsletterBlock } from '../../components/storefront/NewsletterBlock.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export const Home = ({ onToast }) => {
  const { products, loading } = useProducts({ isBestseller: 'true' });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Copy */}
            <div className="hero-content">
              <div className="hero-badge-tag">
                <ShieldCheck size={16} />
                <span>OFFICIAL FACTORY DISPATCH // 2026</span>
              </div>

              <h1 className="hero-title">
                HEAVYWEIGHT <br />
                STREETWEAR <br />
                <span className="accent">QC STAMPED</span>
              </h1>

              <p className="hero-subtitle">
                Engineered for maximum durability. Crafted from 400 GSM French terry cotton, boxy oversized cuts, and hand-pulled discharge prints.
              </p>

              <div className="hero-cta-group">
                <Link to="/shop" className="btn-primary" id="hero-shop-cta">
                  EXPLORE DROP CATALOG <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn-secondary">
                  FACTORY MANIFEST
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-val">12,400+</span>
                  <span className="stat-lbl">UNITS SHIPPED</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">4.9 ★</span>
                  <span className="stat-lbl">QC RATING</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">24 HRS</span>
                  <span className="stat-lbl">DISPATCH TIME</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Art Frame */}
            <div className="hero-art-container">
              <div className="hero-art-card">
                {/* QC Stamp Badge */}
                <div className="qc-stamp-badge">
                  QC PASSED // #048
                </div>

                <CatMascot 
                  width={280} 
                  height={280} 
                  fillColor="#141414" 
                  accentColor="#E8B923" 
                  expression="cool"
                  showHardhat={true}
                />

                <div style={{
                  marginTop: '16px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-rust)'
                }}>
                  AUTHENTIC FACTORY BRANDMARK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Trust Banner */}
      <MarqueeStrip />

      {/* Category Tiles Grid Section */}
      <section style={{ padding: 'var(--space-3xl) 0', borderBottom: 'var(--border-thick)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="subtitle">DIVISIONS // SHOP BY CATEGORY</span>
              <h2>THE FACTORY DEPARTMENTS</h2>
            </div>
            <Link to="/shop" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </div>

          <div className="category-grid">
            <CategoryTile title="FLEECE & HOODIES" categoryKey="Hoodies" itemCount={24} bgColor="#F5F0E6" />
            <CategoryTile title="HEAVYWEIGHT TEES" categoryKey="Tees" itemCount={38} bgColor="#EAE5DB" />
            <CategoryTile title="UTILITY CARGOES" categoryKey="Bottoms" itemCount={16} bgColor="#E2DDD2" />
            <CategoryTile title="CHORE JACKETS" categoryKey="Outerwear" itemCount={12} bgColor="#EDE6D8" />
          </div>
        </div>
      </section>

      {/* Bestseller Products Grid */}
      <section style={{ padding: 'var(--space-3xl) 0', borderBottom: 'var(--border-thick)', backgroundColor: 'var(--color-off-white)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="subtitle">FEATURED DISPATCHES</span>
              <h2>HEAVYWEIGHT BESTSELLERS</h2>
            </div>
            <Link to="/shop" className="btn-primary" style={{ padding: '10px 20px' }}>
              SHOP ENTIRE CATALOG
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'JetBrains Mono' }}>
              FETCHING BESTSELLER STAGING DATA...
            </div>
          ) : (
            <div className="product-grid">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} onToast={onToast} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Value Props Row */}
      <section style={{ padding: 'var(--space-2xl) 0', backgroundColor: 'var(--color-ink-black)', color: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Package size={32} color="var(--color-factory-yellow)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--color-factory-yellow)', fontSize: '1.1rem' }}>400 GSM COTTON</h4>
                <p style={{ fontFamily: 'Archivo', fontSize: '0.85rem', color: '#AAA', marginTop: '4px' }}>
                  Ultra-dense French terry fabric built for structured boxy draping.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <ShieldCheck size={32} color="var(--color-factory-yellow)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--color-factory-yellow)', fontSize: '1.1rem' }}>QC PASSED STAMP</h4>
                <p style={{ fontFamily: 'Archivo', fontSize: '0.85rem', color: '#AAA', marginTop: '4px' }}>
                  Every item is individually inspected before it leaves the factory floor.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Zap size={32} color="var(--color-factory-yellow)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--color-factory-yellow)', fontSize: '1.1rem' }}>EXPRESS DISPATCH</h4>
                <p style={{ fontFamily: 'Archivo', fontSize: '0.85rem', color: '#AAA', marginTop: '4px' }}>
                  Orders placed before 2 PM ship same day from our Mumbai warehouse dock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Strip */}
      <ReviewsStrip />

      {/* Newsletter Signup Block */}
      <NewsletterBlock onToast={onToast} />
    </div>
  );
};
