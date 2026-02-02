import React, { useRef } from 'react'

export default function AvatarUploader({ src, onUploaded }) {
  const ref = useRef()

  const handlePick = () => ref.current && ref.current.click()

  const handle = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try { onUploaded && onUploaded(reader.result) } catch (e) { console.error(e) }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', background: '#eee' }}>
          {src ? <img src={src} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
        </div>
        <div>
          <button onClick={handlePick} className="border px-3 py-1 rounded">Change</button>
          <input ref={ref} type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  )
}
