'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { getAuthToken, clearAuthToken } from '@/lib/auth'
import { LogOut, Link as LinkIcon, BarChart3, Home } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    clearAuthToken()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-8 h-8 border-2 border-transparent border-t-primary rounded-full" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-64 border-r border-border/20 bg-card/50 backdrop-blur p-6 flex flex-col"
      >
        <Link href="/dashboard" className="mb-8 flex items-center gap-2">
          <Image src="/logo.jpg" alt="BlazeShort" width={40} height={40} className="rounded-lg" loading="eager" />
          <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">BlazeShort</span>
        </Link>

        <nav className="space-y-2 flex-1">
          <NavLink href="/dashboard" icon={Home} label="Dashboard" />
          <NavLink href="/dashboard/urls" icon={LinkIcon} label="My URLs" />
          {/*<NavLink href="/dashboard/analytics" icon={BarChart3} label="Analytics" />*/}
        </nav>

        <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2 bg-transparent">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Nav */}
        <nav className="sticky top-0 z-40 border-b border-border/20 backdrop-blur-md bg-background/80 px-8 h-16 flex items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </nav>

        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

function NavLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<any>; label: string }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsActive(window.location.pathname === href)
    }
  }, [href])

  return (
    <Link href={href}>
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={`w-full justify-start gap-2 ${isActive ? 'bg-primary/20 text-primary' : ''}`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </Button>
    </Link>
  )
}
