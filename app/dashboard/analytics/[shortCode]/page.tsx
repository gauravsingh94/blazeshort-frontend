'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { AnimatedContainer } from '@/components/common/animated-container'
import { SimpleStatCard } from '@/components/common/stat-card'
import { ChartContainer, chartTooltipStyle, chartTooltipStyleAccent, chartGridStyle, chartGridStyleAccent, chartAxisStyle } from '@/components/common/chart-container'
import { CopyButton } from '@/components/common/copy-button'
import { motion } from 'framer-motion'

const COLORS = ['hsl(270, 100%, 55%)', 'hsl(180, 100%, 50%)', 'hsl(120, 100%, 50%)', 'hsl(60, 100%, 50%)', 'hsl(30, 100%, 55%)']

export default function AnalyticsPage({ params }: { params: { shortCode: string } }) {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', params.shortCode],
    queryFn: () => api.getAnalytics(params.shortCode),
  })

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-32 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Analytics not found</p>
        <Link href="/dashboard/urls">
          <Button variant="outline">Back to URLs</Button>
        </Link>
      </div>
    )
  }

  const totalClicksData = [
    { name: 'Unique', value: analytics.uniqueClicks },
    { name: 'Repeat', value: analytics.totalClicks - analytics.uniqueClicks },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/urls">
          <Button variant="outline" className="gap-2 mb-6 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to URLs
          </Button>
        </Link>

        <div className="p-6 rounded-xl border border-border/50 bg-card/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{analytics.shortCode}</h2>
              <p className="text-sm text-muted-foreground break-all">{analytics.originalUrl}</p>
            </div>
            <CopyButton
              text={`blaze.io/${analytics.shortCode}`}
              variant="default"
              className="bg-primary hover:bg-primary/90"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <AnimatedContainer stagger staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SimpleStatCard label="Total Clicks" value={analytics.totalClicks} />
        <SimpleStatCard label="Unique Visitors" value={analytics.uniqueClicks} />
        <SimpleStatCard 
          label="Last Clicked" 
          value={analytics.lastClicked ? new Date(analytics.lastClicked).toLocaleDateString() : 'Never'} 
        />
      </AnimatedContainer>

      {/* Charts */}
      <AnimatedContainer stagger staggerChildren={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Clicks */}
        <ChartContainer title="Clicks Over Time">
          <LineChart data={analytics.dailyClicks}>
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

        {/* Clicks Distribution */}
        <ChartContainer title="Click Distribution">
          <PieChart>
            <Pie
              data={totalClicksData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive
              animationDuration={800}
            >
              {totalClicksData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip {...chartTooltipStyleAccent} />
          </PieChart>
        </ChartContainer>

        {/* Top IPs */}
        <AnimatedContainer className="p-6 rounded-xl border border-border/50 bg-card/50">
          <h3 className="font-semibold text-lg mb-4">Top IP Addresses</h3>
          <div className="space-y-3">
            {analytics.topIPs.map((ip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg border border-border/30"
              >
                <span className="font-mono text-sm">{ip.ip}</span>
                <span className="text-sm font-medium text-primary">{ip.count} clicks</span>
              </motion.div>
            ))}
          </div>
        </AnimatedContainer>

        {/* Top Browsers */}
        <ChartContainer title="Top Browsers">
          <BarChart data={analytics.topUserAgents}>
            <CartesianGrid {...chartGridStyleAccent} />
            <XAxis dataKey="agent" {...chartAxisStyle} />
            <YAxis {...chartAxisStyle} />
            <Tooltip {...chartTooltipStyleAccent} />
            <Bar dataKey="count" fill="hsl(180, 100%, 50%)" isAnimationActive animationDuration={800} />
          </BarChart>
        </ChartContainer>
      </AnimatedContainer>

      {/* Recent Clicks */}
      <AnimatedContainer className="p-6 rounded-xl border border-border/50 bg-card/50">
        <h3 className="font-semibold text-lg mb-4">Recent Clicks</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Time</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">IP Address</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">User Agent</th>
              </tr>
            </thead>
            <tbody>
              {analytics.recentClicks.map((click, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/20 hover:bg-primary/5 transition-colors"
                >
                  <td className="py-3 px-4">{new Date(click.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono">{click.ip}</td>
                  <td className="py-3 px-4 truncate max-w-xs">{click.userAgent}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedContainer>
    </div>
  )
}
