'use client'

import { motion } from 'framer-motion'
import { CreateUrlResponse } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Copy, Eye, Trash2, ToggleLeft as Toggle2 } from 'lucide-react'
import Link from 'next/link'
import { fadeInUpVariants } from './animated-container'

interface UrlCardProps {
  url: CreateUrlResponse
  onCopy: (shortCode: string) => void
  onToggle?: (id: string, currentStatus: boolean) => void
  onDelete?: (id: string) => void
  copiedId?: string | null
}

export function UrlCard({ url, onCopy, onToggle, onDelete, copiedId }: UrlCardProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      className="p-4 rounded-lg border border-border/50 bg-card/50 hover:border-primary/50 transition-all group"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <code className="text-sm font-mono bg-primary/10 px-2 py-1 rounded text-primary flex-shrink-0">
              blaze.io/{url.shortCode}
            </code>
            {/* <span className={`text-xs px-2 py-1 rounded-full ${url.isActive ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              {url.status? 'Active' : 'Inactive'}
            </span> */}
          </div>
          <p className="text-sm text-muted-foreground truncate">{url.originalUrl}</p>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            {/* <span>{url.clicks.toLocaleString()} clicks</span> */}
            {/* <span>{url.uniqueClicks.toLocaleString()} unique</span> */}
            {url.expiresAt && <span>Expires: {url.expiresAt}</span>}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => onCopy(url.shortCode)}
          >
            <Copy className="w-4 h-4" />
            {copiedId === url.shortCode ? 'Copied!' : 'Copy'}
          </Button>
          <Link href={`/dashboard/analytics/${url.shortCode}`}>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Eye className="w-4 h-4" />
              View
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            // onClick={() => onToggle(url.id, url.isActive)}
          >
            <Toggle2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-destructive bg-transparent"
            // onClick={() => onDelete(url.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

interface UrlAnalyticsCardProps {
  url: {
    id: string
    shortCode: string
    originalUrl: string
    clicks: number
    uniqueClicks: number
  }
}

export function UrlAnalyticsCard({ url }: UrlAnalyticsCardProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all group"
    >
      <div className="mb-4">
        <code className="text-sm font-mono bg-primary/10 px-2 py-1 rounded text-primary">
          {url.shortCode}
        </code>
        <p className="text-xs text-muted-foreground mt-2 truncate">{url.originalUrl}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total Clicks</p>
          <p className="text-2xl font-bold text-primary">{url.clicks.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Unique</p>
          <p className="text-2xl font-bold text-accent">{url.uniqueClicks.toLocaleString()}</p>
        </div>
      </div>

      <Link href={`/dashboard/analytics/${url.shortCode}`}>
        <Button className="w-full bg-primary hover:bg-primary/90">View Details</Button>
      </Link>
    </motion.div>
  )
}
