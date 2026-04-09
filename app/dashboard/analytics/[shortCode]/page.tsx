"use client"

import {useQuery} from '@tanstack/react-query'
import {api} from '@/lib/api'
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
} from 'recharts'
import {Skeleton} from '@/components/ui/skeleton'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Plus, Globe, Monitor, Smartphone} from 'lucide-react'
import {AnimatedContainer} from '@/components/common/animated-container'
import {PageHeader} from '@/components/common/page-header'
import {StatCard} from '@/components/common/stat-card'
import {
  ChartContainer,
  chartTooltipStyle,
  chartTooltipStyleAccent,
  chartAxisStyle,
} from '@/components/common/chart-container'
import {motion} from 'framer-motion'
import {use} from "react";

export default function Page({params,}: {params: Promise<{ shortCode: string }>; }) {
  // const shortCode = '920f273f'
  const { shortCode }  = use(params);
  console.log(shortCode);

  const {data: stats, isLoading} = useQuery({
    queryKey: ['dashboard-stats',shortCode],
    queryFn: () => api.getDashboardStats(shortCode),
    refetchInterval: 30000,
  })

  // 🔥 Parse user agent → browser + device
  const parseUserAgent = (ua: string) => {
    const browser =
        ua.includes('Chrome')
            ? 'Chrome'
            : ua.includes('Firefox')
                ? 'Firefox'
                : ua.includes('Safari')
                    ? 'Safari'
                    : 'Other'

    const device = ua.includes('Mobile') ? 'Mobile' : 'Desktop'

    return {browser, device}
  }

  // 🔥 Transform data for clean SaaS UI
  const browserData =
      stats?.topUserAgents?.map((item: any) => {
        const parsed = parseUserAgent(item.userAgent)
        return {
          name: parsed.browser,
          count: item.count,
          device: parsed.device,
        }
      }) || []

  if (isLoading) {
    return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl"/>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80 rounded-xl"/>
            <Skeleton className="h-80 rounded-xl"/>
          </div>
        </div>
    )
  }

  const statCards = [
    {label: 'Total Clicks', value: stats?.totalClicks || 0, icon: '📊'},
    {label: 'Unique Clicks', value: stats?.uniqueClicks || 0, icon: '👥'},
    {label: 'Top IPs', value: stats?.topIps?.length || 0, icon: '🌐'},
    {label: 'Browsers', value: browserData.length || 0, icon: '🖥️'},
  ]

  return (
      <div className="space-y-8">
        <PageHeader
            title="Dashboard"
            description="Track performance like a SaaS product 🚀"
            action={
              <Link href="/dashboard/urls/new">
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4"/>
                  New URL
                </Button>
              </Link>
            }
        />

        {/* Stats */}
        <AnimatedContainer
            stagger
            staggerChildren={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statCards.map((stat, i) => (
              <StatCard key={i} label={stat.label} value={stat.value} icon={stat.icon}/>
          ))}
        </AnimatedContainer>

        {/* Charts */}
        <AnimatedContainer
            stagger
            staggerChildren={0.1}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* 📈 SaaS Line Chart */}
          <ChartContainer title="Daily Clicks">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.clicksPerDay || []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1}/>
                <XAxis dataKey="date" {...chartAxisStyle} />
                <YAxis {...chartAxisStyle} />
                <Tooltip {...chartTooltipStyle} />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    dot={{r: 4}}
                    activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* 📊 SaaS Bar Chart */}
          <ChartContainer title="Top Browsers">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={browserData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1}/>
                <XAxis dataKey="name" {...chartAxisStyle} />
                <YAxis {...chartAxisStyle} />
                <Tooltip {...chartTooltipStyleAccent} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#06b6d4"/>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </AnimatedContainer>

        {/* 🔥 Recent Activity with Icons */}
        <AnimatedContainer className="p-6 rounded-xl border border-border/50 bg-card/50">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {stats?.recentClicks?.slice(0, 5).map((click: any, i: number) => {
              const parsed = parseUserAgent(click.userAgent)

              return (
                  <motion.div
                      key={i}
                      initial={{opacity: 0, x: -10}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: i * 0.05}}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-primary/30 transition"
                  >
                    <div className="flex items-center gap-3">
                      {parsed.device === 'Mobile' ? (
                          <Smartphone className="w-5 h-5 text-primary"/>
                      ) : (
                          <Monitor className="w-5 h-5 text-primary"/>
                      )}

                      <div>
                        <p className="text-sm font-medium">{parsed.browser}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Globe className="w-3 h-3"/>
                          {click.ip}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {new Date(click.clickedAt).toLocaleTimeString()}
                    </p>
                  </motion.div>
              )
            })}
          </div>
        </AnimatedContainer>
      </div>
  )
}
