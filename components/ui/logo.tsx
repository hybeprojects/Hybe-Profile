import React from "react"

interface LogoProps {
  className?: string
  alt?: string
  width?: number
  height?: number
}

export function Logo({ className = "", alt = "HYBE logo", width = 160, height = 40 }: LogoProps) {
  return (
    <img
      src="https://res.cloudinary.com/dgqhyz67g/image/upload/0f22d319-d299-465c-af1a-c5261c935f9a_removalai_preview_hzdvg2.png"
      alt={alt}
      width={width}
      height={height}
      className={`logo-image ${className}`}
    />
  )
}
