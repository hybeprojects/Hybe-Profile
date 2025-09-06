"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Lock, Sparkles, AlertCircle, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginFormProps {
  onLoginSuccess: () => void
  onOTPRequired: (hybeId: string, email: string) => void
}

export function LoginForm({ onLoginSuccess, onOTPRequired }: LoginFormProps) {
  const [hybeId, setHybeId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginState, setLoginState] = useState<"idle" | "loading" | "verifying" | "success">("idle")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginState("loading")
    setError(null)

    const supabase = createClient()

    try {
      // First, check if HYBE ID exists in admin profiles
      const { data: adminProfile, error: adminError } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("hybe_id", hybeId)
        .single()

      if (adminError || !adminProfile) {
        throw new Error("Invalid HYBE ID. Please contact support.")
      }

      setLoginState("verifying")

      if (adminProfile.email) {
        // Send OTP to email first
        const otpResponse = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hybeId }),
        })

        const otpResult = await otpResponse.json()

        if (!otpResult.success) {
          throw new Error(otpResult.error || "Failed to send verification code")
        }

        // Trigger OTP verification flow
        onOTPRequired(hybeId, otpResult.email)
        return
      }

      // Check if user is already registered
      if (adminProfile.is_registered) {
        // User exists, try to sign in with email
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: adminProfile.email || `${hybeId}@hybe.temp`,
          password: password,
        })

        if (signInError) {
          throw new Error("Invalid password. Please try again.")
        }
      } else {
        // First time login with default password
        if (password !== "HYBEARMY2025") {
          throw new Error("Please use the default password: HYBEARMY2025")
        }

        // Create auth user account
        const tempEmail = `${hybeId}@hybe.temp`
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: tempEmail,
          password: password,
          options: {
            data: {
              hybe_id: hybeId,
              display_name: adminProfile.full_name,
              is_default_password: true,
            },
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          },
        })

        if (signUpError) {
          throw new Error(signUpError.message)
        }

        // Update admin profile
        await supabase
          .from("admin_profiles")
          .update({
            is_registered: true,
            email: tempEmail,
          })
          .eq("hybe_id", hybeId)
      }

      setLoginState("success")
      setTimeout(() => {
        onLoginSuccess()
      }, 1000)
    } catch (err: any) {
      setError(err.message)
      setLoginState("idle")
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    switch (loginState) {
      case "loading":
        return "Loading..."
      case "verifying":
        return "Sending verification..."
      case "success":
        return "Login success ✓"
      default:
        return "Continue with HYBE ID"
    }
  }

  return (
    <div className="mobile-container mobile-safe-area flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4 sm:p-6">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HYBE ACCOUNT
            </h1>
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground px-4">Your digital fan passport awaits</p>
        </div>

        <Card className="border-primary/20 shadow-lg mx-2 sm:mx-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl sm:text-2xl text-center">Welcome back, ARMY</CardTitle>
            <CardDescription className="text-center text-sm px-2">
              Sign in to access exclusive content and experiences
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="hybe-id" className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>HYBE ID</span>
                </Label>
                <Input
                  id="hybe-id"
                  type="text"
                  placeholder="Enter your HYBE ID"
                  value={hybeId}
                  onChange={(e) => setHybeId(e.target.value.toUpperCase())}
                  required
                  disabled={isLoading}
                  className="border-primary/20 focus:border-primary text-base h-12"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2 text-sm">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-primary/20 focus:border-primary text-base h-12"
                  autoComplete="current-password"
                />
                <p className="text-xs text-muted-foreground px-1">First time? Use default password: HYBEARMY2025</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Enhanced Security</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  We'll send a verification code to your registered email for added security.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {getButtonText()}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground px-4">
          <p>
            Need help? <span className="text-primary hover:underline cursor-pointer">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  )
}
