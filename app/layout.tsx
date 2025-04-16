import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import "@/components/ui/sidebar-override.css"
import {
  Instrument_Serif,
  Inter,
  Press_Start_2P,
  Silkscreen,
  Orbitron,
  Audiowide,
  Bruno_Ace,
  Bruno_Ace_SC,
  DM_Sans,
  Manrope,
  Nunito,
  Playfair_Display,
  Honk,
} from "next/font/google"

// Import Google fonts as optional enhancements, not required fallbacks
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-instrument-serif",
})

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
})

// Add the Press Start 2P font configuration
const pressStart2P = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-press-start-2p",
})

// Add Silkscreen for more readable retro text
const silkscreen = Silkscreen({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-silkscreen",
})

// Add Orbitron for Tron theme
const orbitron = Orbitron({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-orbitron",
})

// Add Audiowide for Tron theme
const audiowide = Audiowide({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-audiowide",
})

// Add Bruno Ace for Tron theme
const brunoAce = Bruno_Ace({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-bruno-ace",
})

// Add Bruno Ace SC for Tron theme
const brunoAceSC = Bruno_Ace_SC({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-bruno-ace-sc",
})

// Add DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-dm-sans",
})

// Add Manrope
const manrope = Manrope({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-manrope",
})

// Add Nunito
const nunito = Nunito({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-nunito",
})

// Add Playfair Display
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-playfair-display",
})

// Add Honk
const honk = Honk({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-honk",
})

// Note: Local fonts will be added in the local development environment
// The CSS variables are set up to use these when available or fall back to Google fonts

export const metadata: Metadata = {
  title: "Marqueee.dev - Try different designs fast",
  description: "Explore different design themes, hit the right arrow key, hit CMD + R.",
  // Add cache control directives
  other: {
    "Cache-Control": "no-store, max-age=0",
  },
  openGraph: {
    title: "Marqueee.dev - Try different designs fast",
    description: "Explore different design themes, hit the right arrow key, hit CMD + R.",
    type: "website",
    url: "https://marqueee.dev",
    images: [
      {
        url: "/og-image.png", // Updated to use the new image
        width: 1200,
        height: 630,
        alt: "Marqueee.dev - Try different designs fast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marqueee.dev - Try different designs fast",
    description: "Explore different design themes, hit the right arrow key, hit CMD + R.",
    images: ["/og-image.png"], // Updated to use the new image
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} ${pressStart2P.variable} ${silkscreen.variable} ${orbitron.variable} ${audiowide.variable} ${brunoAce.variable} ${brunoAceSC.variable} ${dmSans.variable} ${manrope.variable} ${nunito.variable} ${playfairDisplay.variable} ${honk.variable}`}
    >
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  )
}


import './globals.css'