import { useState } from 'react'
import { PRODUCTS } from './data'
import { useCart } from './useCart'
import Navbar from './Navbar'
import CartPanel from './CartPanel'
import Hero from './Hero'
import CategoryBanner from './CategoryBanner'
import ProductCard from './ProductCard'
import Footer from './Footer'
import Toast, { useToast } from './Toast'
import styles from './App.module.css'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('todas')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Estado global de favoritos
  const [favoritos, setFavoritos] = useState([])
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)

  const { cart, addToCart, removeFromCart, changeQty, total, count } = useCart()
  const { message, visible, showToast } = useToast()

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product)
      showToast(`✓ ${product.name} agregado al carrito`)
      setCartOpen(true)
    }
  }

  const handleToggleFavorite = (id) => {
    setFavoritos(prevFavoritos => {
      if (prevFavoritos.includes(id)) {
        showToast("💔 Quitado de favoritos")
        return prevFavoritos.filter(favId => favId !== id)
      } else {
        showToast("💖 Guardado en favoritos")
        return [...prevFavoritos, id]
      }
    })
  }

  const filtered = PRODUCTS.filter(p => {
    const coincideCategoria = activeCategory === 'todas' || p.cat === activeCategory;
    const coincideBusqueda = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const coincideFavorito = !mostrarFavoritos || favoritos.includes(p.id);
    return coincideCategoria && coincideBusqueda && coincideFavorito;
  })

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Sincronizamos el contador real de useCart directamente aquí */}
      <Navbar
        cartCount={cart ? cart.reduce((acc, item) => acc + (item.qty || 1), 0) : 0}
        favoritosCount={favoritos.length}
        onCartToggle={() => setCartOpen(o => !o)}
        onFavoritosToggle={() => setMostrarFavoritos(actual => !actual)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart || []}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        total={total || 0}
      />

      <Hero />

      <CategoryBanner
        activeCategory={activeCategory}
        onCategorySelect={(catId) => {
          setMostrarFavoritos(false)
          setActiveCategory(catId)
        }}
      />

      <section className={styles.catalogo} id="catalogo" style={{ padding: '60px 0', backgroundColor: '#fdfcfb' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              
              {mostrarFavoritos && (
                <div style={{ marginBottom: '35px', textAlign: 'center' }}>
                  <h3 style={{ color: '#8b715b', fontFamily: 'serif', fontSize: '1.8rem' }}>Mis Productos Favoritos (💖)</h3>
                  <button 
                    onClick={() => setMostrarFavoritos(false)}
                    style={{ background: 'none', border: 'none', color: '#8c8276', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Volver a ver todo el catálogo
                  </button>
                </div>
              )}

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
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Toast message={message} visible={visible} />
    </div>
  )
}
