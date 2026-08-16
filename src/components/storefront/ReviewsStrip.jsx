import React from 'react';
import { Star } from 'lucide-react';

export const ReviewsStrip = () => {
  const reviews = [
    {
      name: 'Aarav M.',
      location: 'Mumbai',
      rating: 5,
      text: 'The heaviest tee I own. Feels like a ₹3000 piece for a third of the price.'
    },
    {
      name: 'Riya N.',
      location: 'Kochi',
      rating: 5,
      text: 'The sage green is unreal in person. Fit is exactly the boxy oversized I wanted.'
    },
    {
      name: 'Dev P.',
      location: 'Ahmedabad',
      rating: 5,
      text: 'Ordered three, all perfect. Stitching quality is way ahead of other Indian labels.'
    }
  ];

  return (
    <section className="editorial-reviews">
      <div className="container">
        <div className="editorial-section-head">
          <div>
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
          ))}
        </div>
      </div>
    </section>
  );
};
