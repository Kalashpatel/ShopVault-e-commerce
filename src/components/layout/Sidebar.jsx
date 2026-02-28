import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const NAV = [
  { to: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/products',  icon: '🛍️', label: 'Products' },
  { to: '/cart',      icon: '🛒', label: 'Cart', showBadge: true },
  { to: '/profile',   icon: '👤', label: 'Profile' },
]

export default function Sidebar({ open, onClose }) {
  const { session, logout } = useAuth()
  const { cartCount } = useCart()
  const user = session?.user

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-[260px] z-50
        bg-[#111118] border-r border-[#2a2a3a]
        flex flex-col px-4 py-7
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="font-syne font-extrabold text-[22px] px-3 mb-9 tracking-tight">
          Shop<span className="text-[#6c63ff]">Vault</span>
        </div>

        {/* Nav */}
        <p className="text-[10px] font-semibold tracking-widest text-[#5a5a72] uppercase px-3 mb-2">Menu</p>

        {NAV.map(n => (
          <NavLink
            key={n.to}
            to={n.to}
            onClick={onClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3.5 py-3 rounded-[10px] mb-0.5 text-[14.5px] font-medium transition-all duration-200 select-none
              ${isActive
                ? 'bg-[#6c63ff]/15 text-[#6c63ff] nav-active-bar'
                : 'text-[#9090a8] hover:bg-[#1a1a24] hover:text-[#f0f0f8]'
              }`
            }
          >
            <span className="text-lg w-5 text-center">{n.icon}</span>
            {n.label}
            {n.showBadge && cartCount > 0 && (
              <span className="ml-auto bg-[#6c63ff] text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        ))}

        <p className="text-[10px] font-semibold tracking-widest text-[#5a5a72] uppercase px-3 mb-2 mt-4">Account</p>
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3.5 py-3 rounded-[10px] text-[14.5px] font-medium text-[#9090a8] hover:bg-[#1a1a24] hover:text-[#f0f0f8] transition-all duration-200 text-left w-full"
        >
          <span className="text-lg w-5 text-center">🚪</span>
          Logout
        </button>

        {/* User chip */}
        <div className="mt-auto">
          <div className="flex items-center gap-2.5 px-3.5 py-3 bg-[#1a1a24] rounded-[10px]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#ff6584] flex items-center justify-center font-syne font-bold text-sm text-white flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[13px] font-semibold truncate">{user?.name}</p>
              <p className="text-[11px] text-[#5a5a72] truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
