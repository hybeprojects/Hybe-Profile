"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Lock, Sparkles, Shield } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { toast } from "sonner"

interface LoginFormProps {
  onLoginSuccess: (email: string, hybeId: string, needsPasswordChange: boolean) => void
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

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hybeId, password }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Login failed")
      }

      setLoginState("success")
      toast.success("Login successful")
      setTimeout(() => {
        onLoginSuccess(json.email || "", json.hybeId, json.requiresPasswordChange)
      }, 800)
    } catch (err: any) {
      toast.error(err.message || "Login failed")
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
          <div className="flex items-center justify-center mb-6">
            <Logo className="h-12 w-auto" />
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
