import React from 'react';

/**
 * Hand-drawn industrial Cat Mascot SVG component.
 * Allows custom size, fill, stroke, and mood.
 */
export const CatMascot = ({
  width = 160,
  height = 160,
  fillColor = '#141414',
  accentColor = '#E8B923',
  strokeColor = '#141414',
  expression = 'cool',
  showHardhat = false,
  className = ''
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Cat Factory Mascot Mark"
    >
      {/* Industrial Circular Frame */}
      <circle cx="100" cy="100" r="92" stroke={strokeColor} strokeWidth="6" strokeDasharray="12 6" opacity="0.4" />
      
      {/* Cat Ears */}
      <path
        d="M 50 85 L 25 35 L 75 55 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M 150 85 L 175 35 L 125 55 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Inner Ear Accent */}
      <path d="M 45 70 L 33 45 L 60 55 Z" fill={accentColor} />
      <path d="M 155 70 L 167 45 L 140 55 Z" fill={accentColor} />

      {/* Cat Head Silhouette */}
      <path
        d="M 45 90 C 45 60, 155 60, 155 90 C 160 120, 160 145, 100 155 C 40 145, 40 120, 45 90 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Industrial Hardhat Accent (Optional) */}
      {showHardhat && (
        <g id="hardhat">
          <path d="M 40 65 Q 100 25 160 65 L 170 72 L 30 72 Z" fill={accentColor} stroke={strokeColor} strokeWidth="4" />
          <rect x="85" y="40" width="30" height="20" rx="3" fill="#141414" />
          <text x="100" y="54" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold" fill={accentColor} textAnchor="middle">QC</text>
        </g>
      )}

      {/* Cat Eyes */}
      {expression === 'cool' ? (
        <g id="sunglasses">
          {/* Industrial Shades */}
          <polygon points="45,95 95,95 90,118 55,118" fill={accentColor} stroke={strokeColor} strokeWidth="4" />
          <polygon points="105,95 155,95 145,118 110,118" fill={accentColor} stroke={strokeColor} strokeWidth="4" />
          <line x1="95" y1="102" x2="105" y2="102" stroke={strokeColor} strokeWidth="4" />
          {/* Lens Glare */}
          <line x1="52" y1="99" x2="68" y2="114" stroke="#FFF" strokeWidth="3" />
          <line x1="112" y1="99" x2="128" y2="114" stroke="#FFF" strokeWidth="3" />
        </g>
      ) : (
        <g id="sharp-eyes">
          <ellipse cx="70" cy="100" rx="14" ry="18" fill="#FFF" />
          <ellipse cx="130" cy="100" rx="14" ry="18" fill="#FFF" />
          <ellipse cx="70" cy="100" rx="4" ry="14" fill={strokeColor} />
          <ellipse cx="130" cy="100" rx="4" ry="14" fill={strokeColor} />
        </g>
      )}

      {/* Nose & Mouth */}
      <polygon points="94,122 106,122 100,129" fill={accentColor} />
      <path d="M 92 133 Q 100 140 100 133 Q 100 140 108 133" stroke={accentColor} strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Industrial Whiskers */}
      <g stroke={accentColor} strokeWidth="3" strokeLinecap="round">
        <line x1="30" y1="115" x2="58" y2="120" />
        <line x1="25" y1="128" x2="56" y2="128" />
        <line x1="170" y1="115" x2="142" y2="120" />
        <line x1="175" y1="128" x2="144" y2="128" />
      </g>

      {/* QC Factory Collar Tag */}
      <rect x="75" y="152" width="50" height="20" rx="2" fill={accentColor} stroke={strokeColor} strokeWidth="3" />
      <circle cx="100" cy="162" r="5" fill={strokeColor} />
    </svg>
  );
};
