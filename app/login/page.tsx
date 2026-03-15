'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { setAuthToken } from '@/lib/auth'
import { ArrowRight } from 'lucide-react'
import { AnimatedContainer } from '@/components/common/animated-container'
import { BrandLogo } from '@/components/common/brand-logo'
import { AuthCard, AuthHeader, ErrorMessage } from '@/components/common/auth-card'
import { FormField } from '@/components/common/form-field'
import { ButtonLoadingSpinner } from '@/components/common/loading-spinner'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await api.login(email, password)
      console.log("Login Result:", result?.data.token)
      if(result?.data.token) {
        setAuthToken(result.data.token)
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-96 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-96 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
      </div>

      <AnimatedContainer className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex items-center justify-center">
            <BrandLogo href="/" />
          </div>
          <AuthHeader 
            title="Welcome back"
            subtitle="Sign in to your account to continue"
          />
        </div>

        {/* Form Card */}
        <AuthCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <FormField
              label="Email Address"
              type="email"
              placeholder="demo@blazeshort.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <FormField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 h-10"
              disabled={isLoading}
            >
              {isLoading ? (
                <ButtonLoadingSpinner />
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with demo</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => {
              setEmail('demo@blazeshort.com')
              setPassword('password123')
            }}
          >
            Use Demo Account
          </Button>
        </AuthCard>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
            Sign up
          </Link>
        </div>
      </AnimatedContainer>
    </main>
  )
}