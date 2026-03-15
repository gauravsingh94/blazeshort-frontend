'use client'

import { ReactNode } from 'react'
import { FadeInUp } from './animated-container'

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function PageHeader({ title, description, action, className = '' }: PageHeaderProps) {
  return (
    <FadeInUp className={`flex justify-between items-center ${className}`}>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </FadeInUp>
  )
}
