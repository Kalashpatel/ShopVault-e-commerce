import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { getUsers, saveUsers, validateEmail } from '../utils/auth'
import { Input, Button, Alert } from '../components/ui'

export default function Profile() {
  const { session, updateSessionUser } = useAuth()
  const { cart, cartTotal } = useCart()
  const user = session?.user

  const [form, setForm]     = useState({ name: user?.name || '', email: user?.email || '', currentPw: '', newPw: '' })
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const handleSave = () => {
    setError(''); setSuccess('')
    const { name, email, currentPw, newPw } = form

    if (!name.trim() || !email.trim()) return setError('Name and email are required.')
    if (!validateEmail(email)) return setError('Invalid email format.')

    const users = getUsers()
    const idx   = users.findIndex(u => u.email === user.email)
    if (idx === -1) return setError('User not found.')

    // Password change requested
    if (newPw || currentPw) {
      if (currentPw !== users[idx].password) return setError('Current password is incorrect.')
      if (newPw.length < 6) return setError('New password must be at least 6 characters.')
    }

    const updated = {
      ...users[idx],
      name:  name.trim(),
      email: email.trim(),
      ...(newPw ? { password: newPw } : {}),
    }

    users[idx] = updated
    saveUsers(users)
    updateSessionUser(updated)
    setForm(p => ({ ...p, currentPw: '', newPw: '' }))
    setSuccess('Profile saved successfully!')
    toast.success('Profile updated!')
  }

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">

        {/* Profile card */}
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#ff6584] flex items-center justify-center font-syne font-extrabold text-2xl text-white mx-auto mb-4">
            {initials}
          </div>
          <p className="font-syne font-bold text-[18px] mb-1">{user?.name}</p>
          <p className="text-[13px] text-[#9090a8] mb-6">{user?.email}</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { val: cart.length,              lbl: 'Cart Items' },
              { val: `$${cartTotal.toFixed(0)}`, lbl: 'Cart Value' },
            ].map(s => (
              <div key={s.lbl} className="bg-[#1a1a24] rounded-[10px] p-3.5">
                <p className="font-syne font-extrabold text-[22px] text-[#6c63ff]">{s.val}</p>
                <p className="text-[10px] text-[#5a5a72] uppercase tracking-wide mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit form */}
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-8">
          <h3 className="font-syne font-bold text-[17px] mb-6">✏️ Edit Profile</h3>

          {error   && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">{success}</Alert>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Input label="Full Name"      value={form.name}  onChange={set('name')} />
            <Input label="Email Address"  type="email" value={form.email} onChange={set('email')} />
          </div>

          <div className="border-t border-[#2a2a3a] my-6" />
          <h4 className="font-syne font-bold text-[15px] mb-4">🔒 Change Password</h4>
          <p className="text-[12px] text-[#9090a8] mb-4">Leave blank to keep your current password.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Input label="Current Password" type="password" placeholder="Enter current password" value={form.currentPw} onChange={set('currentPw')} />
            <Input label="New Password"     type="password" placeholder="Min. 6 characters"     value={form.newPw}     onChange={set('newPw')} />
          </div>

          <Button className="w-auto px-8 mt-2" onClick={handleSave}>Save Changes ✓</Button>
        </div>

      </div>
    </div>
  )
}
