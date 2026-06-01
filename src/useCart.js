import { useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(x => x.id === product.id)
      if (existing) return prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(x => x.id !== id))

  const changeQty = (id, delta) => {
    setCart(prev => {
      const item = prev.find(x => x.id === id)
      if (!item) return prev
      if (item.qty + delta <= 0) return prev.filter(x => x.id !== id)
      return prev.map(x => x.id === id ? { ...x, qty: x.qty + delta } : x)
    })
  }

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0)
  const count = cart.reduce((s, x) => s + x.qty, 0)

  return { cart, addToCart, removeFromCart, changeQty, total, count }
}
