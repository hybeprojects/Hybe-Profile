"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { OtpVerification } from "./otp-verification"
import { Loader2, Sparkles } from "lucide-react"

interface AuthWrapperProps {
  onAuthSuccess: () => void
}

export function AuthWrapper({ onAuthSuccess }: AuthWrapperProps) {
  const [authStep, setAuthStep] = useState<"login" | "otp" | "loading">("login")
  const [userEmail] = useState("army@example.com") // This would come from login form

  const handleLoginSuccess = () => {
    setAuthStep("otp")
  }

  const handleOtpSuccess = () => {
    setAuthStep("loading")
    // Simulate dashboard loading
    setTimeout(() => {
      onAuthSuccess()
    }, 3000)
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

  if (authStep === "otp") {
    return <OtpVerification email={userEmail} onVerificationSuccess={handleOtpSuccess} onBack={handleBackToLogin} />
  }

  return <LoginForm onLoginSuccess={handleLoginSuccess} />
}
