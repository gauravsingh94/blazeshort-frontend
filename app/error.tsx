'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-96 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-6 inline-block"
        >
          ⚠️
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          We encountered an unexpected error. Please try again.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row justify-center">
          <Button onClick={() => reset()} className="bg-primary hover:bg-primary/90">
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Go home
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
