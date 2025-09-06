"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Lock, Sparkles } from "lucide-react"

interface LoginFormProps {
  onLoginSuccess: () => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [hybeId, setHybeId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginState, setLoginState] = useState<"idle" | "loading" | "verifying" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginState("loading")

    // Simulate login process
    setTimeout(() => {
      setLoginState("verifying")
      setTimeout(() => {
        setLoginState("success")
        setTimeout(() => {
          onLoginSuccess()
        }, 1000)
      }, 2000)
    }, 1500)
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
            New to HYBE? <span className="text-primary hover:underline cursor-pointer">Create account</span>
          </p>
        </div>
      </div>
    </div>
  )
}
