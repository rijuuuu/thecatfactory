const CATEGORY_CARD_BG_COLOR = {
  Hoodies: '#EAE5DB',
  Tees: '#F5F0E6',
  Bottoms: '#E2DDD2',
  Outerwear: '#EDE6D8',
  Accessories: '#F2EBE0'
};

export const getCardBgColorForCategory = (category) => CATEGORY_CARD_BG_COLOR[category] || '#EAE5DB';
