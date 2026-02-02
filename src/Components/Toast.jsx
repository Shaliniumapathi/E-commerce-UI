import React, { useEffect, useState } from 'react'

export function notify(message, type = 'info') {
  try { window.dispatchEvent(new CustomEvent('app:toast', { detail: { message, type } })) } catch (e) { console.warn(e) }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random()
      setToasts((t) => [...t, { id, ...e.detail }])
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
    }
    window.addEventListener('app:toast', handler)
    return () => window.removeEventListener('app:toast', handler)
  }, [])

  if (!toasts.length) return null

  return (
    <div style={{ position: 'fixed', right: 16, top: 16, zIndex: 60, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ padding: '0.6rem 0.9rem', background: '#111', color: '#fff', borderRadius: 6, minWidth: 180 }}>{t.message}</div>
      ))}
    </div>
  )
}
