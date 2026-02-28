import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const PAGE_META = {
  '/dashboard': { title: 'Dashboard',      sub: 'Overview of your store activity' },
  '/products':  { title: 'Products',       sub: 'Browse and add items to your cart' },
  '/cart':      { title: 'Shopping Cart',  sub: 'Review and manage your selected items' },
  '/profile':   { title: 'My Profile',     sub: 'Manage your account details' },
}

export default function Topbar({ onHamburger }) {
  const { timeLeft } = useAuth()
  const { dark, toggle } = useTheme()
  const { pathname } = useLocation()

  const meta  = PAGE_META[pathname] || PAGE_META['/dashboard']
  const mins  = Math.floor(timeLeft / 60)
  const secs  = String(timeLeft % 60).padStart(2, '0')
  const dotColor = timeLeft > 120 ? 'bg-[#43e97b]' : timeLeft > 60 ? 'bg-amber-400' : 'bg-[#ff6584]'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 py-5 border-b border-[#2a2a3a] bg-[#0a0a0f]/80 backdrop-blur-lg">
      <div className="flex items-center gap-3.5">
        {/* Hamburger */}
        <button
          onClick={onHamburger}
          className="lg:hidden bg-[#1a1a24] border border-[#2a2a3a] rounded-[10px] p-2 text-[#f0f0f8] text-lg leading-none"
        >
          ☰
        </button>
        <div>
          <h2 className="font-syne font-bold text-xl leading-tight">{meta.title}</h2>
          <p className="text-[13px] text-[#9090a8] mt-0.5">{meta.sub}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Session timer */}
        <div className="flex items-center gap-1.5 bg-[#1a1a24] border border-[#2a2a3a] rounded-full px-3.5 py-1.5 text-[13px] text-[#9090a8] font-medium">
          <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse-dot`} />
          {mins}:{secs}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="bg-[#1a1a24] border border-[#2a2a3a] rounded-full px-3 py-1.5 text-base hover:border-[#6c63ff] transition-colors"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
