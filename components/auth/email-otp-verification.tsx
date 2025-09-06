"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, ArrowLeft, RefreshCw, Shield, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EmailOTPVerificationProps {
  hybeId: string
  maskedEmail: string
  onVerificationSuccess: () => void
  onBack: () => void
}

export function EmailOTPVerification({
  hybeId,
  maskedEmail,
  onVerificationSuccess,
  onBack,
}: EmailOTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [verificationState, setVerificationState] = useState<"idle" | "verifying" | "success">("idle")

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setVerificationState("verifying")
    setError(null)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hybeId, otp }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Invalid verification code")
      }

      setVerificationState("success")
      setTimeout(() => {
        onVerificationSuccess()
      }, 1500)
    } catch (err: any) {
      setError(err.message)
      setVerificationState("idle")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hybeId }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to resend code")
      }

      setTimeLeft(600) // Reset timer
      setOtp("") // Clear current OTP
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsResending(false)
    }
  }

  const getButtonText = () => {
    switch (verificationState) {
      case "verifying":
        return "Verifying..."
      case "success":
        return "Verified ✓"
      default:
        return "Verify Code"
    }
  }

  return (
    <div className="mobile-container mobile-safe-area flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4 sm:p-6">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Check Your Email</h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            We've sent a verification code to {maskedEmail}
          </p>
        </div>

        <Card className="border-primary/20 shadow-lg mx-2 sm:mx-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Email Verification</span>
            </CardTitle>
            <CardDescription className="text-center text-sm px-2">
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="text-sm">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {verificationState === "success" && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>Email verified successfully!</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  disabled={isLoading || verificationState === "success"}
                  className="border-primary/20 focus:border-primary text-base h-12 text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                  autoComplete="one-time-code"
                />
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  Code expires in: <span className="font-mono text-primary">{formatTime(timeLeft)}</span>
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 h-12 text-base font-medium"
                disabled={isLoading || otp.length !== 6 || timeLeft === 0 || verificationState === "success"}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {getButtonText()}
              </Button>

              <div className="flex flex-col space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendOTP}
                  disabled={isResending || timeLeft > 540} // Allow resend after 1 minute
                  className="w-full h-10"
                >
                  {isResending && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                  {isResending ? "Sending..." : "Resend Code"}
                </Button>

                <Button type="button" variant="ghost" onClick={onBack} className="w-full h-10" disabled={isLoading}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
