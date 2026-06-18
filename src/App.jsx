import { useState, useEffect, useRef } from 'react'
import { fetchProductsFromSheets } from './data'
import { useCart } from './useCart'
import Navbar from './Navbar'
import CartPanel from './CartPanel'
import Hero from './Hero'
import CategoryBanner from './CategoryBanner'
import ProductCard from './ProductCard'
import Footer from './Footer'
import Toast, { useToast } from './Toast'
import FilterDrawer from './FilterDrawer'
import styles from './App.module.css'

const CATEGORY_NAMES = {
  acolchados: 'acolchados',
  alfombras:  'alfombras',
  almohadas:  'almohadas',
  cortinas:   'cortinas',
  frazadas:   'frazadas',
  sabanas:    'juego de sabanas',
  toallas:    'toallas',
}

const normalize = (str) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const makeCollapseStyle = (isCollapsed, maxH = '800px') => ({
  overflow:      'hidden',
  maxHeight:     isCollapsed ? '0px' : maxH,
  opacity:       isCollapsed ? 0 : 1,
  pointerEvents: isCollapsed ? 'none' : 'auto',
  transition:    'max-height 0.45s ease-in-out, opacity 0.3s ease-in-out',
})

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen]                 = useState(false)
  const [activeCategory, setActiveCategory]     = useState('todas')
  const [searchQuery, setSearchQuery]           = useState('')
  const [isMobile, setIsMobile]                 = useState(window.innerWidth < 1024)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [favoritos, setFavoritos]               = useState([])
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)
useEffect(() => {
  fetchProductsFromSheets().then(data => {
    setProducts(data)
    setLoading(false)
  })
}, [])

  const { cart, addToCart, removeFromCart, changeQty, total } = useCart()
  const { message, visible, showToast } = useToast()

  const wasSearchingRef = useRef(false)

  // Ref para saber si el foco esta en el buscador del Navbar
  const searchIsFocused = useRef(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isSearching = searchQuery.trim().length > 0

  useEffect(() => {
    if (!isSearching && wasSearchingRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    wasSearchingRef.current = isSearching
  }, [isSearching])

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product)
      showToast(product.name + ' agregado al carrito')
      setCartOpen(true)
    }
  }

  const handleToggleFavorite = (id) => {
    setFavoritos(prev => {
      if (prev.includes(id)) {
        showToast('Quitado de favoritos')
        return prev.filter(favId => favId !== id)
      } else {
        showToast('Guardado en favoritos')
        return [...prev, id]
      }
    })
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setActiveCategory('todas')
    setMostrarFavoritos(false)
  }

  // ✅ FIX: solo actualiza searchQuery si el foco esta en el buscador
  const handleSearch = (val) => {
    if (searchIsFocused.current) {
      setSearchQuery(val)
    }
  }

  const filtered = products.filter(p => {
    const coincideCategoria = activeCategory === 'todas' || p.cat === activeCategory
    const searchNorm        = normalize(searchQuery.trim())
    const catDisplay        = CATEGORY_NAMES[p.cat] || p.cat || ''
    const coincideBusqueda  =
      !searchNorm ||
      normalize(p.name).includes(searchNorm) ||
      normalize(catDisplay).includes(searchNorm)
    const coincideFavorito  = !mostrarFavoritos || favoritos.includes(p.id)
    return coincideCategoria && coincideBusqueda && coincideFavorito
  })
    if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'sans-serif', color: '#8b715b' }}>Cargando catálogo de Amaru Home...</div>
  }


  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar
        cartCount={cart ? cart.reduce((acc, item) => acc + (item.qty || 1), 0) : 0}
        favoritosCount={favoritos.length}
        onCartToggle={() => setCartOpen(o => !o)}
        onFavoritosToggle={() => setMostrarFavoritos(actual => !actual)}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onSearchFocus={() => { searchIsFocused.current = true }}
        onSearchBlur={() => { searchIsFocused.current = false }}
        isCartOpen={cartOpen}
      />

      {cartOpen && isMobile && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: '85vw', bottom: 0,
            zIndex: 9998, cursor: 'default', backgroundColor: 'transparent',
          }}
        />
      )}

      {/* ✅ FIX: CartPanel envuelto para aislar eventos */}
      <div
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999, pointerEvents: cartOpen ? 'auto' : 'none' }}
      >
        <CartPanel
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart || []}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          total={total || 0}
        />
      </div>

      <div style={makeCollapseStyle(isSearching, '700px')}>
        <Hero />
      </div>

      <div className="d-lg-none" style={makeCollapseStyle(isSearching, '80px')}>
        <div style={{ padding: '16px 20px' }}>
          <button
            onClick={() => setFilterDrawerOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px',
              border: '1.5px solid #ebdccb', background: '#fff',
              fontFamily: 'Poppins', fontSize: '14px', fontWeight: '600',
              color: '#8b715b', cursor: 'pointer'
            }}
          >
            <i className="bi bi-sliders" /> Filtros
            {activeCategory !== 'todas' && (
              <span style={{
                background: '#8b715b', color: '#fff', borderRadius: '50%',
                width: '20px', height: '20px', fontSize: '11px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>1</span>
            )}
          </button>
        </div>
      </div>

      <div className="d-none d-lg-block" style={makeCollapseStyle(isSearching, '420px')}>
        <CategoryBanner
          activeCategory={activeCategory}
          onCategorySelect={(catId) => {
            setMostrarFavoritos(false)
            setActiveCategory(catId)
          }}
        />
      </div>

      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        activeCategory={activeCategory}
        onApply={(catId) => {
          setActiveCategory(catId)
          setMostrarFavoritos(false)
        }}
        onClear={() => {
          setActiveCategory('todas')
          setMostrarFavoritos(false)
        }}
      />

      <section
        className={styles.catalogo}
        id="catalogo"
        style={{ padding: '24px 0 60px 0', backgroundColor: '#fdfcfb' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">

              {mostrarFavoritos && (
                <div style={{ marginBottom: '35px', textAlign: 'center' }}>
                  <h3 style={{ color: '#8b715b', fontFamily: 'serif', fontSize: '1.8rem' }}>
                    Mis Productos Favoritos
                  </h3>
                  <button
                    onClick={() => setMostrarFavoritos(false)}
                    style={{
                      background: 'none', border: 'none', color: '#8c8276',
                      textDecoration: 'underline', cursor: 'pointer', fontSize: '14px'
                    }}
                  >
                    Volver a ver todo el catalogo
                  </button>
                </div>
              )}

              {filtered.length > 0 ? (
                <div className={styles.grid}>
                  {filtered.map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAdd={handleAddToCart}
                      isFavorite={favoritos.includes(p.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center', padding: '72px 24px',
                  maxWidth: '480px', margin: '0 auto'
                }}>
                  <div style={{ fontSize: '52px', lineHeight: 1, marginBottom: '20px' }}>🔍</div>
                  <h3 style={{
                    fontFamily: 'serif', fontSize: '1.75rem', fontWeight: '700',
                    color: '#8b715b', margin: '0 0 12px 0'
                  }}>
                    Sin resultados
                  </h3>
                  <p style={{
                    fontSize: '15px', color: '#a89880',
                    lineHeight: '1.65', margin: '0 0 32px 0'
                  }}>
                    No encontramos productos para "{searchQuery}".
                    Intenta con otro termino o explora nuestras categorias.
                  </p>
                  <button
                    onClick={handleClearSearch}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'none', border: '1.5px solid #ebdccb',
                      borderRadius: '30px', padding: '11px 28px',
                      color: '#8b715b', fontFamily: 'Poppins',
                      fontSize: '14px', fontWeight: '600',
                      cursor: 'pointer', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#f5ede3'
                      e.currentTarget.style.borderColor = '#c8a882'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.borderColor = '#ebdccb'
                    }}
                  >
                    <i className="bi bi-arrow-counterclockwise" />
                    Limpiar busqueda
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Toast message={message} visible={visible} />
    </div>
  )
}