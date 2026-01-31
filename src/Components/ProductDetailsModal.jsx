import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingCart, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react'
import AddToCartNoAuth from './AddToCartNoAuth'

export default function ProductDetailsModal({ product, open, onClose }) {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((s) => (s.user && s.user.isLoggedIn) || false)
  const [qty, setQty] = useState(1)
  const [index, setIndex] = useState(0)
  const [toast, setToast] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)
  const [pendingAdd, setPendingAdd] = useState(null)

  if (!open || !product) return null

  const images = product.images && product.images.length ? product.images : product.image ? [product.image] : []

  const addToCart = () => {
    // allow adding to cart without login: dispatch + localStorage fallback
    dispatch({ type: 'cart/addItem', payload: { ...product, quantity: qty } })
    try {
      const current = JSON.parse(localStorage.getItem('cart') || '[]') || []
      const idx = current.findIndex((it) => String(it.id) === String(product.id))
      if (idx > -1) current[idx].quantity = (Number(current[idx].quantity || 0) + Number(qty || 1))
      else current.push({ ...product, quantity: Number(qty || 1) })
      localStorage.setItem('cart', JSON.stringify(current))
    } catch (e) {
      console.error(e)
    }
    setToast('Product added to cart')
    setTimeout(() => onClose(), 600)
  }

  const addToWishlist = () => {
    dispatch({ type: 'wishlist/addItem', payload: product })
  }

  const buyNow = () => {
    // add to cart locally and go to checkout without forcing login
    dispatch({ type: 'cart/addItem', payload: { ...product, quantity: qty } })
    try {
      const current = JSON.parse(localStorage.getItem('cart') || '[]') || []
      const idx = current.findIndex((it) => String(it.id) === String(product.id))
      if (idx > -1) current[idx].quantity = (Number(current[idx].quantity || 0) + Number(qty || 1))
      else current.push({ ...product, quantity: Number(qty || 1) })
      localStorage.setItem('cart', JSON.stringify(current))
    } catch (e) {
      console.error(e)
    }
    setToast('Added to cart — redirecting to checkout')
    setTimeout(() => {
      onClose()
      dispatch({ type: 'navigation/checkout' })
    }, 600)
  }

  // Login modal component (simple, self-contained)
  const LoginModal = ({ open, onClose, onSuccess }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    if (!open) return null

    const submit = (e) => {
      e.preventDefault()
      if (!email || !password) {
        setError('Please enter email and password')
        return
      }

      // fake login success — dispatch login action
      dispatch({ type: 'user/loginSuccess', payload: { isLoggedIn: true, user: { email } } })
      setError('')
      onClose()
      setToast('Logged in successfully')
      setTimeout(() => {
        onSuccess && onSuccess()
      }, 200)
    }

    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white w-11/12 max-w-md rounded-lg shadow-lg p-4 z-10">
          <button onClick={onClose} className="absolute right-3 top-3 p-1 rounded hover:bg-gray-100"><X /></button>
          <h3 className="text-lg font-medium mb-2">Sign In</h3>
          {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
          <form onSubmit={submit} className="space-y-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded px-3 py-2" />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-11/12 max-w-4xl rounded-lg shadow-lg p-4 md:p-6 z-10">
        {toast && (
          <div className="absolute left-1/2 -translate-x-1/2 top-3 z-20 bg-yellow-100 text-yellow-900 px-3 py-1 rounded">
            {toast}
          </div>
        )}
        <button onClick={onClose} className="absolute right-3 top-3 p-1 rounded hover:bg-gray-100">
          <X />
        </button>

        <div className="md:flex md:gap-6">
          <div className="md:w-1/2">
            <div className="relative">
              {images.length > 0 ? (
                <img src={images[index]} alt={product.title} className="w-full h-64 md:h-80 object-cover rounded" />
              ) : (
                <div className="w-full h-64 md:h-80 bg-zinc-100 rounded flex items-center justify-center text-gray-500">No Image</div>
              )}

              {images.length > 1 && (
                <>
                  <button onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow">
                    <ChevronLeft />
                  </button>
                  <button onClick={() => setIndex((i) => (i + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow">
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:w-1/2 mt-4 md:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
            {product.category && <div className="text-sm text-gray-500 mt-1">{product.category}</div>}
            <p className="text-lg text-indigo-600 font-semibold mt-3">{product.price ? `$${product.price}` : ''}</p>
            {product.stock !== undefined && <div className="text-sm text-gray-600 mt-1">{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}</div>}

            <p className="text-sm text-gray-700 mt-4">{product.description}</p>

            <div className="mt-4 flex items-center gap-4">
              <label className="text-sm text-gray-600">Qty</label>
              <input type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))} className="w-20 text-center border rounded py-1" />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <AddToCartNoAuth product={product} qty={qty} onAdded={() => { setToast('Product added to cart'); setTimeout(() => onClose(), 600) }} />

              <button onClick={addToWishlist} className="flex items-center justify-center gap-2 border px-4 py-2 rounded hover:bg-gray-50">
                <Heart size={16} /> Add to Wishlist
              </button>

              <button onClick={buyNow} className="flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-2 rounded hover:brightness-95">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {loginOpen && (
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => {
          setLoginOpen(false)
          if (pendingAdd) {
            dispatch({ type: 'cart/addItem', payload: { ...pendingAdd.product, quantity: pendingAdd.qty || 1 } })
            setToast('Product added to cart')
            if (pendingAdd.redirectToCheckout) {
              // placeholder for navigation to checkout
              dispatch({ type: 'navigation/checkout' })
            }
            setPendingAdd(null)
          }
        }}
      />
    )}
    </>
  )
}
