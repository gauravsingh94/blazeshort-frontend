'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CenteredLoadingSpinner } from '@/components/common/loading-spinner'
import { PageHeader } from '@/components/common/page-header'
import { AnimatedContainer } from '@/components/common/animated-container'
import { UrlAnalyticsCard } from '@/components/common/url-card'
import { EmptyState } from '@/components/common/empty-state'

export default function AnalyticsPage() {
  const { data: urls, isLoading } = useQuery({
    queryKey: ['my-urls'],
    queryFn: () => api.getUrls(),
  })

  if (isLoading) {
    return <CenteredLoadingSpinner />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Analytics"
        description="View detailed analytics for your shortened URLs"
      />

      {/* URLs List */}
      {urls && urls.length > 0 ? (
        <AnimatedContainer stagger staggerChildren={0.05} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urls.map((url) => (
            <UrlAnalyticsCard key={url.id} url={url} />
          ))}
        </AnimatedContainer>
      ) : (
        <EmptyState
          title="No URLs to analyze yet. Create your first shortened link!"
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
