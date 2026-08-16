import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CatMascot } from '../../assets/CatMascot.jsx';

export const CategoryTile = ({ title, categoryKey, itemCount, bgColor = '#FAF7F0' }) => {
  return (
    <Link 
      to={`/shop?category=${categoryKey}`} 
      className="category-tile"
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <span className="tile-count">UNIT DIVISION // 0{categoryKey.length}</span>
        <h3>{title}</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', fontWeight: 700 }}>
          {itemCount} STYLES
        </span>
        <div style={{
          width: 32,
          height: 32,
          border: '2px solid #141414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white'
        }}>
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="bg-mascot">
        <CatMascot width={140} height={140} fillColor="#141414" />
      </div>
    </Link>
  );
};
