'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AuthCardProps {
  children: ReactNode
  className?: string
}

export function AuthCard({ children, className = '' }: AuthCardProps) {
  return (
    <div className={`p-8 rounded-2xl border border-border/50 gradient-card backdrop-blur-sm space-y-6 ${className}`}>
      {children}
    </div>
  )
}

interface AuthHeaderProps {
  title: string
  subtitle: string
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  )
}

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
    >
      {message}
    </motion.div>
  )
}
