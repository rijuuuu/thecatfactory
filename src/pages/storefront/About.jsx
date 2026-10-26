import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Factory, ArrowRight } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { QCBadge } from '../../assets/QCBadge.jsx';

export const About = () => {
  const pillars = [
    {
      icon: <Award size={30} color="var(--color-accent)" style={{ marginBottom: '14px' }} />,
      title: '1. Heavyweight Fabrics',
      body: 'We source 320–420 GSM 100% French terry cotton that maintains its shape, weight, and dense boxy drape for years.',
    },
    {
      icon: <Factory size={30} color="var(--color-earth)" style={{ marginBottom: '14px' }} />,
      title: '2. Small Batch Drops',
      body: 'No mass overproduction. We craft small limited runs to ensure rigorous quality control and true exclusivity for our community.',
    },
    {
      icon: <ShieldCheck size={30} color="var(--color-accent)" style={{ marginBottom: '14px' }} />,
      title: '3. QC Stamp Guarantee',
      body: 'Every garment passes a 12-point inspection covering seam tension, print density, collar structure, and size fidelity.',
    },
  ];

  return (
    <div className="about-page" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="subtitle">The Manifesto · Founded 2026</span>
            <h2>About The Cat Factory</h2>
          </div>
          <QCBadge text="INDUSTRIAL QUALITY" batch="MUMBAI DOCKS #04" rotate={-4} />
        </div>

        {/* Brand Story Layout */}
        <div className="about-split-layout" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div>
            <h3 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              color: 'var(--color-text)',
              marginBottom: '18px',
              lineHeight: 1.25,
            }}>
              Streetwear built with an industrial factory ethos.
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text)' }}>The Cat Factory</strong> was born out of frustration with thin, flimsy
              fast-fashion garments that shrink after a single wash. We set out to build heavyweight apparel
              with zero compromise: 400 GSM French terry cotton, reinforced stitching, raw seam accents,
              and boxy industrial silhouettes.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-text-muted)' }}>
              Our mascot mark is the brand's official inspector badge — representing small-batch production
              where every single garment receives a physical QC stamp before leaving our factory floor.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <CatMascot
              width={200}
              height={200}
              fillColor="var(--color-text)"
              accentColor="var(--color-accent)"
              expression="cool"
              showHardhat={true}
            />
            <h4 style={{
              fontSize: '1.05rem',
              fontWeight: 400,
              letterSpacing: '0.06em',
              marginTop: '18px',
              color: 'var(--color-text)',
            }}>
              Unit #04 Warehouse Docks
            </h4>
            <span style={{
              fontSize: '0.72rem',
              color: 'var(--color-accent)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}>
              Industrial Estate Phase II, Mumbai
            </span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="about-pillars-grid" style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'var(--space-2xl)',
        }}>
          {pillars.map((p) => (
            <div key={p.title} style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--space-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {p.icon}
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '0.03em',
                marginBottom: '10px',
                color: 'var(--color-text)',
              }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
          <Link to="/shop" className="btn-primary" style={{ padding: '14px 32px' }}>
            Explore the Catalog <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
