import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'
import { StatCard } from '../components/ui'

export default function Dashboard() {
  const { session } = useAuth()
  const { cartCount, cartTotal } = useCart()
  const { products } = useProducts()
  const navigate = useNavigate()

  const user = session?.user
  const firstName = user?.name?.split(' ')[0] || 'User'
  const categories = [...new Set(products.map(p => p.category))]

  const quickActions = [
    { icon: '🛍️', label: 'Browse Products', path: '/products', color: '#6c63ff' },
    { icon: '🛒', label: 'View Cart',        path: '/cart',     color: '#ff6584' },
    { icon: '👤', label: 'Edit Profile',     path: '/profile',  color: '#43e97b' },
  ]

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-[#6c63ff]/15 to-[#ff6584]/10 border border-[#6c63ff]/25 welcome-emoji">
        <h1 className="font-syne font-extrabold text-[28px] mb-2">Hey, {firstName}! 👋</h1>
        <p className="text-[#9090a8] text-[15px]">
          Welcome to your ShopVault dashboard. {products.length > 0 ? `Explore ${products.length}+ products today.` : 'Start exploring our store.'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📦" label="Total Products" value={products.length || '—'} />
        <StatCard icon="🛒" label="Cart Items"     value={cartCount} />
        <StatCard icon="🏷️" label="Categories"    value={categories.length || '—'} />
        <StatCard icon="💰" label="Cart Value"     value={cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : '$0.00'} accent="text-[#6c63ff]" />
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="font-syne font-bold text-base mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(a => (
            <button
              key={a.path}
              onClick={() => navigate(a.path)}
              style={{ '--hover-border': a.color }}
              className="flex items-center gap-2.5 bg-[#111118] border border-[#2a2a3a] rounded-[10px] px-5 py-4 text-[14px] font-semibold hover:border-[--hover-border] transition-all duration-200 cursor-pointer"
            >
              <span className="text-xl">{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-syne font-bold text-base mb-4">Shop by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => navigate('/products')}
                className="px-4 py-2 bg-[#111118] border border-[#2a2a3a] rounded-full text-[13px] text-[#9090a8] hover:border-[#6c63ff] hover:text-[#6c63ff] capitalize transition-all duration-200"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
