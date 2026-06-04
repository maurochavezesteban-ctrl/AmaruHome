import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import logoImg from './mi-logo.png'

export default function Navbar({ cartCount, favoritosCount = 0, onCartToggle, onFavoritosToggle, searchQuery, onSearch, isCartOpen }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile]     = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cierra el carrito al hacer scroll
  useEffect(() => {
    if (!isCartOpen) return

    const handleScrollClose = () => {
      onCartToggle()
    }

    window.addEventListener('scroll', handleScrollClose, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollClose)
  }, [isCartOpen, onCartToggle])

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        zIndex: 1100,
        boxShadow: isScrolled ? '0 4px 15px rgba(0,0,0,0.04)' : 'none',
        transition: 'all 0.25s ease-in-out'
      }}>

        {/* CARTEL SUPERIOR */}
        <div style={{
          backgroundColor: '#765c48', color: '#fff', textAlign: 'center',
          padding: isScrolled ? '0px' : '6px 0',
          height: isScrolled ? '0px' : 'auto',
          opacity: isScrolled ? 0 : 1,
          overflow: 'hidden', fontSize: '13px', fontWeight: '500',
          letterSpacing: '0.3px', transition: 'all 0.2s ease-in-out'
        }}>
          ✨ Envíos a todo el país — hasta 6 cuotas
        </div>

        {/* NAVBAR — una sola fila siempre */}
        <nav style={{
          padding: isMobile ? '8px 12px' : (isScrolled ? '4px 24px' : '8px 24px'),
          backgroundColor: '#f6f2eb', width: '100%', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: isMobile ? '8px' : '30px' }}>

            {/* LOGO */}
            <div style={{ flex: '0 0 auto' }}>
              <a href="#" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src={logoImg} alt="Amaru Home Logo" style={{
                  height: isMobile ? '46px' : (isScrolled ? '55px' : '75px'),
                  width: 'auto', objectFit: 'contain', borderRadius: '50%',
                  transition: 'all 0.25s ease-in-out'
                }} />
              </a>
            </div>

            {/* BUSCADOR — siempre visible, placeholder corto en mobile */}
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
              <div className={styles.searchBox} style={{ width: '100%', maxWidth: isMobile ? '100%' : '700px', margin: 0 }}>
                <input
                  type="text"
                  placeholder={isMobile ? 'Buscar...' : 'Buscar productos en AmaruHome...'}
                  value={searchQuery}
                  onChange={e => onSearch(e.target.value)}
                  style={{ backgroundColor: '#fff', border: '1px solid #e3dac9', padding: isMobile ? '8px 12px' : '10px 15px' }}
                />
                <i className="bi bi-search" />
              </div>
            </div>

            {/* ÍCONOS */}
            <div style={{ flex: '0 0 auto' }}>
              <div style={{ display: 'flex', gap: isMobile ? '14px' : '22px', alignItems: 'center' }}>

                {/* Favoritos */}
                <button onClick={onFavoritosToggle} style={{ background: 'none', border: 'none', position: 'relative', padding: 0, color: '#54473c', cursor: 'pointer' }}>
                  <i className={favoritosCount > 0 ? 'bi bi-heart-fill' : 'bi bi-heart'}
                     style={{ fontSize: isMobile ? '19px' : '21px', color: favoritosCount > 0 ? '#dc2626' : '#54473c' }} />
                  {favoritosCount > 0 && (
                    <span className={styles.cartBadge} style={{ backgroundColor: '#dc2626' }}>{favoritosCount}</span>
                  )}
                </button>

                {/* Persona */}
                <a href="#" style={{ color: '#54473c' }}>
                  <i className="bi bi-person" style={{ fontSize: isMobile ? '19px' : '21px' }} />
                </a>

                {/* Carrito */}
                <button className={styles.cartBtn} onClick={onCartToggle} style={{ background: 'none', border: 'none', position: 'relative', padding: 0, color: '#54473c', cursor: 'pointer' }}>
                  <i className="bi bi-bag" style={{ fontSize: isMobile ? '19px' : '21px' }} />
                  {cartCount > 0 && (
                    <span className={styles.cartBadge} style={{ backgroundColor: '#765c48' }}>{cartCount}</span>
                  )}
                </button>

              </div>
            </div>

          </div>
        </nav>
      </div>

      <div style={{ height: isMobile ? '72px' : '120px' }} />
    </>
  )
}
