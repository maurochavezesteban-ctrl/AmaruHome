import React, { useState } from 'react';
import { fmt } from './data';

export default function ProductCard({ product, onAdd, isFavorite, onToggleFavorite }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCartLocal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAdd && product) {
      onAdd(product);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(product.id);
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ position: 'relative', border: '1px solid #f2ece4', display: 'flex', flexDirection: 'column' }}
    >
      {/* Corazón */}
      <button
        type="button"
        onClick={handleFavClick}
        style={{
          position: 'absolute', top: '12px', right: '12px',
          backgroundColor: 'rgba(255,255,255,0.95)', border: 'none',
          borderRadius: '50%', width: '36px', height: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)', cursor: 'pointer',
          zIndex: 50, transition: 'all 0.2s ease',
        }}
      >
        <i
          className={isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
          style={{ color: isFavorite ? '#dc2626' : '#888', fontSize: '18px' }}
        />
      </button>

      {/* Imagen */}
      <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Info */}
      <div className="p-4" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0', fontWeight: '500' }}>
          {product.cat || 'General'}
        </p>

        <h3 style={{ fontSize: '15px', fontWeight: '500', minHeight: '44px', margin: '0 0 12px 0', color: '#111827', lineHeight: '1.4' }}>
          {product.name}
        </h3>

        {/* Fila: precio + botón */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: 'auto' }}>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#8b715b', flexShrink: 0 }}>
            {fmt(product.price)}
          </span>

          <button
            type="button"
            onClick={handleAddToCartLocal}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backgroundColor: showSuccess ? '#22c55e' : '#e9dccd',
              color: showSuccess ? '#fff' : '#111827',
            }}
          >
            {showSuccess ? (
              <>
                <i className="bi bi-check-lg" style={{ fontSize: '13px' }} />
                Agregado
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg" style={{ fontSize: '12px' }} />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
