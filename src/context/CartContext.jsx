import { createContext, useContext, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      if (prev.find(i => i.id === product.id)) {
        toast('Already in cart!', { icon: '🛒' })
        return prev
      }
      toast.success(`Added to cart!`)
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
    toast('Item removed', { icon: '🗑️' })
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) {
      setCart(prev => prev.filter(i => i.id !== id))
      toast('Item removed', { icon: '🗑️' })
      return
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount  = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal  = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
