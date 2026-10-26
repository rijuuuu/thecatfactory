import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../../components/storefront/ProductCard.jsx';
import { ReviewsStrip } from '../../components/storefront/ReviewsStrip.jsx';
import { NewsletterBlock } from '../../components/storefront/NewsletterBlock.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export const Home = ({ onToast }) => {
  const { products, loading } = useProducts({});
  const featured = products[0];
  const arrivals = products.slice(0, 4);
  const streetProducts = products.slice(0, 4);

  return (
<<<<<<< HEAD
    <div className="editorial-home">
      {/* Announcement */}
      <div className="editorial-announcement">FREE SHIPPING ACROSS INDIA · DROP 001 IS LIVE</div>

      {/* Full-width editorial hero */}
      <section className="editorial-hero">
        <div className="editorial-hero-media">
          {featured?.images?.[0] ? (
            <img src={featured.images[0]} alt="The Cat Factory featured collection" />
          ) : (
            <div className="hero-placeholder" />
          )}
        </div>
        <div className="editorial-hero-overlay" />
        <div className="container editorial-hero-content">
          <span className="editorial-eyebrow">DROP 001 · LIVE NOW</span>
          <h1>THE CAT<br />FACTORY</h1>
          <p>Premium Oversized Streetwear</p>
          <div className="editorial-hero-actions">
            <Link to="/shop?category=Tees" className="editorial-btn editorial-btn-light">SHOP DROP 001</Link>
            <Link to="/shop" className="editorial-btn editorial-btn-outline">BROWSE ALL</Link>
=======
    <div className="home-page">
      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Copy */}
            <div className="hero-content">
              <div className="hero-badge-tag">
                <ShieldCheck size={13} />
                <span>Official Factory Dispatch · 2026</span>
              </div>

              <h1 className="hero-title">
                Heavyweight<br />
                Streetwear,<br />
                <span className="accent">QC Stamped.</span>
              </h1>

              <p className="hero-subtitle">
                Engineered for maximum durability. Crafted from 400 GSM French terry cotton,
                boxy oversized cuts, and hand-pulled discharge prints.
              </p>

              <div className="hero-cta-group">
                <Link to="/shop" className="btn-primary" id="hero-shop-cta">
                  Explore Drop Catalog <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Our Story
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-val">12,400+</span>
                  <span className="stat-lbl">Units Shipped</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">4.9 ★</span>
                  <span className="stat-lbl">QC Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">24 hrs</span>
                  <span className="stat-lbl">Dispatch Time</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="hero-art-container">
              <div className="hero-art-card">
                <div className="qc-stamp-badge">QC Passed · #048</div>

                <CatMascot
                  width={260}
                  height={260}
                  fillColor="var(--color-text)"
                  accentColor="var(--color-accent)"
                  expression="cool"
                  showHardhat={true}
                />

                <div style={{
                  marginTop: '18px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-text-faint)',
                }}>
                  Authentic Factory Brandmark
                </div>
              </div>
            </div>
>>>>>>> a32e243 (hello)
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Brand statement */}
      <section className="editorial-statement">
        <div className="container narrow-copy">
          <span className="editorial-eyebrow olive">MADE IN INDIA · BUILT TO OUTLAST</span>
          <h2>HEAVYWEIGHT COTTON. BOXY SILHOUETTES. NO FILLER.</h2>
          <p>
            We cut one block, perfect it, and release it in small numbers. Every piece is 240 GSM premium cotton,
            garment-dyed, drop-shouldered and finished with tonal stitching — the kind of construction usually reserved
            for imported labels.
          </p>
        </div>
      </section>

      {/* Featured drop */}
      <section className="editorial-drop">
        <div className="container editorial-drop-grid">
          <div className="drop-copy">
            <span className="editorial-eyebrow">FEATURED DROP</span>
            <h2>DROP 001</h2>
            <h3>The Foundation</h3>
            <p>
              Three silhouettes, one weight. DROP 001 establishes the house block — premium heavyweight cotton,
              drop shoulders and garment-dyed colour. Limited quantities per colourway.
            </p>
            <Link to="/shop" className="text-link">SHOP THE DROP <ArrowRight size={16} /></Link>
          </div>
          <div className="drop-visuals">
            {featured?.images?.[0] && <img className="drop-image-main" src={featured.images[0]} alt={featured.name || 'Featured product'} />}
            {products[1]?.images?.[0] && <img className="drop-image-small" src={products[1].images[0]} alt={products[1].name || 'Collection detail'} />}
=======
      {/* ── Marquee Trust Banner ── */}
      <MarqueeStrip />

      {/* ── Category Tiles ── */}
      <section style={{ padding: 'var(--space-3xl) 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="subtitle">Shop by Category</span>
              <h2>The Factory Departments</h2>
            </div>
            <Link to="/shop" className="btn-secondary" style={{ padding: '10px 20px' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="category-grid">
            <CategoryTile title="Fleece & Hoodies"     categoryKey="Hoodies"   itemCount={24} bgColor="#F4F1EC" />
            <CategoryTile title="Heavyweight Tees"     categoryKey="Tees"      itemCount={38} bgColor="#EDE9E1" />
            <CategoryTile title="Utility Cargoes"      categoryKey="Bottoms"   itemCount={16} bgColor="#E8E3DA" />
            <CategoryTile title="Chore Jackets"        categoryKey="Outerwear" itemCount={12} bgColor="#EDE6D8" />
>>>>>>> a32e243 (hello)
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* New arrivals */}
      <section className="editorial-products">
=======
      {/* ── Bestseller Products ── */}
      <section style={{ padding: 'var(--space-3xl) 0', backgroundColor: 'var(--color-surface-soft)' }}>
>>>>>>> a32e243 (hello)
        <div className="container">
          <div className="editorial-section-head">
            <div>
<<<<<<< HEAD
              <span className="editorial-eyebrow olive">FRESH FROM DROP 001</span>
              <h2>NEW ARRIVALS</h2>
            </div>
            <Link to="/shop" className="editorial-view-all">VIEW ALL</Link>
          </div>

          {loading ? (
            <div className="editorial-loading">LOADING THE LATEST DROP...</div>
          ) : arrivals.length ? (
            <div className="editorial-product-grid">
              {arrivals.map((product) => <ProductCard key={product._id} product={product} onToast={onToast} />)}
=======
              <span className="subtitle">Featured</span>
              <h2>Heavyweight Bestsellers</h2>
            </div>
            <Link to="/shop" className="btn-primary" style={{ padding: '10px 22px' }}>
              Shop All
            </Link>
          </div>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 0',
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
            }}>
              Loading products…
>>>>>>> a32e243 (hello)
            </div>
          ) : (
            <div className="editorial-loading">NO PRODUCTS AVAILABLE RIGHT NOW.</div>
          )}
        </div>
      </section>

<<<<<<< HEAD
      {/* Reviews */}
      <ReviewsStrip />

      {/* Street / social-style visual grid using real catalog images */}
      <section className="editorial-street">
        <div className="container">
          <div className="editorial-section-head">
            <div>
              <span className="editorial-eyebrow olive">@THECATFACTORY</span>
              <h2>ON THE STREET</h2>
            </div>
            <span className="street-caption">Tag us to be featured</span>
          </div>
          <div className="street-grid">
            {streetProducts.map((product, index) => (
              <Link to={`/shop/${product.slug || product._id}`} key={product._id} className={`street-tile street-${index + 1}`}>
                {product.images?.[0] ? <img src={product.images[0]} alt={product.name} /> : <div className="street-placeholder" />}
              </Link>
=======
      {/* ── Value Props ── */}
      <section style={{ padding: 'var(--space-2xl) 0', backgroundColor: 'var(--color-dark)', color: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-xl)',
          }}>
            {[
              {
                icon: <Package size={26} color="var(--color-accent)" style={{ flexShrink: 0 }} />,
                title: '400 GSM Cotton',
                desc: 'Ultra-dense French terry fabric built for structured boxy draping.',
              },
              {
                icon: <ShieldCheck size={26} color="var(--color-accent)" style={{ flexShrink: 0 }} />,
                title: 'QC Passed Stamp',
                desc: 'Every item is individually inspected before it leaves the factory floor.',
              },
              {
                icon: <Zap size={26} color="var(--color-accent)" style={{ flexShrink: 0 }} />,
                title: 'Express Dispatch',
                desc: 'Orders placed before 2 PM ship same day from our Mumbai warehouse dock.',
              },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {item.icon}
                <div>
                  <h4 style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--color-accent-light)',
                    letterSpacing: '0.04em',
                    marginBottom: '6px',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-dark-muted)', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
>>>>>>> a32e243 (hello)
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Newsletter */}
      <section className="editorial-newsletter">
        <div className="container">
          <span className="editorial-eyebrow olive">EARLY ACCESS</span>
          <h2>GET THE NEXT DROP FIRST</h2>
          <p>Drops sell out in hours. Subscribers get a 24-hour head start and ₹100 off their first order.</p>
          <NewsletterBlock onToast={onToast} />
        </div>
      </section>
=======
      {/* ── Customer Reviews ── */}
      <ReviewsStrip />

      {/* ── Newsletter ── */}
      <NewsletterBlock onToast={onToast} />
>>>>>>> a32e243 (hello)
    </div>
  );
};
