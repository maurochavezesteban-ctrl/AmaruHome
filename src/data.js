export const PRODUCTS = [
  { id: 1, name: 'Juego de sábanas premium', cat: 'sabanas', price: 89999, img: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Acolchado queen size', cat: 'acolchados', price: 129999, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Set de toallas premium', cat: 'toallas', price: 39999, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Alfombra decorativa', cat: 'alfombras', price: 74999, img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Sábanas lino natural', cat: 'sabanas', price: 119999, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Almohadas memory foam', cat: 'almohadas', price: 54999, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop' },
  { id: 7, name: 'Acolchado individual', cat: 'acolchados', price: 89999, img: 'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?q=80&w=800&auto=format&fit=crop' },
  { id: 8, name: 'Juego de sábanas king', cat: 'sabanas', price: 109999, img: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?q=80&w=800&auto=format&fit=crop' },
  { id: 9, name: 'Toallas de baño', cat: 'toallas', price: 29999, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop' },
]

export const CATEGORIES = [
  { key: 'todas', label: 'Todas' },
  { key: 'sabanas', label: 'Juego de sábanas' },
  { key: 'acolchados', label: 'Acolchados' },
  { key: 'toallas', label: 'Toallas' },
  { key: 'alfombras', label: 'Alfombras' },
  { key: 'almohadas', label: 'Almohadas' },
  { key: 'cortinas', label: 'Cortinas' },
  { key: 'frazadas', label: 'Frazadas' },
  { key: 'edredon', label: 'Edredón'}
]

export const CAT_LABELS = {
  sabanas: 'Sábanas', acolchados: 'Acolchados', toallas: 'Toallas',
  alfombras: 'Alfombras', almohadas: 'Almohadas', cortinas: 'Cortinas', frazadas: 'Frazadas',
}

export const WA_NUMBER = '5491173653844'

export const fmt = (n) => '$' + n.toLocaleString('es-AR')
