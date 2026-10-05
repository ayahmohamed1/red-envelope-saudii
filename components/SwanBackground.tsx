'use client'

import React, { useMemo } from 'react'

interface SwanItem {
  id: number
  top: number // percentage
  left: number // percentage
  size: number // rem
  duration: number // seconds
  delay: number // seconds
  opacity: number
  swayDuration: number // seconds
  direction: 'left-to-right' | 'right-to-left'
}

export default function SwanBackground() {
  // توليد مواقع وحركات عشوائية ثابتة للأوز 🦢
  const swans: SwanItem[] = useMemo(() => {
    return [
      { id: 1, top: 12, left: -5, size: 2.4, duration: 24, delay: 0, opacity: 0.55, swayDuration: 4.2, direction: 'left-to-right' },
      { id: 2, top: 28, left: 105, size: 2.0, duration: 28, delay: 5, opacity: 0.45, swayDuration: 3.8, direction: 'right-to-left' },
      { id: 3, top: 48, left: -10, size: 3.0, duration: 22, delay: 2, opacity: 0.65, swayDuration: 4.6, direction: 'left-to-right' },
      { id: 4, top: 68, left: 105, size: 2.2, duration: 26, delay: 8, opacity: 0.5, swayDuration: 4.0, direction: 'right-to-left' },
      { id: 5, top: 82, left: -8, size: 2.6, duration: 25, delay: 12, opacity: 0.58, swayDuration: 4.4, direction: 'left-to-right' },
      { id: 6, top: 6, left: 102, size: 1.8, duration: 30, delay: 3, opacity: 0.4, swayDuration: 3.5, direction: 'right-to-left' },
      { id: 7, top: 38, left: -6, size: 2.2, duration: 27, delay: 10, opacity: 0.52, swayDuration: 4.1, direction: 'left-to-right' },
      { id: 8, top: 58, left: 104, size: 2.8, duration: 23, delay: 14, opacity: 0.6, swayDuration: 4.5, direction: 'right-to-left' },
      { id: 9, top: 88, left: 102, size: 1.9, duration: 29, delay: 7, opacity: 0.45, swayDuration: 3.9, direction: 'right-to-left' },
      { id: 10, top: 22, left: -8, size: 2.5, duration: 21, delay: 16, opacity: 0.55, swayDuration: 4.3, direction: 'left-to-right' },
    ]
  }, [])

  return (
    <div className="swan-background-container" aria-hidden="true">
      {/* نجوم وبريق خفيف بينك وأبيض */}
      <div className="pink-ambient-glow glow-1" />
      <div className="pink-ambient-glow glow-2" />

      {/* بجعات 🦢 تسبح برقة في الخلفية */}
      {swans.map((swan) => (
        <div
          key={swan.id}
          className={`swan-drift-track dir-${swan.direction}`}
          style={{
            top: `${swan.top}%`,
            animationDuration: `${swan.duration}s`,
            animationDelay: `-${swan.delay}s`,
          }}
        >
          <div
            className="swan-bobbing"
            style={{
              fontSize: `${swan.size}rem`,
              opacity: swan.opacity,
              animationDuration: `${swan.swayDuration}s`,
              transform: swan.direction === 'right-to-left' ? 'scaleX(-1)' : 'scaleX(1)',
            }}
          >
            🦢
          </div>
        </div>
      ))}
    </div>
  )
}
