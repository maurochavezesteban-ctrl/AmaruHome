import React from 'react'

export default function Sidebar({ activeCategory, onCategoryChange }) {
  // Definimos las categorías exactas de tu imagen con sus respectivos íconos de Bootstrap Icons
  const categorias = [
    { id: 'todas', name: 'Todas', icon: 'bi-house-door' },
    { id: 'acolchados', name: 'Acolchados', icon: 'bi-box' }, // Puedes cambiar los íconos si usas otros
    { id: 'alfombras', name: 'Alfombras', icon: 'bi-house' },
    { id: 'almohadas', name: 'Almohadas', icon: 'bi-stars' },
    { id: 'cortinas', name: 'Cortinas', icon: 'bi-wind' },
    { id: 'frazadas', name: 'Frazadas', icon: 'bi-archive' },
    { id: 'sabanas', name: 'Juego de sábanas', icon: 'bi-house' },
  ]

  return (
    <div style={{ width: '100%', marginBottom: '40px', fontFamily: 'inherit' }}>
      {/* Título de la sección */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.2rem', color: '#8a6d55', fontWeight: '600', margin: '0 0 8px 0' }}>
          Explorá Nuestras Categorías
        </h2>
        <p style={{ color: '#777', fontSize: '15px', margin: 0 }}>
          Encontrá exactamente lo que tu hogar necesita
        </p>
      </div>

      {/* Grilla de Tarjetas (4 columnas en pantallas grandes) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        width: '100%'
      }}>
        {categorias.map((cat) => {
          const isActive = activeCategory === cat.id
          
          return (
            <div
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              style={{
                backgroundColor: isActive ? '#967d69' : '#fff', // Marrón si está activo, blanco si no
                color: isActive ? '#fff' : '#444',
                padding: '25px 15px',
                borderRadius: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: isActive 
                  ? '0 10px 20px rgba(150, 125, 105, 0.3)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                border: isActive ? 'none' : '1px solid #f0f0f0'
              }}
            >
              {/* Ícono redondo */}
              <div style={{ fontSize: '28px', opacity: isActive ? 1 : 0.6 }}>
                <i className={`bi ${cat.icon}`} />
              </div>
              
              {/* Nombre de la categoría */}
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                {cat.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
