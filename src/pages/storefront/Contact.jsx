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
      q: "What does 'QC PASSED' mean on the tags?",
      a: "Every single garment undergoes physical manual inspection at Dock 04. The QC stamp confirms 12 parameters including fabric GSM, print adhesion, seam strength, and size accuracy."
    },
    {
      q: "What is your shipping timeline across India?",
      a: "Orders placed before 2 PM IST ship the same day via Express logistics (BlueDart/Delhivery). Metro deliveries take 2-3 business days; rest of India takes 3-5 days."
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
            <span className="subtitle">FACTORY SUPPORT // OPERATOR COMMUNICATIONS</span>
            <h2>CONTACT & HELP CENTER</h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-3xl)',
          alignItems: 'start'
        }}>
          {/* Left Contact Form */}
          <div style={{
            backgroundColor: 'var(--color-off-white)',
            border: 'var(--border-thick)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-flat)'
          }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>DISPATCH OPERATOR QUERY FORM</h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <Check size={48} color="var(--color-factory-yellow)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.4rem' }}>TRANSMISSION RECEIVED!</h4>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: '#666', marginTop: '6px' }}>
                  A factory support officer will respond within 4 business hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary" style={{ marginTop: '16px' }}>
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  <label className="form-label">Query Subject</label>
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
                  <label className="form-label">Message Details</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                    placeholder="How can our support team assist with your order..."
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
                  <Send size={16} /> TRANSMIT MESSAGE
                </button>
              </form>
            )}

            {/* Address Box */}
            <div style={{ marginTop: '32px', borderTop: 'var(--border-dashed)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--color-rust)" />
                <span>Warehouse Hub #04, Industrial Estate Phase II, Mumbai 400093</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--color-rust)" />
                <span>support@catfactory.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--color-rust)" />
                <span>+91 98765 43210 (Mon-Sat, 10 AM - 7 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Right FAQ Accordion */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>FREQUENTLY ASKED QUESTIONS</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} style={{
                    backgroundColor: 'var(--color-off-white)',
                    border: 'var(--border-thick)',
                    padding: 'var(--space-md)',
                    boxShadow: 'var(--shadow-flat)'
                  }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontFamily: 'JetBrains Mono',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        color: 'var(--color-ink-black)'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {isOpen && (
                      <p style={{ marginTop: '12px', fontFamily: 'Archivo', fontSize: '0.9rem', color: '#444', borderTop: 'var(--border-hairline)', paddingTop: '10px' }}>
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
