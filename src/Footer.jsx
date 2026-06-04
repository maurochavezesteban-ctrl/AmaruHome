import React from 'react'

export default function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me", "_blank")
  }

  return (
    <footer style={{
      backgroundColor: '#f5f0eb',
      padding: '60px 40px 30px 40px',
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '30px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>

          <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Título adaptado a la tipografía limpia y sin serifas de tu web y logo */}
            <h3 style={{ 
              margin: 0, 
              display: 'flex', 
              alignItems: 'baseline', 
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <span style={{
                fontFamily: '"Montserrat", "Helvetica Neue", sans-serif',
                fontSize: '2.1rem',
                fontWeight: '700', // Letra gruesa e imponente
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#4a3f38',
              }}>
                AMARU
              </span>
              <span style={{
                fontFamily: '"Montserrat", "Helvetica Neue", sans-serif',
                fontSize: '1.9rem', // Un punto por debajo de AMARU
                fontWeight: '300', // Letra ultra fina/delgada, tal como tu logo real
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c2897a',
              }}>
                HOME
              </span>
            </h3>

            <p style={{ color: '#7a6e68', fontSize: '15px', margin: 0, fontWeight: '400' }}>
              Diseño, confort y elegancia para cada rincón de tu hogar.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4a3f38',
                  textDecoration: 'none',
                  fontSize: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                }}
              >
                <i className="bi bi-instagram" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4a3f38',
                  textDecoration: 'none',
                  fontSize: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                }}
              >
                <i className="bi bi-facebook" />
              </a>
            </div>
          </div>

          <div style={{ flex: '0 0 auto' }}>
            <button
              onClick={handleWhatsAppClick}
              style={{
                backgroundColor: '#25d366',
                color: '#fff',
                border: 'none',
                borderRadius: '30px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)'
              }}
            >
              <i className="bi bi-whatsapp" style={{ fontSize: '20px' }} />
              Contactanos por WhatsApp
            </button>
          </div>

        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: '#ddd4c8', marginBottom: '25px' }} />

        <div style={{
          textAlign: 'center',
          color: '#9e9189',
          fontSize: '14px',
          fontWeight: '400'
        }}>
          &copy; 2026 Amaru Home. Todos los derechos reservados a Mauro Chavez.
        </div>

      </div>
    </footer>
  )
}
