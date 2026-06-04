import { useEffect } from 'react'
import styles from './FilterDrawer.module.css'

const CATEGORIAS = [
  {
    id: 'todas',
    label: 'Todas',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-7h6v7"/>
      </svg>
    )
  },
  {
    id: 'acolchados',
    label: 'Acolchados',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M3 14h18M8 5v14M16 5v14" />
      </svg>
    )
  },
  {
    id: 'alfombras',
    label: 'Alfombras',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18v12H3zM2 9h1M2 12h1M2 15h1M21 9h1M21 12h1M21 15h1" />
        <path d="M6 9h12M6 15h12M12 6v12" strokeDasharray="1 2" />
      </svg>
    )
  },
  {
    id: 'almohadas',
    label: 'Almohadas',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9c0-1.5 1.5-3 4-3h12c2.5 0 4 1.5 4 3v6c0 1.5-1.5 3-4 3H6c-2.5 0-4-1.5-4-3V9z" />
        <path d="M6 6c-1 1-1 2.5-1 4v4c0 1.5 0 3 1 4M18 6c1 1 1 2.5 1 4v4c0 1.5 0 3-1 4" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'cortinas',
    label: 'Cortinas',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4h20M4 4v16M20 4v16" />
        <path d="M4 4c2 4 3 8 3 16M20 4c-2 4-3 8-3 16M10 4c1 4 1.5 8 1.5 16M14 4c-1 4-1.5 8-1.5 16" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 'frazadas',
    label: 'Frazadas',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16M4 12h16M4 17h16" />
        <path d="M4 5v14c0 1 1 2 2 2h12c1 0 2-1 2-2V5c0-1-1-2-2-2H6c-1 0-2 1-2 2z" />
      </svg>
    )
  },
  {
    id: 'sabanas',
    label: 'Juego de sábanas',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v6H4zM4 11h16v8H4z" />
        <path d="M4 11c4-2 12-2 16 0" />
        <path d="M6 5v6M18 5v6" opacity="0.5" />
      </svg>
    )
  },
  {
    id: 'toallas',
    label: 'Toallas',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M10 7h4M10 12h4M10 17h4" opacity="0.6" />
        <path d="M6 5h2M16 5h2" />
      </svg>
    )
  },
]

export default function FilterDrawer({ isOpen, onClose, activeCategory, onApply, onClear }) {

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleApply = (catId) => {
    onApply(catId)
    onClose()
  }

  const handleClear = () => {
    onClear()
    onClose()
  }

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-label="Filtros"
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerHeader}>
          <div className={styles.headerLeft}>
            <i className="bi bi-sliders" />
            <span>Filtros</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar filtros">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <p className={styles.sectionTitle}>Categoría</p>
          <ul className={styles.categoryList}>
            {CATEGORIAS.map(cat => (
              <li key={cat.id}>
                <button
                  className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catBtnActive : ''}`}
                  onClick={() => handleApply(cat.id)}
                >
                  <span className={styles.catIcon}>{cat.icon}</span>
                  <span>{cat.label}</span>
                  {activeCategory === cat.id && (
                    <i className="bi bi-check2" style={{ marginLeft: 'auto', color: '#8b715b' }} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.drawerFooter}>
          <button className={styles.clearBtn} onClick={handleClear}>
            <i className="bi bi-arrow-counterclockwise" /> Limpiar
          </button>
          <button className={styles.applyBtn} onClick={onClose}>
            Ver resultados
          </button>
        </div>
      </aside>
    </>
  )
}