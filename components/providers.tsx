"use client"

import React from "react"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute={undefined} defaultTheme="system">
      {children}
      <Toaster position="bottom-right" richColors closeButton style={{ zIndex: 9999 }} />
    </ThemeProvider>
  )
}
