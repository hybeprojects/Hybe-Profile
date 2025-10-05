"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled error in client component:", error)
    toast.error(error?.message || "Something went wrong. Please try again.")
  }, [error])

  return (
    <div className="error-page min-h-screen flex flex-col items-center justify-center p-6 text-center bg-black text-white">
      <div className="error-card max-w-xl w-full rounded-lg border border-primary/20 p-6 bg-card">
        <div className="brand mb-4 flex items-center justify-center">
          <img src="https://res.cloudinary.com/dgqhyz67g/image/upload/0f22d319-d299-465c-af1a-c5261c935f9a_removalai_preview_hzdvg2.png" alt="HYBE logo" className="h-16 w-auto mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mb-4">An unexpected error occurred. You can try reloading the page or go back home.</p>

        <div className="flex items-center justify-center space-x-3">
          <Button onClick={() => reset()} className="px-4 py-2">Retry</Button>
          <Button onClick={() => (window.location.href = "/")} variant="ghost" className="px-4 py-2">Go Home</Button>
          <Button onClick={() => (window.location.href = "mailto:support@hybecorp.com?subject=App%20Error&body=" + encodeURIComponent(error?.message || ""))} variant="outline" className="px-4 py-2">Contact Support</Button>
        </div>
      </div>
    </div>
  )
}
