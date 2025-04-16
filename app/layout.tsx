import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import "@/components/ui/sidebar-override.css"
import { Instrument_Serif } from "next/font/google"

// Import Instrument Serif font
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
})

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
    <html lang="en" suppressHydrationWarning className={`${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  )
}


import './globals.css'