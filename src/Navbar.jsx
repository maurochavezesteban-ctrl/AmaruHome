import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import logoImg from './mi-logo.png' 

export default function Navbar({ cartCount, favoritosCount = 0, onCartToggle, onFavoritosToggle, searchQuery, onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* CONTENEDOR FLOTANTE UNIFICADO */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100, // Prioridad equilibrada para no tapar los paneles del carrito
        boxShadow: isScrolled ? '0 4px 15px rgba(0,0,0,0.04)' : 'none',
        transition: 'all 0.25s ease-in-out'
      }}>
        
        {/* 💳 CARTEL MARRÓN SUPERIOR */}
        <div style={{ 
          backgroundColor: '#765c48', 
          color: '#fff', 
          textAlign: 'center', 
          padding: isScrolled ? '0px' : '6px 0', 
          height: isScrolled ? '0px' : 'auto',
          opacity: isScrolled ? 0 : 1,
          overflow: 'hidden',
          fontSize: '13px', 
          fontWeight: '500',
          letterSpacing: '0.3px',
          transition: 'all 0.2s ease-in-out'
        }}>
          ✨ Envíos a todo el país — hasta 6 cuotas
        </div>
        
        {/* 🎨 BARRA DE NAVEGACIÓN BEIGE */}
        <nav style={{ 
          padding: isScrolled ? '4px 24px' : '8px 24px', 
          backgroundColor: '#f6f2eb', 
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            width: '100%',
            gap: '30px'
          }}>
            
            {/* LOGO */}
            <div style={{ flex: '0 0 auto' }}>
              <a href="#" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img 
                  src={logoImg} 
                  alt="Amaru Home Logo" 
                  style={{ 
                    height: isScrolled ? '55px' : '75px', 
                    width: 'auto', 
                    objectFit: 'contain',
                    borderRadius: '50%',
                    transition: 'all 0.25s ease-in-out'
                  }} 
                />
              </a>
            </div>

            {/* BUSCADOR AGRANDADO */}
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
              <div className={styles.searchBox} style={{ width: '100%', maxWidth: '700px', margin: 0 }}>
                <input
                  type="text"
                  placeholder="Buscar productos en AmaruHome..."
                  value={searchQuery}
                  onChange={e => onSearch(e.target.value)}
                  style={{ backgroundColor: '#fff', border: '1px solid #e3dac9', padding: '10px 15px' }}
                />
                <i className="bi bi-search" />
              </div>
            </div>

            {/* ÍCONOS LATERALES */}
            <div style={{ flex: '0 0 auto' }}>
              <div className={styles.navIcons} style={{ display: 'flex', gap: '22px', alignItems: 'center', margin: 0 }}>
                
                {/* Corazón Favoritos */}
                <button onClick={onFavoritosToggle} style={{ background: 'none', border: 'none', position: 'relative', padding: 0, color: '#54473c', cursor: 'pointer' }}>
                  <i className={favoritosCount > 0 ? "bi bi-heart-fill" : "bi bi-heart"} 
                     style={{ fontSize: '21px', color: favoritosCount > 0 ? '#dc2626' : '#54473c' }} />
                  {favoritosCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>{favoritosCount}</span>
                  )}
                </button>

                <a href="#" style={{ color: '#54473c' }}><i className="bi bi-person" style={{ fontSize: '21px' }} /></a>
                
                {/* Bolsa Carrito */}
                <button className={styles.cartBtn} onClick={onCartToggle} style={{ background: 'none', border: 'none', position: 'relative', padding: 0, color: '#54473c', cursor: 'pointer' }}>
                  <i className="bi bi-bag" style={{ fontSize: '21px' }} />
                  {cartCount > 0 && (
                    <span className={styles.cartBadge} style={{ backgroundColor: '#765c48' }}>{cartCount}</span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </nav>
      </div>
      
      {/* Espaciador estático transparente de fondo seguro */}
      <div style={{ height: '120px' }} />
    </>
  )
}
