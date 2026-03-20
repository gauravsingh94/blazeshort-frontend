'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { AnimatedContainer } from '@/components/common/animated-container'
import { PageHeader } from '@/components/common/page-header'
import { UrlCard } from '@/components/common/url-card'
import { EmptyState } from '@/components/common/empty-state'

export default function MyUrlsPage() {
  const { data: urls, isLoading, refetch } = useQuery({
    queryKey: ['my-urls'],
    queryFn: () => api.getAllUrls(),
  })

  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (shortCode: string) => {
    const fullUrl = `http:localhost:8080/${shortCode}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(shortCode)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  // const handleToggle = async (id: string, currentStatus: boolean) => {
  //   try {
  //     await api.toggleUrl(id, !currentStatus)
  //     refetch()
  //     toast.success(`URL ${!currentStatus ? 'enabled' : 'disabled'}`)
  //   } catch {
  //     toast.error('Failed to update URL')
  //   }
  // }

  // const handleDelete = async (id: string) => {
  //   try {
  //     await api.deleteUrl(id)
  //     refetch()
  //     toast.success('URL deleted')
  //   } catch {
  //     toast.error('Failed to delete URL')
  //   }
  // }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="My URLs"
        description="Manage all your shortened links"
        action={
          <Link href="/dashboard/urls/new">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="w-4 h-4" />
              Create New
            </Button>
          </Link>
        }
      />

      {/* URLs Table */}
      {urls && urls.length > 0 ? (
        <AnimatedContainer stagger staggerChildren={0.05} className="space-y-3">
          {/* @ts-ignore */}
          {urls.map((url) => (
            <UrlCard
              key={url.id}
              url={url}
              onCopy={handleCopy}
              // onToggle={handleToggle}
              // onDelete={handleDelete}
              copiedId={copiedId}
            />
          ))}
        </AnimatedContainer>
      ) : (
        <EmptyState
          title="No URLs yet. Create your first shortened link!"
          action={
            <Link href="/dashboard/urls/new">
              <Button className="bg-primary hover:bg-primary/90">Create URL</Button>
            </Link>
          }
        />
      )}
    </div>
  )
}
