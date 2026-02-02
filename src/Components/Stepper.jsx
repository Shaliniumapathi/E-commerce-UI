import React from 'react'

export default function Stepper({ steps = [], current = 0 }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: i <= current ? '#0ea5e9' : '#e6e6e6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
          <div style={{ color: i <= current ? '#111' : '#666' }}>{s}</div>
          {i < steps.length - 1 && <div style={{ width: 24, height: 2, background: i < current ? '#0ea5e9' : '#e6e6e6' }} />}
        </div>
      ))}
    </div>
  )
}
