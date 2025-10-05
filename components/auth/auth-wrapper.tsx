"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "./login-form"
import { ChangePassword } from "./change-password"
import { Loader2, Sparkles } from "lucide-react"

interface AuthWrapperProps {
  onAuthSuccess: () => void
}

export function AuthWrapper({ onAuthSuccess }: AuthWrapperProps) {
  const [authStep, setAuthStep] = useState<"login" | "change-password" | "loading">("login")
  const [userContact, setUserContact] = useState("")
  const [hybeId, setHybeId] = useState("")
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const res = await fetch("/api/auth/session")
      const json = await res.json()
      if (json.authenticated) {
        if (json.session.requiresPasswordChange) {
          setAuthStep("change-password")
          setUserContact(json.session.contact || "")
          setHybeId(json.session.hybeId)
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
      onAuthSuccess()
    }
  }

  const handlePasswordChangeSuccess = () => {
    onAuthSuccess()
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

  return <LoginForm onLoginSuccess={handleLoginSuccess} />
}
