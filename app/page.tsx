"use client"

import { useState, useEffect } from "react"
import { AuthWrapper } from "@/components/auth/auth-wrapper"
import { Dashboard } from "@/components/dashboard/dashboard"
import { createBrowserClient } from "@supabase/ssr"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        // Check if user has completed password change requirement
        const { data: profile } = await supabase
          .from("hybe_profiles")
          .select("requires_password_change")
          .eq("email", session.user.email)
          .single()

        // Only set authenticated if password change is not required
        if (!profile?.requires_password_change) {
          setIsAuthenticated(true)
        }
      }

      setIsLoading(false)
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setIsAuthenticated(false)
      }
    })

    return () => subscription.unsubscribe()
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
