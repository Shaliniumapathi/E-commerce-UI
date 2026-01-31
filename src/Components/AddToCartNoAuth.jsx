import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

function addToLocalCart(item) {
  try {
    const current = JSON.parse(localStorage.getItem('cart') || '[]') || []
    const idx = current.findIndex((it) => String(it.id) === String(item.id))
    if (idx > -1) {
      current[idx].quantity = (Number(current[idx].quantity || 0) + Number(item.quantity || 1))
    } else {
      current.push(item)
    }
    localStorage.setItem('cart', JSON.stringify(current))
  } catch (e) {
    // ignore storage errors
    console.error('Failed to update local cart', e)
  }
}

export default function AddToCartNoAuth({ product, qty = 1, className = '', onAdded, redirectToCheckout = false }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handle = () => {
    if (!product) return

    const payload = { ...product, quantity: Number(qty || 1) }

    // dispatch to redux if a cart reducer exists (no-op otherwise)
    try {
      dispatch({ type: 'cart/addItem', payload })
    } catch (e) {
      // ignore
    }

    // maintain a localStorage fallback so users can add without login
    addToLocalCart(payload)

    // emit a cross-window event so other components can react to localStorage changes
    try {
      window.dispatchEvent(new CustomEvent('cart:changed', { detail: { item: payload } }))
    } catch (e) {
      console.warn('Unable to dispatch cart:changed event', e)
    }

    // debug log
    console.log('AddToCartNoAuth: added', payload)

    if (onAdded) onAdded(payload)

    if (redirectToCheckout) {
      navigate('/checkout')
    }
  }

  return (
    <button onClick={handle} className={`flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ${className}`}>
      <ShoppingCart size={16} /> Add to Cart
    </button>
  )
}
