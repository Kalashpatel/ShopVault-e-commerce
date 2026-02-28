import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Input, Button, Alert } from '../components/ui'
import { getUsers, saveUsers, validateEmail } from '../utils/auth'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = () => {
    setError('')
    const { name, email, password } = form

    if (!name.trim() || !email.trim() || !password.trim())
      return setError('All fields are required.')
    if (!validateEmail(email))
      return setError('Please enter a valid email address.')
    if (password.length < 6)
      return setError('Password must be at least 6 characters.')

    const users = getUsers()
    if (users.find(u => u.email === email.trim()))
      return setError('This email is already registered.')

    setLoading(true)
    users.push({ name: name.trim(), email: email.trim(), password })
    saveUsers(users)
    toast.success('Account created! Please sign in.')
    setTimeout(() => navigate('/login'), 800)
  }

  const handleKey = e => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] p-5 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute w-[600px] h-[600px] auth-glow-1 -top-24 -left-24 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] auth-glow-2 -bottom-12 -right-12 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[440px] bg-[#111118] border border-[#2a2a3a] rounded-3xl px-11 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.5)] animate-slide-up">
        <div className="font-syne font-extrabold text-[28px] tracking-tight mb-1">
          Shop<span className="text-[#6c63ff]">Vault</span>
        </div>
        <p className="text-[14px] text-[#9090a8] mb-9">Your premium e-commerce destination</p>

        <h1 className="font-syne font-bold text-[22px] mb-1">Create Account</h1>
        <p className="text-[13px] text-[#9090a8] mb-7">Join thousands of happy shoppers</p>

        {error && <Alert type="error">{error}</Alert>}

        <Input label="Full Name"      placeholder="John Doe"           value={form.name}     onChange={set('name')}     onKeyDown={handleKey} />
        <Input label="Email Address"  placeholder="john@example.com"   value={form.email}    onChange={set('email')}    onKeyDown={handleKey} type="email" />
        <Input label="Password"       placeholder="Min. 6 characters"  value={form.password} onChange={set('password')} onKeyDown={handleKey} type="password" />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating…' : 'Create Account →'}
        </Button>

        <p className="text-center text-[14px] text-[#9090a8] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#6c63ff] font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
