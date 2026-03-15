'use client'

import Link from 'next/link'
import Image from 'next/image'

interface BrandLogoProps {
  href?: string
  width?: number
  height?: number
  showText?: boolean
  className?: string
  textClassName?: string
}

export function BrandLogo({
  href = '/',
  width = 48,
  height = 48,
  showText = true,
  className = '',
  textClassName = 'text-3xl font-bold gradient-primary bg-clip-text text-transparent',
}: BrandLogoProps) {
  const logo = (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Image 
        src="/logo.jpg" 
        alt="BlazeShort" 
        width={width} 
        height={height} 
        className="rounded-lg" 
        loading="eager" 
      />
      {showText && <span className={textClassName}>BlazeShort</span>}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logo}
      </Link>
    )
  }

  return logo
}
