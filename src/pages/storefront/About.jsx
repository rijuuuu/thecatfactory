import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Factory, ArrowRight } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';
import { QCBadge } from '../../assets/QCBadge.jsx';

export const About = () => {
  return (
    <div className="about-page" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        {/* Header Title */}
        <div className="section-header">
          <div>
            <span className="subtitle">THE MANIFESTO // FOUNDED 2026</span>
            <h2>ABOUT THE CAT FACTORY</h2>
          </div>
          <QCBadge text="INDUSTRIAL QUALITY" batch="MUMBAI DOCKS #04" rotate={-4} />
        </div>

        {/* Brand Story Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-3xl)',
          alignItems: 'center',
          marginBottom: 'var(--space-3xl)'
        }}>
          <div>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--color-rust)', marginBottom: '16px' }}>
              STREETWEAR BUILT WITH AN INDUSTRIAL FACTORY ETHOS.
            </h3>
            <p style={{ fontFamily: 'Archivo', fontSize: '1.05rem', lineHeight: '1.7', color: '#222', marginBottom: '16px' }}>
              <strong>The Cat Factory</strong> was born out of frustration with thin, flimsy fast-fashion garments that shrink after a single wash. We set out to build heavyweight apparel with zero compromise: 400 GSM French terry cotton, reinforced stitching, raw seam accents, and boxy industrial silhouettes.
            </p>
            <p style={{ fontFamily: 'Archivo', fontSize: '1.05rem', lineHeight: '1.7', color: '#222' }}>
              Our mascot mark is the brand's official inspector badge — representing small-batch production where every single garment receives a physical QC stamp before leaving our factory floor.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--color-off-white)',
            border: 'var(--border-thick)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-flat)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <CatMascot width={220} height={220} fillColor="#141414" accentColor="#E8B923" expression="cool" showHardhat={true} />
            <h4 style={{ fontSize: '1.4rem', marginTop: '16px', color: 'var(--color-ink-black)' }}>
              UNIT #04 WAREHOUSE DOCKS
            </h4>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'var(--color-rust)', fontWeight: 800 }}>
              INDUSTRIAL ESTATE PHASE II, MUMBAI
            </span>
          </div>
        </div>

        {/* 3 Pillars Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-xl)',
          borderTop: 'var(--border-thick)',
          paddingTop: 'var(--space-2xl)'
        }}>
          <div style={{ backgroundColor: 'var(--color-off-white)', border: 'var(--border-thick)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-flat)' }}>
            <Award size={36} color="var(--color-factory-yellow)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>1. HEAVYWEIGHT FABRICS</h3>
            <p style={{ fontFamily: 'Archivo', fontSize: '0.9rem', color: '#444' }}>
              We source 320 to 420 GSM 100% French terry cotton that maintains its shape, weight, and dense boxy drape for years.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-off-white)', border: 'var(--border-thick)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-flat)' }}>
            <Factory size={36} color="var(--color-rust)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>2. SMALL BATCH DROPS</h3>
            <p style={{ fontFamily: 'Archivo', fontSize: '0.9rem', color: '#444' }}>
              No mass overproduction. We craft small limited runs to ensure rigorous quality control and true exclusivity for our community.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-off-white)', border: 'var(--border-thick)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-flat)' }}>
            <ShieldCheck size={36} color="var(--color-factory-yellow)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>3. QC STAMP GUARANTEE</h3>
            <p style={{ fontFamily: 'Archivo', fontSize: '0.9rem', color: '#444' }}>
              Every garment passes a 12-point inspection covering seam tension, print density, collar structure, and size fidelity.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
          <Link to="/shop" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            EXPLORE THE FACTORY CATALOG <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
