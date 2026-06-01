import React from 'react';

export default function CategoryBanner({ activeCategory, onCategorySelect }) {
  const categorias = [
    { 
      id: 'todas', 
      name: 'Todas', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-7h6v7"/>
        </svg>
      )
    },
    { 
      id: 'acolchados', 
      name: 'Acolchados', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18M3 14h18M8 5v14M16 5v14" />
        </svg>
      )
    },
    { 
      id: 'alfombras', 
      name: 'Alfombras', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18v12H3zM2 9h1M2 12h1M2 15h1M21 9h1M21 12h1M21 15h1" />
          <path d="M6 9h12M6 15h12M12 6v12" strokeDasharray="1 2" />
        </svg>
      )
    },
    { 
      id: 'almohadas', 
      name: 'Almohadas', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9c0-1.5 1.5-3 4-3h12c2.5 0 4 1.5 4 3v6c0 1.5-1.5 3-4 3H6c-2.5 0-4-1.5-4-3V9z" />
          <path d="M6 6c-1 1-1 2.5-1 4v4c0 1.5 0 3 1 4M18 6c1 1 1 2.5 1 4v4c0 1.5 0 3-1 4" opacity="0.4" />
        </svg>
      )
    },
    { 
      id: 'cortinas', 
      name: 'Cortinas', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4h20M4 4v16M20 4v16" />
          <path d="M4 4c2 4 3 8 3 16M20 4c-2 4-3 8-3 16M10 4c1 4 1.5 8 1.5 16M14 4c-1 4-1.5 8-1.5 16" opacity="0.6" />
        </svg>
      )
    },
    { 
      id: 'frazadas', 
      name: 'Frazadas', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
          <path d="M4 5v14c0 1 1 2 2 2h12c1 0 2-1 2-2V5c0-1-1-2-2-2H6c-1 0-2 1-2 2z" />
        </svg>
      )
    },
    { 
      id: 'sabanas', 
      name: 'Juego de sábanas', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h16v6H4zM4 11h16v8H4z" />
          <path d="M4 11c4-2 12-2 16 0" />
          <path d="M6 5v6M18 5v6" opacity="0.5" />
        </svg>
      )
    },
    { 
      id: 'toallas', 
      name: 'Toallas', 
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M10 7h4M10 12h4M10 17h4" opacity="0.6" />
          <path d="M6 5h2M16 5h2" />
        </svg>
      )
    },
  ];

  return (
    <section style={{ backgroundColor: '#f4f1ec', padding: '48px 0', width: '100%', boxSizing: 'border-box' }}>
      {/* Agrandamos el ancho máximo permitido de 1240px a 1350px para ganar espacio */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 15px', boxSizing: 'border-box' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h2 style={{ 
            fontFamily: 'serif', 
            fontSize: '2.2rem', 
            fontWeight: '700', 
            color: '#8b715b', 
            margin: '0 0 8px 0' 
          }}>
            Explorá Nuestras Categorías
          </h2>
          <p style={{ color: '#4b5563', fontSize: '15px', margin: 0 }}>
            Encontrá exactamente lo que tu hogar necesita
          </p>
        </div>

        {/* Fila única de máxima optimización de espacio */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px', // Reducido un poquito para exprimir el espacio sin romper la fila
          width: '100%',
          justifyContent: 'space-between',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {categorias.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px 6px', // Más alto, pero delgado a los costados
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  userSelect: 'none',
                  flex: '1 1 0px', 
                  minWidth: '115px', // Asegura el tamaño perfecto escalado
                  backgroundColor: isActive ? '#8b715b' : '#fff',
                  color: isActive ? '#fff' : '#374151',
                  boxShadow: isActive ? '0 12px 18px -3px rgba(139,113,91,0.22)' : '0 4px 6px -1px rgba(0,0,0,0.01)',
                  transform: isActive ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Esfera del icono escalada a 56px */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(200, 171, 132, 0.12)',
                  color: isActive ? '#fff' : '#8b715b',
                  transition: 'transform 0.3s ease'
                }}>
                  {category.icon}
                </div>

                {/* Texto a un tamaño impecable y legible */}
                <span style={{
                  fontSize: '13.5px',
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  letterSpacing: '0.1px'
                }}>
                  {category.name}
                </span>

                {/* Indicador grueso inferior */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '32px',
                    height: '4px',
                    backgroundColor: '#c8ab84',
                    borderRadius: '9999px'
                  }} />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
