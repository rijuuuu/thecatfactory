export const getColorHex = (colorName) => {
  if (!colorName) return '#141414';
  const name = colorName.toLowerCase();
  
  if (name.includes('black') || name.includes('ink')) return '#141414';
  if (name.includes('cream') || name.includes('white')) return '#FAF7F0';
  if (name.includes('yellow') || name.includes('hazard')) return '#E8B923';
  if (name.includes('rust') || name.includes('red')) return '#8B3A2E';
  if (name.includes('charcoal') || name.includes('grey') || name.includes('gray')) return '#2A2A2A';
  if (name.includes('olive') || name.includes('green')) return '#3D4839';
  if (name.includes('tan') || name.includes('beige')) return '#D8CFBC';

  return '#141414';
};
