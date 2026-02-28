import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  getSession, saveSession, clearSession,
  isSessionValid, createSession, SESSION_DURATION
} from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [session, setSession] = useState(() => {
    const s = getSession()
    return isSessionValid(s) ? s : null
  })
  const [timeLeft, setTimeLeft] = useState(0)

  // ── Logout ──────────────────────────────────────────────────────────────────
  const logout = useCallback((expired = false) => {
    clearSession()
    setSession(null)
    if (expired) {
      toast.error('Session expired. Please login again.')
    } else {
      toast.success('Logged out successfully')
    }
    navigate('/login')
  }, [navigate])

  // ── Session countdown ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!session) return

    const tick = () => {
      const left = Math.max(0, Math.floor((session.expiresAt - Date.now()) / 1000))
      setTimeLeft(left)
      if (left === 60) toast.error('⚠️ Session expires in 1 minute!', { duration: 4000 })
      if (left === 0) logout(true)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [session, logout])

  // ── Login ───────────────────────────────────────────────────────────────────
  const login = useCallback((user) => {
    const s = createSession(user)
    setSession(s)
    navigate('/dashboard')
  }, [navigate])

  // ── Update user in session ──────────────────────────────────────────────────
  const updateSessionUser = useCallback((updatedUser) => {
    setSession(prev => {
      const next = { ...prev, user: updatedUser }
      saveSession(next)
      return next
    })
  }, [])

  return (
    <AuthContext.Provider value={{ session, login, logout, timeLeft, updateSessionUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
