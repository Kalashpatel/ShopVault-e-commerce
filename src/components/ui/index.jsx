// ── Button ────────────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'font-syne font-semibold rounded-[10px] px-4 py-3.5 transition-all duration-200 w-full text-[15px] disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-[#6c63ff] text-white hover:opacity-90 hover:-translate-y-px shadow-[0_4px_20px_rgba(108,99,255,0.35)] hover:shadow-[0_6px_28px_rgba(108,99,255,0.45)] active:translate-y-0',
    secondary: 'bg-transparent border border-[#2a2a3a] text-[#9090a8] hover:bg-[#1a1a24] hover:text-[#f0f0f8]',
    danger: 'bg-transparent border border-[#ff6584]/30 text-[#ff6584] hover:bg-[#ff6584]/10',
    success: 'bg-[#43e97b] text-[#0a0a0f] hover:opacity-90',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ── Input ─────────────────────────────────────────────────────────────────────
export function Input({ label, className = '', ...props }) {
  return (
    <div className="mb-[18px]">
      {label && <label className="block text-[13px] font-medium text-[#9090a8] mb-2 tracking-[0.3px]">{label}</label>}
      <input
        className={`w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-[10px] px-4 py-3.5 text-[#f0f0f8] text-[15px] font-dm outline-none placeholder-[#5a5a72] focus:border-[#6c63ff] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  )
}

// ── Alert ─────────────────────────────────────────────────────────────────────
export function Alert({ type = 'error', children }) {
  const styles = {
    error:   'bg-[#ff6584]/10 border-[#ff6584]/30 text-[#ff8fa3]',
    success: 'bg-[#43e97b]/10 border-[#43e97b]/30 text-[#43e97b]',
    info:    'bg-[#6c63ff]/10 border-[#6c63ff]/30 text-[#a5a0ff]',
  }
  const icons = { error: '⚠️', success: '✅', info: 'ℹ️' }
  return (
    <div className={`flex items-start gap-2.5 border rounded-[10px] px-4 py-3 text-[14px] mb-4 ${styles[type]}`}>
      <span>{icons[type]}</span>
      <span>{children}</span>
    </div>
  )
}

// ── SkeletonCard ──────────────────────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden">
      <div className="h-[180px] bg-[#1a1a24] skeleton-shimmer" />
      <div className="p-4">
        <div className="h-3 bg-[#1a1a24] rounded-full mb-2.5 skeleton-shimmer" />
        <div className="h-3 bg-[#1a1a24] rounded-full mb-2.5 skeleton-shimmer" />
        <div className="h-3 bg-[#1a1a24] rounded-full w-2/5 skeleton-shimmer" />
      </div>
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────────────────────
export function StatCard({ icon, label, value, accent }) {
  return (
    <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-6 hover:border-[#6c63ff] hover:-translate-y-0.5 transition-all duration-200">
      <div className="text-2xl mb-3">{icon}</div>
      <p className="text-[11px] font-semibold tracking-[0.5px] uppercase text-[#9090a8] mb-2">{label}</p>
      <p className={`font-syne font-extrabold text-3xl ${accent || ''}`}>{value}</p>
    </div>
  )
}
