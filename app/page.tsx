"use client"

import { useState } from "react"
import { AuthWrapper } from "@/components/auth/auth-wrapper"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <AuthWrapper onAuthSuccess={handleAuthSuccess} />
  }

  return <Dashboard />
}
