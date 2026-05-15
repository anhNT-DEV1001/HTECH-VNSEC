"use client"

import { useState, useEffect } from "react"

export function useCountUp(target: number, duration = 2000, delay = 300) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - (1 - progress) * (1 - progress)
        setCount(Math.floor(eased * target))
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(target)
        }
      }
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [target, duration, delay])

  return count
}

export function formatNumber(n?: number | null): string {
  if (n == null) return "0"
  return n.toLocaleString("vi-VN")
}
