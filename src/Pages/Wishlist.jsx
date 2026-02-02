import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'

function Wishlist() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const read = () => {
      try {
        const current = JSON.parse(localStorage.getItem('wishlist') || '[]') || []
        setProducts(current)
      } catch (e) {
        setProducts([])
      }
    }

    read()

    const onChange = (e) => {
      read()
    }

    window.addEventListener('wishlist:changed', onChange)
    window.addEventListener('storage', onChange)

    return () => {
      window.removeEventListener('wishlist:changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const removeProduct = (id) => {
    try {
      const current = JSON.parse(localStorage.getItem('wishlist') || '[]') || []
      const updated = current.filter((p) => String(p.id) !== String(id))
      localStorage.setItem('wishlist', JSON.stringify(updated))
      setProducts(updated)
      try { window.dispatchEvent(new CustomEvent('wishlist:changed', { detail: { action: 'removed', id } })) } catch (e) {}
    } catch (e) {
      console.error('Failed to remove wishlist item', e)
    }
  }

  const addToCart = (product) => {
    try {
      const current = JSON.parse(localStorage.getItem('cart') || '[]') || []
      const idx = current.findIndex((it) => String(it.id) === String(product.id))
      if (idx > -1) {
        current[idx].quantity = (Number(current[idx].quantity || 0) + 1)
      } else {
        current.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(current))
      // remove from wishlist after adding to cart
      removeProduct(product.id)
      try { window.dispatchEvent(new CustomEvent('cart:changed', { detail: { item: product } })) } catch (e) {}
      alert(`${product.title} added to cart`)
    } catch (e) {
      console.error('Failed to add to cart', e)
    }
  }

  return (
    <div className="wishlist-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <main style={{ flex: 1, padding: '2rem', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
          <h1 style={{ margin: 0 }}>Your Wishlist</h1>
          <div style={{ color: '#666' }}>{products.length} item{products.length !== 1 ? 's' : ''}</div>
        </header>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#444' }}>
            <p style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Your wishlist is empty.</p>
            <Link to="/" style={{ color: '#0077ff' }}>Continue shopping</Link>
          </div>
        ) : (
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
            {products.map((product) => (
              <article key={product.id} style={{ border: '1px solid #e6e6e6', borderRadius: 8, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 160, background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {((product.images && product.images.length) || product.image) ? (
                    <img src={(product.images && product.images[0]) || product.image} alt={product.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-gray-500">No Image</div>
                  )}
                </div>

                <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{product.title}</div>
                  <div style={{ color: '#666' }}>${Number(product.price || 0).toFixed(2)}</div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => addToCart(product)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: 'none', background: '#111', color: '#fff', cursor: 'pointer' }}>Add to cart</button>
                    <button onClick={() => removeProduct(product.id)} style={{ padding: '0.5rem 0.6rem', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Wishlist