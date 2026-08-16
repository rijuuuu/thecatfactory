import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const ReviewsStrip = () => {
  const reviews = [
    {
      name: "Rohan D.",
      location: "Mumbai",
      rating: 5,
      product: "QC-01 OVERSIZED FACTORY HOODIE",
      text: "The weight on this hoodie is insane. 400 GSM terry cotton is super heavy, boxy fit is spot on, and the Cat Mascot back print gets compliments everywhere.",
      badge: "QUALITY CHECK VERIFIED"
    },
    {
      name: "Ananya K.",
      location: "Bengaluru",
      rating: 5,
      product: "CATALOG STAMP OVERSIZED TEE",
      text: "Collar didn't stretch even after 5 washes. Best heavyweight tee I've ordered in India. Love the factory stamp theme!",
      badge: "QUALITY CHECK VERIFIED"
    },
    {
      name: "Karan S.",
      location: "Delhi NCR",
      rating: 5,
      product: "INDUSTRIAL UTILITY CARGO BOTTOMS",
      text: "Pockets are actually functional and deep. The drawcords at the ankle let me style them flared or tapered.",
      badge: "QUALITY CHECK VERIFIED"
    }
  ];

  return (
    <section style={{
      padding: 'var(--space-3xl) 0',
      backgroundColor: 'var(--color-warehouse-cream)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="subtitle">TESTIMONIALS // REAL WEARERS</span>
            <h2>FACTORY QC INSPECTION REVIEWS</h2>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', fontWeight: 700 }}>
            ★ 4.9 / 5.0 AVERAGE RATING (1,240+ REVIEWS)
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-lg)'
        }}>
          {reviews.map((rev, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--color-off-white)',
              border: 'var(--border-thick)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-flat)'
            }}>
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', color: 'var(--color-factory-yellow)' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-factory-yellow)" stroke="none" />
                  ))}
                </div>
                <p style={{ fontFamily: 'Archivo', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '16px', color: '#222' }}>
                  "{rev.text}"
                </p>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.7rem',
                  color: 'var(--color-rust)',
                  fontWeight: 700,
                  marginBottom: '6px'
                }}>
                  <ShieldCheck size={14} />
                  {rev.badge}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', fontWeight: 800 }}>
                  {rev.name} <span style={{ fontWeight: 400, color: 'var(--color-gray-subtle)' }}>({rev.location})</span>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--color-gray-subtle)' }}>
                  Purchased: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
