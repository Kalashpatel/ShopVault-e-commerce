import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('sv_theme') !== 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) { root.classList.add('dark'); root.classList.remove('light') }
    else       { root.classList.remove('dark'); root.classList.add('light') }
    localStorage.setItem('sv_theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = () => setDark(d => !d)

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
