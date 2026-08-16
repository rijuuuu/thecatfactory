import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api/products.js';

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(params);
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message || 'Failed to load product catalog');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, refetch: loadProducts };
};
