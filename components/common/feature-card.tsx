'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { fadeInUpVariants } from './animated-container'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all group hover:glow-primary"
    >
      <div className="mb-4">
        <div className="inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  )
}

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  highlighted?: boolean
}

export function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  ctaText, 
  ctaHref,
  highlighted = false 
}: PricingCardProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      className={`p-8 rounded-2xl border ${
        highlighted 
          ? 'border-primary bg-primary/5' 
          : 'border-border/50 bg-card/50'
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-muted-foreground">/month</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
            <span className="text-primary">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <a href={ctaHref}>
        <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
          highlighted 
            ? 'bg-primary hover:bg-primary/90 text-white' 
            : 'bg-card border border-border/50 hover:border-primary/50'
        }`}>
          {ctaText}
        </button>
      </a>
    </motion.div>
  )
}
