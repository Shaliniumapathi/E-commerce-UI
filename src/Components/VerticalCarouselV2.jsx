import React, { useState, useRef, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function VerticalCarouselV2({ images = [], height = 860, visible = 3, autoplay = false, autoplayDelay = 4000 }) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)
  const dragging = useRef(false)
  const startY = useRef(0)
  const deltaY = useRef(0)
  const activeCardRef = useRef(null)
  const count = images.length

  useEffect(() => {
    if (!autoplay || count <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), autoplayDelay)
    return () => clearInterval(t)
  }, [autoplay, autoplayDelay, count])

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  // pointer (mouse + touch) drag handlers for the active/front card
  useEffect(() => {
    const el = activeCardRef.current
    if (!el) return

    const onPointerDown = (e) => {
      dragging.current = true
      startY.current = e.clientY ?? e.touches?.[0]?.clientY ?? 0
      deltaY.current = 0
      try { el.setPointerCapture?.(e.pointerId) } catch (err) {}
    }

    const onPointerMove = (e) => {
      if (!dragging.current) return
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0
      deltaY.current = y - startY.current
      el.style.transform = `translateY(${deltaY.current}px) rotate(${deltaY.current / 30}deg)`
      el.style.transition = 'transform 0s'
    }

    const onPointerUp = () => {
      if (!dragging.current) return
      dragging.current = false
      el.style.transition = 'transform 320ms cubic-bezier(.22,.9,.31,1)'
      if (deltaY.current < -60) {
        el.style.transform = `translateY(-120%)`
        setTimeout(() => setIndex((i) => (i + 1) % count), 160)
      } else if (deltaY.current > 60) {
        el.style.transform = `translateY(120%)`
        setTimeout(() => setIndex((i) => (i - 1 + count) % count), 160)
      } else {
        el.style.transform = ''
      }
      deltaY.current = 0
    }

    // use pointer events when available
    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // fallback touch handlers
    const onTouchStart = (e) => { dragging.current = true; startY.current = e.touches[0].clientY }
    const onTouchMove = (e) => { if (!dragging.current) return; deltaY.current = e.touches[0].clientY - startY.current; el.style.transform = `translateY(${deltaY.current}px) rotate(${deltaY.current / 30}deg)`; el.style.transition = 'transform 0s' }
    const onTouchEnd = () => onPointerUp()

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [index, count])

  // wheel to navigate with small debounce
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let last = 0
    const onWheel = (e) => {
      const now = Date.now()
      if (now - last < 220) return
      if (e.deltaY > 0) next(); else prev()
      last = now
    }
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [count])

  // helper: normalized relative position (0..count-1) where 0 is active
  const relPos = (i) => {
    const r = (i - index + count) % count
    return r
  }

  return (
    <div className="relative w-full flex items-center justify-center" ref={containerRef} style={{ height: `${height}px` }}>
      <div className="relative w-full h-full select-none">
        {images.map((src, i) => {
          const r = relPos(i)
          // show only a few stacked cards for performance
          if (r > visible) return null

          const offsetY = r * 22
          const scale = 1 - r * 0.042
          const z = 100 - r
          const opacity = r === 0 ? 1 : 1 - r * 0.12
          const transformBase = `translateY(${offsetY}px) scale(${scale})`

          const style = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `${transformBase} translate(-50%, -50%)`,
            zIndex: z,
            width: '60%',
            height: `calc(${height}px)`,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: r === 0 ? '0 18px 40px rgba(0,0,0,0.18)' : '0 8px 20px rgba(0,0,0,0.08)',
            transition: 'transform 420ms cubic-bezier(.22,.9,.31,1), opacity 300ms',
            opacity,
            cursor: r === 0 ? 'grab' : 'default',
            background: '#fff'
          }

          return (
            <div
              key={i}
              ref={r === 0 ? activeCardRef : null}
              style={style}
              onClick={() => { if (r !== 0) setIndex(i) }}
            >
              <img src={src} alt={`card-${i}`} style={{ width: '100%', height: '280%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
            </div>
          )
        })}
      </div>

      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <button onClick={prev} className="bg-white/90 p-1 rounded shadow"><ChevronUp size={16} /></button>
        <button onClick={next} className="bg-white/90 p-1 rounded shadow"><ChevronDown size={16} /></button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  )
}
