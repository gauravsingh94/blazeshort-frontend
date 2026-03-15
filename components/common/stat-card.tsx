'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { fadeInUpVariants } from './animated-container'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode | string
  delay?: number
  className?: string
}

export function StatCard({ label, value, icon, delay = 0, className = '' }: StatCardProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      className={`p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all group hover:glow-primary ${className}`}
    >
      {icon && (
        <div className="text-2xl mb-2">
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}
      <p className="text-muted-foreground text-sm mb-2">{label}</p>
      <motion.div
        className="text-3xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </motion.div>
    </motion.div>
  )
}

interface SimpleStatCardProps {
  label: string
  value: string | number
  className?: string
}

export function SimpleStatCard({ label, value, className = '' }: SimpleStatCardProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      className={`p-6 rounded-xl border border-border/50 bg-card/50 ${className}`}
    >
      <p className="text-muted-foreground text-sm mb-2">{label}</p>
      <motion.div
        className="text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </motion.div>
    </motion.div>
  )
}
