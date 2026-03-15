'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
      className={`${sizeClasses[size]} border-2 border-transparent border-t-primary rounded-full`}
    />
  )
}

export function ButtonLoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
      className="w-4 h-4 border-2 border-transparent border-t-current rounded-full"
    />
  )
}

export function CenteredLoadingSpinner({ minHeight = '400px' }: { minHeight?: string }) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight }}>
      <LoadingSpinner size="md" />
    </div>
  )
}
