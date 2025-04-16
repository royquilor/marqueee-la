"use client"

import { HeroSection } from "@/components/hero-section"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen w-full overflow-x-hidden bg-background">
        <HeroSection />
      </div>
    </ThemeProvider>
  )
}
