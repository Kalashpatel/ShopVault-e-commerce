import { useState, useEffect, useRef, useCallback } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { SkeletonCard, Alert } from '../components/ui'

const PAGE_SIZE = 8

function ProductCard({ product, inCart, onAdd }) {
  return (
    <div className="group bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden hover:border-[#6c63ff]/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(108,99,255,0.12)] transition-all duration-250">
      {/* Image */}
      <div className="bg-white h-[180px] flex items-center justify-center p-4 relative overflow-hidden">
        <span className="absolute top-2.5 left-2.5 bg-[#6c63ff]/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-[140px] max-w-full object-contain product-img-hover"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[13.5px] font-medium leading-[1.4] min-h-[38px] line-clamp-2 mb-3 text-[#f0f0f8]">
          {product.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-syne font-bold text-[18px] text-[#6c63ff]">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className={`text-[12px] font-syne font-bold px-3.5 py-1.5 rounded-lg transition-all duration-200
              ${inCart
                ? 'bg-[#43e97b] text-[#0a0a0f] cursor-default'
                : 'bg-[#6c63ff] text-white hover:bg-[#7c75ff] hover:scale-105'
              }`}
          >
            {inCart ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { products, loading, error } = useProducts()
  const { cart, addToCart } = useCart()
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCount,   setVisibleCount]   = useState(PAGE_SIZE)
  const loaderRef = useRef(null)

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filtered = products.filter(p => {
    const matchCat    = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Reset visible when filter / search changes
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [search, activeCategory])

  // Infinite scroll
  const handleObserver = useCallback(entries => {
    if (entries[0].isIntersecting && hasMore) {
      setVisibleCount(n => n + PAGE_SIZE)
    }
  }, [hasMore])

  useEffect(() => {
    const el = loaderRef.current
    if (!el) return
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="font-syne font-bold text-2xl">
          All Products{' '}
          <span className="text-[#5a5a72] text-base font-normal">({filtered.length})</span>
        </h2>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#111118] border border-[#2a2a3a] rounded-[10px] px-4 py-2.5 min-w-[240px] focus-within:border-[#6c63ff] transition-colors">
          <span className="text-[#5a5a72]">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="bg-transparent outline-none text-[14px] text-[#f0f0f8] placeholder-[#5a5a72] flex-1"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[#5a5a72] hover:text-[#f0f0f8] text-sm">✕</button>
          )}
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-1.5 rounded-full border text-[13px] capitalize transition-all duration-200
              ${activeCategory === c
                ? 'bg-[#6c63ff] border-[#6c63ff] text-white'
                : 'bg-[#111118] border-[#2a2a3a] text-[#9090a8] hover:border-[#6c63ff] hover:text-[#6c63ff]'
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {error && <Alert type="error">{error}</Alert>}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <h3 className="font-syne font-bold text-xl mb-2">No products found</h3>
          <p className="text-[#9090a8]">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visible.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                inCart={cart.some(c => c.id === p.id)}
                onAdd={addToCart}
              />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#6c63ff] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  )
}
