import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Providers from "@/components/providers"

export const metadata: Metadata = {
  title: "HYBE | Official Corporate Website",
  description: "HYBE Corporation - Leading global entertainment lifestyle platform company",
  generator: "v0.app",
  // viewport moved to dedicated `viewport` export for Next.js compatibility
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HYBE",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: "HYBE, 하이브, 빅히트 뮤직, Big Hit Music, 빅히트, Bighit, BTS, ARMY",
  openGraph: {
    title: "HYBE",
    description: "HYBE Corporation - Leading global entertainment lifestyle platform company",
    url: "https://hybecorp.com",
    siteName: "HYBE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HYBE",
    description: "HYBE Corporation - Leading global entertainment lifestyle platform company",
  },
}

// Keep viewport as a separate export to satisfy Next.js's generate-viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/common/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/common/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/common/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/images/common/favicon/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden bg-black text-white`}>
        <Providers>
          <Suspense fallback={null}>{children}</Suspense>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
