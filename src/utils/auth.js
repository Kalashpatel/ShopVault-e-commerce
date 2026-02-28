export const SESSION_DURATION = 5 * 60 * 1000 // 5 minutes in ms

// ── Users (localStorage) ──────────────────────────────────────────────────────
export function getUsers() {
  try { return JSON.parse(localStorage.getItem('sv_users') || '[]') }
  catch { return [] }
}
export function saveUsers(users) {
  localStorage.setItem('sv_users', JSON.stringify(users))
}

// ── Session ───────────────────────────────────────────────────────────────────
export function getSession() {
  try { return JSON.parse(localStorage.getItem('sv_session') || 'null') }
  catch { return null }
}
export function saveSession(session) {
  localStorage.setItem('sv_session', JSON.stringify(session))
}
export function clearSession() {
  localStorage.removeItem('sv_session')
}
export function isSessionValid(session) {
  return session && session.expiresAt > Date.now()
}
export function createSession(user) {
  const session = { user, expiresAt: Date.now() + SESSION_DURATION }
  saveSession(session)
  return session
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
