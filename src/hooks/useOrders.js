import { useState, useEffect, useCallback } from 'react';
import { fetchOrders } from '../api/orders.js';

export const useOrders = (params = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders(params);
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err.message || 'Failed to load order list');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return { orders, loading, error, refetch: loadOrders };
};
