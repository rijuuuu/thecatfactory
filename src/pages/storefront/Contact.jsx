import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp, Send, Check } from 'lucide-react';

export const Contact = ({ onToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onToast) onToast('Your query was submitted to Cat Factory support!', 'success');
  };

  const faqs = [
    {
      q: "What does 'QC Passed' mean on the tags?",
      a: "Every single garment undergoes physical manual inspection at Dock 04. The QC stamp confirms 12 parameters including fabric GSM, print adhesion, seam strength, and size accuracy."
    },
    {
      q: "What is your shipping timeline across India?",
      a: "Orders placed before 2 PM IST ship the same day via Express logistics (BlueDart/Delhivery). Metro deliveries take 2–3 business days; rest of India takes 3–5 days."
    },
    {
      q: "What is the return & exchange policy?",
      a: "We offer a 7-day hassle-free exchange & return policy. Items must be unworn with original QC tags attached. Returns are picked up directly from your doorstep."
    },
    {
      q: "How should I wash my heavyweight apparel?",
      a: "Machine wash cold inside-out with like colors. Do not bleach. Tumble dry low or line dry in shade. Do not iron directly on discharge screen prints."
    }
  ];

  return (
    <div className="contact-page" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="subtitle">Support</span>
            <h2>Contact & Help Center</h2>
          </div>
        </div>

        <div className="contact-layout">
          {/* Left: Contact Form */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-xl)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 400,
              letterSpacing: '0.04em',
              marginBottom: '20px',
              color: 'var(--color-text)',
            }}>
              Send us a message
            </h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <Check size={22} color="var(--color-accent)" />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 400, color: 'var(--color-text)' }}>
                  Message received!
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '8px', lineHeight: 1.65 }}>
                  Our support team will respond within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ marginTop: '20px' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Vikram Malhotra"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="operator@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Order Tracking #TCF-849201"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                    placeholder="How can we help with your order?"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '4px' }}>
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div style={{
              marginTop: '28px',
              borderTop: '1px dashed var(--color-border)',
              paddingTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={15} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>Warehouse Hub #04, Industrial Estate Phase II, Mumbai 400093</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={15} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>support@catfactory.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={15} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>+91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 400,
              letterSpacing: '0.04em',
              marginBottom: '20px',
              color: 'var(--color-text)',
            }}>
              Frequently asked questions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    transition: 'box-shadow var(--transition-fast)',
                    boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
                  }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'var(--space-md)',
                        fontWeight: isOpen ? 600 : 400,
                        fontSize: '0.92rem',
                        color: 'var(--color-text)',
                        gap: '12px',
                        minHeight: '52px',
                      }}
                    >
                      <span>{faq.q}</span>
                      <span style={{ flexShrink: 0, color: 'var(--color-text-faint)' }}>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </button>

                    {isOpen && (
                      <p style={{
                        padding: '0 var(--space-md) var(--space-md)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '12px',
                      }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
