"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "./login-form"
import { OtpVerification } from "./otp-verification"
import { ChangePassword } from "./change-password"
import { Loader2, Sparkles } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface AuthWrapperProps {
  onAuthSuccess: () => void
}

export function AuthWrapper({ onAuthSuccess }: AuthWrapperProps) {
  const [authStep, setAuthStep] = useState<"login" | "otp" | "change-password" | "loading">("login")
  const [userEmail, setUserEmail] = useState("")
  const [hybeId, setHybeId] = useState("")
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const checkAuthStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        // Check if user needs to change password
        const { data: profile } = await supabase
          .from("hybe_profiles")
          .select("requires_password_change")
          .eq("email", session.user.email)
          .single()

        if (profile?.requires_password_change) {
          setAuthStep("change-password")
          setUserEmail(session.user.email || "")
        } else {
          onAuthSuccess()
        }
      }
    }

    checkAuthStatus()
  }, [])

  const handleLoginSuccess = (email: string, id: string, needsPasswordChange: boolean) => {
    setUserEmail(email)
    setHybeId(id)
    setRequiresPasswordChange(needsPasswordChange)

    if (needsPasswordChange) {
      setAuthStep("change-password")
    } else {
      setAuthStep("otp")
    }
  }

  const handleOtpSuccess = () => {
    setAuthStep("loading")
    // Simulate dashboard loading
    setTimeout(() => {
      onAuthSuccess()
    }, 3000)
  }

  const handlePasswordChangeSuccess = () => {
    setAuthStep("otp")
  }

  const handleBackToLogin = () => {
    setAuthStep("login")
  }

  if (authStep === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            <Loader2 className="h-12 w-12 text-accent animate-spin" />
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fetching your HYBE Dashboard...
            </h2>
            <p className="text-muted-foreground">Welcome back, ARMY! Preparing your exclusive content.</p>
          </div>
        </div>
      </div>
    )
  }

  if (authStep === "change-password") {
    return (
      <ChangePassword
        email={userEmail}
        hybeId={hybeId}
        onPasswordChangeSuccess={handlePasswordChangeSuccess}
        onBack={handleBackToLogin}
      />
    )
  }

  if (authStep === "otp") {
    return <OtpVerification email={userEmail} onVerificationSuccess={handleOtpSuccess} onBack={handleBackToLogin} />
  }

  return <LoginForm onLoginSuccess={handleLoginSuccess} />
}
