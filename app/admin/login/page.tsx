"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

export default function AdminLoginPage() {
  const router = useRouter()

  const handleLoginSuccess = (_contact: string, _hybeId: string, requiresPasswordChange: boolean) => {
    if (requiresPasswordChange) {
      router.push("/auth/change-password")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4">
      <div className="w-full max-w-md">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  )
}
