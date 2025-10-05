"use client"

import { useState, useEffect } from "react"
import { AuthWrapper } from "@/components/auth/auth-wrapper"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/session")
      const json = await res.json()
      if (json.authenticated && !json.session.requiresPasswordChange) {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading HYBE Account...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthWrapper onAuthSuccess={handleAuthSuccess} />
  }

  return <Dashboard />
}
