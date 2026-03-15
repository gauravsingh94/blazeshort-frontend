'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { FadeInUp } from './animated-container'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

export function EmptyState({ 
  title, 
  description, 
  action, 
  icon,
  className = '' 
}: EmptyStateProps) {
  return (
    <FadeInUp className={`p-12 rounded-lg border border-border/50 text-center ${className}`}>
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="text-muted-foreground mb-4">{title}</p>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </FadeInUp>
  )
}
