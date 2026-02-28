import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Alert } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { getUsers, validateEmail } from '../utils/auth'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = () => {
    setError('')
    const { email, password } = form
    if (!email.trim() || !password.trim())
      return setError('Email and password are required.')

    const users = getUsers()
    const user  = users.find(u => u.email === email.trim() && u.password === password)
    if (!user) return setError('Invalid email or password. Please try again.')

    login(user)
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

        <h1 className="font-syne font-bold text-[22px] mb-1">Welcome Back</h1>
        <p className="text-[13px] text-[#9090a8] mb-7">Sign in to continue shopping</p>

        {error && <Alert type="error">{error}</Alert>}

        <Input label="Email Address" placeholder="john@example.com" value={form.email}    onChange={set('email')}    onKeyDown={handleKey} type="email" />
        <Input label="Password"      placeholder="Your password"     value={form.password} onChange={set('password')} onKeyDown={handleKey} type="password" />

        <Button onClick={handleSubmit}>Sign In →</Button>

        <p className="text-center text-[14px] text-[#9090a8] mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6c63ff] font-medium hover:underline">Register</Link>
        </p>

        <div className="mt-5 p-3.5 bg-[#1a1a24] rounded-[10px] text-[12px] text-[#9090a8]">
          <strong className="text-[#f0f0f8] block mb-1">💡 Getting Started</strong>
          Register first, then login with your credentials. Your session will last 5 minutes.
        </div>
      </div>
    </div>
  )
}
