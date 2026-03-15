import React from "react"
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import RootLayoutClient from './layout-client'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'BlazeShort - URL Shortener with Analytics',
  description: 'Create short URLs and track their performance with powerful analytics. Real-time insights into every click.',
  generator: 'BlazeShort',
  keywords: ['URL shortener', 'link analytics', 'url tracking'],
  openGraph: {
    title: 'BlazeShort',
    description: 'Create short URLs and track their performance with powerful analytics',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f0f1e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans antialiased dark bg-background text-foreground">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
