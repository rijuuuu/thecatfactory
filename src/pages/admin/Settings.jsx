import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/admin/Sidebar.jsx';
import { Topbar } from '../../components/admin/Topbar.jsx';
import { fetchSettings, updateSettings } from '../../api/settings.js';
import { Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const Settings = () => {
  const [formData, setFormData] = useState({
    storeName: 'THE CAT FACTORY',
    tagline: 'HEAVYWEIGHT STREETWEAR & INDUSTRIAL APPAREL',
    contactEmail: 'support@catfactory.com',
    contactPhone: '+91 98765 43210',
    warehouseAddress: 'Dock 04, Industrial Estate Phase II, Mumbai 400093, MH',
    freeShippingThreshold: 1999,
    flatShippingFee: 149,
    announcementText: '⚡ FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹1,999 • ALL ITEMS QC STAMPED'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSettingsData = async () => {
      setLoading(true);
      try {
        const res = await fetchSettings();
        if (res.success && res.settings) {
          setFormData(res.settings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSettingsData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await updateSettings({
        ...formData,
        freeShippingThreshold: Number(formData.freeShippingThreshold),
        flatShippingFee: Number(formData.flatShippingFee)
      });

      if (res.success) {
        setMessage('Store settings updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to save settings');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar title="FACTORY STORE OPERATIONAL SETTINGS" />

        <div className="admin-content">
          <div style={{
            backgroundColor: '#1E1E1E',
            border: '1px solid #2D2D2D',
            padding: 'var(--space-2xl)',
            maxWidth: '780px'
          }}>
            <h2 style={{ fontSize: '1.6rem', color: 'white', marginBottom: '20px' }}>
              GLOBAL STORE PARAMS
            </h2>

            {message && (
              <div style={{ backgroundColor: '#1B3A1B', color: '#66BB6A', padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} /> {message}
              </div>
            )}

            {error && (
              <div style={{ backgroundColor: '#3A1515', color: '#FF7777', padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'JetBrains Mono' }}>
                <RefreshCw size={24} className="spin" style={{ marginBottom: '8px' }} />
                <div>FETCHING STORE SETTINGS...</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" style={{ color: 'white' }}>Store Brand Name</label>
                  <input
                    type="text"
                    name="storeName"
                    required
                    value={formData.storeName}
                    onChange={handleChange}
                    className="form-input"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" style={{ color: 'white' }}>Brand Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    required
                    value={formData.tagline}
                    onChange={handleChange}
                    className="form-input"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'white' }}>Contact Support Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="form-input"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'white' }}>Contact Phone Line</label>
                  <input
                    type="text"
                    name="contactPhone"
                    required
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="form-input"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" style={{ color: 'white' }}>Warehouse Logistics Address</label>
                  <input
                    type="text"
                    name="warehouseAddress"
                    required
                    value={formData.warehouseAddress}
                    onChange={handleChange}
                    className="form-input"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'white' }}>Free Shipping Threshold (₹)</label>
                  <input
                    type="number"
                    name="freeShippingThreshold"
                    required
                    value={formData.freeShippingThreshold}
                    onChange={handleChange}
                    className="form-input"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'white' }}>Flat Shipping Fee (₹)</label>
                  <input
                    type="number"
                    name="flatShippingFee"
                    required
                    value={formData.flatShippingFee}
                    onChange={handleChange}
                    className="form-input"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" style={{ color: 'white' }}>Top Bar Announcement Promo Banner</label>
                  <textarea
                    name="announcementText"
                    rows="2"
                    value={formData.announcementText}
                    onChange={handleChange}
                    className="form-textarea"
                    style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
                  <button type="submit" disabled={saving} className="btn-primary">
                    <Save size={16} /> {saving ? 'SAVING...' : 'SAVE SETTINGS'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
