import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Button } from '../components/ui'
import toast from 'react-hot-toast'

function QtyControl({ qty, onInc, onDec }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDec}
        className="w-7 h-7 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] text-[#f0f0f8] text-lg flex items-center justify-center hover:bg-[#6c63ff] hover:border-[#6c63ff] transition-all duration-200"
      >−</button>
      <span className="font-syne font-bold text-[15px] min-w-[22px] text-center">{qty}</span>
      <button
        onClick={onInc}
        className="w-7 h-7 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] text-[#f0f0f8] text-lg flex items-center justify-center hover:bg-[#6c63ff] hover:border-[#6c63ff] transition-all duration-200"
      >+</button>
    </div>
  )
}

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount, clearCart } = useCart()
  const navigate = useNavigate()

  const shipping = cart.length > 0 ? 4.99 : 0
  const tax      = cartTotal * 0.08
  const total    = cartTotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <span className="text-[72px] mb-4 opacity-50">🛒</span>
        <h3 className="font-syne font-bold text-xl mb-2">Your cart is empty</h3>
        <p className="text-[#9090a8] text-[14px] mb-8">Looks like you haven't added anything yet.</p>
        <Button className="w-auto px-8" onClick={() => navigate('/products')}>
          Browse Products →
        </Button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Cart items */}
        <div className="space-y-3">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-[#111118] border border-[#2a2a3a] rounded-2xl p-4 hover:border-[#6c63ff]/30 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[70px] h-[70px] bg-white rounded-xl p-1.5 object-contain flex-shrink-0"
              />

              <div className="flex-1 overflow-hidden">
                <p className="text-[14px] font-medium truncate mb-1">{item.title}</p>
                <p className="font-syne font-bold text-[15px] text-[#6c63ff]">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <p className="text-[11px] text-[#5a5a72] mt-0.5">${item.price.toFixed(2)} each</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <QtyControl
                  qty={item.qty}
                  onInc={() => updateQty(item.id, item.qty + 1)}
                  onDec={() => updateQty(item.id, item.qty - 1)}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-[12px] text-[#ff6584] border border-[#ff6584]/30 rounded-lg px-2.5 py-1 hover:bg-[#ff6584]/10 transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-6 sticky top-[90px]">
          <h3 className="font-syne font-bold text-base mb-5">Order Summary</h3>

          <div className="space-y-3 text-[14px] text-[#9090a8]">
            <div className="flex justify-between">
              <span>Subtotal ({cartCount} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-[#2a2a3a] mt-4 pt-4">
            <span className="font-syne font-bold text-[16px]">Total</span>
            <span className="font-syne font-extrabold text-[22px] text-[#6c63ff]">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => toast.success('Order placed! (Demo)', { icon: '🎉' })}
            className="mt-4 w-full bg-gradient-to-r from-[#6c63ff] to-[#8b84ff] text-white font-syne font-bold text-[15px] rounded-[10px] py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(108,99,255,0.45)] transition-all duration-200"
          >
            Proceed to Checkout 🔒
          </button>

          <Button
            variant="secondary"
            className="mt-2.5 text-[13px] py-2.5"
            onClick={() => navigate('/products')}
          >
            ← Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}
