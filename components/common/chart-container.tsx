'use client'

import { ReactNode, Children, isValidElement } from 'react'
import { ResponsiveContainer } from 'recharts'
import { FadeInUp } from './animated-container'

interface ChartContainerProps {
  title: string
  children: ReactNode
  className?: string
}

export function ChartContainer({ title, children, className = '' }: ChartContainerProps) {
  const validChildren = Children.toArray(children).filter(isValidElement)
  
  return (
    <FadeInUp className={`p-6 rounded-xl border border-border/50 bg-card/50 ${className}`}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <>{validChildren}</>
      </ResponsiveContainer>
    </FadeInUp>
  )
}

export const chartTooltipStyle = {
  contentStyle: { 
    backgroundColor: 'rgba(15, 15, 30, 0.9)', 
    border: '1px solid rgba(147, 51, 234, 0.3)', 
    borderRadius: '8px' 
  },
  labelStyle: { color: '#fff' }
}

export const chartTooltipStyleAccent = {
  contentStyle: { 
    backgroundColor: 'rgba(15, 15, 30, 0.9)', 
    border: '1px solid rgba(34, 211, 238, 0.3)', 
    borderRadius: '8px' 
  },
  labelStyle: { color: '#fff' }
}

export const chartGridStyle = {
  stroke: 'rgba(147, 51, 234, 0.1)',
  strokeDasharray: '3 3'
}

export const chartGridStyleAccent = {
  stroke: 'rgba(34, 211, 238, 0.1)',
  strokeDasharray: '3 3'
}

export const chartAxisStyle = {
  stroke: 'rgba(255, 255, 255, 0.5)',
  style: { fontSize: '12px' }
}
