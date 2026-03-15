'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { AnimatedContainer } from '@/components/common/animated-container'
import { PageHeader } from '@/components/common/page-header'
import { StatCard } from '@/components/common/stat-card'
import { ChartContainer, chartTooltipStyle, chartTooltipStyleAccent, chartGridStyle, chartGridStyleAccent, chartAxisStyle } from '@/components/common/chart-container'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.getDashboardStats(),
    refetchInterval: 30000,
  })

  const { data: analytics } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: () => api.getAnalytics('abc123'),
  })

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    )
  }

  const statCards = [
    { label: 'Total URLs', value: stats?.totalUrls || 0, icon: '🔗' },
    { label: 'Total Clicks', value: stats?.totalClicks || 0, icon: '📊' },
    { label: 'Unique Visitors', value: stats?.uniqueVisitors || 0, icon: '👥' },
    { label: 'Active URLs', value: stats?.activeUrls || 0, icon: '✅' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Welcome back!"
        description="Here's your URL performance overview"
        action={
          <Link href="/dashboard/urls/new">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="w-4 h-4" />
              New URL
            </Button>
          </Link>
        }
      />

      {/* Stats Grid */}
      <AnimatedContainer stagger staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <StatCard
            key={i}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </AnimatedContainer>

      {/* Charts */}
      <AnimatedContainer stagger staggerChildren={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Clicks Chart */}
        <ChartContainer title="Daily Clicks">
          <LineChart data={analytics?.dailyClicks || []}>
            <CartesianGrid {...chartGridStyle} />
            <XAxis dataKey="date" {...chartAxisStyle} />
            <YAxis {...chartAxisStyle} />
            <Tooltip {...chartTooltipStyle} />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="hsl(270, 100%, 55%)"
              dot={false}
              isAnimationActive
              animationDuration={800}
            />
          </LineChart>
        </ChartContainer>

        {/* Top Agents Chart */}
        <ChartContainer title="Top Browsers">
          <BarChart data={analytics?.topUserAgents || []}>
            <CartesianGrid {...chartGridStyleAccent} />
            <XAxis dataKey="agent" {...chartAxisStyle} />
            <YAxis {...chartAxisStyle} />
            <Tooltip {...chartTooltipStyleAccent} />
            <Bar dataKey="count" fill="hsl(180, 100%, 50%)" isAnimationActive animationDuration={800} />
          </BarChart>
        </ChartContainer>
      </AnimatedContainer>

      {/* Recent Activity */}
      <AnimatedContainer className="p-6 rounded-xl border border-border/50 bg-card/50">
        <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {analytics?.recentClicks.slice(0, 5).map((click, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{click.userAgent}</p>
                <p className="text-xs text-muted-foreground">{click.ip}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(click.timestamp).toLocaleTimeString()}
              </p>
            </motion.div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  )
}