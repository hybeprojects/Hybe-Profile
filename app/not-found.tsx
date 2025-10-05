"use client"

import React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  React.useEffect(() => {
    toast("Page not found", { type: "error" })
  }, [])

  return (
    <div className="not-found min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white">
      <div className="notfound-card max-w-lg w-full rounded-lg border border-primary/20 p-6 bg-card text-center">
        <img src="https://res.cloudinary.com/dgqhyz67g/image/upload/0f22d319-d299-465c-af1a-c5261c935f9a_removalai_preview_hzdvg2.png" alt="HYBE logo" className="h-16 w-auto mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">404 �� Page not found</h1>
        <p className="text-sm text-muted-foreground mb-4">We couldn't find the page you're looking for.</p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => (window.location.href = "/")}>Go Home</Button>
          <Button variant="ghost" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    </div>
  )
}
