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
          </div>
        </div>
      </section>

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
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="editorial-products">
        <div className="container">
          <div className="editorial-section-head">
            <div>
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
            </div>
          ) : (
            <div className="editorial-loading">NO PRODUCTS AVAILABLE RIGHT NOW.</div>
          )}
        </div>
      </section>

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
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="editorial-newsletter">
        <div className="container">
          <span className="editorial-eyebrow olive">EARLY ACCESS</span>
          <h2>GET THE NEXT DROP FIRST</h2>
          <p>Drops sell out in hours. Subscribers get a 24-hour head start and ₹100 off their first order.</p>
          <NewsletterBlock onToast={onToast} />
        </div>
      </section>
    </div>
  );
};
