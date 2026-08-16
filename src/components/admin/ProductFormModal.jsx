import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { createProduct, updateProduct } from '../../api/products.js';
import { getCardBgColorForCategory } from '../../utils/categoryVisuals.js';

export const ProductFormModal = ({ isOpen, onClose, product = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Hoodies',
    price: '',
    mrp: '',
    stock: '',
    qcStatus: 'QC PASSED — STAMPED',
    description: '',
    fabric: '100% Heavyweight Cotton 320 GSM',
    fit: 'Oversized Boxy Fit',
    cardBgColor: getCardBgColorForCategory('Hoodies'),
    printColor: '#141414',
    images: [],
    isBestseller: false,
    isNewArrival: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ink Black', hex: '#141414' }
    ]
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Hoodies',
        price: product.price || '',
        mrp: product.mrp || '',
        stock: product.stock || '',
        qcStatus: product.qcStatus || 'QC PASSED — STAMPED',
        description: product.description || '',
        fabric: product.fabric || '100% Heavyweight Cotton 320 GSM',
        fit: product.fit || 'Oversized Boxy Fit',
        cardBgColor: getCardBgColorForCategory(product.category || 'Hoodies'),
        printColor: product.printColor || '#141414',
        images: product.images || [],
        isBestseller: !!product.isBestseller,
        isNewArrival: !!product.isNewArrival,
        sizes: product.sizes || ['S', 'M', 'L', 'XL'],
        colors: product.colors || [{ name: 'Ink Black', hex: '#141414' }]
      });
    } else {
      setFormData({
        name: '',
        category: 'Hoodies',
        price: '',
        mrp: '',
        stock: '',
        qcStatus: 'QC PASSED — STAMPED',
        description: '',
        fabric: '100% Heavyweight Cotton 320 GSM',
        fit: 'Oversized Boxy Fit',
        cardBgColor: getCardBgColorForCategory('Hoodies'),
        printColor: '#141414',
        images: [],
        isBestseller: false,
        isNewArrival: true,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [{ name: 'Ink Black', hex: '#141414' }]
      });
    }
    setImageUrlInput('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'category' ? { cardBgColor: getCardBgColorForCategory(value) } : {})
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const exists = prev.sizes.includes(size);
      const updated = exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size];
      return { ...prev, sizes: updated };
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrlInput.trim()]
      }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        stock: Number(formData.stock)
      };

      if (product && product._id) {
        await updateProduct(product._id, payload);
      } else {
        await createProduct(payload);
      }

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Failed to save product');
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        <div className="admin-modal-header">
          <h2 style={{ fontSize: '1.4rem', color: 'white' }}>
            {product ? 'EDIT PRODUCT SPECIFICATION' : 'NEW PRODUCT STAGING FORM'}
          </h2>
          <button onClick={onClose} style={{ color: '#AAA' }} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {error && (
              <div style={{ gridColumn: 'span 2', backgroundColor: '#3A1515', color: '#FF7777', padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* PRODUCT IMAGES SECTION */}
            <div style={{ gridColumn: 'span 2', backgroundColor: '#141414', border: '1px solid #333', padding: '16px' }}>
              <label className="form-label" style={{ color: 'var(--color-factory-yellow)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={16} /> PRODUCT IMAGES GALLERY
              </label>

              {/* Upload Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
                {/* Option A: Pick Local Image File */}
                <div style={{ border: '1px dashed #444', padding: '12px', textAlign: 'center', backgroundColor: '#1E1E1E' }}>
                  <label htmlFor="modal-file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <Upload size={20} color="var(--color-factory-yellow)" />
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', fontWeight: 'bold' }}>UPLOAD IMAGE FILE</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#888' }}>PNG, JPG, WEBP from device</span>
                  </label>
                  <input
                    id="modal-file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Option B: External Image URL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#AAA' }}>OR PASTE IMAGE URL:</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="url"
                      placeholder="https://example.com/item.jpg"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="form-input"
                      style={{ backgroundColor: '#1E1E1E', color: 'white', borderColor: '#444', fontSize: '0.8rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', backgroundColor: '#333', color: 'white' }}
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Previews Grid */}
              {formData.images.length > 0 && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px', borderTop: '1px dashed #333', paddingTop: '12px' }}>
                  {formData.images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', border: '1px solid #444', backgroundColor: '#000' }}>
                      <img
                        src={img}
                        alt={`Preview ${idx}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        style={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          backgroundColor: 'var(--color-rust)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #141414',
                          cursor: 'pointer'
                        }}
                        title="Remove image"
                      >
                        <X size={12} />
                      </button>
                      {idx === 0 && (
                        <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'var(--color-factory-yellow)', color: '#141414', fontFamily: 'JetBrains Mono', fontSize: '0.55rem', textAlign: 'center', fontWeight: 'bold' }}>
                          MAIN
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label" style={{ color: 'white' }}>Product Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
                placeholder="e.g. QC-02 HEAVYWEIGHT FLEECE ZIP HOODIE"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'white' }}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
              >
                <option value="Hoodies">Hoodies</option>
                <option value="Tees">Tees</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Outerwear">Outerwear</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'white' }}>Selling Price (₹)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'white' }}>MRP Strikethrough (₹)</label>
              <input
                type="number"
                name="mrp"
                required
                value={formData.mrp}
                onChange={handleChange}
                className="form-input"
                style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'white' }}>Available Stock Units</label>
              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
                className="form-input"
                style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label" style={{ color: 'white' }}>Available Sizes</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
                  const selected = formData.sizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleSizeToggle(sz)}
                      style={{
                        padding: '6px 12px',
                        border: '1px solid #444',
                        backgroundColor: selected ? 'var(--color-factory-yellow)' : '#121212',
                        color: selected ? '#141414' : 'white',
                        fontWeight: 800,
                        fontFamily: 'JetBrains Mono'
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label" style={{ color: 'white' }}>Description Copy</label>
              <textarea
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                style={{ backgroundColor: '#121212', color: 'white', borderColor: '#333' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '24px', paddingTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  name="isBestseller"
                  checked={formData.isBestseller}
                  onChange={handleChange}
                />
                Mark as Bestseller
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleChange}
                />
                Mark as New Drop
              </label>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary" style={{ backgroundColor: '#222', color: 'white', borderColor: '#444' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary" id="save-product-modal-btn">
              <Save size={16} /> {loading ? 'SAVING...' : 'SAVE PRODUCT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
