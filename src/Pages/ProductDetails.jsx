import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector((s) => s.products.items || [])
  const isLoggedIn = useSelector((s) => (s.user && s.user.isLoggedIn) || false)
  const product = items.find((p) => String(p.id) === String(id))
  const [qty, setQty] = useState(1)
  const [index, setIndex] = useState(0)

  if (!product) return <div className="p-6">Product not found.</div>

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/product/${product.id}` } })
      return
    }

    dispatch({ type: 'cart/addItem', payload: { ...product, quantity: qty } })
    // optional toast could be dispatched here
  }

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/product/${product.id}` } })
      return
    }

    dispatch({ type: 'wishlist/addItem', payload: product })
  }

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/product/${product.id}`, checkout: true } })
      return
    }

    dispatch({ type: 'cart/addItem', payload: { ...product, quantity: qty } })
    navigate('/checkout')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:flex md:gap-6">
        <div className="md:w-1/2">
          <div className="relative">
            {((product.images && product.images.length) || product.image) ? (
              <>
                <img
                  src={(product.images && product.images[index]) || product.image}
                  alt={product.title}
                  className="w-full h-152 object-cover rounded"
                />

                {/* prev/next buttons */}
                {((product.images && product.images.length) || 0) > 1 && (
                  <>
                    <button onClick={() => setIndex((i) => (i - 1 + product.images.length) % product.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
                      <ChevronLeft />
                    </button>
                    <button onClick={() => setIndex((i) => (i + 1) % product.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
                      <ChevronRight />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-96 bg-zinc-100 rounded flex items-center justify-center">No Image</div>
            )}
          </div>

          {/* thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setIndex(idx)} className={`w-20 h-20 shrink-0 rounded overflow-hidden border ${idx === index ? 'ring-2 ring-offset-2 ring-indigo-300' : 'border-transparent'}`}>
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-1/2 mt-4 md:mt-0">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          {product.category && <div className="text-sm text-gray-500 mt-1">{product.category}</div>}
          <div className="text-gray-600 mt-4 font-bold mt-3 text-2xl">{product.description}</div>
          {product.stock !== undefined && <div className="text-sm text-gray-600 mt-1">{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}</div>}

          <p className="text-lg text-indigo-900  mt-5">{product.price ? `$${product.price}` : ''}</p>

          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm">Qty</label>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))} className="w-20 text-center border rounded px-2 py-1" />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={handleAddToCart} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              <ShoppingCart size={16} /> Add to Cart
            </button>

            <button onClick={handleWishlist} className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-50">
              <Heart size={16} /> Add to Wishlist
            </button>

            <button onClick={handleBuyNow} className="bg-amber-500 text-white px-4 py-2 rounded hover:brightness-95">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

