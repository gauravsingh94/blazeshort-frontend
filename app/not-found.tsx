'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-96 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-96 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl font-bold gradient-primary bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>

        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row justify-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 w-full">
              Go home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full bg-transparent">
              Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
