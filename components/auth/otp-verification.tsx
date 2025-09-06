"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, Sparkles } from "lucide-react"

interface OtpVerificationProps {
  email: string
  onVerificationSuccess: () => void
  onBack: () => void
}

export function OtpVerification({ email, onVerificationSuccess, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)

    // Simulate OTP verification
    setTimeout(() => {
      onVerificationSuccess()
    }, 2000)
  }

  const handleResend = () => {
    setCountdown(60)
    setCanResend(false)
    // Simulate resending OTP
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HYBE ACCOUNT
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
              <Mail className="h-6 w-6 text-primary" />
              <span>Verify Your Email</span>
            </CardTitle>
            <CardDescription className="text-center">
              We've sent a verification code to
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                disabled={otp.length !== 6 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Continue"}
              </Button>
            </form>

            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
              {canResend ? (
                <Button variant="ghost" onClick={handleResend} className="text-primary hover:text-primary/80">
                  Resend Code
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">Resend in {countdown}s</p>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full mt-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
