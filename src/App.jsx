import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import Login    from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products  from './pages/Products'
import Cart      from './pages/Cart'
import Profile   from './pages/Profile'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public */}
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products"  element={<Products />} />
              <Route path="/cart"      element={<Cart />} />
              <Route path="/profile"   element={<Profile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#111118',
                color: '#f0f0f8',
                border: '1px solid #2a2a3a',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#43e97b', secondary: '#0a0a0f' } },
              error:   { iconTheme: { primary: '#ff6584', secondary: '#0a0a0f' } },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
