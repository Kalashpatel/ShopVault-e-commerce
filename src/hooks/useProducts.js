import { useState, useEffect } from 'react'

export function useProducts() {
  const [products, setProducts]     = useState([])
  const [loading,  setLoading]      = useState(true)
  const [error,    setError]        = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetch('https://fakestoreapi.com/products')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        if (!cancelled) { setProducts(data); setLoading(false) }
      })
      .catch(err => {
        if (!cancelled) {
          setError('Failed to load products. Check your internet connection.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { products, loading, error }
}
