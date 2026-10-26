import React from 'react';
import { Star } from 'lucide-react';

export const ReviewsStrip = () => {
  const reviews = [
    {
      name: 'Aarav M.',
      location: 'Mumbai',
      rating: 5,
<<<<<<< HEAD
      text: 'The heaviest tee I own. Feels like a ₹3000 piece for a third of the price.'
=======
      product: "QC-01 Oversized Factory Hoodie",
      text: "The weight on this hoodie is insane. 400 GSM terry cotton is super heavy, boxy fit is spot on, and the Cat Mascot back print gets compliments everywhere.",
      badge: "Quality Check Verified"
>>>>>>> a32e243 (hello)
    },
    {
      name: 'Riya N.',
      location: 'Kochi',
      rating: 5,
<<<<<<< HEAD
      text: 'The sage green is unreal in person. Fit is exactly the boxy oversized I wanted.'
=======
      product: "Catalog Stamp Oversized Tee",
      text: "Collar didn't stretch even after 5 washes. Best heavyweight tee I've ordered in India. Love the factory stamp theme!",
      badge: "Quality Check Verified"
>>>>>>> a32e243 (hello)
    },
    {
      name: 'Dev P.',
      location: 'Ahmedabad',
      rating: 5,
<<<<<<< HEAD
      text: 'Ordered three, all perfect. Stitching quality is way ahead of other Indian labels.'
=======
      product: "Industrial Utility Cargo Bottoms",
      text: "Pockets are actually functional and deep. The drawcords at the ankle let me style them flared or tapered.",
      badge: "Quality Check Verified"
>>>>>>> a32e243 (hello)
    }
  ];

  return (
<<<<<<< HEAD
    <section className="editorial-reviews">
=======
    <section style={{
      padding: 'var(--space-3xl) 0',
      backgroundColor: 'var(--color-surface-soft)',
    }}>
>>>>>>> a32e243 (hello)
      <div className="container">
        <div className="editorial-section-head">
          <div>
<<<<<<< HEAD
            <span className="editorial-eyebrow olive">4.8 AVERAGE · 500+ REVIEWS</span>
            <h2>WORN &amp; RATED</h2>
          </div>
        </div>

        <div className="editorial-review-grid">
          {reviews.map((review) => (
            <article className="editorial-review-card" key={review.name}>
              <div className="editorial-stars" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={17} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p>"{review.text}"</p>
              <div className="editorial-review-author">{review.name} <span>— {review.location}</span></div>
            </article>
=======
            <span className="subtitle">Testimonials</span>
            <h2>What our customers say</h2>
          </div>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
          }}>
            ★ 4.9 / 5.0 &nbsp;&middot;&nbsp; 1,240+ reviews
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-lg)',
        }}>
          {reviews.map((rev, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'box-shadow var(--transition-normal)',
            }}>
              <div>
                {/* Stars */}
                <div style={{
                  display: 'flex',
                  gap: '3px',
                  marginBottom: '14px',
                }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--color-earth)" stroke="none" />
                  ))}
                </div>

                {/* Review text */}
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text)',
                  fontStyle: 'italic',
                }}>
                  "{rev.text}"
                </p>
              </div>

              <div>
                {/* Verified badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.68rem',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  <ShieldCheck size={12} />
                  {rev.badge}
                </div>

                {/* Reviewer info */}
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)' }}>
                  {rev.name}{' '}
                  <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>
                    · {rev.location}
                  </span>
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-text-faint)',
                  marginTop: '3px',
                  letterSpacing: '0.02em',
                }}>
                  Purchased: {rev.product}
                </div>
              </div>
            </div>
>>>>>>> a32e243 (hello)
          ))}
        </div>
      </div>
    </section>
  );
};
