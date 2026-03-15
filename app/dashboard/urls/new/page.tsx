'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AnimatedContainer } from '@/components/common/animated-container'
import { FormField } from '@/components/common/form-field'
import { ButtonLoadingSpinner } from '@/components/common/loading-spinner'
import { CopyButton } from '@/components/common/copy-button'
import { motion } from 'framer-motion'

export default function NewUrlPage() {
  const router = useRouter()
  const [originalUrl, setOriginalUrl] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [createdUrl, setCreatedUrl] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!originalUrl.trim()) {
      toast.error('Please enter a URL')
      return
    }

    setIsLoading(true)

    try {
      const result = await api.createUrl(originalUrl, expiresAt || undefined)
      setCreatedUrl(result)
      toast.success('URL shortened successfully!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create URL')
    } finally {
      setIsLoading(false)
    }
  }

  if (createdUrl) {
    return (
      <AnimatedContainer className="max-w-2xl mx-auto space-y-8">
        <Link href="/dashboard/urls">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to URLs
          </Button>
        </Link>

        <div className="p-8 rounded-2xl border border-primary/30 gradient-card backdrop-blur-sm">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="text-5xl"
            >
              ✨
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold mb-2">URL Shortened!</h2>
              <p className="text-muted-foreground">Your link is ready to share</p>
            </div>

            <div className="space-y-4 bg-background/50 p-6 rounded-lg border border-border/30">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Your Short URL</label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-input px-4 py-3 rounded-lg font-mono text-primary flex items-center">
                    {`blaze.io/${createdUrl.shortCode}`}
                  </code>
                  <CopyButton
                    text={`blaze.io/${createdUrl.shortCode}`}
                    variant="default"
                    className="bg-primary hover:bg-primary/90"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">Original URL</label>
                <p className="text-sm text-foreground break-all bg-input px-4 py-3 rounded-lg">{createdUrl.originalUrl}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Created</p>
                  <p className="font-mono text-sm">{createdUrl.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <span className="inline-block px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-primary hover:bg-primary/90">Share</Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setCreatedUrl(null)
                  setOriginalUrl('')
                  setExpiresAt('')
                }}
              >
                Create Another
              </Button>
            </div>

            <Link href="/dashboard/urls" className="block">
              <Button variant="ghost" className="w-full">
                View All URLs
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedContainer>
    )
  }

  return (
    <AnimatedContainer className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Create New Short URL</h2>
        <p className="text-muted-foreground">Paste your long URL below and get a short, shareable link</p>
      </div>

      {/* Form Card */}
      <div className="p-8 rounded-2xl border border-border/50 gradient-card backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Original URL"
            id="url"
            type="url"
            placeholder="https://example.com/very-long-url..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            disabled={isLoading}
            inputClassName="h-12"
            required
            helperText="The long URL you want to shorten"
          />

          <FormField
            label="Expiration Date (Optional)"
            id="expires"
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            disabled={isLoading}
            inputClassName="h-12"
            helperText="Link will become inactive after this date"
          />

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoadingSpinner /> : 'Create Short URL'}
          </Button>
        </form>
      </div>

      {/* Tips */}
      <AnimatedContainer className="p-6 rounded-lg border border-border/30 bg-card/50">
        <h3 className="font-semibold mb-3">Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Use descriptive original URLs for better tracking</li>
          <li>• Set expiration dates for temporary campaign links</li>
          <li>• Check your analytics to understand link performance</li>
          <li>• Share your short URLs across social media and messaging</li>
        </ul>
      </AnimatedContainer>

      <Link href="/dashboard/urls">
        <Button variant="outline" className="w-full gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back to My URLs
        </Button>
      </Link>
    </AnimatedContainer>
  )
}
