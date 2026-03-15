'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: boolean
  staggerDelay?: number
  staggerChildren?: number
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export function AnimatedContainer({ 
  children, 
  className = '', 
  delay = 0,
  stagger = false,
  staggerDelay = 0.2,
  staggerChildren = 0.1
}: AnimatedContainerProps) {
  if (stagger) {
    return (
      <motion.div
        variants={{
          animate: {
            transition: {
              staggerChildren,
              delayChildren: staggerDelay,
            },
          },
        }}
        initial="initial"
        animate="animate"
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInUp({ 
  children, 
  className = '',
  delay = 0,
  whileInView = false,
  viewport = { once: true }
}: {
  children: ReactNode
  className?: string
  delay?: number
  whileInView?: boolean
  viewport?: { once: boolean }
}) {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  }

  if (whileInView) {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}
