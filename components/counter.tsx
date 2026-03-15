'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function Counter({ value, duration = 2, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const increment = value / (duration * 60)
    let current = 0

    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [value, duration])

  return (
    <motion.span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  )
}
