import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tcf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('tcf_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, qty = 1) => {
    const colorObj = typeof selectedColor === 'object' ? selectedColor : { name: selectedColor, hex: '#141414' };
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'M';
    const colorName = colorObj.name || (product.colors && product.colors[0]?.name) || 'Standard';

    setCartItems(prevItems => {
      // Check if item with exact same id, size, and color exists
      const existingIndex = prevItems.findIndex(
        item => item.product._id === product._id && item.size === size && item.color === colorName
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].qty += qty;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            product,
            size,
            color: colorName,
            colorHex: colorObj.hex || '#141414',
            qty,
            cardBgColor: product.cardBgColor || '#EAE5DB',
            printColor: product.printColor || '#141414'
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev];
      const newQty = updated[index].qty + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].qty = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleCart,
      openCart,
      closeCart,
      subtotal,
      totalItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
