import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';

export const CategoryTile = ({ title, categoryKey, itemCount, bgColor = '#F4F1EC' }) => {
  return (
    <Link
      to={`/shop?category=${categoryKey}`}
      className="category-tile"
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <span className="tile-count">{itemCount} styles</span>
        <h3>{title}</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <span style={{
          fontSize: '0.72rem',
          color: 'var(--color-text-muted)',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          Shop now
        </span>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: '1px solid var(--color-border-strong)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          transition: 'background-color var(--transition-fast), color var(--transition-fast)',
        }}>
          <ArrowUpRight size={15} />
        </div>
      </div>

      <div className="bg-mascot">
        <CatMascot width={130} height={130} fillColor="var(--color-text)" accentColor="var(--color-accent)" />
      </div>
    </Link>
  );
};
