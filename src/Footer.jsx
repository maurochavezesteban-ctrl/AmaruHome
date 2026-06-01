import React from 'react'

export default function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5491154256307", "_blank")
  }

  return (
    <footer style={{
      backgroundColor: '#fff',
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
            <h3 style={{
              fontFamily: 'serif',
              fontSize: '2rem',
              fontWeight: '700',
              color: '#8b715b', 
              margin: 0
            }}>
              Amaru <span style={{ color: '#c8ab84', fontWeight: '400' }}>Home</span>
            </h3>
            
            <p style={{ color: '#4b5563', fontSize: '15px', margin: 0, fontWeight: '400' }}>
              Diseño, confort y elegancia para cada rincón de tu hogar.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              {/* Instagram directo al perfil de AmaruHome */}
              <a 
                href="https://www.instagram.com/amaru.mhome/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '16px'
                }}
              >
                <i className="bi bi-instagram" />
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '16px'
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

        <div style={{ width: '100%', height: '1px', backgroundColor: '#e5e7eb', marginBottom: '25px' }} />

        <div style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: '400'
        }}>
          &copy; 2026 Amaru Home. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}
