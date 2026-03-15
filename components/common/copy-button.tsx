'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

interface CopyButtonProps {
  text: string
  label?: string
  copiedLabel?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showIcon?: boolean
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  variant = 'outline',
  size = 'sm',
  className = '',
  showIcon = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={`gap-2 ${variant === 'outline' ? 'bg-transparent' : ''} ${className}`}
      onClick={handleCopy}
    >
      {showIcon && <Copy className="w-4 h-4" />}
      {copied ? copiedLabel : label}
    </Button>
  )
}

interface CopyCodeButtonProps {
  shortCode: string
  baseUrl?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function CopyCodeButton({
  shortCode,
  baseUrl = 'blaze.io',
  variant = 'default',
  size = 'default',
  className = '',
}: CopyCodeButtonProps) {
  const fullUrl = `${baseUrl}/${shortCode}`
  
  return (
    <CopyButton
      text={fullUrl}
      variant={variant}
      size={size}
      className={className}
    />
  )
}
