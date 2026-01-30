import React, { useState, useRef, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function VerticalCarousel({ images = [], className = '', heightClass = 'h-40' }) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)
  const touchDelta = useRef(0)

  const clampIndex = (i) => {
    if (i < 0) return images.length - 1
    if (i >= images.length) return 0
    return i
  }

  const go = (delta) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setIndex((cur) => clampIndex(cur + delta))
    setTimeout(() => {
      isAnimating.current = false
    }, 550)
  }

  // wheel handler
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let wheelTimeout = null
    const onWheel = (e) => {
      e.preventDefault()
      clearTimeout(wheelTimeout)
      if (e.deltaY > 10) go(1)
      else if (e.deltaY < -10) go(-1)
      wheelTimeout = setTimeout(() => {}, 200)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [images.length])

  // touch handlers
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      touchDelta.current = e.touches[0].clientY - touchStartY.current
    }
    const onTouchEnd = () => {
      const delta = touchDelta.current
      if (Math.abs(delta) > 40) {
        if (delta < 0) go(1)
        else go(-1)
      }
      touchDelta.current = 0
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [images.length])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className={`overflow-hidden ${heightClass} rounded`}>
        <div
          className="transform transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className={`w-full ${heightClass} flex items-center justify-center`}>
              <img src={src} alt={`card-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="absolute right-2 top-2 flex flex-col gap-2">
        <button onClick={() => go(-1)} className="bg-white/90 p-1 rounded shadow">
          <ChevronUp size={18} />
        </button>
        <button onClick={() => go(1)} className="bg-white/90 p-1 rounded shadow">
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  )
}
