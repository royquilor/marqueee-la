import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import "@/components/ui/sidebar-override.css"
import { Instrument_Serif, Inter } from "next/font/google"

// Import Google fonts as optional enhancements, not required fallbacks
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional", // Changed from "swap" to "optional"
  variable: "--font-instrument-serif",
})

const inter = Inter({
  subsets: ["latin"],
  display: "optional", // Changed from "swap" to "optional"
  variable: "--font-inter",
})

// Note: Local fonts will be added in the local development environment
// The CSS variables are set up to use these when available or fall back to Google fonts

export const metadata: Metadata = {
  title: "TaskAI Dashboard",
  description: "AI-powered task management for design agencies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  )
}


import './globals.css'