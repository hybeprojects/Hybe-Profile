"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Lock, Sparkles, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginFormProps {
  onLoginSuccess: () => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
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
        .from("hybe_admin_profiles")
        .select("*")
        .eq("hybe_id", hybeId)
        .single()

      if (adminError || !adminProfile) {
        throw new Error("Invalid HYBE ID. Please contact support.")
      }

      setLoginState("verifying")

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
              display_name: adminProfile.display_name,
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
          .from("hybe_admin_profiles")
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
        return "Verifying access..."
      case "success":
        return "Login success ✓"
      default:
        return "Login as ARMY"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* HYBE Logo Area */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HYBE ACCOUNT
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground">Your digital fan passport awaits</p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back, ARMY</CardTitle>
            <CardDescription className="text-center">
              Sign in to access exclusive content and experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="hybe-id" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>HYBE ID</span>
                </Label>
                <Input
                  id="hybe-id"
                  type="text"
                  placeholder="Enter your HYBE ID"
                  value={hybeId}
                  onChange={(e) => setHybeId(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
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
                  className="border-primary/20 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">First time? Use default password: HYBEARMY2025</p>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {getButtonText()}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Need help? <span className="text-primary hover:underline cursor-pointer">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  )
}
